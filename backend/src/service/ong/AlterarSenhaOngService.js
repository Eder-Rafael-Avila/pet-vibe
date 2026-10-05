import * as DBOng from '../../repository/OngRepository.js';

export async function AlterarSenhaOngService(id, ong) {
    let resposta = await DBOng.AlterarSenhaOng(id,ong)
    return resposta;
}