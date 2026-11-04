import * as DBCampanha from '../../repository/CampanhasRepository.js';
import { DoarParaCampanhaErrors, DoacaoCampanhaErrors } from '../../validation/campanhasValidation.js';
import { CarteiraIdErrors } from '../../validation/carteiraValidation.js';

export async function DoarParaCampanhaService(valor,id,idUsuario) {
    DoarParaCampanhaErrors(valor, id);
    CarteiraIdErrors(idUsuario);
    let resposta = await DBCampanha.DoarParaCampanha(valor.toFixed(2), id, idUsuario)
    DoacaoCampanhaErrors(resposta);
    return resposta;
}
