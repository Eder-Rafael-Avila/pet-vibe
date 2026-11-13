import './index.scss';
import { useEffect, useState } from 'react';

const formatarReal = (valor) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(valor);

export default function Carteira() {
    const [modalAberto, setModalAberto] = useState(false);
    const [saldo, setSaldo] = useState(0);
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

                setSaldo(Number(dados.resposta[0]?.fundos) || 0);
            } catch (err) {
                console.log(err);
            }
        }

        buscarFundos();
    }, []);

    useEffect(() => {
        if (!modalAberto) return;

        function fecharComEsc(event) {
            if (event.key === 'Escape') {
                setModalAberto(false);
            }
        }

        document.addEventListener('keydown', fecharComEsc);
        return () => document.removeEventListener('keydown', fecharComEsc);
    }, [modalAberto]);

    const saldoProjetado = saldo + Math.max(Number(valorAdicionar) || 0, 0);

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

            setSaldo(saldo + qtd);
            setValorAdicionar('');
            setModalAberto(false);
        } catch (err) {
            setErro(err.message);
        } finally {
            setAdicionando(false);
        }
    }

    return (
        <div className="comp-carteira">
            <button
                type="button"
                className="carteira"
                onClick={() => setModalAberto(true)}
            >
                <i className="fa-solid fa-wallet"></i>
                <span>{formatarReal(saldo)}</span>
            </button>

            {modalAberto && (
                <div className="modal">
                    <section className="card-modal">
                        <button
                            type="button"
                            className="fechar-modal"
                            onClick={() => setModalAberto(false)}
                            disabled={adicionando}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>

                        <div className="conteudo-modal">
                            <div className="cabecalho-modal">
                                <div>
                                    <p className="subtitulo">Minha carteira</p>
                                    <h2>Adicionar dinheiro</h2>
                                    <p className="descricao">Escolha quanto você quer colocar na sua carteira.</p>
                                </div>
                            </div>

                            <div className="resumo-saldo">
                                <div className="saldo-item">
                                    <span>Você tem</span>
                                    <strong>{formatarReal(saldo)}</strong>
                                </div>
                                <i className="fa-solid fa-arrow-right"></i>
                                <div className="saldo-item saldo-futuro">
                                    <span>Você terá</span>
                                    <strong>{formatarReal(saldoProjetado)}</strong>
                                </div>
                            </div>

                            <form onSubmit={adicionarDinheiro}>
                                <label>Quanto você quer colocar?</label>
                                <div className="campo-valor">
                                    <span>R$</span>
                                    <input
                                        type="number"
                                        placeholder="0,00"
                                        value={valorAdicionar}
                                        onChange={(event) => {
                                            setValorAdicionar(event.target.value);
                                            setErro('');
                                        }}
                                        disabled={adicionando}
                                    />
                                </div>
                                {erro && <p className="mensagem-erro">{erro}</p>}
                                <button type="submit" className="botao-adicionar" disabled={adicionando}>
                                    {adicionando ? 'Adicionando...' : 'Colocar dinheiro'}
                                    <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}
