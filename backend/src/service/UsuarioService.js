import * as DBUsuario from '../repository/UsuarioRepository.js';

export async function ListarUsuarioService(id) {
    let resposta = await DBUsuario.ListarUsuario(id)
    return resposta;
}

export async function CriarUsuarioService(usuario) {
    let resposta = await DBUsuario.CriarUsuario(usuario)
    return resposta

}

export async function LoginUsuarioService(email) {
    const usuario = await DBUsuario.BuscarPorEmail(email);
    return usuario;
}

export async function ImagemUsuarioService(idUsuario, file) {
    const imagem = `/uploads/ImagemUsuarios/${file.filename}`;

    await DBUsuario.AlterarImagem(idUsuario, imagem);

    return imagem;
}

export async function ExcluirUsuarioService(idUsuario) {
    const resposta = await DBUsuario.ExcluirUsuario(idUsuario);
    return resposta;
}

export async function AlterarSenhaUsuarioService(usuarioSenha, idUsuario){
    const resposta = await DBUsuario.AlterarSenha(usuarioSenha, idUsuario);
    return resposta;
}
export async function AlterarTelefoneUsuarioService(telefone, idUsuario){
    const resposta = await DBUsuario.AlterarTelefone(telefone, idUsuario);
    return resposta;
}

export async function AlterarEmailUsuarioService(email, idUsuario){
    const resposta = await DBUsuario.AlterarEmail(email, idUsuario);
    return resposta;
}

