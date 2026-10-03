import { Router } from 'express';
import { validarToken } from '../utils/TokenUsuario.js';
import { CriarEnderecoService } from '../service/endereco_usuario/CriarEnderecoService.js';
import { ExcluirEnderecoService } from '../service/endereco_usuario/ExcluirEnderecoService.js';
const endpoints = Router();

endpoints.post('/endereco-usuario/criar', validarToken, async (req, resp) => {
    try {
        const id = req.usuario.id_usuario;
        const endereco = req.body;

        const idEndereco = await CriarEnderecoService(id, endereco);

        resp.send({
            id_endereco_usuario: idEndereco
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/endereco-usuario/excluir', validarToken, async (req, resp) => {
    try {
        const id_token = req.usuario.id_usuario;

        const resposta = await ExcluirEnderecoService(id_token);

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})


export default endpoints;
