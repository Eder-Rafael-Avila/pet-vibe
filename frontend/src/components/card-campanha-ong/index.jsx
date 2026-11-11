import './index.scss';
import { useState } from 'react';
import { obterImagem } from '../../utils/obterImagem';

function formatarReal(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export default function CardCampanhaOng({ campanha, aoExcluir }) {
    const [processando, setProcessando] = useState(false);
    const [erro, setErro] = useState('');

    const meta = Number(campanha.valor) || 0;
    const arrecadado = Number(campanha.valor_arrecadado) || 0;
    const progresso = meta > 0 ? Math.min((arrecadado / meta) * 100, 100) : 0;

    async function excluirCampanha() {
        setProcessando(true);
        setErro('');

        try {
            const resposta = await fetch('http://localhost:6767/campanha/excluir', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ id: campanha.ID_campanha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível encerrar a campanha.');
            }

            aoExcluir(campanha.ID_campanha);
        } catch (err) {
            setErro(err.message);
        } finally {
            setProcessando(false);
        }
    }

    return (
        <article className="comp-card-campanha-ong">
            <img
                src={obterImagem(campanha.imagem)}
                alt={campanha.titulo}
                onError={event => {
                    event.currentTarget.src = '/assets/images/adote.webp';
                }}
            />

            <div className="campanha-conteudo">
                <h2>{campanha.titulo}</h2>
                <p className="descricao">{campanha.descricao}</p>

                <div className="valores">
                    <div>
                        <span>Arrecadado</span>
                        <strong>{formatarReal(arrecadado)}</strong>
                    </div>
                    <div>
                        <span>Meta</span>
                        <strong>{formatarReal(meta)}</strong>
                    </div>
                </div>

                <div className="barra-progresso">
                    <div style={{ width: `${progresso}%` }}></div>
                </div>
                <p className="porcentagem">{progresso.toFixed(0)}% da meta alcançada</p>

                {erro && <p className="mensagem-erro">{erro}</p>}

                <div className="acoes-campanha">
                    <button
                        type="button"
                        className="pegar-fundos"
                        onClick={excluirCampanha}
                        disabled={processando}
                    >
                        {processando ? 'Processando...' : 'Pegar fundos'}
                    </button>
                    <button
                        type="button"
                        className="excluir"
                        onClick={excluirCampanha}
                        disabled={processando}
                    >
                        Excluir campanha
                    </button>
                </div>
            </div>
        </article>
    );
}
