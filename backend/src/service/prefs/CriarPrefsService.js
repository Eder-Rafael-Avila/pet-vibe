import * as DBPrefs from '../../repository/prefsRepository.js';
import { CriarPrefsErrors } from '../../validation/prefsValidation.js';

export async function CriarPrefsService(id_usuario, prefs) {
    CriarPrefsErrors(prefs);

    let resposta = await DBPrefs.CriarPrefs(id_usuario, prefs)
    return resposta

}
