import './index.scss';

import PerfilUsuario from '../../components/perfil/perfilUsuario';
import PerfilOng from '../../components/perfil/perfilOng';

export default function PagePerfil({ setUsuarioLogado, tipo }) {

    return (
        <main className='page-perfil'>
            {tipo === 'USUARIO' ? (
                <PerfilUsuario
                    setUsuarioLogado={setUsuarioLogado}
                />
            ) : tipo === 'ONG' ? (
                <PerfilOng
                    setUsuarioLogado={setUsuarioLogado}
                />
            ) : null}
        </main>
    );
}