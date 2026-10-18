import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { ExcluirAdocaoErrors } from '../../validation/adocoesValidation.js';

export async function ExcluirAdocaoService(idUsuario, idAdocao) {
    ExcluirAdocaoErrors(idUsuario, idAdocao);

    const resposta = await dbAdocoes.excluirAdocao(idUsuario, idAdocao);
    return resposta;
}
