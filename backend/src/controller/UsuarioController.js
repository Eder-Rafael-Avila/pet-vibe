import { Router } from 'express';
import multer from 'multer';

import { gerarToken, gerarTokenOng, validarToken, validarTokenValidacaoUsuario } from '../utils/TokenEvalidacao.js';

import { ListarUsuariosService } from '../service/usuario/ListarUsuariosService.js';
import { ListarUsuarioService } from '../service/usuario/ListarUsuarioService.js';
import { CriarUsuarioService } from '../service/usuario/CriarUsuarioService.js';
import { VerificarCadastroUsuarioService } from '../service/usuario/CadastroUsuarioService.js';
import { LoginUsuarioService } from '../service/usuario/LoginUsuarioService.js';
import { ImagemUsuarioService } from '../service/usuario/ImagemUsuarioService.js';
import { ExcluirUsuarioService } from '../service/usuario/ExcluirUsuarioService.js';
import { AlterarSenhaUsuarioService } from '../service/usuario/AlterarSenhaUsuarioService.js';
import { AlterarTelefoneUsuarioService } from '../service/usuario/AlterarTelefoneUsuarioService.js';
import { AlterarEmailUsuarioService } from '../service/usuario/AlterarEmailUsuarioService.js';
import { ListarImagemENome } from '../service/usuario/ListarImagemENomeService.js';
import { ListarTudoUsuarioService } from '../service/usuario/ListarTudoService.js';
import { EnviarCodigoVerificacaoUsuarioService, LiberarPermissaoUsuarioService } from '../service/usuario/VerificacaoUsuarioService.js';

const endpoints = Router();
const uploadUsuario = multer({ dest: 'src/uploads/ImagemUsuarios' });

endpoints.get('/usuarios', async (req, resp) => {
    try {
        const resposta = await ListarUsuariosService();

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/usuario/nome/:nome', async (req, resp) => {
    try {
        const nome = req.params.nome;
        const resposta = await ListarUsuarioService(nome);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.post('/usuario/cadastrar', async (req, resp) => {
    try {
        const usuario = req.body;
        const cadastroPermitido = req.headers.cadastropermitido;
        const resposta = await CriarUsuarioService(usuario, cadastroPermitido);

        resp.status(cadastroPermitido ? 200 : 202).send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.post('/verificar/cadastro', async (req, resp) => {
    try {
        const { email, codigo } = req.body || {};
        const token = VerificarCadastroUsuarioService(email, codigo);

        resp.send({ token });
    } catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.post('/usuario/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const conta = await LoginUsuarioService(email, senha);

        const token = conta.tipo === 'ONG'
            ? gerarTokenOng({ id_ong: conta.id_ong })
            : gerarToken({ id_usuario: conta.id_usuario });

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/imagem', validarToken, uploadUsuario.single('imagem'), async (req, resp) => {
    try {
        const imagem = await ImagemUsuarioService(req.usuario.id_usuario, req.file);

        resp.send({ imagem });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/usuario/excluir', validarToken, validarTokenValidacaoUsuario, async (req, resp) => {
    try {
        const idUsuario = req.usuario.id_usuario;
        const token = req.headers.tokenpermitido;

        if (!token) {
            await EnviarCodigoVerificacaoUsuarioService(idUsuario);
            return resp.status(202).send({
                resposta: 'Foi enviado um email com o código de verificação a sua caixa de notificações'
            });
        }

        const resposta = await ExcluirUsuarioService(idUsuario);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarSenha', validarToken, validarTokenValidacaoUsuario, async (req, resp) => {
    try {
        const { senha } = req.body;
        const idUsuario = req.usuario.id_usuario;
        const token = req.headers.tokenpermitido;

        if (!token) {
            await EnviarCodigoVerificacaoUsuarioService(idUsuario);
            return resp.status(202).send({
                resposta: 'Foi enviado um email com o código de verificação a sua caixa de notificações'
            });
        }

        const resposta = await AlterarSenhaUsuarioService(senha, idUsuario);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarTelefone', validarToken, validarTokenValidacaoUsuario, async (req, resp) => {
    try {
        const { telefone } = req.body;
        const idUsuario = req.usuario.id_usuario;
        const token = req.headers.tokenpermitido;

        if (!token) {
            await EnviarCodigoVerificacaoUsuarioService(idUsuario);
            return resp.status(202).send({
                resposta: 'Foi enviado um email com o código de verificação a sua caixa de notificações'
            });
        }

        const resposta = await AlterarTelefoneUsuarioService(telefone, idUsuario);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarEmail', validarToken, validarTokenValidacaoUsuario, async (req, resp) => {
    try {
        const { email } = req.body;
        const idUsuario = req.usuario.id_usuario;
        const token = req.headers.tokenpermitido;

        if (!token) {
            await EnviarCodigoVerificacaoUsuarioService(idUsuario);
            return resp.status(202).send({
                resposta: 'Foi enviado um email com o código de verificação a sua caixa de notificações'
            });
        }

        const resposta = await AlterarEmailUsuarioService(email, idUsuario);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/usuario/listarNomeeIMG', validarToken, async (req, resp) => {
    try {
        const id = req.usuario.id_usuario;
        const resposta = await ListarImagemENome(id);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/usuario/listarTudo', validarToken, async (req, resp) => {
    try {
        const id = req.usuario.id_usuario;
        const resposta = await ListarTudoUsuarioService(id);

        resp.send({ resposta });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.get('/usuario/liberarPermissao', validarToken, async (req, resp) => {
    try {
        const idUsuario = req.usuario.id_usuario;
        const codigo = req.query.codigo ?? req.body?.codigo;
        const token = await LiberarPermissaoUsuarioService(idUsuario, codigo);

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

export default endpoints;
