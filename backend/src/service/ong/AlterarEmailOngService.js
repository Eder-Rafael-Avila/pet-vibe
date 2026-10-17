import * as DBOng from '../../repository/OngRepository.js';
import { AlterarEmailOngErrors } from '../../validation/ongValidation.js';

export async function AlterarEmailOngService(id, email) {
    AlterarEmailOngErrors(email);

    let resposta = await DBOng.AlterarEmailOng(id, email)
    return resposta;
}
