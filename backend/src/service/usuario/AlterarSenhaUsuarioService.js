import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { AlterarSenhaUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function AlterarSenhaUsuarioService(usuarioSenha, idUsuario){
    AlterarSenhaUsuarioErrors(usuarioSenha);

    const resposta = await DBUsuario.AlterarSenha(usuarioSenha, idUsuario);
    return resposta;
}