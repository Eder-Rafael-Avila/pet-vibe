import * as dbAdocoes from '../../repository/adocoesRepository.js';
import { ListarAdocoesUsuarioErrors } from '../../validation/adocoesValidation.js';

export async function ListarAdocoesUsuarioService(idUsuario) {
    ListarAdocoesUsuarioErrors(idUsuario);

    const resposta = await dbAdocoes.listarAdocoesUsuario(idUsuario);
    return resposta;
}
