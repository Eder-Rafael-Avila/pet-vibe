import * as DBCampanha from '../../repository/CampanhasRepository.js';
import { CampanhaOngErrors } from '../../validation/campanhasValidation.js';

export async function ListarCampanhasOngService(idOng) {
    CampanhaOngErrors(idOng);

    let resposta = await DBCampanha.ListarCampanhasOng(idOng);
    return resposta;
}
