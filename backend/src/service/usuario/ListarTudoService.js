import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { ListarTudoErrors } from '../../validation/usuarioValidation.js';

export async function ListarTudoUsuarioService(id) {
  ListarTudoErrors(id);
  let resposta = await DBUsuario.ListarTudoUsuario(id)
  return resposta;
}