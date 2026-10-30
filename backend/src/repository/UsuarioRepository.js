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

    let resposta = await con.query(command, [])
    return resposta[0];
}

export async function ListarUsuario(nome) {

    let command = `
    SELECT
    nome,
    email,
    telefone,
    REPLACE(cpf, '\\t', '') AS cpf,
    DATE_FORMAT(data_nascimento, '%d/%m/%Y') AS data_nascimento
    FROM usuarios
    WHERE nome LIKE ?
    `

    let [resposta] = await con.query(command, [`%${nome}%`])
    return resposta;
}

export async function CriarUsuario(usuario,senha) {
    let command = `
    INSERT INTO usuarios(nome,email,telefone,senha,cpf,data_nascimento)
    VALUES(?,?,?,?,?,?)
    `

    let [resposta] = await con.query(command, [
        usuario.nome,
        usuario.email,
      usuario.telefone,
        senha,
        usuario.cpf,
        usuario.data_nascimento
    ])

    return 'ok'; 
}

// UsuarioRepository.js
export async function BuscarPorEmail(email) {
    const command = `
        SELECT id_usuario, nome, email, senha
        FROM usuarios
        WHERE email = ?
    `;

    const [linhas] = await con.query(command, [email]);
    return linhas[0];
}

export async function BuscarEmailPorId(idUsuario) {
    const command = `
        SELECT email
        FROM usuarios
        WHERE id_usuario = ?
    `;

    const [linhas] = await con.query(command, [idUsuario]);
    return linhas[0];
}

export async function BuscarPorTelefone(tel) {
    const command = `
        SELECT * FROM usuarios
        WHERE telefone = ?
    `

    const [linhas] = await con.query(command, [tel]);
    return linhas[0];
}

export async function ImagemUsuario(idUsuario, imagem) {
    const command = `
        UPDATE usuarios
        SET imagem = ?
        WHERE id_usuario = ?
    `;

    await con.query(command, [imagem, idUsuario]);
}

export async function ExcluirUsuario(idUsuario) {
    const command = `
        DELETE FROM usuarios
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, [idUsuario]);
    return resposta.affectedRows;
}

export async function AlterarSenha(senha, idUsuario) {
    const command = `
    UPDATE usuarios
    SET senha = ?
    WHERE id_usuario = ?
    `

    const [resposta] = await con.query(command, [senha, idUsuario]);
    return resposta.affectedRows;
}

export async function AlterarTelefone(telefone, idUsuario) {
    const command = `
    UPDATE usuarios
    SET telefone = ?
    WHERE id_usuario = ?
    `

    const [resposta] = await con.query(command, [telefone, idUsuario]);
    return resposta.affectedRows;
}

export async function AlterarEmail(email, idUsuario) {
    const command = `
    UPDATE usuarios
    SET email = ?
    WHERE id_usuario = ?
    `
    const [resposta] = await con.query(command, [email, idUsuario]);
    return resposta.affectedRows;
}

export async function ListarImagemENome(id){
    const command = `
    SELECT nome, imagem FROM usuarios
    WHERE id_usuario = ?
    `
    
    const [resposta] = await con.query(command, [id])
    return resposta[0];
}

export async function ListarTudoUsuario(id) {
  const command = `
SELECT imagem, nome, email, telefone, cpf, data_nascimento
FROM usuarios
WHERE id_usuario = ?
`

  let [resposta] = await con.query(command, [id])
  return resposta[0]
}

export async function ListarCampanhas() {
  const command = `
    SELECT
        ong.nome AS nome_ong,
        ong.imagem AS foto_ong,
        campanhas.imagem,
        campanhas.titulo,
        campanhas.descricao,
        campanhas.valor,
        campanhas.valor_arrecadado
    FROM campanhas
    INNER JOIN ong
        ON campanhas.ID_ONG = ong.id_ong;
    `
}