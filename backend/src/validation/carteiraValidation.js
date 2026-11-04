const VALOR_MAXIMO_FUNDOS = 99999999.99;

export function AddFundosErrors(qtd) {
    if (qtd === undefined || qtd === null || qtd === '') {
        throw new Error('Informe a quantidade de fundos a adicionar.');
    }

    const valor = Number(qtd);

    if (typeof qtd !== 'number' && typeof qtd !== 'string') {
        throw new Error('A quantidade de fundos deve ser um número válido.');
    }

    if (!Number.isFinite(valor)) {
        throw new Error('A quantidade de fundos deve ser um número válido.');
    }

    if (valor <= 0) {
        throw new Error('A quantidade de fundos deve ser maior que zero.');
    }

    if (valor > VALOR_MAXIMO_FUNDOS) {
        throw new Error('A quantidade de fundos excede o limite permitido.');
    }

    if (Number(valor.toFixed(2)) !== valor) {
        throw new Error('A quantidade de fundos deve ter no máximo duas casas decimais.');
    }
}

export function CarteiraIdErrors(id) {
    if (!id) throw new Error('Informe o ID do usuário.');

    if (typeof id !== 'number' && typeof id !== 'string') {
        throw new Error('Informe um ID de usuário válido.');
    }
    if (!Number.isSafeInteger(Number(id))) {
        throw new Error('O ID do usuário deve ser um número inteiro válido.');
    }

    if (id <= 0) {
        throw new Error('O ID do usuário deve ser maior que zero.');
    }
}
