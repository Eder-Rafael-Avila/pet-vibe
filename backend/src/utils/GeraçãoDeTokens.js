import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function gerarToken(usuario) {
    return jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });
}
