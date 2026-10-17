
import './index.scss';

import { useState } from 'react';
import { FaPaw, FaSlidersH, FaSearch } from 'react-icons/fa';

import Header from '../../components/header/index.jsx';
import CardAnimais from '../card-animal/index.jsx';

export default function Adocao() {
    const [animal, setAnimal] = useState('');
    const [castrado, setCastrado] = useState('');
    const [sexo, setSexo] = useState('Todos');
    const [raca, setRaca] = useState('');
    const [porte, setPorte] = useState('');

    return (
        <div className="page-adocao">
            <Header />

            <div className="filtros">
                <h1>Encontre o companheiro ideal para você</h1>

            <div className="linha-filtros">
                <div className="quadros">
                    <h3>Tipo</h3>
        <div className="opcoes">
                    <button
                        type="button"
                        className={animal === 'Cachorro' ? 'selecionado' : ''}
                        onClick={() => setAnimal('Cachorro')}
                    >
                        Cachorro
                    </button>

                    <button
                        type="button"
                        className={animal === 'Gato' ? 'selecionado' : ''}
                        onClick={() => setAnimal('Gato')}
                    >
                        Gato
                    </button>
                </div>
</div>  
                <div className="quadros">
                    <h3>Raça</h3>

                    <FaPaw />

                    <input
                        type="text"
                        placeholder="Digite a raça"
                        value={raca}
                        onChange={(e) => setRaca(e.target.value)}
                    />
                    <FaSearch/>
                </div>
                <div className="quadros">
                    <h3>Sexo</h3>
        <div className="opcoes">
                    <button
                        type="button"
                        className={sexo === 'Masculino' ? 'selecionado' : ''}
                        onClick={() => setSexo('Masculino')}
                    >
                        Masculino
                    </button>

                    <button
                        type="button"
                        className={sexo === 'Feminino' ? 'selecionado' : ''}
                        onClick={() => setSexo('Feminino')}
                    >
                        Feminino
                    </button>
                </div>
                </div>

                <div className="quadros">
                    <h3>Castrado?</h3>
        <div className="opcoes">
                    <button
                        type="button"
                        className={castrado === 'Sim' ? 'selecionado' : ''}
                        onClick={() => setCastrado('Sim')}
                    >
                        Sim
                    </button>

                    <button
                        type="button"
                        className={castrado === 'Não' ? 'selecionado' : ''}
                        onClick={() => setCastrado('Não')}
                    >
                        Não
                    </button>
                </div>
                </div>
                <div className="quadros">
                    <h3>Porte</h3>
        
        <div className="opcoes">
                    <button
                        type="button"
                        className={porte === 'Pequeno' ? 'selecionado' : ''}
                        onClick={() => setPorte('Pequeno')}
                    >
                        Pequeno
                    </button>

                    <button
                        type="button"
                        className={porte === 'Médio' ? 'selecionado' : ''}
                        onClick={() => setPorte('Médio')}
                    >
                        Médio
                    </button>

                    <button 
                    type='button'
                    className={porte === 'Grande' ? 'selecionado' : ''}
                    onClick={() => setPorte('Grande')}>
                        Grande
                    </button>
                </div>
</div>
</div>
                <div className="btn-animais">
                    <button className='btn-busca'>
                        <h2>
                            Buscar Animais <FaSearch />
                        </h2>
                    </button>
                </div>
                <p>
                Cada personalidade é única. Use os filtros para começar e
                descubra quem combina com a sua rotina.
            </p>
            </div>
        

            

            <section className="VerAnimais">
                    <div className="titulos">
                        <h3>SEU PRÓXIMO GRANDE ENCONTRO</h3>

                        <h1>Animais esperando por um lar</h1>
                    </div>
                <p>
                    Conheça algumas das histórias que podem ganhar um novo
                    capítulo com você.
                </p>

                <div className="cont-cards">
                    <CardAnimais
                        imagem="/assets/images/maxsuel.webp"
                        status="Disponível para adoção"
                        nome="Maxwell"
                        especie="Gato"
                        idade="6 meses"
                        genero="Macho"
                        porte="Pequeno"
                        localizacao="São Paulo, SP"
                        desc="Um explorador que adora moggar os betinhas"
                    />

                    <button type="button" className="btn-conhecer">
                        Conhecer
                    </button>
                </div>
            </section>
        </div>
    );
}
