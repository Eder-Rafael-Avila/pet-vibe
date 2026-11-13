import * as DBOng from '../../repository/OngRepository.js';

export async function BuscarEmailPorIdOngService(idOng) {
    if (!idOng || Number.isNaN(Number(idOng))) {
        throw new Error('ID da ONG inválido.');
    }

    const email = await DBOng.BuscarEmailPorIdOng(idOng);

    if (!email) {
        throw new Error('Não foi possível encontrar o e-mail da ONG.');
    }

    return email;
}