import usuario from './controller/UsuarioController.js';
import ong from './controller/OngController.js';

export default function NovasRotas(api){
    api.use(usuario);
    api.use(ong)
}