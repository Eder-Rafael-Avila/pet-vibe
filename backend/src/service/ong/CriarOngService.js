import * as DBOng from '../../repository/OngRepository.js';
import { CriarOngErrors } from '../../validation/ongValidation.js';

export async function CriarOngService(ong) {
    CriarOngErrors(ong);

    return await DBOng.CriarOrg(ong);
}
