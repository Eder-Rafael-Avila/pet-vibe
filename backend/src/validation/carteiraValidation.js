const VALOR_MAXIMO_FUNDOS = 99999999.99;

export function AddFundosErrors(qtd) {
    if (qtd === undefined || qtd === null || qtd === '') {
        throw new Error('Informe a quantidade de fundos a adicionar.');
    }

    const valor = Number(qtd);

    if (!Number.isFinite(valor)) {
        throw new Error('A quantidade de fundos deve ser um número válido.');
    }

    if (valor <= 0) {
        throw new Error('A quantidade de fundos deve ser maior que zero.');
    }

    if (valor > VALOR_MAXIMO_FUNDOS) {
        throw new Error('A quantidade de fundos excede o limite permitido.');
    }

    const valorEmCentavos = valor * 100;
    if (Math.abs(valorEmCentavos - Math.round(valorEmCentavos)) > Number.EPSILON * 100) {
        throw new Error('A quantidade de fundos deve ter no máximo duas casas decimais.');
    }
}

export function CarteiraIdErrors(id) {
    if (!id) {
        throw new Error('O ID do usuário é obrigatório');
    }
}
