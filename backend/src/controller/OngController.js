import { Router } from 'express';
const endpoints = Router();

import * as DBOngs from '../repository/OngRepository.js';

const uploadOng = multer({ dest: 'src/uploads/ImagemOngs' });
import multer from 'multer';

import { gerarTokenOng, validarTokenOng } from '../utils/TokenUsuario.js';

import {ImagemOngService} from '../service/ong/ImagemOngService.js';
import { LoginOngService } from '../service/ong/LoginOngService.js';
import { CriarOngService } from '../service/ong/CriarOngService.js';

endpoints.get('/ongs', async (req, resp) => {
    try {

        let resposta = await DBOngs.ListarOngs()

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/ong/:id', async (req, resp) => {
    try {

        let id = req.params.id;

        let resposta = await DBOngs.ListarOng(id)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

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

endpoints.put('/ong/imagem', validarTokenOng, uploadOng.single('imagem') , async (req,resp) => {
    try{
 const imagem = await ImagemOngService(req.usuario.id_ong , req.file)

         resp.send({ imagem });
    }
    catch(err){
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

export default endpoints
