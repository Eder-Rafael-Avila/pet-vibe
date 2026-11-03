import * as DBCampanha from '../../repository/CampanhasRepository.js';

export async function ExcluirCampanhaService(id) {
    let resposta = await DBCampanha.ExcluirCampanha(id)
    return resposta;
}
