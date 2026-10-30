import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';
import { CriarAnimalValidation } from '../../validation/perfilAnimalValidation.js';

export async function CriarAnimalService(idOng, animal) {
    CriarAnimalValidation(animal);
    return await DBAnimal.CriarAnimal(idOng, animal);
}
