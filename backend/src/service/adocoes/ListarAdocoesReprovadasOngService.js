import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { ListarAdocoesReprovadasOngErrors } from '../../validation/adocoesValidation.js';

export async function ListarAdocoesReprovadasOngService(idOng) {
    ListarAdocoesReprovadasOngErrors(idOng);

    const resposta = await dbAdocoes.listarAdocoesReprovadasOng(idOng);
    return resposta;
}
