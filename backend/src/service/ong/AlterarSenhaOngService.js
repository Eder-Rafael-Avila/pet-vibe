import * as DBOng from '../../repository/OngRepository.js';
import { AlterarSenhaOngErrors } from '../../validation/ongValidation.js';

export async function AlterarSenhaOngService(id, senha) {
    AlterarSenhaOngErrors(senha);

    let resposta = await DBOng.AlterarSenhaOng(id, senha)
    return resposta;
}
