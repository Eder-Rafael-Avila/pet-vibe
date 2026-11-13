import { Router } from 'express';
import multer from 'multer';

import { gerarTokenOng, validarTokenOng, validarTokenValidacaoOng } from '../utils/TokenEvalidacao.js';

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
import { EnviarCodigoVerificacaoOngService, LiberarPermissaoOngService } from '../service/ong/VerificacaoOngService.js';
import * as DBOng from '../repository/OngRepository.js';

const endpoints = Router();
const uploadOng = multer({ dest: 'src/uploads/ImagemOngs' });

endpoints.get('/ong/perfil', validarTokenOng, async (req, resp) => {
    try {
        const ong = await DBOng.BuscarPerfilOngPorId(req.usuario.id_ong);

        if (!ong) {
            return resp.status(404).send({ erro: 'ONG não encontrada.' });
        }

        resp.send({ resposta: ong });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/ongs', async (req, resp) => {
    try {
        let resposta = await ListarOngsService();

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/ongs/consultar/:id', async (req, resp) => {
    try {
        const id = req.params.id;
        const resposta = await ListarOngService(id);

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
        let resposta = await CriarOngService(ong);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/imagem', validarTokenOng, uploadOng.single('imagem'), async (req, resp) => {
    try {
        const imagem = await ImagemOngService(req.usuario.id_ong, req.file);

        resp.send({ imagem });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.post('/ong/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const ong = await LoginOngService(email, senha);

        const token = gerarTokenOng({ id_ong: ong.id_ong });

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/ong/excluir', validarTokenOng, validarTokenValidacaoOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;

        if (!req.headers.tokenpermitidoong) {
            await EnviarCodigoVerificacaoOngService(idOng);
            return resp.status(202).send({ resposta: 'Foi enviado um e-mail com o código de verificação.' });
        }

        const resposta = await ExcluirOngService(idOng);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarEmail', validarTokenOng, validarTokenValidacaoOng, async (req, resp) => {
    try {
        const id = req.usuario.id_ong;
        const { email } = req.body;

        if (!req.headers.tokenpermitidoong) {
            await EnviarCodigoVerificacaoOngService(id);
            return resp.status(202).send({ resposta: 'Foi enviado um e-mail com o código de verificação.' });
        }

        const resposta = await AlterarEmailOngService(id, email);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarSenha', validarTokenOng, validarTokenValidacaoOng, async (req, resp) => {
    try {
        const id = req.usuario.id_ong;
        const { senha } = req.body;

        if (!req.headers.tokenpermitidoong) {
            await EnviarCodigoVerificacaoOngService(id);
            return resp.status(202).send({ resposta: 'Foi enviado um e-mail com o código de verificação.' });
        }

        const resposta = await AlterarSenhaOngService(id, senha);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/ong/liberarPermissao', validarTokenOng, async (req, resp) => {
    try {
        const idOng = req.usuario.id_ong;
        const codigo = req.query.codigo;
        const token = await LiberarPermissaoOngService(idOng, codigo);

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarNome', validarTokenOng, async (req, resp) => {
    try {
        const resposta = await AlterarNomeOngService(req.usuario.id_ong, req.body.nome);

        return resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarTelefone', validarTokenOng, async (req, resp) => {
    try {
        const resposta = await AlterarTelefoneOngService(req.usuario.id_ong, req.body.telefone);

        return resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarSite', validarTokenOng, async (req, resp) => {
    try {
        const id = req.usuario.id_ong;
        const { site } = req.body;

        const resposta = await AlterarSiteOngService(id, site);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/ong/alterarDesc', validarTokenOng, async (req, resp) => {
    try {
        const id = req.usuario.id_ong;
        const { descricao } = req.body;

        const resposta = await AlterarDescOngService(id, descricao);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

export default endpoints;