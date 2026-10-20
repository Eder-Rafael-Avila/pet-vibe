import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { CriarUsuarioErrors } from '../../validation/usuarioValidation.js';
import { validarIdade } from '../../utils/validarIdade.js';

export async function CriarUsuarioService(usuario) {

    let emailExiste = await DBUsuario.BuscarPorEmail(usuario.email);

    if (emailExiste) {
        throw new Error('Este e-mail já foi cadastrado.');
    }

    let telefoneExiste = await DBUsuario.BuscarPorTelefone(usuario.telefone);

    if (telefoneExiste) {
        throw new Error('Este telefone já foi cadastrado.');
    }

    const maioridade = validarIdade(usuario.data_nascimento);

    if (!maioridade) {
        throw new Error('Você deve ter mais de 18 anos.');
    }

    CriarUsuarioErrors(usuario);

    let resposta = await DBUsuario.CriarUsuario(usuario)
    return resposta

}


