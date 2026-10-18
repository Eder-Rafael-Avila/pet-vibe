import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { ReprovarAdocaoErrors } from '../../validation/adocoesValidation.js';

export async function ReprovarAdocaoService(idOng, idAdocao) {
    ReprovarAdocaoErrors(idOng, idAdocao);

    const resposta = await dbAdocoes.reprovarAdocao(idOng, idAdocao);
    return resposta;
}
