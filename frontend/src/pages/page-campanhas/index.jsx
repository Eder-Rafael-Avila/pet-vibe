import './index.scss';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import CardCampanha from '../../components/card-campanha';
import ModalDoacao from '../../components/modal-doacao';

export default function Campanhas({ usuarioLogado, setUsuarioLogado }) {
    const [campanhas, setCampanhas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [tentativa, setTentativa] = useState(0);
    const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);

    useEffect(() => {
        async function listarCampanhas() {
            const token = localStorage.getItem('token');
            try {
                if (!token) {
                    setUsuarioLogado(false);
                    return;
                }

                const resposta = await fetch('http://localhost:6767/campanhas/listar', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (resposta.status === 401) {
                    localStorage.removeItem('token');
                    setUsuarioLogado(false);
                    return;
                }

                const dados = await resposta.json();
                if (!resposta.ok) {
                    throw new Error(dados.erro || 'Não foi possível carregar as campanhas.');
                }

                setCampanhas(dados.resposta);
            }
            catch (err) {
                if (err instanceof TypeError) {
                    setErro('Não foi possível conectar ao servidor. Tente novamente.');
                }
                else {
                    setErro(err.message);
                }
            }

            setCarregando(false);
        }

        listarCampanhas();
    }, [tentativa, setUsuarioLogado]);

    function tentarNovamente() {
        setErro('');
        setCarregando(true);
        setTentativa(tentativa + 1);
    }

    return (
        <div className="page-campanha">
            <Header
                logado={usuarioLogado}
                setUsuarioLogado={setUsuarioLogado}
            />
            <main className="campanhas-conteudo">
                <h1>Campanhas</h1>
                <p className="introducao">Conheça as campanhas e acompanhe como cada ajuda faz a diferença.</p>
                {carregando && (
                    <p role="status">Carregando campanhas...</p>
                )}

                {erro && (
                    <div className="area-erro" role="alert">
                        <p>{erro}</p>
                        <button type="button" onClick={tentarNovamente}>Tentar novamente</button>
                    </div>
                )}

                {!carregando && !erro && campanhas.length === 0 && (
                    <p>Nenhuma campanha cadastrada no momento.</p>
                )}

                {!carregando && !erro && (
                    <div className="lista-campanhas">
                        {campanhas.map(campanha => (
                            <CardCampanha
                                key={campanha.ID_campanha}
                                campanha={campanha}
                                ajudarCampanha={setCampanhaSelecionada}
                            />
                        ))}
                    </div>
                )}
            </main>
            {campanhaSelecionada && (
                <ModalDoacao
                    campanha={campanhaSelecionada}
                    fechar={() => setCampanhaSelecionada(null)}
                    atualizarCampanhas={() => setTentativa(tentativa + 1)}
                    setUsuarioLogado={setUsuarioLogado}
                />
            )}
            <Footer />
        </div>
    );
}
