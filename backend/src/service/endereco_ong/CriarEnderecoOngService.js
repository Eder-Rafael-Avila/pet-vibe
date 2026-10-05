import * as DBenderecoOng from '../repository/EnderecoOngRepository.js';
import { CriarEnderecoOngErrors } from '../../validation/enderecoOngValidation.js';

export async function CriarEnderecoOngService(id, endereco) {

    CriarEnderecoOngErrors(endereco);

    const idEndereco = await DBenderecoOng.CriarEnderecoOng(id, endereco)
    return idEndereco
}