import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { AlterarEmailUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function AlterarEmailUsuarioService(email, idUsuario) {

    AlterarEmailUsuarioErrors(email);
    const resposta = await DBUsuario.AlterarEmail(email, idUsuario);
    return resposta;
}