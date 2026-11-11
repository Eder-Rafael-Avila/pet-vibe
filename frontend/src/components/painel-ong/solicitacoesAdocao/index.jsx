import './index.scss';
import { useEffect, useState } from 'react';
import CardSolicitacaoAdocao from '../card-solicitacoesAdocao';
import CardAnimalCadastrado from '../card-animaisCadastrados';

const API_URL = 'http://localhost:6767';

async function requisicaoAutenticada(path, token, options = {}) {
    if (!token) {
        throw new Error('Faça login com uma conta de ONG para consultar seus dados.');
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
        throw new Error('Sua sessão não está autorizada. Entre novamente com uma conta de ONG.');
    }

    if (!resposta.ok) {
        throw new Error(dados?.erro || 'Não foi possível concluir a solicitação.');
    }

    return dados;
}

function mensagemErro(erro) {
    return erro instanceof TypeError
        ? 'Não foi possível conectar ao servidor. Tente novamente.'
        : erro.message;
}

export default function SolicitacoesAdocao() {
    const [animais, setAnimais] = useState([]);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [carregandoSolicitacoes, setCarregandoSolicitacoes] = useState(true);
    const [erro, setErro] = useState('');
    const [erroSolicitacoes, setErroSolicitacoes] = useState('');
    const [erroAcao, setErroAcao] = useState('');
    const [mensagemAcao, setMensagemAcao] = useState('');
    const [acaoAtual, setAcaoAtual] = useState(null);
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let cancelado = false;
        const token = localStorage.getItem('token');

        async function listarAnimaisDaOng() {
            try {
                const dados = await requisicaoAutenticada('/animais/ong/listar', token);

                if (!Array.isArray(dados?.resposta)) {
                    throw new Error('O servidor retornou uma lista de animais inválida.');
                }

                if (!cancelado) setAnimais(dados.resposta);
            } catch (erroConsulta) {
                if (!cancelado) setErro(mensagemErro(erroConsulta));
            } finally {
                if (!cancelado) setCarregando(false);
            }
        }

        async function listarSolicitacoesDaOng() {
            try {
                const dados = await requisicaoAutenticada('/adocoes/ong/pendentes', token);

                if (!Array.isArray(dados)) {
                    throw new Error('O servidor retornou uma lista de solicitações inválida.');
                }

                if (!cancelado) setSolicitacoes(dados);
            } catch (erroConsulta) {
                if (!cancelado) setErroSolicitacoes(mensagemErro(erroConsulta));
            } finally {
                if (!cancelado) setCarregandoSolicitacoes(false);
            }
        }

        listarAnimaisDaOng();
        listarSolicitacoesDaOng();

        return () => {
            cancelado = true;
        };
    }, [tentativa]);

    async function decidirSolicitacao(idAdocao, decisao) {
        const token = localStorage.getItem('token');
        if (!token) {
            setErroAcao('Faça login novamente com uma conta de ONG para responder às solicitações.');
            return;
        }

        setAcaoAtual({ id: idAdocao, decisao });
        setErroAcao('');
        setMensagemAcao('');

        try {
            const caminho = decisao === 'aprovar' ? 'aprovar' : 'reprovar';
            const resultado = await requisicaoAutenticada(
                `/adocoes/${caminho}/${encodeURIComponent(idAdocao)}`,
                token,
                { method: 'PUT' }
            );

            setSolicitacoes(atual => atual.filter(solicitacao => solicitacao.id_adocao !== idAdocao));
            setMensagemAcao(resultado?.mensagem || `Solicitação ${decisao === 'aprovar' ? 'aprovada' : 'reprovada'} com sucesso.`);
        } catch (erroDecisao) {
            setErroAcao(mensagemErro(erroDecisao));
        } finally {
            setAcaoAtual(null);
        }
    }

    function tentarNovamente() {
        setCarregando(true);
        setCarregandoSolicitacoes(true);
        setErro('');
        setErroSolicitacoes('');
        setTentativa(atual => atual + 1);
    }

    return (
        <main className="comp-solic-adocao">
            <header className="titulo-adocoes">
                <h1>Animais cadastrados pela ONG</h1>
                <p>Consulte os animais associados à sua conta.</p>
            </header>

            <section className="lista-adocoes" aria-labelledby="titulo-animais-ong" aria-live="polite">
                <h2 id="titulo-animais-ong" className="subtitulo-adocoes">Seus animais</h2>
                {!carregando && !erro && (
                    <p className="total-adocoes">
                        {animais.length} {animais.length === 1 ? 'animal cadastrado' : 'animais cadastrados'}
                    </p>
                )}

                {carregando && (
                    <p className="estado-adocoes" role="status">Carregando seus animais...</p>
                )}

                {erro && (
                    <div className="estado-adocoes erro-adocoes" role="alert">
                        <p>{erro}</p>
                        <button type="button" onClick={tentarNovamente}>Tentar novamente</button>
                    </div>
                )}

                {!carregando && !erro && animais.length === 0 && (
                    <p className="estado-adocoes">Você ainda não cadastrou animais.</p>
                )}

                {!carregando && !erro && animais.length > 0 && (
                    <div className={`grade-adocoes${animais.length === 1 ? ' grade-adocoes-unica' : ''}`}>
                        {animais.map(animal => (
                            <CardAnimalCadastrado key={animal.id_animal} animal={animal} />
                        ))}
                    </div>
                )}
            </section>

            <section className="lista-adocoes secao-solicitacoes-pendentes" aria-labelledby="titulo-solicitacoes-ong" aria-live="polite">
                <h2 id="titulo-solicitacoes-ong" className="subtitulo-adocoes">Solicitações de adoção</h2>
                <p className="descricao-solicitacoes">Solicitações feitas para os animais da sua ONG.</p>

                {carregandoSolicitacoes && (
                    <p className="estado-adocoes" role="status">Carregando solicitações...</p>
                )}

                {erroSolicitacoes && (
                    <div className="estado-adocoes erro-adocoes" role="alert">
                        <p>{erroSolicitacoes}</p>
                        <button type="button" onClick={tentarNovamente}>Tentar novamente</button>
                    </div>
                )}

                {!carregandoSolicitacoes && !erroSolicitacoes && (
                    <p className="total-adocoes">
                        {solicitacoes.length} {solicitacoes.length === 1 ? 'solicitação pendente' : 'solicitações pendentes'}
                    </p>
                )}

                {erroAcao && <p className="erro-acao-solicitacao" role="alert">{erroAcao}</p>}
                {mensagemAcao && <p className="sucesso-acao-solicitacao" role="status">{mensagemAcao}</p>}

                {!carregandoSolicitacoes && !erroSolicitacoes && solicitacoes.length === 0 && (
                    <p className="estado-adocoes">Não há solicitações de adoção pendentes.</p>
                )}

                {!carregandoSolicitacoes && !erroSolicitacoes && solicitacoes.length > 0 && (
                    <div className="grade-adocoes">
                        {solicitacoes.map(solicitacao => (
                            <CardSolicitacaoAdocao
                                key={solicitacao.id_adocao}
                                solicitacao={solicitacao}
                                acaoEmAndamento={acaoAtual?.id === solicitacao.id_adocao ? acaoAtual.decisao : null}
                                bloqueado={Boolean(acaoAtual)}
                                onAprovar={id => decidirSolicitacao(id, 'aprovar')}
                                onReprovar={id => decidirSolicitacao(id, 'reprovar')}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
