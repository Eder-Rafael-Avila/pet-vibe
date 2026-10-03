import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { AlterarTelefoneUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function AlterarTelefoneUsuarioService(telefone, idUsuario){
    AlterarTelefoneUsuarioErrors(telefone);

    const resposta = await DBUsuario.AlterarTelefone(telefone, idUsuario);
    return resposta;
}
