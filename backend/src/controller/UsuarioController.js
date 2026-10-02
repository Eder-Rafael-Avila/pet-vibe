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
    LoginUsuarioErrors
} from '../validation/usuarioValidation.js';

import {
    ListarUsuarioService,
    CriarUsuarioService
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

        const usuario = await DBUsuario.BuscarPorEmail(email);

        LoginUsuarioErrors(email,senha,usuario);

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
    if (!req.file) {
        return resp.status(400).send({
            erro: 'Imagem não enviada'
        });
    }

    const imagem = `/uploads/ImagemUsuarios/${req.file.filename}`;

    await DBUsuario.AlterarImagem(
        req.usuario.id_usuario,
        imagem
    );

    resp.send({ imagem });

});

endpoints.delete('/usuarios/excluir', validarToken, async (req, resp) => {
    const idUsuario = req.usuario.id_usuario;

    const linhasAfetadas = await DBUsuario.ExcluirUsuario(idUsuario);

    if (linhasAfetadas === 0) {
        return resp.status(404).send({ erro: 'Usuário não encontrado' });
    }

    resp.status(204).send();
});




export default endpoints
