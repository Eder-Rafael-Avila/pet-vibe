import usuario from './controller/UsuarioController.js';

export default function NovasRotas(api){
    api.use(usuario);
}