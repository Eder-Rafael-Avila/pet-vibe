import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { AlterarSenhaUsuarioErrors } from '../../validation/usuarioValidation.js';
import { gerarHash } from '../../utils/hash.js';

export async function AlterarSenhaUsuarioService(usuarioSenha, idUsuario) {
  AlterarSenhaUsuarioErrors(usuarioSenha);
  let hashSenha = await gerarHash(usuarioSenha)
    const resposta = await DBUsuario.AlterarSenha(hashSenha, idUsuario);
    return resposta;
}