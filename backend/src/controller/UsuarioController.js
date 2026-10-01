import {Router} from 'express';
const endpoints = Router();
import * as DBUsuario from '../repository/UsuarioRepository.js';
import { gerarToken } from '../utils/TokenUsuario.js';

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

endpoints.post('/usuario/cadastrar' , async (req,resp) => {
    let usuario = req.body;

    let resposta = await DBUsuario.CriarUsuario(usuario)

    resp.send({
        resposta: resposta
    })
})

endpoints.post('/usuario/login' , async (req,resp) => {
        const {email, senha } = req.body;

const usuario = await DBUsuario.BuscarPorEmail(email);

if (!usuario || usuario.senha !== senha) {
    return resp.status(401).send({ erro: 'E-mail ou senha inválidos' });
}

const token = gerarToken({
    id_usuario: usuario.id_usuario
});

resp.send({ token });

})

export default endpoints