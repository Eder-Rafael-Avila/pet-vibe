import * as DBCampanha from '../../repository/CampanhasRepository.js';
import { CampanhaIdErrors, CampanhaOngErrors, CampanhaDaOngErrors } from '../../validation/campanhasValidation.js';

export async function ListarContribuidoresService(idCampanha, idOng) {
    CampanhaIdErrors(idCampanha);
    CampanhaOngErrors(idOng);

    const campanha = await DBCampanha.BuscarCampanhaDaOng(idCampanha, idOng);
    CampanhaDaOngErrors(campanha.length);

    return await DBCampanha.ListarContribuidores(idCampanha, idOng);
}
