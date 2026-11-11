import con from './conection/connect.js';

export async function listarAdocoesAprovadasOng(idOng) {
    return listarAdocoesOngPorSituacao(idOng, 'aprovada');
}

export async function listarAdocoesReprovadasOng(idOng) {
    return listarAdocoesOngPorSituacao(idOng, 'reprovada');
}

// Compartilha a consulta entre as duas listagens, filtrando pela ONG do token.
async function listarAdocoesOngPorSituacao(idOng, situacao) {
    const comando = `
        SELECT
            adocoes.id_adocao,
            usuarios.nome AS nome_usuario,
            perfil_animal.id_animal,
            perfil_animal.nome AS nome_animal,
            perfil_animal.idade AS idade_animal,
            adocoes.situação AS situacao
        FROM adocoes
        INNER JOIN usuarios ON adocoes.id_usuario = usuarios.id_usuario
        INNER JOIN perfil_animal ON adocoes.id_animal = perfil_animal.id_animal
        WHERE perfil_animal.id_ong = ?
          AND adocoes.situação = ?
    `;

    const [resultado] = await con.query(comando, [idOng, situacao]);
    return resultado;
}

export async function aprovarAdocao(idOng, idAdocao) {
    // Confere se o animal pertence à ONG autenticada antes de alterar a situação.
    const comando = `
        UPDATE adocoes
        INNER JOIN perfil_animal ON adocoes.id_animal = perfil_animal.id_animal
        SET adocoes.situação = 'aprovada'
        WHERE adocoes.id_adocao = ?
          AND perfil_animal.id_ong = ?
    `;

    const [resultado] = await con.query(comando, [idAdocao, idOng]);
    return resultado.affectedRows;
}

export async function reprovarAdocao(idOng, idAdocao) {
    const comando = `
        UPDATE adocoes
        INNER JOIN perfil_animal ON adocoes.id_animal = perfil_animal.id_animal
        SET adocoes.situação = 'reprovada'
        WHERE adocoes.id_adocao = ?
          AND perfil_animal.id_ong = ?
    `;

    const [resultado] = await con.query(comando, [idAdocao, idOng]);
    return resultado.affectedRows;
}

export async function listarAdocoesPendentesOng(idOng) {
    const comando = `
        SELECT
            adocoes.id_adocao,
            usuarios.imagem AS imagem_usuario,
            usuarios.nome AS nome_usuario,
            usuarios.email AS email_usuario,
            usuarios.telefone AS telefone_usuario,
            usuarios.cpf AS cpf_usuario,
            DATE_FORMAT(usuarios.data_nascimento, '%d/%m/%Y') AS data_nascimento_usuario,
            COALESCE(NULLIF(CONCAT_WS(', ',
                CONCAT('CEP: ', NULLIF(TRIM(endereco_usuarios.cep), '')),
                CONCAT('Nº ', NULLIF(TRIM(endereco_usuarios.numero), '')),
                NULLIF(TRIM(endereco_usuarios.complemento), ''),
                NULLIF(TRIM(endereco_usuarios.bairro), ''),
                NULLIF(TRIM(endereco_usuarios.cidade), ''),
                NULLIF(TRIM(endereco_usuarios.estado), '')
            ), ''), 'Endereço não informado') AS endereco_usuario,
            perfil_animal.id_animal,
            perfil_animal.nome AS nome_animal,
            perfil_animal.idade AS idade_animal,
            adocoes.situação AS situacao
        FROM adocoes
        INNER JOIN usuarios ON adocoes.id_usuario = usuarios.id_usuario
        LEFT JOIN endereco_usuarios ON usuarios.id_usuario = endereco_usuarios.id_usuario
        INNER JOIN perfil_animal ON adocoes.id_animal = perfil_animal.id_animal
        WHERE perfil_animal.id_ong = ?
          AND adocoes.situação = 'pendente'
    `;

    // O ID vem do token: retorna apenas solicitações pendentes dessa ONG.
    const [resultado] = await con.query(comando, [idOng]);
    return resultado;
}

export async function excluirAdocao(idUsuario, idAdocao) {
    // Exclui somente se a adoção pertencer ao usuário e ainda estiver pendente.
    const comando = `
        DELETE FROM adocoes
        WHERE id_adocao = ?
          AND id_usuario = ?
          AND situação = 'pendente'
    `;

    const [resultado] = await con.query(comando, [idAdocao, idUsuario]);
    return resultado.affectedRows;
}

export async function listarAdocoesUsuario(idUsuario) {
    // Junta cada adoção ao usuário, ao animal e à ONG responsável pelo animal.
    const comando = `
        SELECT
            usuarios.nome AS nome_usuario,
            ong.nome AS nome_ong,
            ong.email AS email_ong,
            ong.telefone AS telefone_ong,
            perfil_animal.nome AS nome_animal,
            perfil_animal.idade AS idade_animal,
            adocoes.situação AS situacao
        FROM adocoes
        INNER JOIN usuarios ON adocoes.id_usuario = usuarios.id_usuario
        INNER JOIN perfil_animal ON adocoes.id_animal = perfil_animal.id_animal
        INNER JOIN ong ON perfil_animal.id_ong = ong.id_ong
        WHERE adocoes.id_usuario = ?
    `;

    // Filtra pelo usuário autenticado para retornar somente as adoções dele.
    const [resultado] = await con.query(comando, [idUsuario]);

    // Apenas adoções aprovadas incluem os contatos da ONG no JSON.
    return resultado.map(adocao => {
        if (adocao.situacao === 'aprovada') {
            return adocao;
        }

        delete adocao.email_ong;
        delete adocao.telefone_ong;
        return adocao;
    });
}

// O controller deve receber idUsuario do token validado e idAnimal da requisição.
export async function criarAdocao(idUsuario, idAnimal) {
    // A ONG é identificada pelo perfil do animal, sem duplicar seu ID na adoção.
    const comando = `
        INSERT INTO adocoes (id_usuario, id_animal, situação)
        SELECT ?, id_animal, 'pendente'
        FROM perfil_animal
        WHERE id_animal = ?
          AND id_ong IS NOT NULL
    `;

    // Substitui os dois ? na ordem: usuário autenticado e animal escolhido.
    const [resultado] = await con.query(comando, [idUsuario, idAnimal]);


    return resultado.insertId;
}
