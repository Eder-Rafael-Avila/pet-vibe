import './index.scss';
import { useState } from 'react';

export default function Questionario() {

    const [moradiaSelecionada, setMoradiaSelecionada] = useState("");

    return (
        <div className="opcoes-moradia">

            {/* CABEÇALHO */}
            <div className="cabecalho">

                <div className="Conheça">
                    <h1>
                        CONHEÇA MELHOR <br />
                        SUAS <span>PREFERÊNCIAS!</span>
                    </h1>

                    <p>
                        Responda algumas perguntas para nos ajudar
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

            {/* QUESTIONÁRIO */}
            <div className="conteudo-questionario">

                <h2>Onde você mora?</h2>

                <div className="lista-opcoes">

                    {/* APARTAMENTO */}
                    <div
                        className={`opcao ${moradiaSelecionada === "apartamento" ? "selecionada" : ""}`}
                        onClick={() => setMoradiaSelecionada("apartamento")}
                    >
                        <span className="radio">
                            {moradiaSelecionada === "apartamento" && "✓"}
                        </span>

                        <img
                            src="/assets/images/apartamento.png"
                            alt="Apartamento"
                        />

                        <h3>Apartamento</h3>
                    </div>

                    {/* CASA */}
                    <div
                        className={`opcao ${moradiaSelecionada === "casa" ? "selecionada" : ""}`}
                        onClick={() => setMoradiaSelecionada("casa")}
                    >
                        <span className="radio">
                            {moradiaSelecionada === "casa" && "✓"}
                        </span>

                        <img
                            src="/assets/images/casa.png"
                            alt="Casa"
                        />

                        <h3>Casa</h3>
                    </div>

                </div>
                <div className="botoes">
                    <button>Voltar</button>
                    <button>Próximo</button>
                </div>

            </div>

        </div>
    );
}