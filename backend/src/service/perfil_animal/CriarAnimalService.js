import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';
import { CriarAnimalValidation } from '../../validation/perfilAnimalValidation.js';

export async function CriarAnimalService(idOng, animal) {
    CriarAnimalValidation(animal);

    const animalComImagem = {
        ...animal,
        imagem: `/uploads/ImagemAnimais/${animal.imagem}`
    };

    return await DBAnimal.CriarAnimal(idOng, animalComImagem);
}