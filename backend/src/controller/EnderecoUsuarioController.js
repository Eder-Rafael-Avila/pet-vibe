import { Router } from 'express';
import * as DBEndereco from '../repository/EnderecoUsuarioRepository.js';
import { validarToken } from '../utils/TokenUsuario.js';

const endpoints = Router();

endpoints.post('/endereco-usuario', validarToken, async (req, resp) => {
    const idEndereco = await DBEndereco.CriarEndereco(
        req.usuario.id_usuario,
        req.body
    );

    resp.status(201).send({
        id_endereco_usuario: idEndereco
    });
});

export default endpoints;