import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { CriarUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function CriarUsuarioService(usuario) {

    let emailExiste = await DBUsuario.BuscarPorEmail(usuario.email);

    if (emailExiste) {
        throw new Error('Este e-mail já foi cadastrado');
    }

    let telefoneExiste = await DBUsuario.BuscarPorTelefone(usuario.telefone);

    if (telefoneExiste) {
        throw new Error('Este telefone já foi cadastrado');
    }

    CriarUsuarioErrors(usuario);

    let resposta = await DBUsuario.CriarUsuario(usuario)
    return resposta

}


