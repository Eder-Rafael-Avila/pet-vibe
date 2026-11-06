export default function recortarImagem(imagemSrc, area) {
    return new Promise((resolve, reject) => {
        const imagem = new Image();

        imagem.onload = () => {
            const canvas = document.createElement('canvas');
            const contexto = canvas.getContext('2d');

            canvas.width = area.width
            canvas.height = area.height

            contexto.drawImage(
                imagem,
                area.x,
                area.y,
                area.width,
                area.height,
                0,
                0,
                area.width,
                area.height
            );

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Não foi possível recortar a imagem.'));
                    return;
                }

                resolve(blob);
            }, 'image/jpeg', 0.9);
        };

        imagem.onerror = () => {
            reject(new Error('Não foi possível carregar a imagem.'));
        };

        imagem.src = imagemSrc;
    })
}