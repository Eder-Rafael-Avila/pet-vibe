import './index.scss';
import { useEffect, useState } from 'react';
import CardSolicitacoes from '../card-solicitacoes';

export default function AdocoesCadastradas() {
    const [animais, setAnimais] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        let cancelado = false;

        async function listarAnimaisDaOng() {
            setCarregando(true);
            setErro('');

            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Faça login com uma conta de ONG para consultar seus animais.');
                }

                const resposta = await fetch('http://localhost:6767/animais/ong/listar', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const dados = await resposta.json();

                if (resposta.status === 401 || resposta.status === 403) {
                    throw new Error('Sua sessão não está autorizada. Entre novamente com uma conta de ONG.');
                }

                if (!resposta.ok) {
                    throw new Error(dados?.erro || 'Não foi possível carregar os animais cadastrados.');
                }

                if (!Array.isArray(dados?.resposta)) {
                    throw new Error('O servidor retornou uma lista de animais inválida.');
                }

                if (!cancelado) {
                    setAnimais(dados.resposta);
                }
            } catch (erroConsulta) {
                if (!cancelado) {
                    setErro(erroConsulta instanceof TypeError
                        ? 'Não foi possível conectar ao servidor. Tente novamente.'
                        : erroConsulta.message);
                }
            } finally {
                if (!cancelado) {
                    setCarregando(false);
                }
            }
        }

        listarAnimaisDaOng();

        return () => {
            cancelado = true;
        };
    }, [tentativa]);

    function tentarNovamente() {
        setTentativa(atual => atual + 1);
    }

    return (
        <main className="comp-solic-adocao">
            <header className="titulo-adocoes">
                <h1>Animais cadastrados pela ONG</h1>
                <p>Consulte os animais associados à sua conta.</p>
            </header>

            <section className="lista-adocoes" aria-live="polite">
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
                    <div className="grade-adocoes">
                        {animais.map(animal => (
                            <CardSolicitacoes
                                key={animal.id_animal}
                                animal={animal}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
