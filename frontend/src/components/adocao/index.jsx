import "./index.scss";

import { useState } from "react";
import {
  FaPaw,
  FaCheck,
  FaSearch,
  FaHeartbeat,
  FaHome,
  FaCalendarAlt,
  FaArrowRight,
  FaPlus, FaMinus
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import CardAnimais from "../card-animal/index.jsx";

export default function Adocao() {
  const [animal, setAnimal] = useState("");
  const [castrado, setCastrado] = useState("");
  const [sexo, setSexo] = useState("Todos");
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState("");

  const [aberta, setAberta] = useState(0);



   const perguntas = [
        {
            pergunta: 'O que preciso para adotar um animal?',
            resposta: 'Você precisa ter 18 anos ou mais, apresentar um documento e conversar com o responsável sobre sua rotina e seu lar. Cada ONG ou protetor pode ter critérios próprios, incluindo entrevista e assinatura de um termo de adoção responsável.'
        },
        {
            pergunta: 'A adoção tem algum custo?',
            resposta: 'A adoção pode ser gratuita ou incluir uma taxa para ajudar com os custos de vacinação, vermifugação e cuidados veterinários. Isso depende da ONG ou do protetor.'
        },
        {
            pergunta: 'Posso adotar se moro em apartamento?',
            resposta: 'Sim! O importante é oferecer um ambiente seguro, espaço adequado e tempo para cuidar do animal.'
        },
        {
            pergunta: 'Os animais são vacinados e castrados?',
            resposta: 'Isso depende do animal e da instituição responsável. Verifique as informações de vacinação e castração antes de concluir a adoção.'
        },
        {
            pergunta: 'Como funciona a adaptação em casa?',
            resposta: 'A adaptação exige paciência, carinho e uma rotina tranquila. Deixe o animal explorar o ambiente aos poucos e ofereça um local seguro para descansar.'
        }
    ];


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
                className={animal === "Cachorro" ? "selecionado" : ""}
                onClick={() => setAnimal("Cachorro")}
              >
                Cachorro
              </button>

              <button
                type="button"
                className={animal === "Gato" ? "selecionado" : ""}
                onClick={() => setAnimal("Gato")}
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
            <FaSearch />
          </div>
          <div className="quadros">
            <h3>Sexo</h3>
            <div className="opcoes">
              <button
                type="button"
                className={sexo === "Masculino" ? "selecionado" : ""}
                onClick={() => setSexo("Masculino")}
              >
                Masculino
              </button>

              <button
                type="button"
                className={sexo === "Feminino" ? "selecionado" : ""}
                onClick={() => setSexo("Feminino")}
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
                className={castrado === "Sim" ? "selecionado" : ""}
                onClick={() => setCastrado("Sim")}
              >
                Sim
              </button>

              <button
                type="button"
                className={castrado === "Não" ? "selecionado" : ""}
                onClick={() => setCastrado("Não")}
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
                className={porte === "Pequeno" ? "selecionado" : ""}
                onClick={() => setPorte("Pequeno")}
              >
                Pequeno
              </button>

              <button
                type="button"
                className={porte === "Médio" ? "selecionado" : ""}
                onClick={() => setPorte("Médio")}
              >
                Médio
              </button>

              <button
                type="button"
                className={porte === "Grande" ? "selecionado" : ""}
                onClick={() => setPorte("Grande")}
              >
                Grande
              </button>
            </div>
          </div>
        </div>
        <div className="btn-animais">
          <button className="btn-busca">
            <h2>
              Buscar Animais <FaSearch />
            </h2>
          </button>
        </div>
        <p>
          Cada personalidade é única. Use os filtros para começar e descubra
          quem combina com a sua rotina.
        </p>
      </div>

      <section className="VerAnimais">
        <div className="titulos">
          <h3>SEU PRÓXIMO GRANDE ENCONTRO</h3>

          <h1>Animais esperando por um lar</h1>
        </div>

        <div className="p">
          <p>
            Conheça algumas das histórias que podem ganhar um novo capítulo com
            você.
          </p>
        </div>

        <div className="cont-cards">
          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />

          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />

          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />

          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />
          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />
          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />
          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />
          <CardAnimais
            imagem="/assets/images/maxsuel.webp"
            status="Disponível para adoção"
            nome="Maxwell"
            especie="Gato"
            idade="6 meses"
            genero="Macho"
            localizacao="São Paulo, SP"
            porte="Pequeno"
            desc="Um explorador que adora moggar os betinhas"
            btn="Conhecer"
          />
        </div>
      </section>

      <section className="cards">
        <div className="card-adotar">
          <h3>AMOR TAMBÉM É COMPROMISSO</h3>

          <h1>
            Adotar é cuidar. <br />{" "}
            <span className="span-h1">Todos os dias.</span>
          </h1>
          <div className="p-adotar">
            <p>
              Antes de dar esse passo, pense no espaço, na sua rotina e nos
              cuidados por toda a vida.
            </p>
          </div>
        </div>
        <div className="topicos">
          <div className="card-topico">
            <FaCalendarAlt className="icone" />
            <h2>Tempo e presença</h2>
            <p>Passeios, brincadeiras e companhia fazem parte da rotina.</p>
          </div>
          <div className="card-topico">
            <FaHeartbeat className="icone" />
            <h2>Sáude e bem-estar</h2>
            <p>Planeje alimentação, vacinas e acompanhamento veterinário.</p>
          </div>
          <div className="card-topico">
            <FaHome className="icone" />
            <h2>Um lugar seguro</h2>
            <p>Telas, identificação e paciência para a adaptação.</p>
          </div>
        </div>
      </section>

      <section className="sobreNos">
        <div className="img">
          <img src="./public/assets/images/choro.webp" alt="" />
        </div>

        <div className="conteudo-sobre">
          <h3>SOBRE NÓS</h3>

          <h1>
            A gente acredita nos laços que mudam{" "}
            <span className="span-h1">vidas</span>
          </h1>

          <p>
            A Laço nasce para aproximar animais, pessoas e quem dedica a vida à
            proteção animal. Um espaço para dar visibilidade a cada história e
            facilitar encontros com cuidado e responsabilidade. <br /> <br />{" "}
            Aqui, a adoção não é uma escolha por impulso. É uma conversa, uma
            conexão e um compromisso com um novo integrante da família.
          </p>

          <div className="valores">
            <p>
              <FaCheck className="icone-check" /> Acolhimento
            </p>
            <p>
              <FaCheck className="icone-check" /> Transparência
            </p>
            <p>
              <FaCheck className="icone-check" /> Respeito
            </p>
          </div>

          <NavLink to="/SobreNos" className="link-iniciativa">
            <p>
              Conheça a iniciativa <FaArrowRight />
            </p>
          </NavLink>
        </div>
      </section>


      <section className="duvidas">
            <div className="texto-duvidas">
                <span>VAMOS CONVERSAR</span>

                <h1>
                    Toda boa escolha
                    começa com
                    informação.
                </h1>

                <p>
                    Reunimos algumas dúvidas comuns para você
                    dar o próximo passo com tranquilidade.
                </p>


            </div>

            <div className="perguntas">
                {perguntas.map((item, index) => (
                    <div className="pergunta" key={index}>
                        <button
                            className="pergunta-titulo"
                            onClick={() =>
                                setAberta(aberta === index ? -1 : index)
                            }
                        >
                            <span>{item.pergunta}</span>

                            {aberta === index ? (
                                <FaMinus />
                            ) : (
                                <FaPlus />
                            )}
                        </button>

                        {aberta === index && (
                            <p className="resposta">
                                {item.resposta}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>


      <section className="parte-baixo">
        <div className="conteudo-baixo">
          <h3>O PRÓXIMO CAPÍTULO É COM VOCÊ</h3>

          <h1>Seu novo melhor amigo está esperando.</h1>

          <p>Um lar muda a vida de um animal. E esse encontro pode mudar a sua também.</p>

          <button className="btn-baixo">Encontrar meu companheiro <FaArrowRight /> </button>
        </div>
      </section>
    </div>
  );
}
