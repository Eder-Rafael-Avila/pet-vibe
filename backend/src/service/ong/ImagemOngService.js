import * as DBOng from '../../repository/OngRepository.js';
import { ImagemOngErrors } from '../../validation/ongValidation.js';

export async function ImagemOngService(idOng, file) {
    ImagemOngErrors(file);

    const imagem = `/uploads/ImagemOngs/${file.filename}`;

    await DBOng.ImagemOng(idOng, imagem);

    return imagem;
}