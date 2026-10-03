import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { CriarUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function CriarUsuarioService(usuario) {
    CriarUsuarioErrors(usuario);

    let resposta = await DBUsuario.CriarUsuario(usuario)
    return resposta

}


