import * as DBOng from '../../repository/OngRepository.js';

export async function BuscarEmailPorIdOngService(idOng) {
    const email = await DBOng.BuscarEmailPorIdOng(idOng);

    if (!email) {
        throw new Error('Não foi possível encontrar o e-mail da ONG.');
    }

    return email;
}
