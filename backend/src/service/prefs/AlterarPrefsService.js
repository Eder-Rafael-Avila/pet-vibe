import * as DBPrefs from '../../repository/prefsRepository.js';
import { AlterarPrefsErrors } from '../../validation/prefsValidation.js';

export async function AlterarPrefsService(id_usuario, prefs) {
    AlterarPrefsErrors(prefs);

    let resposta = await DBPrefs.AlterarPrefs(id_usuario, prefs)
    return resposta
}
