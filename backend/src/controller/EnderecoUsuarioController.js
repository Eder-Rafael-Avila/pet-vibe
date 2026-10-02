import { Router } from 'express';
import { validarToken } from '../utils/TokenUsuario.js';
const endpoints = Router();
import {
CriarEnderecoService,
ExcluirEnderecoService
} from '../service/EnderecoUsuarioService.js';
import { ExcluirUsuarioService } from '../service/UsuarioService.js';

endpoints.post('/endereco-usuario/criar', validarToken, async (req, resp) => {
    try{
    const id = req.usuario.id_usuario;
    let endereco = req.body

    const idEndereco = await CriarEnderecoService(id,endereco);

    resp.send({
        id_endereco_usuario: idEndereco
    });
}
catch(err){

}
});

endpoints.delete('/endereco-usuario/excluir', validarToken, async (req, resp) => {
    try {
        const id_token = req.usuario.id_usuario;

        const resposta = await ExcluirUsuarioService(id_token)

        resp.send({
            resposta: resposta
        })
    }
    catch (err) {
        logError(err);
        resp.status(400).send(erroJson(err));
    }
})


export default endpoints;