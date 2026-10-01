import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function gerarToken(usuario) {
    return jwt.sign(usuario, SECRET_KEY, { expiresIn: '1h' });
}

export function validarToken(req, resp, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return resp.status(401).send({ erro: 'Token não informado' });
        }

        req.usuario = jwt.verify(token, SECRET_KEY);
        next();
    } catch {
        return resp.status(401).send({ erro: 'Token inválido ou expirado' });
    }
}