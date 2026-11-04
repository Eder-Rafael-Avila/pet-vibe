import * as DBCampanha from '../../repository/CampanhasRepository.js';
import { CampanhaIdErrors, CampanhaOngErrors, ExcluirCampanhaErrors } from '../../validation/campanhasValidation.js';

export async function ExcluirCampanhaService(id, idOng) {
    CampanhaIdErrors(id);
    CampanhaOngErrors(idOng);
    let resposta = await DBCampanha.ExcluirCampanha(id, idOng)
    ExcluirCampanhaErrors(resposta);
    return resposta;
}
