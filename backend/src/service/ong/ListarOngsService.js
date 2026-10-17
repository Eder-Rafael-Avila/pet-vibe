import * as DBOngs from '../../repository/OngRepository.js';

export async function ListarOngsService() {
    let resposta = await DBOngs.ListarOngs()
    return resposta;
}