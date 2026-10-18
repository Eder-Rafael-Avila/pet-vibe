export async function ListarPorNomeValidation(nome) {
    if (!nome) throw new Error("O nome do animal é obrigatório.");
}

export function CriarAnimalValidation(animal) {

    if (!animal.imagem) {
        throw new Error('Envie uma imagem do animal.');
    }

    if (!animal.nome) {
        throw new Error('Informe o nome do animal.');
    }

    if (!animal.idade && animal.idade !== 0) {
        throw new Error('Informe a idade do animal.');
    }

    if (isNaN(animal.idade)) {
        throw new Error('A idade do animal deve ser um número.');
    }

    if (animal.idade < 0) {
        throw new Error('A idade do animal não pode ser negativa.');
    }

    if (!animal.raca) {
        throw new Error('Informe a raça do animal.');
    }

    if (!animal.data_de_nascimento) {
        throw new Error('Informe a data de nascimento do animal.');
    }


    if (isNaN(Date.parse(animal.data_de_nascimento))) {
        throw new Error('A data de nascimento informada é inválida.');
    }

    if (animal.castrado === undefined) {
        throw new Error('Informe se o animal é castrado.');
    }

    if (animal.castrado !== true) {
        if (animal.castrado !== false) {
            if (animal.castrado != 1) {
                if (animal.castrado != 0) {
                    throw new Error('Informe se o animal é castrado utilizando um valor verdadeiro ou falso.');
                }
            }
        }
    }

    if (!animal.sexo) {
        throw new Error('Informe o sexo do animal.');
    }

    animal.sexo = animal.sexo.toLowerCase();

    if (animal.sexo !== 'masculino') {
        if (animal.sexo !== 'feminino') {
            throw new Error('O sexo do animal deve ser masculino ou feminino.');
        }
    }

    if (!animal.porte) {
        throw new Error('Informe o porte do animal.');
    }

    if (typeof animal.porte !== 'string') {
        throw new Error('O porte do animal deve ser informado como texto.');
    }

    animal.porte = animal.porte.toLowerCase();

    if (animal.porte !== 'pequeno') {
        if (animal.porte !== 'medio') {
            if (animal.porte !== 'grande') {
                throw new Error('O porte do animal deve ser pequeno, médio ou grande.');
            }
        }
    }

    if (!animal.descricao) {
        throw new Error('Informe uma descrição para o animal.');
    }

}

export function ExcluirAnimalValidation(id) {
    if (!id) throw new Error("Informe o ID do animal.");

    if (isNaN(id)) throw new Error("O ID do animal deve ser um número válido.");
}
