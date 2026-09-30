import {Router} from 'express';
const endpoints = Router();
import * as DBOngs from '../repository/OngRepository.js';

endpoints.get('/ongs' , async (req,resp) => {

    let resposta = await DBOngs.ListarOngs()

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/ong/:id' , async (req,resp) => {

    let id = req.params.id;

    let resposta = await DBOngs.ListarOng(id)

    resp.send({
        resposta: resposta
    })
})

endpoints.post('/ong/criar' , async (req,resp) => {
    let ong = req.body;

    let resposta = await DBOngs.CriarOrg(ong)

    resp.send({
        resposta: resposta
    })
})

export default endpoints