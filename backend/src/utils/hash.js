import bcrypt from 'bcrypt';

export async function gerarHash(senha) {
    return bcrypt.hash(senha, 12);
}

export async function compararSenha(senha, hash) {
    return bcrypt.compare(senha, hash);
}
