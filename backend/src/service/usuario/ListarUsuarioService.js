import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { ListarUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function ListarUsuarioService(nome) {
    ListarUsuarioErrors(nome);

    let resposta = await DBUsuario.ListarUsuario(nome)
    return resposta;
}
