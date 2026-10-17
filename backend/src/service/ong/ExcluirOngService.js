import * as DBOng from '../../repository/OngRepository.js';
import { ExcluirOngErrors } from '../../validation/ongValidation.js';

export async function ExcluirOngService(idOng) {
    ExcluirOngErrors(idOng);

    const resposta = await DBOng.ExcluirOng(idOng);
    return resposta;
}