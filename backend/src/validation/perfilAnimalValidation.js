export async function ListarPorNomeValidation(nome) {
    if(!nome) throw new Error("O parametro de nome é obrigatório");
    
}

export function CriarAnimalValidation(animal) {

if (!animal.imagem) {
    throw new Error('A imagem é obrigatória.');
}

if (!animal.nome) {
    throw new Error('O nome é obrigatório.');
}

if (!animal.idade && animal.idade !== 0) {
    throw new Error('A idade é obrigatória.');
}

if (isNaN(animal.idade)) {
    throw new Error('A idade deve ser um número.');
}

if (animal.idade < 0) {
    throw new Error('A idade não pode ser negativa.');
}

if (!animal.raca) {
    throw new Error('A raça é obrigatória.');
}


if (!animal.data_de_nascimento) {
    throw new Error('A data de nascimento é obrigatória.');
}

if (isNaN(Date.parse(animal.data_de_nascimento))) {
    throw new Error('A data de nascimento é inválida.');
}

if (animal.castrado === undefined) {
    throw new Error('Informe se o animal é castrado.');
}

if (animal.castrado !== true) {
    if (animal.castrado !== false) {
        if (animal.castrado != 1) {
            if (animal.castrado != 0) {
                throw new Error('O campo castrado deve ser verdadeiro ou falso.');
            }
        }
    }
}

if (!animal.sexo) {
    throw new Error('O sexo é obrigatório.');
}

animal.sexo = animal.sexo.toLowerCase();

if (animal.sexo !== 'masculino') {
    if (animal.sexo !== 'feminino') {
        throw new Error('O sexo deve ser masculino ou feminino.');
    }
}

if (!animal.porte) {
    throw new Error('O porte é obrigatório.');
}

if (typeof animal.porte !== 'string') {
    throw new Error('O porte deve ser um texto.');
}

animal.porte = animal.porte.toLowerCase();

if (animal.porte !== 'pequeno') {
    if (animal.porte !== 'medio') {
        if (animal.porte !== 'grande') {
            throw new Error('O porte deve ser pequeno, medio ou grande.');
        }
    }
}

if (!animal.descricao) {
    throw new Error('A descrição é obrigatória.');
}


}

export function ExcluirAnimalValidation(id){
    if(!id) throw new Error("O ID é obrigatório");

    if(isNaN(id)) throw new Error("O ID deve ser um número");
    
}