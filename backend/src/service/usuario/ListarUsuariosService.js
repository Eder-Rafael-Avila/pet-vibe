import * as DBUsuario from '../../repository/UsuarioRepository.js';

export async function ListarUsuariosService() {
    let resposta = await DBUsuario.ListarUsuarios()
    return resposta;
}