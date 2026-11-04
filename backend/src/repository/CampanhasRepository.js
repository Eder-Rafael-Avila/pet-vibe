import con from './conection/connect.js';
import { DoacaoCampanhaErrors, SaldoDoacaoErrors } from '../validation/campanhasValidation.js';

export async function CriarCampanha(campanha,id) {
    let command = `
    INSERT INTO campanhas(ID_ONG,imagem,titulo,descricao,valor,valor_arrecadado)
    VALUES(?,?,?,?,?,0.00)
    `

    let [resposta] = await con.query(command,[
        id,
        campanha.imagem,
        campanha.titulo,
        campanha.descricao,
        campanha.valor
    ])
    return resposta.affectedRows
}

export async function ListarCampanhas() {
    let command = `
    SELECT ID_campanha,imagem,titulo,descricao,valor,valor_arrecadado FROM campanhas
    `

    let [resposta] = await con.query(command,[])
    return resposta
}

export async function ListarCampanhasOng(idOng) {
    const command = `
    SELECT ID_campanha,imagem,titulo,descricao,valor,valor_arrecadado
    FROM campanhas
    WHERE ID_ONG = ?
    `;

    let [resposta] = await con.query(command, [idOng]);
    return resposta;
}

export async function ExcluirCampanha(ID_campanha, idOng) {
    const command= `
    DELETE FROM campanhas
    WHERE ID_campanha = ? AND ID_ONG = ?
    `

    let [resposta] = await con.query(command,[
        ID_campanha, idOng
    ])
    return resposta.affectedRows
}

export async function BuscarCampanhaDaOng(idCampanha, idOng) {
    const command = 'SELECT ID_campanha FROM campanhas WHERE ID_campanha = ? AND ID_ONG = ?';
    const [resposta] = await con.query(command, [idCampanha, idOng]);
    return resposta;
}

export async function ListarContribuidores(idCampanha, idOng) {
    const command = `
    SELECT usuarios.id_usuario, usuarios.nome, usuarios.imagem,
           SUM(contribuidores.valor_doado) AS valor_doado
    FROM contribuidores
    INNER JOIN usuarios ON usuarios.id_usuario = contribuidores.ID_usuario
    INNER JOIN campanhas ON campanhas.ID_campanha = contribuidores.ID_campanha
    WHERE campanhas.ID_campanha = ? AND campanhas.ID_ONG = ?
    GROUP BY usuarios.id_usuario, usuarios.nome, usuarios.imagem
    ORDER BY usuarios.nome
    `;
    const [resposta] = await con.query(command, [idCampanha, idOng]);
    return resposta;
}

export async function DoarParaCampanha(valor, id, idUsuario){
    const conexao = await con.getConnection();
    try {
        await conexao.beginTransaction();

        const [campanhas] = await conexao.query(
            'SELECT ID_campanha FROM campanhas WHERE ID_campanha = ? FOR UPDATE', [id]
        );
        DoacaoCampanhaErrors(campanhas.length);

        const [debito] = await conexao.query(`
            UPDATE carteira SET fundos = fundos - ?
            WHERE ID_usuario = ? AND fundos >= ?
        `, [valor, idUsuario, valor]);
        SaldoDoacaoErrors(debito.affectedRows);

        await conexao.query(`
            UPDATE campanhas SET valor_arrecadado = COALESCE(valor_arrecadado, 0) + ?
            WHERE ID_campanha = ?
        `, [valor, id]);

        await conexao.query(`
            INSERT INTO contribuidores (ID_campanha, ID_usuario, valor_doado)
            VALUES (?, ?, ?)
        `, [id, idUsuario, valor]);

        await conexao.commit();
        return debito.affectedRows;
    }
    catch (err) {
        await conexao.rollback();
        throw err;
    }
    finally {
        conexao.release();
    }
}

