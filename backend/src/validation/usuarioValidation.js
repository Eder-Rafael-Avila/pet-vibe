export function ListarUsuarioErrors(id) {
    if (!id) throw new Error("O campo de ID é obrigatório");
    if (isNaN(id)) throw new Error("O campo de ID é obrigatóriamente número");
}