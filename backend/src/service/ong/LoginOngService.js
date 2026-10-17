import * as DBOng from '../../repository/OngRepository.js';
import { LoginOngErrors } from '../../validation/ongValidation.js';

export async function LoginOngService(email, senha) {
    const ong = await DBOng.BuscarPorEmail(email);
    LoginOngErrors(email, senha, ong);
    return ong;
}