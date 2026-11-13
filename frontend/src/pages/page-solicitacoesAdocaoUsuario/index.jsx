import './index.scss';

import { useEffect, useState } from 'react';
import Header from '../../components/header';
import CardSolicitacaoUsuario from '../../components/card-solic-usuarios';

const API_URL = 'http://localhost:6767';

async function requisicaoAutenticada(path, token, options = {}) {
    if (!token) {
        throw new Error('Faça login com sua conta de usuário para consultar suas solicitações.');
    }

    const resposta = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    });
    const dados = await resposta.json();

    if (resposta.status === 401 || resposta.status === 403) {
        throw new Error('Sua sessão não está autorizada. Entre novamente com sua conta de usuário.');
    }

    if (!resposta.ok) {
        throw new Error(dados?.erro || 'Não foi possível concluir a solicitação.');
    }

    return dados;
}

function mensagemErro(erro) {
    return erro instanceof TypeError
        ? 'Não foi possível conectar ao servidor. Tente novamente.'
        : erro.message || 'Ocorreu um erro inesperado. Tente novamente.';
}

export default function SolicitacoesAdocaoUsuario({
    logado,
    setUsuarioLogado
}) {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [erroAcao, setErroAcao] = useState('');
    const [mensagemAcao, setMensagemAcao] = useState('');
    const [idExcluindo, setIdExcluindo] = useState(null);
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let cancelado = false;

        async function listarSolicitacoes() {
            setCarregando(true);
            setErro('');

            try {
                const token = localStorage.getItem('token');
                const dados = await requisicaoAutenticada('/adocoes/listar', token);

                if (!Array.isArray(dados)) {
                    throw new Error('O servidor retornou uma lista de solicitações inválida.');
                }

                if (!cancelado) setSolicitacoes(dados);
            } catch (erroConsulta) {
                if (!cancelado) setErro(mensagemErro(erroConsulta));
            } finally {
                if (!cancelado) setCarregando(false);
            }
        }

        listarSolicitacoes();

        return () => {
            cancelado = true;
        };
    }, [tentativa]);

    async function excluirSolicitacao(idAdocao) {
        const token = localStorage.getItem('token');
        setIdExcluindo(idAdocao);
        setErroAcao('');
        setMensagemAcao('');

        try {
            const resultado = await requisicaoAutenticada(
                `/adocoes/excluir/${encodeURIComponent(idAdocao)}`,
                token,
                { method: 'DELETE' }
            );

            setSolicitacoes(atual => atual.filter(
                solicitacao => String(solicitacao.id_adocao) !== String(idAdocao)
            ));
            setMensagemAcao(resultado?.mensagem || 'Solicitação excluída com sucesso.');
        } catch (erroExclusao) {
            setErroAcao(mensagemErro(erroExclusao));
        } finally {
            setIdExcluindo(null);
        }
    }

    return (
        <main className="page-solic-usuario">
            <Header
                logado={logado}
                setUsuarioLogado={setUsuarioLogado}
            />

            <section className="lista-solicitacoes-adocao">
                <header>
                    <div>
                        <h2>Veja e gerencie suas solicitações</h2>
                        <p>Acompanhe o retorno das ONGs e consulte suas adoções solicitadas.</p>
                    </div>
                    <button
                        className="atualizar-solicitacoes"
                        type="button"
                        disabled={carregando || idExcluindo !== null}
                        onClick={() => setTentativa(atual => atual + 1)}
                    >
                        {carregando ? 'Atualizando...' : 'Atualizar status'}
                    </button>
                </header>

                {!carregando && !erro && (
                    <p className="total-solicitacoes">
                        {solicitacoes.length} {solicitacoes.length === 1 ? 'solicitação' : 'solicitações'}
                    </p>
                )}

                {carregando && (
                    <p className="estado-solicitacoes" role="status">Carregando suas solicitações...</p>
                )}

                {erro && (
                    <div className="estado-solicitacoes erro-solicitacoes" role="alert">
                        <p>{erro}</p>
                        <button
                            type="button"
                            onClick={() => setTentativa(atual => atual + 1)}
                        >
                            Tentar novamente
                        </button>
                    </div>
                )}

                {erroAcao && <p className="mensagem-acao erro" role="alert">{erroAcao}</p>}
                {mensagemAcao && <p className="mensagem-acao sucesso" role="status">{mensagemAcao}</p>}

                {!carregando && !erro && solicitacoes.length === 0 && (
                    <p className="estado-solicitacoes">
                        Você ainda não solicitou a adoção de nenhum animal.
                    </p>
                )}

                {!carregando && !erro && solicitacoes.length > 0 && (
                    <div className="lista" aria-live="polite">
                        {solicitacoes.map(solicitacao => (
                            <CardSolicitacaoUsuario
                                key={solicitacao.id_adocao}
                                solicitacao={solicitacao}
                                excluindo={String(idExcluindo) === String(solicitacao.id_adocao)}
                                bloqueado={idExcluindo !== null}
                                onExcluir={excluirSolicitacao}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}