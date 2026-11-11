
import './index.scss';
import { useState } from 'react';

export default function Questionario() {

    // ESTADOS
    const [indicePergunta, setIndicePergunta] = useState(0);
    const [respostas, setRespostas] = useState({});
    const [concluido, setConcluido] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    // PERGUNTAS
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
                    nome: "Até 4 horas por dia",
                    imagem: "/assets/images/ate4Hrs.webp"
                },
                {
                    nome: "Mais de 4 horas por dia",
                    imagem: "/assets/images/MaisDe4hrs.webp"
                }
            ]
        },
        {
            id: "possui_animais",
            pergunta: "Você possui outros animais?",
            opcoes: [
                {
                    nome: "Sim",
                    imagem: "/assets/images/AnimaisSim.webp"
                },
                {
                    nome: "Não",
                    imagem: "/assets/images/AnimaisNao.webp"
                }
            ]
        },
        {
            id: "possui_criancas",
            pergunta: "Existem crianças na residência?",
            opcoes: [
                {
                    nome: "Sim",
                    imagem: "/assets/images/CriancaSim.webp"
                },
                {
                    nome: "Não",
                    imagem: "/assets/images/CriancaNao.webp"
                }
            ]
        },
        {
            id: "experiencia",
            pergunta: "Você já teve experiência com animais?",
            opcoes: [
                {
                    nome: "Sim",
                    imagem: "/assets/images/ExperienciaSim.webp"
                },
                {
                    nome: "Não",
                    imagem: "/assets/images/ExperienciaNao.webp"
                }
            ]
        }
    ];

    const perguntaAtual = perguntas[indicePergunta];

    const progresso =
        ((indicePergunta + 1) / perguntas.length) * 100;


 
    async function CriarQuestionario() {

        try {
            setCarregando(true);
            setErro('');

            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Você precisa estar logado para salvar suas preferências.');
            }

            const resposta = await fetch('http://localhost:3000/prefs', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({
                    Onde_Mora: respostas.moradia,
                    Animal_Sozinho_Tempo: respostas.tempo_sozinho,
                    possui_animais: respostas.possui_animais,
                    possui_crianca: respostas.possui_criancas,
                    Ja_Teve_animais: respostas.experiencia
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || 'Não foi possível salvar suas preferências.'
                );
            }

            
            setConcluido(true);

            
            setTimeout(() => {
                window.location.href = '/Adocao';
            }, 3000);

        } catch (err) {

            setErro(err.message);

        } 
    }



    function selecionarResposta(opcao) {

        setRespostas({
            ...respostas,
            [perguntaAtual.id]: opcao
        });

    }


   
    function proximaPergunta() {

        if (!respostas[perguntaAtual.id] || carregando) {
            return;
        }

        if (indicePergunta < perguntas.length - 1) {

            setIndicePergunta(indicePergunta + 1);

        } else {

            CriarQuestionario();

        }
    }


    
    function voltarPergunta() {

        if (indicePergunta > 0) {
            setIndicePergunta(indicePergunta - 1);
        }

    }


    if (concluido) {

        return (
            <div className="tela-concluido">

                <div className="card-concluido">

                    <div className="topo-concluido">

                        <div className="logo-concluido">

                            <span className="logo"><img src="/assets/images/logo4.png" alt="" /></span>

                            <h2>
                                Pet<span>Vibe</span>
                            </h2>

                        </div>

                        <img
                            src="/assets/images/cachorro-e-gato.webp"
                            alt="Cachorro e gato"
                        />

                    </div>

                    <div className="conteudo-concluido">

                        <div className="check">
                            ✓
                        </div>

                        <h1>Tudo pronto!</h1>

                        <h2>Preferências concluídas!</h2>

                        <p>
                            Suas respostas foram salvas com sucesso.
                            Agora vamos encontrar um novo amigo para você!
                        </p>

                        <div className="concluido">

                            Questionário concluído

                            <span>→</span>

                        </div>

                        <span className="redirecionamento">
                            Você será redirecionado em alguns segundos...
                        </span>

                        <div className="rodape-concluido">

                            <span></span>

                            <strong><img src="/assets/images/logo4.png" alt="" /> Pet-Vibe</strong>

                            <span></span>

                        </div>

                    </div>

                </div>

            </div>
        );
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

                            <img
                                src={opcao.imagem}
                                alt={opcao.nome}
                            />

                            <h3>{opcao.nome}</h3>

                        </div>

                    ))}

                </div>

                <div className="botoes">

                    <button
                        onClick={voltarPergunta}
                        disabled={indicePergunta === 0 || carregando}
                    >
                        Voltar
                    </button>

                    <button
                        onClick={proximaPergunta}
                        disabled={!respostas[perguntaAtual.id] || carregando}
                    >
                        {carregando
                            ? "Salvando..."
                            : indicePergunta === perguntas.length - 1
                                ? "Finalizar"
                                : "Próximo"
                        }
                    </button>

                </div>

                {erro && (
                    <p className="mensagem-erro">
                        {erro}
                    </p>
                )}

            </div>

        </div>

    );

}
