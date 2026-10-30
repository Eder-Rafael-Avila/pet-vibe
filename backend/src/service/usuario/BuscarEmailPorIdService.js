import * as DBUsuario from '../../repository/UsuarioRepository.js';

export async function BuscarEmailPorIdService(idUsuario) {
    if (!idUsuario || Number.isNaN(Number(idUsuario))) {
        throw new Error('ID do usuário inválido.');
    }

    const usuario = await DBUsuario.BuscarEmailPorId(idUsuario);

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    return usuario.email;
}
