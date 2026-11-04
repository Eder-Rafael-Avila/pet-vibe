import './index.scss';
import { useEffect, useRef, useState } from 'react';

export default function ModalDoacao({ campanha, fechar, atualizarCampanhas, setUsuarioLogado }) {
    const modal = useRef(null);
    const [valor, setValor] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(false);

    useEffect(() => {
        modal.current.showModal();
    }, []);

    async function doar(event) {
        event.preventDefault();
        if (enviando || sucesso) return;

        const valorDoacao = Number(valor);
        if (!Number.isFinite(valorDoacao) || valorDoacao <= 0) {
            setErro('Informe um valor maior que zero.');
            return;
        }

        setErro('');
        setEnviando(true);

        try {
            const token = localStorage.getItem('token');
            const resposta = await fetch('http://localhost:6767/campanha/doar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
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
        }
        catch (err) {
            if (err instanceof TypeError) {
                setErro('A conexão falhou. Confira sua carteira antes de tentar doar novamente.');
            }
            else {
                setErro(err.message);
            }
        }

        setEnviando(false);
    }

    return (
        <dialog
            ref={modal}
            className="comp-modal-doacao"
            aria-labelledby="titulo-doacao"
            onCancel={event => {
                event.preventDefault();
                if (!enviando) fechar();
            }}
        >
            <h2 id="titulo-doacao">Ajudar campanha</h2>
            <p className="nome-campanha">{campanha.titulo}</p>
            <p>Organizada por {campanha.nome_ong}</p>

            {sucesso ? (
                <div>
                    <p className="mensagem-sucesso" role="status">Doação realizada com sucesso! Obrigado por ajudar.</p>
                    <button type="button" onClick={fechar}>Fechar</button>
                </div>
            ) : (
                <form onSubmit={doar}>
                    <p className="aviso-carteira">O valor será descontado da sua carteira.</p>
                    <label htmlFor="valor-doacao">Valor da doação (R$)</label>
                    <input
                        id="valor-doacao"
                        type="number"
                        min="0.01"
                        max="99999999.99"
                        step="0.01"
                        placeholder="Ex.: 25,00"
                        value={valor}
                        onChange={event => setValor(event.target.value)}
                        disabled={enviando}
                        required
                    />
                    {erro && <p className="mensagem-erro" role="alert">{erro}</p>}
                    <div className="acoes">
                        <button type="button" className="cancelar" onClick={fechar} disabled={enviando}>Cancelar</button>
                        <button type="submit" disabled={enviando}>
                            {enviando ? 'Doando...' : 'Confirmar doação'}
                        </button>
                    </div>
                </form>
            )}
        </dialog>
    );
}
