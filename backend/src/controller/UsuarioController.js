import { Router } from 'express';
const endpoints = Router();

import { gerarToken } from '../utils/TokenEvalidacao.js';
import { validarToken } from '../utils/TokenEvalidacao.js';

import multer from 'multer';
const uploadUsuario = multer({ dest: 'src/uploads/ImagemUsuarios' });

import { ListarUsuariosService } from '../service/usuario/ListarUsuariosService.js';
import { ListarUsuarioService } from '../service/usuario/ListarUsuarioService.js';
import { CriarUsuarioService } from '../service/usuario/CriarUsuarioService.js';
import { LoginUsuarioService } from '../service/usuario/LoginUsuarioService.js';
import { ImagemUsuarioService } from '../service/usuario/ImagemUsuarioService.js';
import { ExcluirUsuarioService } from '../service/usuario/ExcluirUsuarioService.js';
import { AlterarSenhaUsuarioService } from '../service/usuario/AlterarSenhaUsuarioService.js';
import { AlterarTelefoneUsuarioService } from '../service/usuario/AlterarTelefoneUsuarioService.js';
import { AlterarEmailUsuarioService } from '../service/usuario/AlterarEmailUsuarioService.js';

endpoints.get('/usuarios', async (req, resp) => {

    let resposta = await ListarUsuariosService();

    resp.send({
        resposta: resposta
    })
})

endpoints.get('/usuario/nome/:nome', async (req, resp) => {
    try {
        let nome = req.params.nome;

        let resposta = await ListarUsuarioService(nome)


        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/usuario/cadastrar', async (req, resp) => {
    try {
        let usuario = req.body;



        let resposta = await CriarUsuarioService(usuario);

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.post('/usuario/login', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        const usuario = await LoginUsuarioService(email, senha)


        const token = gerarToken({
            id_usuario: usuario.id_usuario
        });

        resp.send({ token });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }

})

endpoints.put('/usuario/imagem', validarToken, uploadUsuario.single('imagem'), async (req, resp) => {
    try {


        const imagem = await ImagemUsuarioService(req.usuario.id_usuario, req.file);

        resp.send({ imagem });
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.delete('/usuario/excluir', validarToken, async (req, resp) => {
    try {
        const idUsuario = req.usuario.id_usuario;


        const resposta = await ExcluirUsuarioService(idUsuario);

        resp.send({
            resposta: resposta
        });
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarSenha', validarToken, async (req, resp) => {
    try {
        const { senha } = req.body;
        const idUsuario = req.usuario.id_usuario;


        const resposta = await AlterarSenhaUsuarioService(senha, idUsuario);

        resp.send({
            resposta: resposta
        });

    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});
endpoints.put('/usuario/alterarTelefone', validarToken, async (req, resp) => {
    try {
        const { telefone } = req.body;
        const idUsuario = req.usuario.id_usuario;


        const resposta = await AlterarTelefoneUsuarioService(telefone, idUsuario);

        resp.send({
            resposta: resposta
        });

    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarEmail', validarToken, async (req, resp) => {
    try {
        const { email } = req.body;
        const idUsuario = req.usuario.id_usuario;


        const resposta = await AlterarEmailUsuarioService(email, idUsuario);

        resp.send({
            resposta: resposta
        });


    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
}
)



export default endpoints
