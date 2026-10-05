import { Router } from 'express';
const endpoints = Router();



const uploadOng = multer({ dest: 'src/uploads/ImagemOngs' });
import multer from 'multer';

import { gerarTokenOng, validarTokenOng } from '../utils/TokenUsuario.js';

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

endpoints.get('/ongs/nome/:nome', async (req, resp) => {
    try {
        const nome = req.params.nome;

        const resposta = await ListarOngService(nome)

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
        let id = req.usuario.id_ong
        const { senha } = req.body;

        let resposta = await AlterarSenhaOngService(id, senha)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.put('/ong/alterarSite', validarTokenOng, async (req, resp) => {
    try {
        let id = req.usuario.id_ong
        const { site } = req.body;

        let resposta = await AlterarSiteOngService(id,site);

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

        let resposta = await AlterarDescOngService(id,descricao);

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
