import con from './conection/connect.js';

export async function CriarEnderecoOng(idOng, endereco) {
    const command = `
        INSERT INTO endereco_ong
        (id_ong,cep,rua,numero,complemento,bairro,cidade,estado )
        VALUES (?,?,?,?,?,?,?,?)
    `

    const [resposta] = await con.query(command, [
        idOng,
        endereco.cep,
        endereco.rua,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.estado
    ]);

    return resposta.insertId;
}

export async function ExcluirEnderecoOng(idOng) {
    const command = `
    DELETE FROM endereco_ong
    WHERE id_ong = ?
    `

    let [resposta] = await con.query(command, [idOng]);
    return resposta.affectedRows;
}
