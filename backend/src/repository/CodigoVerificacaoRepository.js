const codigosUsuarios = {};
const codigosOngs = {};
const codigosCadastroUsuarios = new Map();

export function SalvarCodigoCadastroUsuario(email, codigo) {
    codigosCadastroUsuarios.set(email, {
        codigo: String(codigo),
        expiraEm: Date.now() + 600000
    });
}

export function BuscarCodigoCadastroUsuario(email) {
    return codigosCadastroUsuarios.get(email);
}

export function ExcluirCodigoCadastroUsuario(email) {
    codigosCadastroUsuarios.delete(email);
}

export function SalvarCodigoUsuario(idUsuario, codigo) {
    codigosUsuarios[idUsuario] = {
        codigo: String(codigo),
        expiraEm: Date.now() + 600000
    };
}

export function BuscarCodigoUsuario(idUsuario) {
    return codigosUsuarios[idUsuario];
}

export function ExcluirCodigoUsuario(idUsuario) {
    delete codigosUsuarios[idUsuario];
}

export function SalvarCodigoOng(idOng, codigo) {
    codigosOngs[idOng] = {
        codigo: String(codigo),
        expiraEm: Date.now() + 600000
    };
}

export function BuscarCodigoOng(idOng) {
    return codigosOngs[idOng];
}

export function ExcluirCodigoOng(idOng) {
    delete codigosOngs[idOng];
}
