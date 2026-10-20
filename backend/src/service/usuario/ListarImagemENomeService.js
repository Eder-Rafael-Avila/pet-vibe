import * as dbusuario from '../../repository/UsuarioRepository.js'
import { ListarImagemENomeValidation } from '../../validation/usuarioValidation.js';

export async function ListarImagemENome(id){
    ListarImagemENomeValidation(id)
            const resposta = await dbusuario.ListarImagemENome(id)
            return resposta;

}