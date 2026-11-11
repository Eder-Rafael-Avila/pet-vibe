import * as DBOng from '../../repository/OngRepository.js';
import { AlterarTelefoneOngErrors } from '../../validation/ongValidation.js';

export async function AlterarTelefoneOngService(id, telefone) {
    const telefoneSemMascara = String(telefone || '').replace(/\D/g, '');
    AlterarTelefoneOngErrors(telefoneSemMascara);
    return await DBOng.AlterarTelefoneOng(id, telefoneSemMascara);
}
