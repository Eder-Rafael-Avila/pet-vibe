import * as DBOng from '../../repository/OngRepository.js';
import { AlterarSiteOngErrors } from '../../validation/ongValidation.js';

export async function AlterarSiteOngService(id, site) {
    AlterarSiteOngErrors(site);

    let resposta = await DBOng.AlterarSiteOng(id, site)
    return resposta;
}
