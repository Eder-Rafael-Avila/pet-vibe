import './index.scss';

import CardAdotados from '../card-adotados';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function AnimalPreview() {

    return (
        <section className="comp-animal-preview">

            <aside className="container-adote">
                <h2>Dê à uma vida um novo lar.</h2>

                <div className="adote">
                    

                    <div className="direcionamento">
                        <span className='popup'>ADOÇÃO É CUIDAR DOS QUE MERECEM <i class="fa-regular fa-heart" style={{color: "#f8561f",}}></i></span>

                        <div className="texto">
                            <h1>Encontre o seu <span>novo melhor amigo</span></h1>

                            <p>
                                Aqui você encontra animais com personalidades e histórias únicas, esperando por um lugar para chamar de lar.
                            </p>
                        </div>

                        <div className="botoes">
                            <NavLink className="btn ver-mais">
                                <i class="fa-solid fa-paw" style={{color: "#ffff",}}></i>
                                Ver mais
                            </NavLink>
                            <a className="btn como-funciona">
                                <i class="fa-solid fa-sliders icone-funciona"></i>
                                Como funciona
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="container-animais">
                <div className="title">
                    <h2>Animais que já acharam um lar</h2>
                </div>

                <div className="animais">
                    <CardAdotados
                    imgAnimal={'/assets/images/luke.webp'}
                        nomeAnimal={'Luke'}
                        historiaAnimalExpandida={'Luke conheceu o mundo das ruas antes de conhecer o conforto de um lar. Por muito tempo, precisou encontrar abrigo e comida por conta própria, sem saber quando teria um lugar seguro para descansar. Tudo mudou quando foi acolhido por pessoas que lhe deram a oportunidade de ter uma nova vida. Aos poucos, Luke se adaptou à sua nova casa, descobriu o prazer de brincar, receber carinho e aproveitar os pequenos momentos do dia. Hoje, ele vive feliz com sua família, cercado de amor, cuidado e segurança. Sua história é um lembrete de que a adoção pode transformar a vida de um animal e criar laços especiais que duram para sempre. Luke encontrou muito mais do que um lar: encontrou uma família para chamar de sua. 🐾'}
                        previewHistAnimal={'Luke conheceu o mundo das ruas antes de conhecer o conforto de um lar...'}
                    />

                    <CardAdotados
                    imgAnimal={'/assets/images/beto.webp'}
                        nomeAnimal={'Luke'}
                        historiaAnimalExpandida={'Luke conheceu o mundo das ruas antes de conhecer o conforto de um lar. Por muito tempo, precisou encontrar abrigo e comida por conta própria, sem saber quando teria um lugar seguro para descansar. Tudo mudou quando foi acolhido por pessoas que lhe deram a oportunidade de ter uma nova vida. Aos poucos, Luke se adaptou à sua nova casa, descobriu o prazer de brincar, receber carinho e aproveitar os pequenos momentos do dia. Hoje, ele vive feliz com sua família, cercado de amor, cuidado e segurança. Sua história é um lembrete de que a adoção pode transformar a vida de um animal e criar laços especiais que duram para sempre. Luke encontrou muito mais do que um lar: encontrou uma família para chamar de sua. 🐾'}
                        previewHistAnimal={'Luke conheceu o mundo das ruas antes de conhecer o conforto de um lar...'}
                    />
                </div>
            </main>
        </section>
    );
}