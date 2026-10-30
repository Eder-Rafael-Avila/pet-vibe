import { Router } from 'express';
const endpoints = Router();

import { gerarTokenValidacaoUsuario } from '../utils/TokenEvalidacao.js';
import { validarTokenValidacaoUsuario } from '../utils/TokenEvalidacao.js';
import { EnviarEmail } from '../utils/VerificacaoEmail.js';
import { gerarToken } from '../utils/TokenEvalidacao.js';
import { validarToken } from '../utils/TokenEvalidacao.js';
import { GerarCodigo } from '../utils/GerarCódigo.js'
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
import { ListarImagemENome } from '../service/usuario/ListarImagemENomeService.js';
import { ListarTudoUsuarioService } from '../service/usuario/ListarTudoService.js';
import { BuscarEmailPorIdService } from '../service/usuario/BuscarEmailPorIdService.js';
import { ListarCampanhasService } from '../service/usuario/ListarCampanhasService.js';

let codigoCriado = ""

async function enviarCodigoDeVerificacao(idUsuario) {
    codigoCriado = await GerarCodigo();
    const email = await BuscarEmailPorIdService(idUsuario);
    await EnviarEmail(email, codigoCriado);
}

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
        console.log(resposta);

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
        let resposta = ""
        const idUsuario = req.usuario.id_usuario;
        const token = req.headers.tokenpermitido;
        if(!token){
            await enviarCodigoDeVerificacao(idUsuario);
            resp.status(202).send({
                resposta:"Foi enviado um email com o código de verificação a sua caixa de notificações"
            })
        }
        else{
            resposta = await ExcluirUsuarioService(idUsuario)
                    resp.send({
            resposta: resposta
        });
        }
         
    }
    catch (err) {
        logError(err);
        return resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarSenha', validarToken, async (req, resp) => {
  try {
    let resposta = "";
        const { senha } = req.body;
    const idUsuario = req.usuario.id_usuario;
            const token = req.headers.tokenpermitido;
    if (!token) {
      await enviarCodigoDeVerificacao(idUsuario);
      resp.status(202).send({
          resposta:"Foi enviado um email com o código de verificação a sua caixa de notificações"
      })
    }
    else {
      resposta = await AlterarSenhaUsuarioService(senha, idUsuario);
      resp.send({
        resposta:resposta
      })
    }


    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});
endpoints.put('/usuario/alterarTelefone', validarTokenValidacaoUsuario, async (req, resp) => {
  try {
    let resposta = "";
        const { telefone } = req.body;
    const idUsuario = req.usuario.id_usuario;
    const token = req.headers.tokenpermitido;
    if (!token) {
      await enviarCodigoDeVerificacao(idUsuario);
      resp.status(202).send({
          resposta:"Foi enviado um email com o código de verificação a sua caixa de notificações"
      })
    }
    else {
      resposta = await AlterarTelefoneUsuarioService(telefone, idUsuario);
      resp.send({
        resposta:resposta
      })
    }
    

    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
});

endpoints.put('/usuario/alterarEmail', validarTokenValidacaoUsuario, async (req, resp) => {
  try {
    let resposta = "";
        const { email } = req.body;
    const idUsuario = req.usuario.id_usuario;
    const token = req.headers.tokenpermitido;
    if (!token) {
      await enviarCodigoDeVerificacao(idUsuario);
      resp.status(202).send({
          resposta:"Foi enviado um email com o código de verificação a sua caixa de notificações"
      })
    }
    else {
      resposta = await AlterarEmailUsuarioService(email, idUsuario);
      resp.send({
        resposta:resposta
      })
    }


    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
}
)

endpoints.get('/usuario/listarNomeeIMG', validarToken, async (req,resp) => {
    try{
        const id = req.usuario.id_usuario;

        const resposta = await ListarImagemENome(id)
        resp.send({
            resposta: resposta
        })
    }
    catch(err){
                logError(err);
        resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/usuario/listarTudo', validarToken, async (req, resp) => {
  try {
    let id = req.usuario.id_usuario

    const resposta = await ListarTudoUsuarioService(id);

    resp.send({
      resposta: resposta
    });
  }
  catch (err) {
    logError(err);
    resp.status(400).send(erroJson(err));
  }
}) 

endpoints.get('/usuario/liberarPermissao', validarToken, async (req,resp) =>{

    try{
        let codigoEnviado = req.body.codigo;

        if(codigoEnviado == codigoCriado){
        resp.send({
            token: gerarTokenValidacaoUsuario(req.usuario.id_usuario)
        })
        }

        else{
        resp.send({
            resposta: "Código Incorreto"
        })
        }


    }
    catch(err){
            logError(err);
    resp.status(400).send(erroJson(err));
    }
})

endpoints.get('/usuario/listarcampanhas', validarToken, async (req, resp) => {
  try {

    let resposta = await ListarCampanhasService();

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
