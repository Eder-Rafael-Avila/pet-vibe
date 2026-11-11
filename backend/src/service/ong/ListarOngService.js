import * as DBOngs from '../../repository/OngRepository.js';
import { ListarOngErrors } from '../../validation/ongValidation.js';

export async function ListarOngService(id) {
    ListarOngErrors(id);

    const resposta = await DBOngs.BuscarOngPorId(id);
    return resposta;
}