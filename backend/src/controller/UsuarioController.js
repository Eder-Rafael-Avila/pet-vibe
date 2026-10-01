import {Router} from 'express';
const endpoints = Router();
import * as DBUsuario from '../repository/UsuarioRepository.js';
import { gerarToken } from '../utils/TokenUsuario.js';
import multer from 'multer';
import { validarToken } from '../utils/TokenUsuario.js';
const uploadUsuario = multer({ dest: 'src/uploads/ImagemUsuarios' });

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

endpoints.put('/usuario/imagem',validarToken,uploadUsuario.single('imagem'),async (req, resp) => {
        if (!req.file) {
            return resp.status(400).send({
                erro: 'Imagem não enviada'
            });
        }

        const imagem = `/uploads/ImagemUsuarios/${req.file.filename}`;

        await DBUsuario.AlterarImagem(
            req.usuario.id_usuario,
            imagem
        );

        resp.send({ imagem });

    });




export default endpoints