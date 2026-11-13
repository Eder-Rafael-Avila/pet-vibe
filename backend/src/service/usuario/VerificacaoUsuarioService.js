import { GerarCodigo } from '../../utils/GerarCódigo.js';
import { EnviarEmail } from '../../utils/VerificacaoEmail.js';
import { gerarTokenValidacaoUsuario } from '../../utils/TokenEvalidacao.js';
import { BuscarEmailPorIdService } from './BuscarEmailPorIdService.js';
import * as DBCodigo from '../../repository/CodigoVerificacaoRepository.js';
import { CodigoVerificacaoUsuarioErrors } from '../../validation/codigoVerificacaoValidation.js';

export async function EnviarCodigoVerificacaoUsuarioService(idUsuario) {
    const codigo = GerarCodigo();
    const email = await BuscarEmailPorIdService(idUsuario);

    await EnviarEmail(email, codigo);
    DBCodigo.SalvarCodigoUsuario(idUsuario, codigo);
}

export function LiberarPermissaoUsuarioService(idUsuario, codigo) {
    const verificacao = DBCodigo.BuscarCodigoUsuario(idUsuario);

    CodigoVerificacaoUsuarioErrors(codigo, verificacao);
    DBCodigo.ExcluirCodigoUsuario(idUsuario);

    return gerarTokenValidacaoUsuario(idUsuario);
}
