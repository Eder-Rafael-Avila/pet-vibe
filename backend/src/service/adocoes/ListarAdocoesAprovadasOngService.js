import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { ListarAdocoesAprovadasOngErrors } from '../../validation/adocoesValidation.js';

export async function ListarAdocoesAprovadasOngService(idOng) {
    ListarAdocoesAprovadasOngErrors(idOng);

    const resposta = await dbAdocoes.listarAdocoesAprovadasOng(idOng);
    return resposta;
}
