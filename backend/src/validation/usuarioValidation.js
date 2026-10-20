import { cpf } from 'cpf-cnpj-validator';

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCelular = /^\([1-9]{2}\) 9\d{4}-\d{4}$/;

export function ListarUsuarioErrors(nome) {
    if (!nome) {
        throw new Error("Informe o nome do usuário.");
    }
}

export function CriarUsuarioErrors(usuario) {
    if (!usuario.senha) throw new Error("Informe uma senha para continuar.");

    if (usuario.senha.length < 8) throw new Error("A senha deve ter pelo menos 8 caracteres.");

    if (!usuario.nome) throw new Error("Informe o nome do usuário.");

    if (!usuario.email) throw new Error("Informe o e-mail do usuário.");

    if (!regexEmail.test(usuario.email)) throw new Error("O e-mail informado é inválido.");

    if (!usuario.telefone) throw new Error("Informe o telefone do usuário.");

    if (!regexCelular.test(usuario.telefone)) throw new Error("O telefone informado é inválido. Verifique o DDD e o número.");

    if (!usuario.cpf) throw new Error("Informe o CPF do usuário.");

    const cpfInformado = String(usuario.cpf);

    if (!usuario.confirmar_senha) throw new Error("Confirme a senha informada.");

    if (usuario.confirmar_senha != usuario.senha) throw new Error("A senha e a confirmação de senha não são iguais.");

    if (!cpf.isValid(cpfInformado)) throw new Error("O CPF informado é inválido.");

    if (!usuario.data_nascimento) throw new Error("Informe a data de nascimento do usuário.");
}


export function LoginUsuarioErrors(email, senha, usuario) {
    if (!regexEmail.test(email)) {
        throw new Error("O e-mail informado é inválido.");
    }

    if (!usuario) {
        throw new Error("Não foi encontrado nenhum usuário com as informações fornecidas.");
    }

    if (usuario.senha !== senha) {
        throw new Error("A senha informada está incorreta.");
    }
}

export function ImagemUsuarioErrors(file) {
    if (!file) {
        throw new Error("Selecione uma imagem para continuar.");
    }
}

export function ExcluirUsuarioErrors(idUsuario) {
    if (!idUsuario) throw new Error("Informe o ID do usuário que deseja excluir.");

    if (isNaN(idUsuario)) throw new Error("O ID do usuário deve ser um número válido.");
}

export function AlterarSenhaUsuarioErrors(senha) {
    if (!senha) throw new Error("Informe a nova senha.");

    if (senha.length < 8) throw new Error("A senha deve ter pelo menos 8 caracteres.");
}

export function AlterarTelefoneUsuarioErrors(telefone) {
    if (!telefone) throw new Error("Informe o novo telefone.");

    if (!regexCelular.test(telefone)) throw new Error("O telefone informado é inválido. Verifique o DDD e o número.");
}

export function AlterarEmailUsuarioErrors(email) {
    if (!email) throw new Error("Informe o novo e-mail.");

    if (!regexEmail.test(email)) throw new Error("O e-mail informado é inválido.");
}
