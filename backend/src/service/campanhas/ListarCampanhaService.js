import * as DBCampanha from '../../repository/CampanhasRepository.js';

export async function ListarCampanhasService() {
    let resposta = await DBCampanha.ListarCampanhas()
    return resposta;
}