import con from './conection/connect.js';

function validarToken(tipoPermitido) {
    return (req, resp, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                throw new Error('Token não informado');
            }

            req.usuario = jwt.verify(token, SECRET_KEY);

            if (req.usuario.tipo !== tipoPermitido) {
                return resp.status(403).send({
                    erro: 'Token sem permissão para esta rota'
                });
            }

            next();
        }
        catch (err) {
            return resp.status(401).send({
                erro: err.message
            });
        }
    };
}

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

export async function CriarUsuario(usuario){
    let command = `
    INSERT INTO usuarios(nome,email,telefone,senha,cpf,data_nascimento)
    VALUES(?,?,?,?,?,?)
    `

    let [resposta] = await con.query(command, [
        usuario.nome,
        usuario.email,
        usuario.telefone,
        usuario.senha,
        usuario.cpf,
        usuario.data_nascimento
    ])
    return resposta.insertId
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
