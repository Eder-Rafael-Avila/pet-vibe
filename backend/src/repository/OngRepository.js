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

export async function BuscarOngPorId(id) {
    const comando = `
        SELECT nome, email, telefone, cnpj, imagem
        FROM ong
        WHERE id_ong = ?
    `;

    const [linhas] = await con.query(comando, [id]);
    return linhas;
}

export async function BuscarNomeOngPorId(id) {
    const comando = `
        SELECT nome
        FROM ong
        WHERE id_ong = ?
    `;

    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}

export async function BuscarEmailPorIdOng(idOng) {
    const comando = `
        SELECT email
        FROM ong
        WHERE id_ong = ?
    `;

    const [linhas] = await con.query(comando, [idOng]);
    return linhas[0]?.email;
}

export async function NomeImgPorId(id) {
    const comando = `
        SELECT nome, email, telefone,
        FROM ong
        WHERE id_ong = ?
    `;

    const [linhas] = await con.query(comando, [`%${id}%`]);
    return linhas;
}

export async function CriarOrg(ong) {
    let command = `
    INSERT INTO ong(nome,email,telefone,cnpj,senha,descricao,site)
    VALUES(? ,? ,? ,? ,?, ?, ? )
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

export async function BuscarEmailPorId(idOng) {
    const command = `
        SELECT email
        FROM ong
        WHERE id_ong = ?
    `;

    const [linhas] = await con.query(command, [idOng]);
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
    const conexao = await con.getConnection();

    try {
        await conexao.beginTransaction();

        await conexao.query(`
            DELETE adocoes FROM adocoes
            INNER JOIN perfil_animal ON adocoes.id_animal = perfil_animal.id_animal
            WHERE perfil_animal.id_ong = ?
        `, [id]);

        await conexao.query(`
            DELETE contribuidores FROM contribuidores
            INNER JOIN campanhas ON contribuidores.ID_campanha = campanhas.ID_campanha
            WHERE campanhas.ID_ONG = ?
        `, [id]);

        await conexao.query('DELETE FROM perfil_animal WHERE id_ong = ?', [id]);
        await conexao.query('DELETE FROM campanhas WHERE ID_ONG = ?', [id]);
        await conexao.query('DELETE FROM endereco_ong WHERE id_ong = ?', [id]);

        const [resposta] = await conexao.query('DELETE FROM ong WHERE id_ong = ?', [id]);

        await conexao.commit();
        return resposta.affectedRows;
    } catch (err) {
        await conexao.rollback();
        throw err;
    } finally {
        conexao.release();
    }
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

export async function AlterarNomeOng(id, nome) {
    const comando = `
        UPDATE ong
        SET nome = ?
        WHERE id_ong = ?
    `;

    const [resposta] = await con.query(comando, [nome, id]);
    return resposta.affectedRows;
}

export async function AlterarTelefoneOng(id, telefone) {
    const comando = `
        UPDATE ong
        SET telefone = ?
        WHERE id_ong = ?
    `;

    const [resposta] = await con.query(comando, [telefone, id]);
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
