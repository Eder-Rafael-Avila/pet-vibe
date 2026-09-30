import con from './conection/connect.js';

export async function ListarOngs() {
let command = `
SELECT
nome,
email,
telefone,
cnpj,
descricao,
site
FROM ong
`

let [resposta] = await con.query(command, [])
return resposta;
}

export async function ListarOng(id) {
let command = `
SELECT
nome,
email,
telefone,
cnpj,
descricao,
site
FROM ong
WHERE id_ong = ?
`

let [resposta] = await con.query(command, [id])
return resposta;
}

export async function CriarOrg(ong) {
    let command = `
    INSERT INTO ong(nome,email,telefone,cnpj,descricao,site)
    VALUES(? ,? ,? ,? ,? ,?)
    `

    let [resposta] = await con.query(command, [
        ong.nome,
        ong.email,
        ong.telefone,
        ong.cnpj,
        ong.descricao,
        ong.site
    ])
    return resposta.insertId
}

export async function ExcluirOng(id) {
    let command = `
    DELETE FROM ong
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command,[id])
    return resposta.effectedRows
}

