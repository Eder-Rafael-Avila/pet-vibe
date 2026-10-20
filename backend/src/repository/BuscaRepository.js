import con from './conection/connect.js';

export async function BuscarAnimais(filtros) {
    let comando = `
        SELECT
            a.id_animal,
            a.tipo,
            a.raca,
            a.castrado,
            a.sexo,
            a.porte,
            o.nome AS nome_ong
        FROM perfil_animal a
        INNER JOIN ong o
            ON a.id_ong = o.id_ong
        WHERE 1 = 1
    `;

    const valores = [];

    if (filtros.tipo !== undefined) {
        comando += ' AND a.tipo = ?';
        valores.push(filtros.tipo);
    }

    if (filtros.raca !== undefined) {
        comando += ' AND a.raca LIKE ?';
        valores.push(`%${filtros.raca}%`);
    }

    if (filtros.castrado !== undefined) {
        comando += ' AND a.castrado = ?';
        valores.push(filtros.castrado);
    }

    if (filtros.sexo !== undefined) {
        comando += ' AND a.sexo = ?';
        valores.push(filtros.sexo);
    }

    if (filtros.porte !== undefined) {
        comando += ' AND a.porte = ?';
        valores.push(filtros.porte);
    }

    comando += ' ORDER BY a.id_animal DESC';

    const [resposta] = await con.query(comando, valores);

    return resposta;
}
