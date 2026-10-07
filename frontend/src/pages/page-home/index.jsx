import './index.scss';

import Header from '../../components/header/index.jsx';
import MainPanel from '../../components/main-panel';
import CardHome from '../../components/card-home';
import AnimalPreview from '../../components/animal-preview';

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
                        <i className="fa-solid fa-hexagon-nodes" style={{color: "#F8561F",}}></i>
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
                        <i className="fa-solid fa-shield-heart" style={{color: "#F8561F",}}></i>
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
                        <i className="fa-solid fa-stamp" style={{color: "#F8561F",}}></i>
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
                        <i className="fa-solid fa-heart-pulse" style={{color: "#F8561F",}}></i>
                    </div>
                    <div className="feature-text">
                        <h3>Suporte e Monitoramento Pós-Adoção</h3>
                        <p>
                            Tire dúvidas sobre adaptação e garanta a saúde do pequeno
                        </p>
                    </div>
                </div>
            </section>


            <hr/>

            <section className="step-cards">
                <h1>A jornada para encontrar o seu melhor amigo</h1>

                <div className="step-container">
                    <CardHome
                        icone={'1'}
                        titulo={'Preencha seu Perfil'}
                        desc={'Conte-nos sobre seu espaço, sua rotina, tempo livre e se tem outros pets.'}
                    />
                    <CardHome
                        icone={'2'}
                        titulo={'O Algoritmo Conecta'}
                        desc={'Analisamos centenas de cães e gatos em abrigos parceiros para achar sua vibe ideal.'}
                    />
                    <CardHome
                        icone={'3'}
                        titulo={'Conheça e Adote'}
                        desc={'Organizamos o encontro presencial e facilitamos os trâmites da adoção responsável.'}
                    />
                </div>
            </section>

            <section className='quiz-preview'>
                <div className="quiz-info">
                    <h2>Descubra o perfil ideal para sua rotina em <span>2 minutos</span></h2>

                    <p>
                        Alguns animais precisam de quintal espaçoso, outros vivem perfeitamente bem em apartamentos compactos. Uns adoram maratonar séries, outros precisam de 10km de corrida diária. Nós unimos os opostos ou celebramos as semelhanças!
                    </p>

                    <div className="bullet">
                        <span><i className="fa-regular fa-circle-check" style={{color: "rgb(255, 137, 5)",}}></i></span>
                        <h4>Perguntas fáceis de múltipla escolha</h4>
                    </div>

                    <div className="bullet">
                        <span><i className="fa-regular fa-circle-check" style={{color: "rgb(255, 137, 5)",}}></i></span>
                        <h4>Resultados imediatos com fotos reais de ONGs</h4>
                    </div>
                </div>
                <div className="quiz-preview-card">
                    <h3>Onde você mora?</h3>

                    <div className='options'>
                        <div className="op destaque">
                            <span><i className="fa-regular fa-building" style={{color: "#156957",}}></i></span>
                            <h4>Apartamento (sem quintal)</h4>
                        </div>
                        <div className="op">
                            <span><i className="fa-regular fa-house" style={{color: "#156957",}}></i></span>
                            <h4>Casa com quintal pequeno</h4>
                        </div>
                        <div className="op">
                            <span><i className="fa-solid fa-rocket" style={{color: "#156957",}}></i></span>
                            <h4>Casa com quintal amplo / Chácara</h4>
                        </div>
                    </div>

                    <p className='fake-button'>
                        Próxima pergunta (1/5) <i className="fa-solid fa-arrow-right" style={{color: "rgb(255, 255, 255)",}}></i>
                    </p>
                </div>
            </section>

            <AnimalPreview />
        </div>
    )
}