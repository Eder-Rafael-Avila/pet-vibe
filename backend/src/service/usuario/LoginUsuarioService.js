import * as DBUsuario from '../../repository/UsuarioRepository.js';
import * as DBOng from '../../repository/OngRepository.js';
import { LoginUsuarioErrors } from '../../validation/usuarioValidation.js';
import { LoginOngErrors } from '../../validation/ongValidation.js';


export async function LoginUsuarioService(email, senha) {
    const [usuario, ong] = await Promise.all([
        DBUsuario.BuscarPorEmail(email),
        DBOng.BuscarPorEmail(email)
    ]);

    if (usuario) {
        try {
            await LoginUsuarioErrors(email, senha, usuario);
            return {
                id_usuario: usuario.id_usuario,
                tipo: 'USUARIO'
            };
        } catch (erro) {
            if (!ong) throw erro;
        }
    }

    if (ong) {
        LoginOngErrors(email, senha, ong);
        return {
            id_ong: ong.id_ong,
            tipo: 'ONG'
        };
    }

    throw new Error('E-mail ou senha inválidos.');
}
