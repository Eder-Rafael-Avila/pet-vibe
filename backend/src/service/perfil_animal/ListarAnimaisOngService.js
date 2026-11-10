import * as DBAnimal from '../../repository/PerfilAnimalRepository.js';

export async function ListarAnimaisOngService(idOng) {
    return DBAnimal.ListarAnimaisOng(idOng);
}
