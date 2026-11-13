import { jwtDecode } from 'jwt-decode';

export function obterDadosToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const dados = jwtDecode(token);
        return dados;
    } catch (e) {
        console.log('Token inválido', e);
        return null;
    }
}