import * as DBenderecoOng from '../repository/EnderecoOngRepository.js';

export async function ExcluirEnderecoOngService(id_token){
        const resposta = await DBenderecoOng.ExcluirEnderecoOng(id_token)
        return resposta;
}