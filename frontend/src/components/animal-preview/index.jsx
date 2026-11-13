import './index.scss';

import CardAdotados from '../card-adotados';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const animaisAdotados = [
    {
        nomeAnimal: 'Paçoca',
        imgAnimal: '/assets/images/paçoca.webp',
        previewHistAnimal: 'Paçoca vivia em um abrigo até que Mariana encontrou seu perfil na PetVibe...',
        historiaAnimalExpandida: 'Paçoca vivia em um abrigo até que Mariana encontrou seu perfil na PetVibe. Encantada com seu jeitinho tranquilo e brincalhão, decidiu entrar em contato com a ONG e iniciar o processo de adoção. Poucos dias depois, Paçoca já estava em seu novo lar! Aos poucos, se acostumou com a casa, encontrou seu cantinho favorito no sofá e conquistou toda a família. Hoje, sua rotina é cheia de passeios, carinho e boas sonecas. ❤️'
    },
    {
        nomeAnimal: 'Luke',
        imgAnimal: '/assets/images/luke.webp',
        previewHistAnimal: 'Luke conheceu o mundo das ruas antes de conhecer o conforto de um lar...',
        historiaAnimalExpandida: 'Luke conheceu o mundo das ruas antes de conhecer o conforto de um lar. Por muito tempo, precisou encontrar abrigo e comida por conta própria, sem saber quando teria um lugar seguro para descansar. Tudo mudou quando foi acolhido por pessoas que lhe deram a oportunidade de ter uma nova vida. Aos poucos, Luke se adaptou à sua nova casa, descobriu o prazer de brincar, receber carinho e aproveitar os pequenos momentos do dia. Hoje, ele vive feliz com sua família, cercado de amor, cuidado e segurança. Sua história é um lembrete de que a adoção pode transformar a vida de um animal e criar laços especiais que duram para sempre. Luke encontrou muito mais do que um lar: encontrou uma família para chamar de sua. 🐾'
    },
    {
        nomeAnimal: 'Beto',
        imgAnimal: '/assets/images/beto.webp',
        previewHistAnimal: 'Beto era um gato que vivia nas ruas e precisava encontrar um lugar seguro para morar...',
        historiaAnimalExpandida: 'Beto era um gato que vivia nas ruas e precisava encontrar um lugar seguro para morar. Sua história mudou quando uma família conheceu seu perfil no PetVibe e decidiu adotá-lo. Com a chegada ao novo lar, Beto passou a receber alimentação adequada, cuidados e muito carinho. Aos poucos, ele se adaptou à rotina da casa e conquistou o coração de todos. Hoje, Beto vive feliz com sua nova família, mostrando como a adoção responsável pode transformar a vida de um animal e criar laços especiais.'
    },
    {
        nomeAnimal: 'Wally',
        imgAnimal: '/assets/images/wallyotmzd.jpg',
        previewHistAnimal: 'Wally foi encontrado por uma ONG em uma praça...',
        historiaAnimalExpandida: 'Wally foi encontrado por uma ONG em uma praça, abandonado nas moitas por não se sabe quem. Uma família do sul de São Paulo entrou em contato através da PetVibe e o adotou com apenas 3 mêses de vida. hoje Wally vive em um ambiente carinhoso e confortável!'
    }
];

export default function AnimalPreview() {
    const [animalAtual, setAnimalAtual] = useState(0);

    const mostrarAnimalAnterior = () => {
        setAnimalAtual((atual) => (atual - 1 + animaisAdotados.length) % animaisAdotados.length);
    };

    const mostrarProximoAnimal = () => {
        setAnimalAtual((atual) => (atual + 1) % animaisAdotados.length);
    };

    return (
        <section className="comp-animal-preview">

            <aside className="container-adote">
                <h2>Dê à uma vida um novo lar.</h2>

                <div className="adote">
                    

                    <div className="direcionamento">
                        <span className='popup'>ADOÇÃO É CUIDAR DOS QUE MERECEM <i className="fa-regular fa-heart" style={{ color: "#f8561f" }}></i></span>

                        <div className="texto">
                            <h1>Encontre o seu <span>novo melhor amigo</span></h1>

                            <p>
                                Aqui você encontra animais com personalidades e histórias únicas, esperando por um lugar para chamar de lar.
                            </p>
                        </div>

                        <div className="botoes">
                            <NavLink to='/Adocao' className="btn ver-mais">
                                <i className="fa-solid fa-paw" style={{ color: "#ffff" }}></i>
                                Ver mais
                            </NavLink>

                            
                            <a href='#sobre' className="btn como-funciona">
                                <i className="fa-solid fa-sliders icone-funciona"></i>
                                Como funciona
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="container-animais">
                <div className="title">
                    <p className="subtitulo">HISTÓRIAS QUE INSPIRAM</p>
                    <h2>Animais que já acharam um lar</h2>
                    <p className="descricao">Conheça alguns finais felizes que começaram com uma adoção.</p>
                </div>

                <div className="carrossel-animais" role="region" aria-label="Histórias de animais adotados">
                    <div className="janela-carrossel">
                        <div
                            className="trilho-carrossel"
                            style={{ transform: `translateX(-${animalAtual * 100}%)` }}
                            aria-live="polite"
                        >
                            {animaisAdotados.map((animal, indice) => (
                                <div
                                    className="slide-animal"
                                    key={animal.nomeAnimal}
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${indice + 1} de ${animaisAdotados.length}`}
                                    aria-hidden={indice !== animalAtual}
                                    inert={indice !== animalAtual}
                                >
                                    <CardAdotados {...animal} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="controles-carrossel">
                        <button
                            className="seta-carrossel"
                            type="button"
                            aria-label="Mostrar história anterior"
                            onClick={mostrarAnimalAnterior}
                        >
                            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        </button>

                        <div className="indicadores-carrossel" aria-label="Selecionar história">
                            {animaisAdotados.map((animal, indice) => (
                                <button
                                    className={`indicador-carrossel${indice === animalAtual ? ' ativo' : ''}`}
                                    key={animal.nomeAnimal}
                                    type="button"
                                    aria-label={`Mostrar história de ${animal.nomeAnimal}`}
                                    aria-current={indice === animalAtual ? 'true' : undefined}
                                    onClick={() => setAnimalAtual(indice)}
                                />
                            ))}
                        </div>

                        <button
                            className="seta-carrossel"
                            type="button"
                            aria-label="Mostrar próxima história"
                            onClick={mostrarProximoAnimal}
                        >
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </main>
        </section>
    );
}