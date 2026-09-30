import con from './conection/connect.js';

export async function ListarUsuarios() {

    let command = `
    SELECT
    nome,
    email,
    telefone,
    REPLACE(cpf, '\\t', '') AS cpf,
    DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento
    FROM usuarios
    `

    let [resposta] = await con.query(command, [])
    return resposta;
}

export async function ListarUsuario(id) {

    let command = `
    SELECT
    nome,
    email,
    telefone,
    REPLACE(cpf, '\\t', '') AS cpf,
    DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento
    FROM usuarios
    WHERE id_usuario = ?
    `

    let [resposta] = await con.query(command, [id])
    return resposta;
}