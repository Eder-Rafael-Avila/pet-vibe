const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CriarOngErrors(ong) {
    if (!ong.senha) throw new Error("O campo de senha é obrigatório");

    if (ong.senha.length < 8) {
        throw new Error("A senha deve conter no mínimo 8 caracteres");
    }

    if (!ong.nome) throw new Error("O campo de nome é obrigatório");

    if (!ong.email) throw new Error("O campo de email é obrigatório");

    if (!regexEmail.test(ong.email)) throw new Error("Email inválido");
}

export function ImagemOngErrors(file){
        if (!file) {
throw new Error("Imagem não enviada");

    }
}

export function LoginOngErrors(email,senha,ong) {
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
