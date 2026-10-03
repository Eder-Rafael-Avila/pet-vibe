import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { LoginUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function LoginUsuarioService(email, senha) {
    const usuario = await DBUsuario.BuscarPorEmail(email);
    LoginUsuarioErrors(email, senha, usuario);
    return usuario;
}
