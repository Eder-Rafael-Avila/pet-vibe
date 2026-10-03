import * as DBEndereco from '../../repository/EnderecoUsuarioRepository.js';

export async function ExcluirEnderecoService(id){
        const resposta = await DBEndereco.ExcluirEndereco(id)
        return resposta;
}