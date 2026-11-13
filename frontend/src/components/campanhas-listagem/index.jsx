import './index.scss';
import { useEffect, useState } from 'react';
import CardCampanhaOng from '../card-campanha-ong';

function formatarReal(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export default function ListarCampanhas() {
    const [campanhas, setCampanhas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function buscarCampanhas() {
            try {
                const resposta = await fetch('http://localhost:6767/campanhas/ong/listar', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados.erro || 'Não foi possível carregar suas campanhas.');
                }

                setCampanhas(dados.resposta || []);
            } catch (err) {
                setErro(err.message);
            } finally {
                setCarregando(false);
            }
        }

        buscarCampanhas();
    }, []);

    const totalArrecadado = campanhas.reduce(
        (total, campanha) => total + Number(campanha.valor_arrecadado || 0),
        0
    );

    function removerCampanha(idCampanha) {
        setCampanhas(lista => lista.filter(campanha => campanha.ID_campanha !== idCampanha));
    }

    return (
        <section className="comp-listar-campanhas">
            <header className="cabecalho">
                <h1>Minhas campanhas</h1>
                <p className="subtitulo">
                    Veja abaixo o valor arrecadado de todas as suas campanhas já criadas.
                </p>
            </header>

            {!carregando && !erro && campanhas.length > 0 && (
                <div className="resumo">
                    <div>
                        <p>Total arrecadado</p>
                        <strong>{formatarReal(totalArrecadado)}</strong>
                    </div>
                    <span>
                        {campanhas.length} {campanhas.length === 1 ? 'campanha criada' : 'campanhas criadas'}
                    </span>
                </div>
            )}

            {carregando && <p className="mensagem">Carregando campanhas...</p>}

            {erro && <p className="mensagem mensagem-erro">{erro}</p>}

            {!carregando && !erro && campanhas.length === 0 && (
                <div className="estado-vazio">
                    <i className="fa-solid fa-bullhorn"></i>
                    <h2>Nenhuma campanha criada</h2>
                    <p>Suas campanhas aparecerão aqui depois que você fizer o primeiro pedido de ajuda.</p>
                </div>
            )}

            <div className="lista-campanhas">
                {campanhas.map(campanha => (
                    <CardCampanhaOng
                        key={campanha.ID_campanha}
                        campanha={campanha}
                        aoExcluir={removerCampanha}
                    />
                ))}
            </div>
        </section>
    );
}
