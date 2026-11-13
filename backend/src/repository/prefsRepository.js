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
        (id_usuario, Onde_Mora, Animal_Sozinho_Tempo, possui_animais, possui_crianca, Ja_Teve_animais)
        VALUES (?, ?, ?, ?, ?,?)
    `;

    const [resposta] = await con.query(command, [
        id_usuario,
        prefs.Onde_Mora,
        prefs.Animal_Sozinho_Tempo,
        prefs.possui_animais,
        prefs.possui_crianca,
        prefs.Ja_Teve_animais,
    ]);

    return resposta;
}



export async function AlterarPrefs(id_usuario, prefs) {

    let campos = [];
    let valores = [];

    if (prefs.Onde_Mora !== undefined) {
        campos.push('Onde_Mora = ?');
        valores.push(prefs.Onde_Mora);
    }

    if (prefs.Animal_Sozinho_Tempo !== undefined) {
        campos.push('Animal_Sozinho_Tempo = ?');
        valores.push(prefs.Animal_Sozinho_Tempo);
    }

    if (prefs.possui_animais !== undefined) {
        campos.push('possui_animais = ?');
        valores.push(prefs.possui_animais);
    }

    if (prefs.possui_crianca !== undefined) {
        campos.push('possui_crianca = ?');
        valores.push(prefs.possui_crianca);
    }

    if (prefs.Ja_Teve_animais !== undefined) {
        campos.push('Ja_Teve_animais = ?');
        valores.push(prefs.Ja_Teve_animais);
    }

    if (campos.length === 0) {
        throw new Error('Nenhuma preferência foi informada');
    }

    valores.push(id_usuario);

    const command = `
        UPDATE prefs
        SET ${campos.join(', ')}
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, valores);

    return resposta;
}

export async function ExcluirPrefs(id_usuario) {
    const command = `
        DELETE FROM prefs
        WHERE id_usuario = ?
    `;

    const [resposta] = await con.query(command, [id_usuario]);

    return resposta;
}
