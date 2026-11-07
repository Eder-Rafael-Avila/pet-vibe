import * as DBOng from '../../repository/OngRepository.js';

export async function BuscarEmailPorIdOngService(idOng) {
    if (!idOng || Number.isNaN(Number(idOng))) {
        throw new Error('ID da ONG inválido.');
    }

    const ong = await DBOng.BuscarEmailPorId(idOng);

    if (!ong) {
        throw new Error('ONG não encontrada.');
    }

    return ong.email;
}
