export function obterImagem(imagem) {

    const API_URL = 'http://localhost:6767';
    const imgDefault = '/assets/images/pfp.png';

    if (!imagem) return imgDefault;

    if (imagem.startsWith('http')) {
        return imagem;
    }

    return `${API_URL}${imagem}`;
}