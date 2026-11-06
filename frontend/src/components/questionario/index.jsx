
import './index.scss';
import { useState } from 'react';

export default function Questionario() {

    const [moradiaSelecionada, setMoradiaSelecionada] = useState("");

    return (
        <div className="opcoes-moradia">
           <div className="cachorro-e-gato">
        <img
            src="/assets/images/cachorro-e-gato.webp"
            alt="Cachorro e gato"
        />
    </div>

            <div className="conteudo-questionario">

                <h1>Onde você mora?</h1>

                <div className="lista-opcoes">

                 
                    <div
                        className={`opcao ${moradiaSelecionada === "apartamento" ? "selecionada" : ""}`}
                        onClick={() => setMoradiaSelecionada("apartamento")}
                    >
                        <span className="radio">
                            {moradiaSelecionada === "apartamento" && "✓"}
                        </span>

                        <img src="/assets/images/apartamento.png" alt="Apartamento" />

                        <h2>Apartamento</h2>
                    </div>

                    <div
                        className={`opcao ${moradiaSelecionada === "casa" ? "selecionada" : ""}`}
                        onClick={() => setMoradiaSelecionada("casa")}
                    >
                        <span className="radio">
                            {moradiaSelecionada === "casa" && "✓"}
                        </span>

                        <img src="/assets/images/casa.png" alt="Casa" />

                        <h2>Casa</h2>
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
