import con from './conection/connect.js';

export async function ListarOngs() {
    let command = `
SELECT
nome,
email,
telefone,
descricao,
site
FROM ong
`

    let [resposta] = await con.query(command, [])
    return resposta;
}

export async function BuscarOngPorNome(nome) {
    const comando = `
        SELECT nome, email, telefone, descricao, site
        FROM ong
        WHERE nome LIKE ?
    `;

    const [linhas] = await con.query(comando, [`%${nome}%`]);
    return linhas;
}

export async function CriarOrg(ong) {
    let command = `
    INSERT INTO ong(nome,email,telefone,cnpj,senha,descricao,site)
    VALUES(? ,? ,? ,? ,? ,? ,?)
    `

    let [resposta] = await con.query(command, [
        ong.nome,
        ong.email,
        ong.telefone,
        ong.cnpj,
        ong.senha,
        ong.descricao,
        ong.site
    ])
    return resposta.insertId
}

export async function BuscarPorEmail(email) {
    const command = `
        SELECT id_ong, nome, email, senha
        FROM ong
        WHERE email = ?
    `;

    const [linhas] = await con.query(command, [email]);
    return linhas[0];
}

export async function ImagemOng(idOng, imagem) {
    const command = `
        UPDATE ong
        SET imagem = ?
        WHERE id_ong = ?
    `;

    await con.query(command, [imagem, idOng]);
}

export async function ExcluirOng(id) {
    let command = `
    DELETE FROM ong
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command, [id])
    return resposta.effectedRows
}

export async function AlterarEmailOng(id, ong) {
    let command = `
    UPDATE ong
    SET email = ?
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command, [ong, id])
    return resposta.affectedRows;
}

export async function AlterarSenhaOng(id, ong) {
    let command = `
    UPDATE ong
    SET senha = ?
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command, [ong, id])
    return resposta.affectedRows;
}

export async function AlterarDescOng(id, ong) {
    let command = `
    UPDATE ong
    SET descricao = ?
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command, [ong, id])
    return resposta.affectedRows;
}

export async function AlterarSiteOng(id, ong) {
    let command = `
    UPDATE ong
    SET site = ?
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command, [ong, id])
    return resposta.affectedRows;
}
