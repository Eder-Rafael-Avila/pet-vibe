import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function gerarToken(usuario) {
    return jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            tipo: 'USUARIO'
        },
        SECRET_KEY,
        { expiresIn: '24h' }
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

export function gerarTokenValidacaoUsuario(idUsuario) {
    return jwt.sign(
        {
            permissao: "Permitido",
            id_usuario: idUsuario
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

export function gerarTokenValidacaoOng(idOng) {
    return jwt.sign(
        {
            permissao: 'Permitido',
            id_ong: idOng
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

export function verificarTokenValidacaoOng(token) {
    const tipoToken = jwt.verify(token, SECRET_KEY);

    if (tipoToken.permissao !== 'Permitido' || !tipoToken.id_ong) {
        throw new Error('Token de permissão inválido.');
    }

    return tipoToken;
}

export async function validarTokenValidacaoUsuario(req, resp, next) {
    try {
        const token = req.headers.tokenpermitido;

        if (!token) {
            return next();
        }

        const tipoToken = jwt.verify(token, SECRET_KEY);

        if (tipoToken.permissao !== 'Permitido') {
            return resp.status(403).send({
                erro: 'Você não tem permissão para acessar esse serviço'
            });
        }

        if (tipoToken.id_usuario !== req.usuario.id_usuario) {
            return resp.status(403).send({ erro: 'Esse token pertence a outro usuário.' });
        }

        next();

    } catch {
        return resp.status(401).send({
            erro: 'Token de validação inválido ou expirado'
        });
    }
}

export function gerarTokenValidacaoOng(idOng) {
    return jwt.sign(
        {
            permissao: 'Permitido',
            id_ong: idOng
        },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
}

export function validarTokenValidacaoOng(req, resp, next) {
    try {
        const token = req.headers.tokenpermitidoong;

        if (!token) {
            return next();
        }

        const tokenOng = jwt.verify(token, SECRET_KEY);

        if (tokenOng.permissao !== 'Permitido') {
            return resp.status(403).send({ erro: 'Você não tem permissão para acessar esse serviço.' });
        }

        if (tokenOng.id_ong !== req.usuario.id_ong) {
            return resp.status(403).send({ erro: 'Esse token pertence a outra ONG.' });
        }

        next();
    } catch {
        return resp.status(401).send({ erro: 'Token de validação da ONG inválido ou expirado.' });
    }
}


export function gerarTokenOng(ong) {
    return jwt.sign(
        {
            id_ong: ong.id_ong,
            tipo: 'ONG'
        },
        SECRET_KEY,
        { expiresIn: '24h' }
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
