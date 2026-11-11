import * as DBOng from '../../repository/OngRepository.js';
import { AlterarNomeOngErrors } from '../../validation/ongValidation.js';

export async function AlterarNomeOngService(id, nome) {
    AlterarNomeOngErrors(nome);
    return await DBOng.AlterarNomeOng(id, nome.trim());
}
