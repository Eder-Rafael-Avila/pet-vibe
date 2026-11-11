import con from './conection/connect.js';


// LISTAR ADOÇÕES APROVADAS DA ONG
export async function listarAdocoesAprovadasOng(idOng) {
    return listarAdocoesOngPorSituacao(idOng, 'aprovada');
}


// LISTAR ADOÇÕES REPROVADAS DA ONG
export async function listarAdocoesReprovadasOng(idOng) {
    return listarAdocoesOngPorSituacao(idOng, 'reprovada');
}


// LISTAR ADOÇÕES DA ONG POR SITUAÇÃO
async function listarAdocoesOngPorSituacao(idOng, situacao) {
    const comando = `
        SELECT
            adocoes.id_adocao,

            usuarios.nome AS nome_usuario,
            usuarios.email AS email_usuario,
            usuarios.telefone AS telefone_usuario,

            perfil_animal.imagem AS imagem_animal,
            perfil_animal.id_animal,
            perfil_animal.nome AS nome_animal,
            perfil_animal.idade AS idade_animal,
            perfil_animal.tipo AS tipo_animal,
            perfil_animal.raca AS raca_animal,

            adocoes.\`situação\` AS situacao

        FROM adocoes

        INNER JOIN usuarios
            ON adocoes.id_usuario = usuarios.id_usuario

        INNER JOIN perfil_animal
            ON adocoes.id_animal = perfil_animal.id_animal

        WHERE perfil_animal.id_ong = ?
          AND adocoes.\`situação\` = ?
    `;

    const [resultado] = await con.query(comando, [idOng, situacao]);

    return resultado;
}


// APROVAR ADOÇÃO
export async function aprovarAdocao(idOng, idAdocao) {

    // Confere se o animal pertence à ONG autenticada
    // e se a solicitação ainda está pendente.

    const comando = `
        UPDATE adocoes

        INNER JOIN perfil_animal
            ON adocoes.id_animal = perfil_animal.id_animal

        SET adocoes.\`situação\` = 'aprovada'

        WHERE adocoes.id_adocao = ?
          AND perfil_animal.id_ong = ?
          AND adocoes.\`situação\` = 'pendente'
    `;

    const [resultado] = await con.query(comando, [idAdocao, idOng]);

    return resultado.affectedRows;
}


// REPROVAR ADOÇÃO
export async function reprovarAdocao(idOng, idAdocao) {

    // Confere se o animal pertence à ONG autenticada
    // e se a solicitação ainda está pendente.

    const comando = `
        UPDATE adocoes

        INNER JOIN perfil_animal
            ON adocoes.id_animal = perfil_animal.id_animal

        SET adocoes.\`situação\` = 'reprovada'

        WHERE adocoes.id_adocao = ?
          AND perfil_animal.id_ong = ?
          AND adocoes.\`situação\` = 'pendente'
    `;

    const [resultado] = await con.query(comando, [idAdocao, idOng]);

    return resultado.affectedRows;
}


// LISTAR ADOÇÕES PENDENTES DA ONG
export async function listarAdocoesPendentesOng(idOng) {

    const comando = `
        SELECT
            adocoes.id_adocao,

            usuarios.imagem AS imagem_usuario,
            usuarios.nome AS nome_usuario,
            usuarios.email AS email_usuario,
            usuarios.telefone AS telefone_usuario,
            usuarios.cpf AS cpf_usuario,

            DATE_FORMAT(
                usuarios.data_nascimento,
                '%d/%m/%Y'
            ) AS data_nascimento_usuario,

            endereco_usuarios.cidade AS cidade_usuario,

            COALESCE(
                NULLIF(
                    CONCAT_WS(', ',
                        CONCAT('CEP: ', NULLIF(TRIM(endereco_usuarios.cep), '')),
                        CONCAT('Nº ', NULLIF(TRIM(endereco_usuarios.numero), '')),
                        NULLIF(TRIM(endereco_usuarios.complemento), ''),
                        NULLIF(TRIM(endereco_usuarios.bairro), ''),
                        NULLIF(TRIM(endereco_usuarios.cidade), ''),
                        NULLIF(TRIM(endereco_usuarios.estado), '')
                    ),
                    ''
                ),
                'Endereço não informado'
            ) AS endereco_usuario,

            perfil_animal.imagem AS imagem_animal,
            perfil_animal.id_animal,
            perfil_animal.nome AS nome_animal,
            perfil_animal.idade AS idade_animal,
            perfil_animal.tipo AS tipo_animal,
            perfil_animal.raca AS raca_animal,

            adocoes.\`situação\` AS situacao

        FROM adocoes

        INNER JOIN usuarios
            ON adocoes.id_usuario = usuarios.id_usuario

        LEFT JOIN endereco_usuarios
            ON usuarios.id_usuario = endereco_usuarios.id_usuario

        INNER JOIN perfil_animal
            ON adocoes.id_animal = perfil_animal.id_animal

        WHERE perfil_animal.id_ong = ?
          AND adocoes.\`situação\` = 'pendente'
    `;

    const [resultado] = await con.query(comando, [idOng]);

    return resultado;
}


// EXCLUIR ADOÇÃO
export async function excluirAdocao(idUsuario, idAdocao) {

    // Exclui somente solicitações pertencentes ao usuário
    // e que ainda estejam pendentes.

    const comando = `
        DELETE FROM adocoes

        WHERE id_adocao = ?
          AND id_usuario = ?
          AND \`situação\` = 'pendente'
    `;

    const [resultado] = await con.query(comando, [idAdocao, idUsuario]);

    return resultado.affectedRows;
}


// LISTAR ADOÇÕES DO USUÁRIO
export async function listarAdocoesUsuario(idUsuario) {

    const comando = `
        SELECT
            usuarios.nome AS nome_usuario,

            ong.nome AS nome_ong,
            ong.email AS email_ong,
            ong.telefone AS telefone_ong,

            perfil_animal.nome AS nome_animal,
            perfil_animal.idade AS idade_animal,

            adocoes.\`situação\` AS situacao

        FROM adocoes

        INNER JOIN usuarios
            ON adocoes.id_usuario = usuarios.id_usuario

        INNER JOIN perfil_animal
            ON adocoes.id_animal = perfil_animal.id_animal

        INNER JOIN ong
            ON perfil_animal.id_ong = ong.id_ong

        WHERE adocoes.id_usuario = ?
    `;

    const [resultado] = await con.query(comando, [idUsuario]);

    // Apenas adoções aprovadas incluem os contatos da ONG.
    return resultado.map(adocao => {

        if (adocao.situacao === 'aprovada') {
            return adocao;
        }

        delete adocao.email_ong;
        delete adocao.telefone_ong;

        return adocao;
    });
}


// CRIAR SOLICITAÇÃO DE ADOÇÃO
export async function criarAdocao(idUsuario, idAnimal) {

    // A ONG é identificada pelo perfil do animal.
    // O usuário é identificado pelo token autenticado.

    const comando = `
        INSERT INTO adocoes (
            id_usuario,
            id_animal,
            \`situação\`
        )

        SELECT
            ?,
            id_animal,
            'pendente'

        FROM perfil_animal

        WHERE id_animal = ?
          AND id_ong IS NOT NULL
    `;

    const [resultado] = await con.query(comando, [idUsuario, idAnimal]);

    return resultado.insertId;
}