import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';
import { ListarPorNomeValidation } from '../../validation/perfilAnimalValidation.js';

export async function ListarAnimalPorNomeService(nome) {
    await ListarPorNomeValidation(nome);
    return await DBAnimal.ListarAnimalPorNome(nome);
}
