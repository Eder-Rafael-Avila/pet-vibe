import * as DBOng from '../../repository/OngRepository.js';

export async function AlterarSiteOngService(id, ong) {
    let resposta = await DBOng.AlterarSiteOng(id,ong)
    return resposta;
}