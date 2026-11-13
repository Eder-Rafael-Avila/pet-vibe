import * as DBEndereco from '../../repository/EnderecoUsuarioRepository.js';
import { CriarEnderecoUsuarioErrors } from '../../validation/enderecoUsuarioValidation.js';

export async function CriarEnderecoService(id, endereco) {
    const enderecoCadastrado = await DBEndereco.BuscarEnderecoPorUsuario(id);
    CriarEnderecoUsuarioErrors(enderecoCadastrado);

    const idEndereco = await DBEndereco.CriarEndereco(id, endereco);
    return idEndereco;
}
