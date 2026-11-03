import con from './conection/connect.js';

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
    SELECT imagem,titulo,descricao,valor,valor_arrecadado FROM campanhas
    `

    let [resposta] = await con.query(command,[])
    return resposta
}

export async function ExcluirCampanha(ID_campanha) {
    const command= `
    DELETE FROM campanhas
    WHERE ID_campanha = ?
    `

    let [resposta] = await con.query(command,[
        ID_campanha
    ])
    return resposta.affectedRows
}

export async function DoarParaCampanha(valor, id){
    const command = `
    UPDATE campanhas
    SET valor_arrecadado = valor_arrecadado + ?
    WHERE ID_campanha = ?
    `

    let [resposta] = await con.query(command,[valor,id])
    return resposta.insertId
}

