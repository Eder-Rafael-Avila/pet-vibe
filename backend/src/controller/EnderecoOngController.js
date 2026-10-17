import { Router } from "express";
import { validarTokenOng } from "../utils/TokenEvalidacao.js";
const endpoints = Router();
import { CriarEnderecoOngService } from "../service/endereco_ong/CriarEnderecoOngService.js";
import { ExcluirEnderecoOngService } from "../service/endereco_ong/ExcluirEnderecoOngService.js";

endpoints.post('/endereco-ong/criar', validarTokenOng, async (req, resp) => {
    try {
        const id = req.usuario.id_ong;
        const endereco = req.body;

        const idEndereco = await CriarEnderecoOngService(id,endereco)
        resp.send({
            id_endereco_usuario: idEndereco
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/endereco-ong/excluir', validarTokenOng , async (req, resp) => {
    try {
        const id_token = req.usuario.id_ong;

        const resposta = await ExcluirEnderecoOngService(id_token)

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