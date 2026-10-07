import con from './conection/connect.js';

export async function ListarAnimais() {
    let command = `
    SELECT
    nome,
    idade,
    raca,
    data_de_nascimento,
    castrado,
    sexo,
    porte,
    descricao
    FROM perfil_animal
    `

    let [resposta] = await con.query(command, []);
    return resposta;
}

export async function ListarAnimalPorNome(nome) {
    let command = `
    SELECT
    nome,
    idade,
    raca,
    data_de_nascimento,
    castrado,
    sexo,
    porte,
    descricao
    FROM perfil_animal
    WHERE nome = ?
    `

    let [resposta] = await con.query(command, [nome])
    return resposta[0];
}

export async function CriarAnimal(id,animal) {
    let command = `
    INSERT INTO perfil_animal
(id_ong, nome, idade, raca, data_de_nascimento, castrado, sexo, porte, descricao)
VALUES (?,?,?,?,?,?,?,?,?)
    `
    let [resposta] = await con.query(command, [
        id,
        animal.nome,
        animal.idade,
        animal.raca,
        animal.data,
        animal.castrado,
        animal.sexo,
        animal.porte,
        animal.descricao
    ])
    return resposta.insertId;
}

export async function ColocarImagem(id,imagem) {
    let command = `
            UPDATE perfil_animal
        SET imagem = ?
        WHERE id_animal = ?
    `

    let [resposta] = await con.query(command, [imagem,id])
    return resposta.insertId;
}

export async function ExcluirPet(id) {
    let command = `
    DELETE perfil_animal
    WHERE id_animal = ?
    `

    let [resposta] = await con.query(command, [id])
    return resposta.insertId;
}
