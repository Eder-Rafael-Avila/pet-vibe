import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';
import { ExcluirAnimalValidation } from '../../validation/perfilAnimalValidation.js';

export async function ExcluirAnimalService(idAnimal) {
    ExcluirAnimalValidation(idAnimal);
    return await DBAnimal.ExcluirAnimal(idAnimal);
}
