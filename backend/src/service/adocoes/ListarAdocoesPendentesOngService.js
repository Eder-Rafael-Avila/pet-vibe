import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { ListarAdocoesPendentesOngErrors } from '../../validation/adocoesValidation.js';

export async function ListarAdocoesPendentesOngService(idOng) {
    ListarAdocoesPendentesOngErrors(idOng);

    const resposta = await dbAdocoes.listarAdocoesPendentesOng(idOng);
    return resposta;
}
