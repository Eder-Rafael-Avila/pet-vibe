import { GerarCodigoCadastroUsuario } from '../../utils/GerarCódigo.js';
import { EnviarEmailCadastro } from '../../utils/VerificacaoEmail.js';
import { gerarTokenCadastroUsuario } from '../../utils/TokenEvalidacao.js';
import * as DBCodigo from '../../repository/CodigoVerificacaoRepository.js';
import { VerificarCadastroUsuarioErrors } from '../../validation/cadastroUsuarioValidation.js';
import { CodigoVerificacaoCadastroUsuarioErrors } from '../../validation/codigoVerificacaoValidation.js';

export async function EnviarCodigoCadastroUsuarioService(email) {
    const codigo = GerarCodigoCadastroUsuario();

    await EnviarEmailCadastro(email, codigo);
    DBCodigo.SalvarCodigoCadastroUsuario(email, codigo);
}

export function VerificarCadastroUsuarioService(email, codigo) {
    VerificarCadastroUsuarioErrors(email, codigo);

    const verificacao = DBCodigo.BuscarCodigoCadastroUsuario(email);
    CodigoVerificacaoCadastroUsuarioErrors(codigo, verificacao);

    const token = gerarTokenCadastroUsuario(email);
    DBCodigo.ExcluirCodigoCadastroUsuario(email);

    return token;
}
