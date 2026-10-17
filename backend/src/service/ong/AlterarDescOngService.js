import * as DBOng from '../../repository/OngRepository.js';
import { AlterarDescOngErrors } from '../../validation/ongValidation.js';

export async function AlterarDescOngService(id, descricao) {
    AlterarDescOngErrors(descricao);

    let resposta = await DBOng.AlterarDescOng(id, descricao)
    return resposta;
}
