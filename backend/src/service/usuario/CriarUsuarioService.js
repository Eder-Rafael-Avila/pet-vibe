import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { CriarUsuarioErrors } from '../../validation/usuarioValidation.js';
import { validarIdade } from '../../utils/validarIdade.js';
import { gerarHash } from '../../utils/hash.js';

export async function CriarUsuarioService(usuario) {
    CriarUsuarioErrors(usuario);
  
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

  let senha = await gerarHash(usuario.senha)

    let resposta = await DBUsuario.CriarUsuario(usuario,senha)
    return resposta

}


