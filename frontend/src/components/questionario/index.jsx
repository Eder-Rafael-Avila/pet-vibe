import './index.scss';
import { useState } from 'react';

export default function Questionario() {

   
    const perguntas = [
        {
            id: "moradia",
            pergunta: "Onde você mora?",
            opcoes: [
                {
                    nome: "Apartamento",
                    imagem: "/assets/images/apartamento.png"
                },
                {
                    nome: "Casa",
                    imagem: "/assets/images/casa.png"
                }
            ]
        },
        {
            id: "tempo_sozinho",
            pergunta: "Durante um dia comum, por quanto tempo o animal ficará sozinho?",
            opcoes: [
                {
                    nome: "Até 4 horas por dia"
                },
                {
                    nome: "Mais de 4 horas por dia"
                }
            ]
        },
        {
            id: "possui_animais",
            pergunta: "Você possui outros animais?",
            opcoes: [
                { nome: "Sim" },
                { nome: "Não" }
            ]
        },
        {
            id: "possui_criancas",
            pergunta: "Existem crianças na residência?",
            opcoes: [
                { nome: "Sim" },
                { nome: "Não" }
            ]
        },
        {
            id: "experiencia",
            pergunta: "Você já teve animais?",
            opcoes: [
                { nome: "Sim" },
                { nome: "Não" }
            ]
        }
    ];


    const [indicePergunta, setIndicePergunta] = useState(0);


    const [respostas, setRespostas] = useState({});

  
    const perguntaAtual = perguntas[indicePergunta];


    const progresso = ((indicePergunta + 1) / perguntas.length) * 100;


    function selecionarResposta(opcao) {

        setRespostas({
            ...respostas,
            [perguntaAtual.id]: opcao
        });

    }

    function proximaPergunta() {

        if (!respostas[perguntaAtual.id]) {
            return;
        }

        if (indicePergunta < perguntas.length - 1) {

            setIndicePergunta(indicePergunta + 1);

        } else {

            console.log("Questionário finalizado:", respostas);

        }

    }

    function voltarPergunta() {

        if (indicePergunta > 0) {
            setIndicePergunta(indicePergunta - 1);
        }

    }

    return (
        <div className="opcoes-moradia">

          
            <div className="cabecalho">

                <div className="Conheça">

                    <h1>
                        CONHEÇA MELHOR <br />
                        SUAS <span>PREFERÊNCIAS!</span>
                    </h1>

                    <p>
                        Responda algumas perguntas para nos ajudar <br />
                        a encontrar o pet ideal para você.
                    </p>

                </div>

                <div className="cachorro-e-gato">

                    <img
                        src="/assets/images/cachorro-e-gato.webp"
                        alt="Cachorro e gato"
                    />

                </div>

            </div>
            <div className="conteudo-questionario">
                <div className="progresso-container">

                    <div className="barra-progresso">

                        <div
                            className="progresso"
                            style={{ width: `${progresso}%` }}
                        />

                    </div>

                    <span>
                        {indicePergunta + 1} de {perguntas.length}
                    </span>

                </div>
                <h2>{perguntaAtual.pergunta}</h2>

                <div className="lista-opcoes">

                    {perguntaAtual.opcoes.map((opcao) => (

                        <div
                            key={opcao.nome}
                            className={`opcao ${
                                respostas[perguntaAtual.id] === opcao.nome
                                    ? "selecionada"
                                    : ""
                            }`}
                            onClick={() => selecionarResposta(opcao.nome)}
                        >

                            <span className="radio">

                                {respostas[perguntaAtual.id] === opcao.nome && "✓"}

                            </span>

                            {opcao.imagem && (
                                <img
                                    src={opcao.imagem}
                                    alt={opcao.nome}
                                />
                            )}

                            <h3>{opcao.nome}</h3>

                        </div>

                    ))}

                </div>

                <div className="botoes">

                    <button
                        onClick={voltarPergunta}
                        disabled={indicePergunta === 0}
                    >
                        Voltar
                    </button>

                    <button
                        onClick={proximaPergunta}
                        disabled={!respostas[perguntaAtual.id]}
                    >
                        {indicePergunta === perguntas.length - 1
                            ? "Finalizar"
                            : "Próximo"}
                    </button>

                </div>

            </div>

        </div>
    );

}
