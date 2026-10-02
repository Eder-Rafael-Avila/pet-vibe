import * as DBUsuario from '../repository/UsuarioRepository.js';

export async function ListarUsuarioService(id){
    let resposta = await DBUsuario.ListarUsuario(id)
    return resposta;
}

export async function CriarUsuarioService(usuario){
    let resposta = await DBUsuario.CriarUsuario(usuario)
    return resposta

}