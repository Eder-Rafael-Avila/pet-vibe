import './index.scss';

import Header from '../../components/header/index.jsx';
import MainPanel from '../../components/main-panel';

import { useState } from 'react';

export default function Home() {
    const [logado, setLogado] = useState(false);

    return (
        <div className='page-home'>
            <Header
                logado={logado}
            />

            <MainPanel />

            <section className="features">
                <div className="item-features">
                    <div className="feature-icon">
                        <i class="fa-solid fa-hexagon-nodes" style={{color: "rgb(29, 91, 158)",}}></i>
                    </div>
                    <div className="feature-text">
                        <h3>Match inteligente</h3>
                        <p>
                            Cruzamento preciso de rotina e temperamento
                        </p>
                    </div>
                </div>
                <div className="item-features">
                    <div className="feature-icon">
                        <i class="fa-solid fa-shield-heart" style={{color: "rgb(29, 91, 158)",}}></i>
                    </div>
                    <div className="feature-text">
                        <h3>ONGs e Abrigos Verificados</h3>
                        <p>
                            Parceiros sérios e comprometidos com a saúde
                        </p>
                    </div>
                </div>
                <div className="item-features">
                    <div className="feature-icon">
                        <i class="fa-solid fa-stamp" style={{color: "rgb(29, 91, 158)",}}></i>
                    </div>
                    <div className="feature-text">
                        <h3>Adoção Simplificada</h3>
                        <p>
                            Processo 100% digitalizado e guiado por especialistas
                        </p>
                    </div>
                </div>
                <div className="item-features">
                    <div className="feature-icon">
                        <i class="fa-solid fa-heart-pulse" style={{color: "rgb(29, 91, 158)",}}></i>
                    </div>
                    <div className="feature-text">
                        <h3>Suporte e Monitoramento Pós-Adoção</h3>
                        <p>
                            Tire dúvidas sobre adaptação e garanta a saúde do pequeno
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}