import * as DBOng from '../../repository/OngRepository.js';

export async function AlterarDescOngService(id, ong) {
    let resposta = await DBOng.AlterarDescOng(id,ong)
    return resposta;
}