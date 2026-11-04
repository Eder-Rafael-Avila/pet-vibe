import * as DBCarteira from '../../repository/carteiraRepository.js'
import { AddFundosErrors, CarteiraIdErrors } from '../../validation/carteiraValidation.js';

export async function AddFundos(qtd,id) {
  AddFundosErrors(qtd);
  CarteiraIdErrors(id);

  let resposta = await DBCarteira.AddFundos(qtd, id);
  return resposta;
}
