import {Router} from 'express';
const endpoints = Router();
import * as DBUsuario from '../repository/UsuarioRepository.js';

endpoints.get('/usuarios' , async (req,resp) => {

    let resposta = await DBUsuario.ListarUsuarios()

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/usuario/:id' , async (req,resp) => {

    let id = req.params.id;

    let resposta = await DBUsuario.ListarUsuario(id)

    resp.send({
        resposta: resposta
    })
})

export default endpoints