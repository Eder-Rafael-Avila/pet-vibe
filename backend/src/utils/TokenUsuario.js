import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function gerarToken(usuario) {
    return jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            tipo: 'USUARIO'
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

export function validarToken(req, resp, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return resp.status(401).send({ erro: 'Token não informado' });
        }

        const tipoToken = jwt.verify(token, SECRET_KEY);

        if (tipoToken.tipo !== 'USUARIO') {
            return resp.status(403).send({
                erro: 'Token sem permissão para rotas de usuário'
            });
        }

        req.usuario = tipoToken;
        next();
    } catch {
        return resp.status(401).send({ erro: 'Token inválido ou expirado' });
    }
}

export function gerarTokenOng(ong) {
    return jwt.sign(
        {
            id_ong: ong.id_ong,
            tipo: 'ONG'
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

export function validarTokenOng(req, resp, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return resp.status(401).send({ erro: 'Token não informado' });
        }

        const tipoToken = jwt.verify(token, SECRET_KEY);

        if (tipoToken.tipo !== 'ONG') {
            return resp.status(403).send({
                erro: 'Token sem permissão para rotas de ONG'
            });
        }

        req.usuario = tipoToken;
        next();
    } catch {
        return resp.status(401).send({ erro: 'Token inválido ou expirado' });
    }
}
