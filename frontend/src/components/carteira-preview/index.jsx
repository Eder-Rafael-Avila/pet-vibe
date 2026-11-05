import './index.scss';
import { useEffect, useMemo, useState } from 'react';

const formatarReal = (valor) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(valor);

export default function Carteira() {
    const [modalAberto, setModalAberto] = useState(false);
    const [fundos, setFundos] = useState([]);
    const [valorAdicionar, setValorAdicionar] = useState('');
    const [adicionando, setAdicionando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function buscarFundos() {
            try {
                const resposta = await fetch('http://localhost:6767/carteira/listarFundos', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados.erro);
                }

                setFundos(dados.resposta);
            } catch (err) {
                console.log(err);
            }
        }

        buscarFundos();
    }, []);

    useEffect(() => {
        if (!modalAberto) return undefined;

        const fecharComEsc = (event) => {
            if (event.key === 'Escape') setModalAberto(false);
        };

        document.addEventListener('keydown', fecharComEsc);
        return () => document.removeEventListener('keydown', fecharComEsc);
    }, [modalAberto]);

    const saldoAtual = Number(fundos[0]?.fundos) || 0;
    const valorNumerico = Number(valorAdicionar) || 0;
    const saldoProjetado = useMemo(
        () => saldoAtual + Math.max(valorNumerico, 0),
        [saldoAtual, valorNumerico]
    );

    async function adicionarDinheiro(event) {
        event.preventDefault();

        const qtd = Number(valorAdicionar);

        if (!Number.isFinite(qtd) || qtd <= 0) {
            setErro('Informe um valor maior que zero.');
            return;
        }

        setErro('');
        setAdicionando(true);

        try {
            const resposta = await fetch('http://localhost:6767/carteira/addFundos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ qtd })
            });

            if (resposta.status === 401) {
                localStorage.removeItem('token');
                window.location.reload();
                return;
            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível adicionar o dinheiro.');
            }

            window.location.reload();
        } catch (err) {
            setErro(
                err instanceof TypeError
                    ? 'Não foi possível conectar ao servidor. Tente novamente.'
                    : err.message
            );
            setAdicionando(false);
        }
    }

    return (
        <div className="comp-carteira">
            <button
                type="button"
                className="carteira"
                onClick={() => setModalAberto(true)}
                aria-label={`Abrir carteira. Saldo atual: ${formatarReal(saldoAtual)}`}
            >
                <i className="fa-solid fa-wallet" aria-hidden="true"></i>
                <span>{formatarReal(saldoAtual)}</span>
            </button>

            {modalAberto && (
                <div
                    className="modal"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setModalAberto(false);
                    }}
                >
                    <section
                        className="card-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-carteira"
                    >
                        <button
                            type="button"
                            className="fechar-modal"
                            onClick={() => setModalAberto(false)}
                            aria-label="Fechar carteira"
                            disabled={adicionando}
                        >
                            <i className="fa-solid fa-x" aria-hidden="true"></i>
                        </button>

                        <div className="conteudo-modal">
                            <div className="cabecalho-modal">
                                <div>
                                    <p className="subtitulo">Minha carteira</p>
                                    <h2 id="titulo-carteira">Adicionar dinheiro</h2>
                                    <p className="descricao">Escolha quanto você quer colocar na sua carteira.</p>
                                </div>
                            </div>

                            <div className="resumo-saldo" aria-live="polite">
                                <div className="saldo-item">
                                    <span>Você tem</span>
                                    <strong>{formatarReal(saldoAtual)}</strong>
                                </div>
                                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                <div className="saldo-item saldo-futuro">
                                    <span>Você terá</span>
                                    <strong>{formatarReal(saldoProjetado)}</strong>
                                </div>
                            </div>

                            <form onSubmit={adicionarDinheiro}>
                                <label htmlFor="valor-adicionar">Quanto você quer colocar?</label>
                                <div className="campo-valor">
                                    <span>R$</span>
                                    <input
                                        id="valor-adicionar"
                                        type="number"
                                        min="0.01"
                                        max="99999999.99"
                                        step="0.01"
                                        placeholder="0,00"
                                        value={valorAdicionar}
                                        onChange={(event) => {
                                            setValorAdicionar(event.target.value);
                                            setErro('');
                                        }}
                                        autoFocus
                                        disabled={adicionando}
                                        required
                                    />
                                </div>
                                {erro && <p className="mensagem-erro" role="alert">{erro}</p>}
                                <button type="submit" className="botao-adicionar" disabled={adicionando}>
                                    {adicionando ? 'Adicionando...' : 'Colocar dinheiro'}
                                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
