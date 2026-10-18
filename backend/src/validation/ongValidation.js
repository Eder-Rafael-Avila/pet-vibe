import { cnpj } from "cpf-cnpj-validator";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCelular = /^[1-9]{2}9\d{8}$/;

export function ListarOngErrors(nome) {
    if (!nome) {
        throw new Error("Informe o nome da ONG.");
    }
}

export function CriarOngErrors(ong) {
    if (!ong.nome) throw new Error("Informe o nome da ONG.");

    if (!ong.email) throw new Error("Informe o e-mail da ONG.");

    if (!regexEmail.test(ong.email)) throw new Error("O e-mail informado é inválido.");

    if (!ong.telefone) throw new Error("Informe o telefone da ONG.");

    if (!regexCelular.test(ong.telefone)) throw new Error("O telefone informado é inválido. Verifique o DDD e o número.");

    if (!ong.cnpj) throw new Error("Informe o CNPJ da ONG.");

    const cnpjInformado = String(ong.cnpj);

    if (!cnpj.isValid(cnpjInformado)) throw new Error("O CNPJ informado é inválido.");

    if (!ong.senha) throw new Error("Informe uma senha para a ONG.");

    if (ong.senha.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }

    if (!ong.descricao) throw new Error("Informe uma descrição para a ONG.");

    if (!ong.site) throw new Error("Informe o site da ONG.");
}

export function ImagemOngErrors(file) {
    if (!file) {
        throw new Error("Envie uma imagem para a ONG.");
    }
}

export function LoginOngErrors(email, senha, ong) {
    if (!email) {
        throw new Error("Informe o e-mail para realizar o login.");
    }

    if (!regexEmail.test(email)) {
        throw new Error("O e-mail informado é inválido.");
    }

    if (!senha) {
        throw new Error("Informe a senha para realizar o login.");
    }

    if (!ong) {
        throw new Error("Nenhuma ONG foi encontrada com as informações fornecidas.");
    }

    if (ong.senha !== senha) {
        throw new Error("A senha informada está incorreta.");
    }
}

export function ExcluirOngErrors(idOng) {
    if (!idOng) throw new Error("Informe o ID da ONG que deseja excluir.");

    if (isNaN(idOng)) throw new Error("O ID da ONG deve ser um número válido.");
}

export function AlterarSenhaOngErrors(senha) {
    if (!senha) throw new Error("Informe a nova senha da ONG.");

    if (senha.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres.");
    }
}

export function AlterarEmailOngErrors(email) {
    if (!email) throw new Error("Informe o novo e-mail da ONG.");

    if (!regexEmail.test(email)) throw new Error("O e-mail informado é inválido.");
}

export function AlterarSiteOngErrors(site) {
    if (!site) throw new Error("Informe o site da ONG.");
}

export function AlterarDescOngErrors(descricao) {
    if (!descricao) throw new Error("Informe uma descrição para a ONG.");
}
