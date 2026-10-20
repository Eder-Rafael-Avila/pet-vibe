
import { BuscarAnimaisErrors } from '../../validation/BuscaValidation.js';
import { BuscarAnimais } from '../../repository/BuscaRepository.js';

export async function BuscarAnimaisService(filtros) {
    BuscarAnimaisErrors(filtros);

    const filtrosValidos = {};

    if (filtros.tipo !== undefined) {
        filtrosValidos.tipo = filtros.tipo;
    }

    if (filtros.raca !== undefined) {
        filtrosValidos.raca = filtros.raca.trim();
    }

    if (filtros.castrado !== undefined) {
        filtrosValidos.castrado = filtros.castrado === 'true';
    }

    if (filtros.sexo !== undefined) {
        filtrosValidos.sexo = filtros.sexo;
    }

    if (filtros.porte !== undefined) {
        filtrosValidos.porte = filtros.porte;
    }

    return await BuscarAnimais(filtrosValidos);
}
