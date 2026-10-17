import con from './conection/connect.js';


export async function ListarPrefs(id_usuario) {
    const command = `
        SELECT *
        FROM prefs
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, [id_usuario]);

    return resposta;
}


export async function CriarPrefs(id_usuario, prefs) {
    const command = `
        INSERT INTO prefs
        (id_usuario, animal_procurado, tempo_sozinho, possui_animais, possui_crianca)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [resposta] = await con.query(command, [
        id_usuario,
        prefs.animal_procurado,
        prefs.tempo_sozinho,
        prefs.possui_animais,
        prefs.possui_crianca
    ]);

    return resposta;
}


export async function AlterarPrefs(id_usuario, prefs) {

    let campos = []
    let valores = []

    if (prefs.animal_procurado !== undefined) {
        campos.push('animal_procurado = ?')
        valores.push(prefs.animal_procurado)
    }

    if (prefs.tempo_sozinho !== undefined) {
        campos.push('tempo_sozinho = ?')
        valores.push(prefs.tempo_sozinho)
    }

    if (prefs.possui_animais !== undefined) {
        campos.push('possui_animais = ?')
        valores.push(prefs.possui_animais)
    }

    if (prefs.possui_crianca !== undefined) {
        campos.push('possui_crianca = ?')
        valores.push(prefs.possui_crianca)
    }

    if (campos.length === 0) {
        throw new Error('Nenhuma preferência foi informada')
    }

    valores.push(id_usuario)

    const command = `
        UPDATE prefs
        SET ${campos.join(', ')}
        WHERE id_usuario = ?
    `

    const [resposta] = await con.query(command, valores)

    return resposta
}


export async function ExcluirPrefs(id_usuario) {
    const command = `
        DELETE FROM prefs
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, [
        id_usuario
    ]);

    return resposta;
}
