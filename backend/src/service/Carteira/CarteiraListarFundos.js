import * as DBCarteira from '../../repository/carteiraRepository.js'
import { CarteiraIdErrors } from '../../validation/carteiraValidation.js';

export async function ListarFundos(id) {
  CarteiraIdErrors(id);

  let resposta = await DBCarteira.ListarFundos(id);
  return resposta;
}
