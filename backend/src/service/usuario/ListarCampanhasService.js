import * as DBUsuario from '../../repository/UsuarioRepository.js';

export async function ListarCampanhasService() {
  let resposta = await DBUsuario.ListarCampanhas()
  return resposta;
}