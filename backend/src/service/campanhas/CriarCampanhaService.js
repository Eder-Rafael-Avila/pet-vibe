import * as DBCampanha from '../../repository/CampanhasRepository.js';
import { CriarCampanhaErrors } from '../../validation/campanhasValidation.js';

export async function CriarCampanhaService(campanha,id) {
    CriarCampanhaErrors(campanha, id);
    campanha.imagem = `/uploads/ImagemCampanha/${campanha.imagem}`;
    let resposta = await DBCampanha.CriarCampanha(campanha,id)
    return resposta;
}
