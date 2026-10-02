import { Router } from 'express';
const endpoints = Router();

import * as DBUsuario from '../repository/UsuarioRepository.js';
import { gerarToken } from '../utils/TokenUsuario.js';
import { validarToken } from '../utils/TokenUsuario.js';

import multer from 'multer';
const uploadUsuario = multer({ dest: 'src/uploads/ImagemUsuarios' });

import {
    ListarUsuarioErrors,
    CriarUsuarioErrors,
    LoginUsuarioErrors,
    ImagemUsuarioErrors,
    ExcluirUsuarioErrors
} from '../validation/usuarioValidation.js';

import {
    ListarUsuarioService,
    CriarUsuarioService,
    LoginUsuarioService,
    ImagemUsuarioService,
    ExcluirUsuarioService
} from '../service/UsuarioService.js';

endpoints.get('/usuarios', async (req, resp) => {

    let resposta = await DBUsuario.ListarUsuarios()

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/usuario/:id', async (req, resp) => {
    try {

        let id = req.params.id;

        ListarUsuarioErrors(id)

        let resposta = await ListarUsuarioService(id)


        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/usuario/cadastrar', async (req, resp) => {
    try {
        let usuario = req.body;

        CriarUsuarioErrors(usuario);


        let resposta = await CriarUsuarioService(usuario);

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/usuario/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        const usuario = await LoginUsuarioService(email)

        LoginUsuarioErrors(email, senha, usuario);

        const token = gerarToken({
            id_usuario: usuario.id_usuario
        });

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }

})

endpoints.put('/usuario/imagem', validarToken, uploadUsuario.single('imagem'), async (req, resp) => {
    try {

        ImagemUsuarioErrors(req.file);

        const imagem = await ImagemUsuarioService(req.usuario.id_usuario,req.file);

        resp.send({ imagem });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/usuario/excluir', validarToken, async (req, resp) => {
    try {
        const idUsuario = req.usuario.id_usuario;

        ExcluirUsuarioErrors(idUsuario);

        const resposta = await ExcluirUsuarioService(idUsuario);

        resp.send({
            resposta: resposta
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});




export default endpoints
