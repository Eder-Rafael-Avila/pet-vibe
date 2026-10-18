import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { CriarAdocaoErrors } from '../../validation/adocoesValidation.js';

export async function CriarAdocaoService(idUsuario, idAnimal) {
    CriarAdocaoErrors(idUsuario, idAnimal);

    const resposta = await dbAdocoes.criarAdocao(idUsuario, idAnimal);
    return resposta;
}
