import { cpf } from 'cpf-cnpj-validator';

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCelular = /^[1-9]{2}9\d{8}$/;

export function ListarUsuarioErrors(nome) {
    if (!nome) {
        throw new Error("O campo de nome é obrigatório");
    }
}


export function CriarUsuarioErrors(usuario) {
    if (!usuario.senha) throw new Error("O campo de senha é obrigatório");

    if (usuario.senha.length < 8) throw new Error("A senha deve conter no mínimo 8 caracteres");

    if (!usuario.nome) throw new Error("O campo de nome é obrigatório");

    if (!usuario.email) throw new Error("O campo de email é obrigatório");

    if (!regexEmail.test(usuario.email)) throw new Error("Email inválido");

    if (!usuario.telefone) throw new Error("O campo de telefone é obrigatório");

    if (!regexCelular.test(usuario.telefone)) throw new Error("Telefone inválido");

    if (!usuario.cpf) throw new Error("O campo de CPF é obrigatório");

    const cpfInformado = String(usuario.cpf);

    if(!usuario.confirmar_senha) throw new Error("O campo confirmar_senha é obrigatório");

    if(usuario.confirmar_senha != usuario.senha) throw new Error("O campo de confirmar_senha deve ser igual ao de senha");

    if (!cpf.isValid(cpfInformado)) throw new Error("CPF inválido");

    if (!usuario.data_nascimento) throw new Error("O campo de data_nascimento é obrigatório");
}

export function LoginUsuarioErrors(email, senha, usuario) {
    if (!regexEmail.test(email)) {
        throw new Error("E-mail inválido");
    }

    if (!usuario) {
        throw new Error("Nenhum usuário encontrado com essas informações");
    }

    if (usuario.senha !== senha) {
        throw new Error("Senha inválida");
    }
}


export function ImagemUsuarioErrors(file) {
    if (!file) {
        throw new Error("Imagem não enviada");

    }
}

export function ExcluirUsuarioErrors(idUsuario) {
    if (!idUsuario) throw new Error("O ID do usuário é obrigatório");
    if (isNaN(idUsuario)) throw new Error("O ID do usuário deve ser número");
}

export function AlterarSenhaUsuarioErrors(senha) {
    if (!senha) throw new Error("O campo de senha é obrigatório");


    if (senha.length < 8) throw new Error("A senha deve conter no mínimo 8 caracteres");
}


export function AlterarTelefoneUsuarioErrors(telefone) {
    if (!telefone) throw new Error("O campo de telefone é obrigatório");

    if (!regexCelular.test(telefone)) throw new Error("Telefone inválido");
}

export function AlterarEmailUsuarioErrors(email) {
    if (!email) throw new Error("O campo de email é obrigatório");

    if (!regexEmail.test(email)) throw new Error("Email inválido");
}
