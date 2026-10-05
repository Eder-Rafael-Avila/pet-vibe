import * as DBOngs from '../../repository/OngRepository.js';
import { ListarOngErrors } from '../../validation/ongValidation.js';

export async function ListarOngService(nome) {
    ListarOngErrors(nome);

    const resposta = await DBOngs.BuscarOngPorNome(nome);
    return resposta;
}