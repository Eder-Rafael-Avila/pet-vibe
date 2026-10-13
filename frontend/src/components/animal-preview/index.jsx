import './index.scss';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function AnimalPreview() {

    const [descLukeExpandida, setDescLukeExpandida] = useState(false);
    const [descBetoExpandida, setDescBetoExpandida] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="comp-animal-preview">

            <aside className="container-adote">
                <h2>Dê à uma vida um novo lar.</h2>

                <div className="adote">
                    <button className='adote-button'>
                        <NavLink to='/Adocao'
                                 style={{
                                    color: isHovered ? "black" : "white",
                                    width: '100%',
                                    height: '100%',
                                    padding: '.8rem 2rem',
                                    textDecoration: "none"
                                 }}
                                 onMouseEnter={() => {setIsHovered(true)}}
                                 onMouseLeave={() => {setIsHovered(false)}}
                        ><p>Adote <i className='fa fa-arrow-right' /></p></NavLink>
                         
                    </button>
                </div>
            </aside>

            <main className="container-animais">
                <div className="container-luke">
                    <div className="animal-card card-luke">
                        <div className="photo luke">
                        </div>
                        <div className="desc">
                            <h3>Luke</h3>
                            {descLukeExpandida ? (
                                <p className='expanded-paragraph'>
                                    Luke conheceu o calor de uma cama de pano antes de ser deixado para trás. Já adulto e com as primeiras marcas grisalhas no focinho, foi abandonado no calçadão comercial quando a família para a qual vivia simplesmente mudou de endereço. Sem saber como agir no caos das ruas, passou meses esperando no mesmo lugar, encolhido sob o toldo de uma padaria fechada. Enfrentava a dor diária do esquecimento, vendo centenas de pessoas passarem sem encarar seus olhos, enquanto aprendia a lidar com o cansaço das longas caminhadas em busca de poças d'água limpa e a escassez de comida.
                                </p>
                            ) : (
                                <p className='paragraph-preview'>
                                    Luke conheceu o calor de uma cama de pano antes de ser deixado para trás...
                                </p>
                            )}
                
                            {descLukeExpandida ? (
                                <button className='botao' onClick={() => setDescLukeExpandida(!descLukeExpandida)}>
                                    Fechar
                                </button>
                            ) : (
                                <button className='botao' onClick={() => setDescLukeExpandida(!descLukeExpandida)}>
                                    Ler mais
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container-beto">
                    <div className="animal-card card-beto">
                        <div className="photo beto">
                
                        </div>
                        <div className="desc">
                            <h3>Beto</h3>
                            {descBetoExpandida ? (
                                <p className='expanded-paragraph'>
                                    Nascido em um terreno baldio, Beto conheceu o abandono antes mesmo de ser desmamado. No anoitecer das ruas, aprendeu a refugiar-se em telhados para escapar da violência, carregando no corpo as cicatrizes de antigas agressões e, na alma, o temor do contato humano. Condenado à fome, ao frio e à solidão, sobrevivia de restos encontrados nas lixeiras, enquanto contemplava, à distância, a segurança dos lares alheios. Sua maior tragédia, porém, não era a miséria, mas jamais ter conhecido o afeto, vivendo à margem de um mundo que parecia ter-lhe negado até mesmo o direito de ser amado.
                                </p>
                            ) : (
                                <p className='paragraph-preview'>
                                    Nascido nas frestas de um terreno baldio, Beto conheceu a rua antes mesmo de desmamar...
                                </p>
                            )}
                            {descBetoExpandida ? (
                                <button className='botao' onClick={() => setDescBetoExpandida(!descBetoExpandida)}>
                                    Fechar
                                </button>
                            ) : (
                                <button className='botao' onClick={() => setDescBetoExpandida(!descBetoExpandida)}>
                                    Ler mais
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}