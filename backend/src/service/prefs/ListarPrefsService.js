import * as DBPrefs from '../../repository/prefsRepository.js';

export async function ListarPrefsService(id_usuario) {
    const resposta = await DBPrefs.ListarPrefs(id_usuario)
    return resposta;
}
