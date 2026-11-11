function CodigoVerificacaoErrors(codigo, verificacao) {
    if (!verificacao) {
        throw new Error('Solicite um código primeiro.');
    }

    if (Date.now() > verificacao.expiraEm) {
        throw new Error('Código expirado. Solicite outro.');
    }

    if (String(codigo) !== verificacao.codigo) {
        throw new Error('Código incorreto.');
    }
}

export function CodigoVerificacaoUsuarioErrors(codigo, verificacao) {
    CodigoVerificacaoErrors(codigo, verificacao);
}

export function CodigoVerificacaoOngErrors(codigo, verificacao) {
    CodigoVerificacaoErrors(codigo, verificacao);
}
