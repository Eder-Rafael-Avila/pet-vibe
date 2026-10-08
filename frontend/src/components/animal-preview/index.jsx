import './index.scss';

import { useState } from 'react';

export default function AnimalPreview() {

    const [descLukeExpandida, setDescLukeExpandida] = useState(false);
    const [descBetoExpandida, setDescBetoExpandida] = useState(false);

    return (
        <section className="comp-animal-preview">

            <aside className="container-adote">
                <h2>Dê à uma vida um novo lar.</h2>

                <div className="adote">
                    <button className='adote-button'>
                        Adote <i className='fa fa-arrow-right' />
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
                                    Nascido nas frestas de um terreno baldio, Beto conheceu a rua antes mesmo de desmamar. A vida no centro urbano o ensinou que a altura era sua única segurança: aprendeu a circular por muros altos, marquises e telhados para se esquivar de carros, cães agressivos e maus-tratos. Uma briga por território no passado lhe deixou uma orelha rasgada e um medo permanente do toque humano. Sua rotina era um ciclo exaustivo de hipervigilância, sobrevivendo com restos que encontrava nas lixeiras de madrugada e lidando com a fome crônica e o vento gelado que cortava os telhados nas noites de inverno.
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