const VALOR_MAXIMO_DOACAO = 99999999.99;

export function DoarParaCampanhaErrors(valor, id) {
    if (valor === undefined || valor === null || valor === '') {
        throw new Error('Informe o valor da doação.');
    }

    if (typeof valor !== 'number' || !Number.isFinite(valor)) {
        throw new Error('O valor da doação deve ser um número válido.');
    }

    if (valor <= 0) {
        throw new Error('O valor da doação deve ser maior que zero.');
    }

    if (valor > VALOR_MAXIMO_DOACAO) {
        throw new Error('O valor da doação excede o limite permitido.');
    }

    if (Number(valor.toFixed(2)) !== valor) {
        throw new Error('A doação deve ter no máximo duas casas decimais.');
    }

    CampanhaIdErrors(id);
}

export function CampanhaIdErrors(id) {
    if (!id) throw new Error('Informe o ID da campanha.');

    if (typeof id !== 'number' && typeof id !== 'string') {
        throw new Error('Informe um ID de campanha válido.');
    }
    if (!Number.isSafeInteger(Number(id))) {
        throw new Error('O ID da campanha deve ser um número inteiro válido.');
    }

    if (id <= 0) {
        throw new Error('O ID da campanha deve ser maior que zero.');
    }
}

export function CampanhaOngErrors(id) {
    if (!id) throw new Error('Informe o ID da ONG.');

    if (typeof id !== 'number' && typeof id !== 'string') {
        throw new Error('Informe um ID de ONG válido.');
    }
    if (!Number.isSafeInteger(Number(id))) {
        throw new Error('O ID da ONG deve ser um número inteiro válido.');
    }

    if (id <= 0) {
        throw new Error('O ID da ONG deve ser maior que zero.');
    }
}

export function DadosCampanhaErrors(dados) {
    if (!dados) throw new Error('Informe os dados da campanha.');

    let campanha;
    try {
        campanha = JSON.parse(dados);
    }
    catch {
        throw new Error('Envie o campo dados com um JSON válido.');
    }
    if (!campanha || typeof campanha !== 'object' || Array.isArray(campanha)) {
        throw new Error('O campo dados deve conter um objeto JSON.');
    }
    return campanha;
}

export function CriarCampanhaErrors(campanha, idOng) {
    CampanhaOngErrors(idOng);

    if (!campanha?.imagem) throw new Error('Envie uma imagem para a campanha.');
    if (typeof campanha.titulo !== 'string' || !campanha.titulo.trim()) {
        throw new Error('Informe o título da campanha.');
    }
    if (campanha.titulo.length > 200) throw new Error('O título deve ter no máximo 200 caracteres.');
    if (typeof campanha.descricao !== 'string' || !campanha.descricao.trim()) {
        throw new Error('Informe uma descrição para a campanha.');
    }
    if (campanha.valor === undefined || campanha.valor === null || campanha.valor === '') {
        throw new Error('Informe a meta da campanha.');
    }

    if (typeof campanha.valor !== 'number' || !Number.isFinite(campanha.valor)) {
        throw new Error('A meta da campanha deve ser um número válido.');
    }

    if (campanha.valor <= 0) {
        throw new Error('A meta da campanha deve ser maior que zero.');
    }

    if (campanha.valor > VALOR_MAXIMO_DOACAO) {
        throw new Error('A meta excede o limite permitido.');
    }

    if (Number(campanha.valor.toFixed(2)) !== campanha.valor) {
        throw new Error('A meta deve ter no máximo duas casas decimais.');
    }
}

export function ExcluirCampanhaErrors(quantidade) {
    if (quantidade === 0) throw new Error('Campanha não encontrada ou não pertence à sua ONG.');
}

export function DoacaoCampanhaErrors(quantidade) {
    if (quantidade === 0) throw new Error('Campanha não encontrada.');
}

export function SaldoDoacaoErrors(quantidade) {
    if (quantidade === 0) throw new Error('Saldo insuficiente na carteira para realizar esta doação.');
}

export function CampanhaDaOngErrors(quantidade) {
    if (quantidade === 0) throw new Error('Campanha não encontrada ou não pertence à sua ONG.');
}
