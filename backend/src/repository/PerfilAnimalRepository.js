import con from './conection/connect.js';

export async function ListarAnimais() {
    let command = `
SELECT
    ong.nome AS nome_ong,
    perfil_animal.id_animal,
    perfil_animal.nome AS nome_animal,
    perfil_animal.idade,
    perfil_animal.raca,
    DATE_FORMAT(perfil_animal.data_de_nascimento, '%d/%m/%Y') AS data_nascimento,
    perfil_animal.castrado,
    perfil_animal.sexo,
    perfil_animal.porte,
    perfil_animal.descricao
FROM perfil_animal
INNER JOIN ong
ON perfil_animal.id_ong = ong.id_ong;
    `

    let [resposta] = await con.query(command, []);
    return resposta;
}

export async function ListarAnimalPorNome(nome) {
    let command = `
SELECT
    ong.nome AS nome_ong,
        perfil_animal.id_animal,
    perfil_animal.nome AS nome_animal,
    perfil_animal.idade,
    perfil_animal.raca,
    DATE_FORMAT(perfil_animal.data_de_nascimento, '%d/%m/%Y') AS data_nascimento,
    perfil_animal.castrado,
    perfil_animal.sexo,
    perfil_animal.porte,
    perfil_animal.descricao
FROM perfil_animal
INNER JOIN ong
ON perfil_animal.id_ong = ong.id_ong
WHERE perfil_animal.nome LIKE ?;
    `

    let [resposta] = await con.query(command, [`%${nome}%`])
    return resposta;
}

export async function CriarAnimal(id, animal) {

    let command = `
        INSERT INTO perfil_animal (
            id_ong,
            imagem,
            nome,
            idade,
            raca,
            data_de_nascimento,
            castrado,
            sexo,
            porte,
            descricao
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let [resultado] = await con.query(command, [
        id,
        animal.imagem,
        animal.nome,
        animal.idade,
        animal.raca,
        animal.data_de_nascimento,
        animal.castrado,
        animal.sexo,
        animal.porte,
        animal.descricao
    ]);

    return resultado.insertId;
}

export async function ExcluirAnimal(id) {
    let command = `
    DELETE FROM  perfil_animal
    WHERE id_animal = ?
    `

    let [resultado] = await con.query(command, [id])
    return resultado.affectedRows;
}