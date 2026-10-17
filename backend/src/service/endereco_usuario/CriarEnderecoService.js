import * as DBEndereco from '../../repository/EnderecoUsuarioRepository.js';

export async function CriarEnderecoService(id, endereco) {
        const idEndereco = await DBEndereco.CriarEndereco(id, endereco);
        return idEndereco;
}