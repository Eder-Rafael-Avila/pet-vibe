import * as DBCampanha from '../../repository/CampanhasRepository.js';

export async function CriarCampanhaService(campanha,id) {
    let resposta = await DBCampanha.CriarCampanha(campanha,id)
    return resposta;
}
