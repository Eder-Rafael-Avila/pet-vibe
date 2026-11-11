import './index.scss'
import { useState } from 'react';
import EtapaUm from '../../components/cadastroOng/etapaUm';
import EtapaDois from '../../components/cadastroOng/etapaDois';

export default function Ong() {
    const [etapaAtual, setEtapaAtual] = useState(1);
    const [dadosOng, setDadosOng] = useState(null);

    function continuarParaEndereco(dados) {
        setDadosOng(dados);
        setEtapaAtual(2);
    }

    return (
        <>
            <div hidden={etapaAtual !== 1}>
                <EtapaUm onContinuar={continuarParaEndereco} />
            </div>
            <div hidden={etapaAtual !== 2}>
                <EtapaDois
                    dadosOng={dadosOng}
                    onVoltar={() => setEtapaAtual(1)}
                />
            </div>
        </>
    );
}