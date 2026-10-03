import * as DBUsuario from '../../repository/UsuarioRepository.js';
import { ImagemUsuarioErrors } from '../../validation/usuarioValidation.js';

export async function ImagemUsuarioService(idUsuario, file) {
    ImagemUsuarioErrors(file);

    const imagem = `/uploads/ImagemUsuarios/${file.filename}`;

    await DBUsuario.ImagemUsuario(idUsuario, imagem);

    return imagem;
}
