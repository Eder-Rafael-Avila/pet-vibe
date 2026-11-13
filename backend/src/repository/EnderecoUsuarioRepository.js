
import con from './conection/connect.js';

export async function BuscarEnderecoPorUsuario(idUsuario) {
    const command = `
        SELECT id_endereco_usuario
        FROM endereco_usuarios
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, [idUsuario]);
    return resposta[0];
}

export async function CriarEndereco(idUsuario, endereco) {
    const command = `
        INSERT INTO endereco_usuarios
        (id_usuario, cep, rua, numero, complemento, bairro, cidade, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [resposta] = await con.query(command, [
        idUsuario,
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

export async function ExcluirEndereco(idUsuario) {
    const command = `
    DELETE FROM endereco_usuarios
    WHERE id_usuario = ?
    `

    let [resposta] = await con.query(command, [idUsuario]);
    return resposta.affectedRows;
}
