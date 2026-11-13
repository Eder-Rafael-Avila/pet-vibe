export function VerificarCadastroUsuarioErrors(email, codigo) {
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Informe um e-mail válido.');
    }

    if (typeof codigo !== 'string' || !/^\d{4}$/.test(codigo)) {
        throw new Error('Informe o código de quatro dígitos como texto.');
    }
}

export function CadastroPermitidoErrors(permissao, email) {
    if (permissao.permissao !== 'CadastroPermitido') {
        throw new Error('Token sem permissão para cadastrar usuário.');
    }

    if (permissao.email !== email) {
        throw new Error('O token de cadastro pertence a outro e-mail.');
    }
}
