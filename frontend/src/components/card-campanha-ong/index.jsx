import './index.scss';
import { useEffect, useState } from 'react';
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
    const [modalAberto, setModalAberto] = useState(false);
    const [contribuidores, setContribuidores] = useState([]);
    const [carregandoContribuidores, setCarregandoContribuidores] = useState(false);
    const [erroContribuidores, setErroContribuidores] = useState('');

    useEffect(() => {
        if (!modalAberto) return;

        function fecharComEsc(event) {
            if (event.key === 'Escape') setModalAberto(false);
        }

        document.addEventListener('keydown', fecharComEsc);
        return () => document.removeEventListener('keydown', fecharComEsc);
    }, [modalAberto]);

    const meta = Number(campanha.valor) || 0;
    const arrecadado = Number(campanha.valor_arrecadado) || 0;
    const progresso = meta > 0 ? Math.min((arrecadado / meta) * 100, 100) : 0;

    async function listarContribuidores() {
        setModalAberto(true);
        setCarregandoContribuidores(true);
        setErroContribuidores('');
        setContribuidores([]);

        try {
            const resposta = await fetch(`http://localhost:6767/campanha/${campanha.ID_campanha}/contribuidores`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível listar os contribuidores.');
            }

            setContribuidores(dados.resposta);
        } catch (err) {
            setErroContribuidores(err.message);
        } finally {
            setCarregandoContribuidores(false);
        }
    }

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
                        className="listar-contribuidores"
                        onClick={listarContribuidores}
                        disabled={processando || carregandoContribuidores}
                    >
                        Listar contribuidores
                    </button>
                </div>
            </div>

            {modalAberto && (
                <div className="modal-contribuidores">
                    <section className="card-modal">
                        <h2>Contribuidores</h2>
                        <p className="titulo-campanha">{campanha.titulo}</p>

                        {carregandoContribuidores && <p>Carregando...</p>}
                        {erroContribuidores && <p className="mensagem-erro">{erroContribuidores}</p>}
                        {!carregandoContribuidores && !erroContribuidores && contribuidores.length === 0 && (
                            <p>Esta campanha ainda não recebeu contribuições.</p>
                        )}

                        <ul>
                            {contribuidores.map(contribuidor => (
                                <li key={contribuidor.id_usuario}>
                                    <span>{contribuidor.nome}</span>
                                    <strong>{formatarReal(Number(contribuidor.valor_doado) || 0)}</strong>
                                </li>
                            ))}
                        </ul>

                        <button type="button" onClick={() => setModalAberto(false)}>Fechar</button>
                    </section>
                </div>
            )}
        </article>
    );
}
