import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';

export async function ListarAnimaisService() {
    return await DBAnimal.ListarAnimais();
}
