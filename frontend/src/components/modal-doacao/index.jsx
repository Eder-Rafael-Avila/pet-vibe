import './index.scss';
import { useEffect, useState } from 'react';

export default function ModalDoacao({ campanha, fechar, atualizarCampanhas, setUsuarioLogado }) {
    const [valor, setValor] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    useEffect(() => {
        function fecharComEsc(event) {
            if (event.key === 'Escape') {
                fechar();
            }
        }

        document.addEventListener('keydown', fecharComEsc);
        return () => document.removeEventListener('keydown', fecharComEsc);
    }, [fechar]);

    async function doar(event) {
        event.preventDefault();

        const valorDoacao = Number(valor);

        if (valorDoacao <= 0) {
            setErro('Informe um valor maior que zero.');
            return;
        }

        setErro('');
        setEnviando(true);

        try {
            const resposta = await fetch('http://localhost:6767/campanha/doar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: campanha.ID_campanha,
                    valor: valorDoacao
                })
            });

            if (resposta.status === 401) {
                localStorage.removeItem('token');
                setUsuarioLogado(false);
                return;
            }

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível realizar a doação.');
            }

            setSucesso(true);
            atualizarCampanhas();
        } catch (err) {
            setErro(err.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div className="comp-modal-doacao">
            <section className="card-modal">
                <button type="button" className="fechar-modal" onClick={fechar}>
                    <i className="fa-solid fa-x"></i>
                </button>

                <div className="conteudo-modal">
                    <div className="cabecalho-modal">
                        <p className="subtitulo">Doação</p>
                        <h2>Ajudar campanha</h2>
                        <p className="nome-campanha">{campanha.titulo}</p>
                        <p>Organizada por {campanha.nome_ong}</p>
                    </div>

                    {sucesso ? (
                        <div>
                            <p className="mensagem-sucesso">
                                Doação realizada com sucesso! Obrigado por ajudar.
                            </p>
                            <button type="button" className="botao-confirmar" onClick={() => window.location.reload()}>
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={doar}>
                            <p className="aviso-carteira">O valor será descontado da sua carteira.</p>
                            <label>Valor da doação</label>

                            <div className="campo-valor">
                                <span>R$</span>
                                <input
                                    type="number"
                                    placeholder="0,00"
                                    value={valor}
                                    onChange={event => {
                                        setValor(event.target.value);
                                        setErro('');
                                    }}
                                    disabled={enviando}
                                />
                            </div>

                            {erro && <p className="mensagem-erro">{erro}</p>}

                            <div className="acoes">
                                <button type="button" className="cancelar" onClick={fechar} disabled={enviando}>
                                    Cancelar
                                </button>
                                <button type="submit" className="botao-confirmar" disabled={enviando}>
                                    {enviando ? 'Doando...' : 'Confirmar doação'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
