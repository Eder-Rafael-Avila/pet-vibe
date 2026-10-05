import { cnpj } from "cpf-cnpj-validator";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCelular = /^[1-9]{2}9\d{8}$/;

export function ListarOngErrors(nome) {
    if (!nome) {
        throw new Error("O campo de nome é obrigatório");
    }
}

export function CriarOngErrors(ong) {
    if (!ong.nome) throw new Error("O campo de nome é obrigatório");

    if (!ong.email) throw new Error("O campo de email é obrigatório");

    if (!regexEmail.test(ong.email)) throw new Error("Email inválido");

    if (!ong.telefone) throw new Error("O campo de telefone é obrigatório");

    if (!regexCelular.test(ong.telefone)) throw new Error("Telefone inválido");

    if (!ong.cnpj) throw new Error("O campo de CNPJ é obrigatório");

    const cnpjInformado = String(ong.cnpj);

    if (!cnpj.isValid(cnpjInformado)) throw new Error("CNPJ inválido");

    if (!ong.senha) throw new Error("O campo de senha é obrigatório");

    if (ong.senha.length < 8) {
        throw new Error("A senha deve conter no mínimo 8 caracteres");
    }

    if (!ong.desc) throw new Error("O campo de descrição(desc) é obrigatória");

    if (!ong.site) throw new Error("O campo de site é obrigatório");





}

export function ImagemOngErrors(file) {
    if (!file) {
        throw new Error("Imagem não enviada");
    }
}

export function LoginOngErrors(email, senha, ong) {
    if (!email) {
        throw new Error("O campo de email é obrigatório");
    }

    if (!regexEmail.test(email)) {
        throw new Error("E-mail inválido");
    }

    if (!senha) {
        throw new Error("O campo de senha é obrigatório");
    }

    if (!ong) {
        throw new Error("Nenhum usuário encontrado com essas informações");
    }

    if (ong.senha !== senha) {
        throw new Error("Senha inválida");
    }
}

export function ExcluirOngErrors(idOng) {
    if (!idOng) throw new Error("O ID da ONG é obrigatório");
    if (isNaN(idOng)) throw new Error("O ID da ONG deve ser número");
}

export function AlterarSenhaOngErrors(senha) {
    if (!senha) throw new Error("O campo de senha é obrigatório");

    if (senha.length < 8) {
        throw new Error("A senha deve conter no mínimo 8 caracteres");
    }
}

export function AlterarEmailOngErrors(email) {
    if (!email) throw new Error("O campo de email é obrigatório");

    if (!regexEmail.test(email)) throw new Error("Email inválido");
}

export function AlterarSiteOngErrors(site) {
    if (!site) throw new Error("O campo de site é obrigatório");
}

export function AlterarDescOngErrors(descricao) {
    if (!descricao) throw new Error("O campo de descrição é obrigatório");
}
