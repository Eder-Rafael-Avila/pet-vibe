import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { ListarUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function ListarUsuarioService(id) {
    ListarUsuarioErrors(id);

    let resposta = await DBUsuario.ListarUsuario(id)
    return resposta;
}