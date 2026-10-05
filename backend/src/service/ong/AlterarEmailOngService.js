import * as DBOng from '../../repository/OngRepository.js';

export async function AlterarEmailOngService(id, ong) {
    let resposta = await DBOng.AlterarEmailOng(id,ong)
    return resposta;
}