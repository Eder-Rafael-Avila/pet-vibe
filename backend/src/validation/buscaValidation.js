export function BuscarAnimaisErrors(filtros) {
    const { tipo, raca, castrado, sexo, porte } = filtros;

    if (tipo !== undefined) {
        if (!['Cachorro', 'Gato'].includes(tipo)) {
            throw new Error('Tipo de animal inválido');
        }
    }

    if (raca !== undefined) {
        if (typeof raca !== 'string' || raca.trim() === '') {
            throw new Error('A raça não pode estar vazia');
        }
    }

    if (castrado !== undefined) {
        if (!['true', 'false'].includes(castrado)) {
            throw new Error('Castrado deve ser true ou false');
        }
    }

    if (sexo !== undefined) {
        if (!['masculino', 'feminino'].includes(sexo)) {
            throw new Error('Sexo inválido');
        }
    }

    if (porte !== undefined) {
        if (!['pequeno', 'medio', 'grande'].includes(porte)) {
            throw new Error('Porte inválido');
        }
    }
}
