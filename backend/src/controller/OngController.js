import { Router } from 'express';
import { randomInt } from 'node:crypto';
const endpoints = Router();



const uploadOng = multer({ dest: 'src/uploads/ImagemOngs' });
import multer from 'multer';

import {
    gerarTokenOng,
    gerarTokenValidacaoOng,
    validarTokenOng,
    verificarTokenValidacaoOng
} from '../utils/TokenEvalidacao.js';
import { EnviarEmail } from '../utils/VerificacaoEmail.js';

import { ListarOngService } from '../service/ong/ListarOngService.js';
import { ListarOngsService } from '../service/ong/ListarOngsService.js';
import { ImagemOngService } from '../service/ong/ImagemOngService.js';
import { LoginOngService } from '../service/ong/LoginOngService.js';
import { CriarOngService } from '../service/ong/CriarOngService.js';
import { ExcluirOngService } from '../service/ong/ExcluirOngService.js';
import { AlterarDescOngService } from '../service/ong/AlterarDescOngService.js';
import { AlterarEmailOngService } from '../service/ong/AlterarEmailOngService.js';
import { AlterarSenhaOngService } from '../service/ong/AlterarSenhaOngService.js';
import { AlterarSiteOngService } from '../service/ong/AlterarSiteOngService.js';
import { AlterarNomeOngService } from '../service/ong/AlterarNomeOngService.js';
import { AlterarTelefoneOngService } from '../service/ong/AlterarTelefoneOngService.js';
import { BuscarEmailPorIdOngService } from '../service/ong/BuscarEmailPorIdOngService.js';

const codigosVerificacaoOng = new Map();
const validadeCodigoMs = 10 * 60 * 1000;

async function enviarCodigoDeVerificacaoOng(idOng) {
    const codigo = randomInt(0, 10000).toString().padStart(4, '0');
    const email = await BuscarEmailPorIdOngService(idOng);

    await EnviarEmail(email, codigo);
    codigosVerificacaoOng.set(String(idOng), {
        codigo,
        expiraEm: Date.now() + validadeCodigoMs
    });
}

endpoints.get('/ongs', async (req, resp) => {
    try {

        let resposta = await ListarOngsService();

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/ongs/consultar/:id', async (req, resp) => {
    try {
        const id = req.params.id;

        const resposta = await ListarOngService(id)

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.post('/ong/criar', async (req, resp) => {
    try {
        let ong = req.body;

        let resposta = await CriarOngService(ong)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.put('/ong/imagem', validarTokenOng, uploadOng.single('imagem'), async (req, resp) => {
    try {
        const imagem = await ImagemOngService(req.usuario.id_ong, req.file)

        resp.send({ imagem });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/ong/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        const ong = await LoginOngService(email, senha)


        const token = gerarTokenOng({
            id_ong: ong.id_ong,
        });

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }

})

endpoints.delete('/ong/excluir', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong


        const resposta = await ExcluirOngService(idOng)

        resp.send({
            resposta: resposta
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.put('/ong/alterarEmail', validarTokenOng, async (req, resp) => {
    try {
        let id = req.usuario.id_ong
        const { email } = req.body;

        let resposta = await AlterarEmailOngService(id, email)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.put('/ong/alterarSenha', validarTokenOng, async (req, resp) => {
    try {
        const id = req.usuario.id_ong;
        const { senha } = req.body;
        const tokenPermitido = req.headers.tokenpermitido;

        if (!tokenPermitido) {
            await enviarCodigoDeVerificacaoOng(id);
            return resp.status(202).send({
                resposta: 'Foi enviado um email com o código de verificação.'
            });
        }

        const permissao = verificarTokenValidacaoOng(tokenPermitido);
        if (String(permissao.id_ong) !== String(id)) {
            return resp.status(403).send({ erro: 'Token de permissão de outra conta.' });
        }

        const resposta = await AlterarSenhaOngService(id, senha);

        return resp.send({ resposta });
    } catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/ong/liberarPermissao', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const codigoInformado = req.query.codigo;
        const codigoSalvo = codigosVerificacaoOng.get(String(idOng));

        if (!codigoSalvo || codigoSalvo.expiraEm <= Date.now()) {
            codigosVerificacaoOng.delete(String(idOng));
            return resp.status(400).send({ erro: 'O código expirou. Solicite um novo código.' });
        }

        if (codigoInformado !== codigoSalvo.codigo) {
            return resp.status(400).send({ erro: 'Código de verificação incorreto.' });
        }

        codigosVerificacaoOng.delete(String(idOng));
        return resp.send({ token: gerarTokenValidacaoOng(idOng) });
    } catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarNome', validarTokenOng, async (req, resp) => {
    try {
        const resposta = await AlterarNomeOngService(req.usuario.id_ong, req.body.nome);
        return resp.send({ resposta });
    } catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarTelefone', validarTokenOng, async (req, resp) => {
    try {
        const resposta = await AlterarTelefoneOngService(req.usuario.id_ong, req.body.telefone);
        return resp.send({ resposta });
    } catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarSite', validarTokenOng, async (req, resp) => {
    try {
        let id = req.usuario.id_ong
        const { site } = req.body;

        let resposta = await AlterarSiteOngService(id, site);

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.put('/ong/alterarDesc', validarTokenOng, async (req, resp) => {
    try {
        let id = req.usuario.id_ong
        const { descricao } = req.body;

        let resposta = await AlterarDescOngService(id, descricao);

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

export default endpoints
