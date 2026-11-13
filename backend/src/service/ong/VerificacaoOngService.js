import { GerarCodigoOng } from '../../utils/GerarCódigo.js';
import { EnviarEmailOng } from '../../utils/VerificacaoEmail.js';
import { gerarTokenValidacaoOng } from '../../utils/TokenEvalidacao.js';
import { BuscarEmailPorIdOngService } from './BuscarEmailPorIdOngService.js';
import * as DBCodigo from '../../repository/CodigoVerificacaoRepository.js';
import { CodigoVerificacaoOngErrors } from '../../validation/codigoVerificacaoValidation.js';

export async function EnviarCodigoVerificacaoOngService(idOng) {
    const codigo = GerarCodigoOng();
    const email = await BuscarEmailPorIdOngService(idOng);

    await EnviarEmailOng(email, codigo);
    DBCodigo.SalvarCodigoOng(idOng, codigo);
}

export function LiberarPermissaoOngService(idOng, codigo) {
    const verificacao = DBCodigo.BuscarCodigoOng(idOng);

    CodigoVerificacaoOngErrors(codigo, verificacao);
    DBCodigo.ExcluirCodigoOng(idOng);

    return gerarTokenValidacaoOng(idOng);
}
