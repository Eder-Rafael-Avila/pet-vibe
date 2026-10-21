export function validarToken(token) {
    try {
        const partes = token.split('.');
        const payload = JSON.parse(atob(partes[1]));

        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }

}