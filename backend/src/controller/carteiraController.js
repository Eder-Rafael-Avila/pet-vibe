import { Router } from "express";
const endpoints = Router();
import { validarToken } from "../utils/TokenEvalidacao.js";
import { AddFundos } from "../service/Carteira/CarteiraAddFundos.js";
import { ListarFundos } from "../service/Carteira/CarteiraListarFundos.js";

endpoints.post('/carteira/addFundos', validarToken, async (req, resp)=> {
  try {
    const token = req.usuario.id_usuario;
    const qtd = req.body.qtd;
    let resposta = await AddFundos(qtd, token)

    resp.send({
      resposta: resposta
    })
    
  }
  catch (err) {
    logError(err)
    resp.status(400).send (erroJson(err))
  }
})

endpoints.get('/carteira/listarFundos', validarToken, async (req, resp) => {
  try {
    let id = req.usuario.id_usuario;

    let resposta = await ListarFundos(id);

    resp.send({
      resposta: resposta
    })
  }
  catch (err) {
    logError(err)
    resp.status(400).send (erroJson(err))
  }
})

export default endpoints;
