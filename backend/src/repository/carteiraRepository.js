import con from "./conection/connect.js";

export async function AddFundos(qtd, id) {
  const command = `
    INSERT INTO carteira (ID_usuario, fundos)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE
      fundos = fundos + ?
  `;

  const [resposta] = await con.query(command, [id, qtd, qtd]);
  return resposta.affectedRows;
}


export async function ListarFundos(id) {
  const command = `
SELECT fundos FROM carteira
WHERE ID_usuario = ?
    `

  const [resposta] = await con.query(command, [id]);
  return resposta;
}
