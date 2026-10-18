export function CriarEnderecoOngErrors(endereco) {
    if (!endereco) throw new Error("Informe os dados do endereço.");

    if (!endereco.cep) throw new Error("Informe o CEP do endereço.");
    if (isNaN(endereco.cep)) throw new Error("O CEP deve conter apenas números.");

    if (!endereco.rua) throw new Error("Informe o nome da rua.");

    if (isNaN(endereco.numero)) throw new Error("O número do endereço deve ser um valor numérico.");

    if (!endereco.numero) throw new Error("Informe o número do endereço.");

    if (!endereco.complemento) throw new Error("Informe o complemento do endereço.");

    if (!endereco.bairro) throw new Error("Informe o bairro do endereço.");

    if (!endereco.cidade) throw new Error("Informe a cidade do endereço.");

    if (!endereco.estado) throw new Error("Informe a sigla do estado.");

    if (endereco.estado > 2) throw new Error("Informe a sigla do estado com duas letras. Exemplo: SP.");
}
