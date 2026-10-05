import usuario from './controller/UsuarioController.js';
import ong from './controller/OngController.js';
import enderecoUsuario from './controller/EnderecoUsuarioController.js';
import prefs from './controller/PrefsController.js';
import enderecoOng from './controller/EnderecoOngController.js';

export default function NovasRotas(api) {
    api.use(usuario);
    api.use(ong)
    api.use(enderecoUsuario);
    api.use(prefs);
    api.use(enderecoOng);

}
