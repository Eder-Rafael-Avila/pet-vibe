import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { CriarUsuarioErrors } from '../../validation/usuarioValidation.js';
import { validarIdade } from '../../utils/validarIdade.js';
import { gerarHash } from '../../utils/hash.js';
import { EnviarCodigoCadastroUsuarioService } from './CadastroUsuarioService.js';
import { verificarTokenCadastroUsuario } from '../../utils/TokenEvalidacao.js';
import { CadastroPermitidoErrors } from '../../validation/cadastroUsuarioValidation.js';

export async function CriarUsuarioService(usuario, cadastroPermitido) {
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

    if (!cadastroPermitido) {
        await EnviarCodigoCadastroUsuarioService(usuario.email);
        return 'Foi enviado um código ao seu e-mail. Verifique o código para concluir o cadastro.';
    }

    const permissao = verificarTokenCadastroUsuario(cadastroPermitido);
    CadastroPermitidoErrors(permissao, usuario.email);

    let senha = await gerarHash(usuario.senha)

    let resposta = await DBUsuario.CriarUsuario(usuario,senha)
    return resposta

}


