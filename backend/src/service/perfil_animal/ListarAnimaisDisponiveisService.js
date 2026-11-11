import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';

export async function ListarAnimaisDisponiveisService() {
    return await DBAnimal.ListarAnimais(true);
}
