import * as DBCampanha from '../../repository/CampanhasRepository.js';

export async function DoarParaCampanhaService(valor,id) {
    let resposta = await DBCampanha.DoarParaCampanha(valor,id)
    return resposta;
}
