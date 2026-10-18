import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { AprovarAdocaoErrors } from '../../validation/adocoesValidation.js';

export async function AprovarAdocaoService(idOng, idAdocao) {
    AprovarAdocaoErrors(idOng, idAdocao);

    const resposta = await dbAdocoes.aprovarAdocao(idOng, idAdocao);
    return resposta;
}
