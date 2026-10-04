import * as DBPrefs from '../../repository/prefsRepository.js';
import { ExcluirPrefsErrors } from '../../validation/prefsValidation.js';

export async function ExcluirPrefsService(id_usuario) {
    ExcluirPrefsErrors(id_usuario)
    const resposta = await DBPrefs.ExcluirPrefs(id_usuario)
    return resposta;
}
