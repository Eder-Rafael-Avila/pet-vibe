import './index.scss';

import { FaPaw, FaSlidersH } from 'react-icons/fa';
import Header from '../../components/header/index.jsx';
import CardAnimais from '../card-animal/index.jsx';
import { useState } from 'react';

export default function Adocao(){


    const [animal, setAnimal] = useState('');
    const [castrado, setCastrado] = useState('');
    const [sexo, setSexo] = useState('Todos');



    return(

        <div className="page-adocao">
            <Header />
            <div className="filtros">
                <h1>Encontre o companheiro ideal para você</h1>
              
                   


        <div className="quadros">
            <h3>Tipo</h3>

            <button
                className={animal === 'Cachorro' ? 'selecionado' : ''}
                onClick={() => setAnimal('Cachorro')}
            >
                Cachorro
            </button>

            <button
                className={animal === 'Gato' ? 'selecionado' : ''}
                onClick={() => setAnimal('Gato')}
            >
                Gato
            </button>
       

<div className="quadros">
    <h3>Raça</h3>
    <FaPaw />
    <input type="text" placeholder="Digite a raça" />
</div>

<div className="quadros">
    <details>
        <summary>Castrado?</summary>

        <div className="opcoes">
            <button
                className={castrado === 'Sim' ? 'selecionado' : ''}
                onClick={() => setCastrado('Sim')}
            >
                Sim
            </button>

            <button
                className={castrado === 'Não' ? 'selecionado' : ''}
                onClick={() => setCastrado('Não')}
            >
                Não
            </button>
        </div>
    </details>
</div>

<div className="quadros">
    <h3>Sexo</h3>
    <FaSlidersH />

    <div className="opcoes">
        {['Todos', 'Macho', 'Fêmea'].map((opcao) => (
            <button
                key={opcao}
                className={sexo === opcao ? 'selecionado' : ''}
                onClick={() => setSexo(opcao)}
            >
                {opcao}
            </button>
        ))}
    </div>
</div>


<div className="quadros">
    <h3>Sexo</h3>
    <FaSlidersH />

    <div className="opcoes">
        {['Todos', 'Macho', 'Fêmea'].map((opcao) => (
            <button
                key={opcao}
                className={sexo === opcao ? 'selecionado' : ''}
                onClick={() => setSexo(opcao)}
            >
                {opcao}
            </button>
        ))}
    </div>
</div>
</div>

                <div className="btn-animais">
                    <button className='btn-busca'><h1>Buscar Animais<FaMagnifyingGlass /></h1></button>
                </div>
                  </div>
                <p>Cada personalidade é única. Use os filtros para começar e descubra quem combina com a sua rotina.    </p>


                <section className='VerAnimais'>
                    <h3>SEU PRÓXIMO GRANDE ENCONTRO</h3>
                    <h1>Animais esperando por um lar</h1>
                    <p>Conheça algumas das histórias que podem ganhar um novo capítulo com você. </p>


                    <div className="cont-cards">
                        <CardAnimais
                        imagem={'/public/assets/images/maxsuel.webp'}
                        status={'Disponivel para adoção'}
                        nome={'Maxwell'}
                        especie={'Gato'}
                        idade={'6 meses'}
                        genero={'Macho'}
                        porte={'Pequeno'}
                        localizacao={'São Paulo, SP'}
                        desc={'Um explorador que adora moggar os betinhas'}/>

                        <button className='btn-conhecer'>Conhecer</button>
                    </div>

                </section>

          
        </div>
    )
}