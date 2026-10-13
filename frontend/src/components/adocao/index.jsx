import './index.scss';
import { FaCalendarDays, FaLocationDot, FaSliders, FaMagnifyingGlass }from "react-icons/fa6";
import Header from '../../components/header/index.jsx';
import CardAnimais from '../card-animal/index.jsx';

export default function Adocao(){
    return(

        <div className="page-adocao">
            <Header />
            <div className="filtros">
                <h1>titulo</h1>
                <div className="quadros">
                    <h3>Tipo</h3>
                    <button>Cachorro</button>
                    <button>Gato</button>
                </div>
                 <div className="quadros">
                    <h3>Localização</h3>
                    <FaLocationDot/>
                    <button>cidade ou estado</button>
                </div>
                 <div className="quadros">
                    <h3>Idade</h3>
                    <FaCalendarDays />
                    <button>Todas</button>
                </div>
                 <div className="quadros">
                    <h3>Sexo</h3>
            <FaSliders/>
                    <button>Todos</button>
                </div>
                <div className="btn-animais">
                    <button><h1>Buscar Animais<FaMagnifyingGlass /></h1></button>
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
        </div>
    )
}