import {Router} from 'express';
const endpoints = Router();
import {BuscarAnimaisService} from '../service/busca/BuscarAnimaisService.js'

endpoints.get ('/animais/buscar' , async  (req , resp) => {
    try{
        const filtros = req.query

        const resposta = await BuscarAnimaisService(filtros)

        resp.status(200).send({
            quantidade: resposta.length,
            resposta: resposta
        })



    }

    catch (err){
        logError(err)
        resp.status(400).send (erroJson(err))
    }
})

export default endpoints
