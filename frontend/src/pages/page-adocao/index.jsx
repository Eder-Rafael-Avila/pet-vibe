import "./index.scss";

import { useState, useEffect } from "react";
import {
  FaPaw,
  FaCheck,
  FaSearch,
  FaHeartbeat,
  FaHome,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import Header from "../../components/header/index.jsx";
import CardAnimais from "../../components/card-animal/index.jsx";
import Footer from '../../components/footer';

export default function Adocao({
    usuarioLogado,
    setUsuarioLogado
}) {
  const [animal, setAnimal] = useState("");
  const [castrado, setCastrado] = useState("");
  const [sexo, setSexo] = useState("Todos");
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState("");

  const [aberta, setAberta] = useState(0);

  const [animais, setAnimais] = useState([]);

  function limparFiltros() {
    setAnimal('');
    setCastrado('');
    setSexo('Todos');
    setRaca('')
    setPorte('');
  }

  async function listarAnimais() {

    try {

      const resposta = await fetch('http://localhost:6767/animais/listar', {
        method: 'GET'
      });
  
      if (!resposta.ok) {
        throw new Error('Não foi possível listar os animais.');
      }

      const dados = await resposta.json();
      setAnimais(dados.resposta);

      console.log('Resposta completa da API:', dados);
      console.log('Dados dos Animais:', dados.resposta);
      console.log('É um array?', Array.isArray(dados.resposta))
  

    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    function pegarInfoAnimais() {
      const infoAnimais = listarAnimais();
      return infoAnimais;
    }

    pegarInfoAnimais();
  }, [])

  useEffect(() => {
    console.log('Estado dos Animais atualizado:', animais);
  }, [animais])

  return (
    <div className="page-adocao">
      <Header
        logado={usuarioLogado}
        setUsuarioLogado={setUsuarioLogado}
      />

      <div className="filtros">
        <h1>Encontre o companheiro ideal para você</h1>

        <div className="cont-limpar">
          <button
            className="limpar-filtros"
            onClick={limparFiltros}
          >Limpar filtros</button>
        </div>

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

            <div className="icons-input">
              <FaPaw />
              <input
                type="text"
                placeholder="Digite a raça"
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
              />
              <FaSearch />
            </div>
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
        {animais.length != 0 ? (<div className="cont-cards">
          {animais.map((animal) => (
            <CardAnimais
              key={animal.id_animal}
              imagem={'/assets/images/maxsuel.webp'}
              nome={animal.nome_animal}
              especie={animal.tipo}
              idade={animal.idade}
              genero={animal.sexo}
              castrado={animal.castrado == 1 ? 'castrado' : 'não castrado'}
              porte={animal.porte}
              desc={animal.desc}
              btn='Adotar animal'
            />
          ))}
        </div>) : (
          <div className="animals-not-found">
            <h2>Nenhum animal encontrado <i class="fa-solid fa-spinner icone-girando"></i></h2>

            <div className="img">
              <img src="/assets/images/optimized-notfound2.png" alt="" />
            </div>
          </div>
        )}
      </section>

      <hr />

      

      <section className="sobreNos">
        <div className="img">
          <img src="./public/assets/images/choro.webp" alt="" />
        </div>

        <div className="conteudo-sobre">
          <h1>
            A gente acredita nos laços que mudam vidas
          </h1>

          <p>
            A <span className="pet">Pet</span><span className="vibe">Vibe</span> nasce para aproximar animais, pessoas e quem dedica a vida à
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
          <h3>VAMOS CONVERSAR</h3>

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
          <div className={`pergunta ${aberta === 1 ? 'aberto' : ''}`}>
            <button onClick={() => setAberta(aberta === 1 ? 0 : 1)}
              id="initial"  
            >
              O que preciso para adotar um animal?
              <span>{aberta === 1 ? '−' : '+'}</span>
            </button>

            <div className="resposta">
              <p>
                Você precisa ter 18 anos ou mais, apresentar um
                documento e conversar com o responsável sobre sua
                rotina e seu lar. Cada ONG ou protetor pode ter
                critérios próprios, incluindo entrevista e assinatura
                de um termo de adoção responsável.
              </p>
            </div>
          </div>

          <div className={`pergunta ${aberta === 2 ? 'aberto' : ''}`}>
            <button onClick={() => setAberta(aberta === 2 ? 0 : 2)}>
              A adoção tem algum custo?
              <span>{aberta === 2 ? '−' : '+'}</span>
            </button>

            <div className="resposta">
              <p>
                A adoção pode ser gratuita ou incluir uma taxa para
                ajudar com os custos de vacinação, vermifugação e
                cuidados veterinários. Isso depende da ONG ou do
                protetor.
              </p>
            </div>
          </div>


          <div className={`pergunta ${aberta === 3 ? 'aberto' : ''}`}>
            <button onClick={() => setAberta(aberta === 3 ? 0 : 3)}>
              Posso adotar se moro em apartamento?
              <span>{aberta === 3 ? '−' : '+'}</span>
            </button>

            <div className="resposta">
              <p>
                Sim! O importante é oferecer um ambiente seguro,
                espaço adequado e tempo para cuidar do animal,
                respeitando as necessidades dele.
              </p>
            </div>
          </div>


          <div className={`pergunta ${aberta === 4 ? 'aberto' : ''}`}>
            <button onClick={() => setAberta(aberta === 4 ? 0 : 4)}>
              Os animais são vacinados e castrados?
              <span>{aberta === 4 ? '−' : '+'}</span>
            </button>

            <div className="resposta">
              <p>
                Isso depende do animal e da instituição responsável.
                Verifique as informações de vacinação e castração
                antes de concluir a adoção.
              </p>
            </div>
          </div>


          <div className={`pergunta ${aberta === 5 ? 'aberto' : ''}`}>
            <button onClick={() => setAberta(aberta === 5 ? 0 : 5)}
              id="end"  
            >
              Como funciona a adaptação em casa?
              <span>{aberta === 5 ? '−' : '+'}</span>
            </button>

            <div className="resposta">
              <p>
                A adaptação exige paciência, carinho e uma rotina
                tranquila. Deixe o animal explorar o ambiente aos
                poucos e ofereça um local seguro para descansar.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="cards">
        <div className="card-adotar">
          <h1>
            Adotar é cuidar <span>todos os dias.</span>
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

      <section className="parte-baixo">
        <div className="cont-baixo">
          <h3>O PRÓXIMO CAPÍTULO É COM VOCÊ</h3>

          <h1>Seu novo melhor amigo está esperando.</h1>

          <p>Um lar muda a vida de um animal. E esse encontro pode mudar a sua também.</p>

          <NavLink to="/Adocao" className="btn-baixo">
            Encontrar meu companheiro <FaArrowRight />
          </NavLink>
        </div>
      </section>


      <Footer />

    </div>

  );
}