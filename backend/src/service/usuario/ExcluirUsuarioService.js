import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { ExcluirUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function ExcluirUsuarioService(idUsuario) {
    ExcluirUsuarioErrors(idUsuario);

    const resposta = await DBUsuario.ExcluirUsuario(idUsuario);
    return resposta;
}