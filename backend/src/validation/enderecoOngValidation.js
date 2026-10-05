

export function CriarEnderecoOngErrors(endereco) {
    if (!endereco) throw new Error("O campo endereco é obrigatório");

    if (!endereco.cep) throw new Error("O campo cep é obrigatório");
    if (isNaN(endereco.cep)) throw new Error("O campo de CEP é obrigatóriamente Number");

    if (!endereco.rua) throw new Error("O campo rua é obrigatório");

    if (isNaN(endereco.numero)) throw new Error("O campo de numero é obrigatóriamente Number");

    if (!endereco.numero) throw new Error("O campo numero é obrigatório");

    if (!endereco.complemento) throw new Error("O campo complemento é obrigatório");

    if (!endereco.bairro) throw new Error("O campo bairro é obrigatório");

    if (!endereco.cidade) throw new Error("O campo cidade é obrigatório");

    if (!endereco.estado) throw new Error("O campo estado é obrigatório");

    if (endereco.estado > 2) throw new Error("O estado deve ser representada com sigla Ex: SP");
}