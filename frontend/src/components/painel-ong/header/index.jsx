import './index.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Header() {
    const navegar = useNavigate();
    const [nomeOng, setNomeOng] = useState('Carregando...');
    const [erro, setErro] = useState('');

    useEffect(() => {
        let cancelado = false;

        async function carregarNomeOng() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Sessão da ONG não encontrada.');
                }

                const resposta = await fetch('http://localhost:6767/ong/perfil', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados?.erro || 'Não foi possível carregar o nome da ONG.');
                }

                if (!dados?.resposta?.nome) {
                    throw new Error('O servidor não retornou o nome da ONG.');
                }

                if (!cancelado) {
                    setNomeOng(dados.resposta.nome);
                    setErro('');
                }
            } catch (erroConsulta) {
                if (!cancelado) {
                    setNomeOng('');
                    setErro(erroConsulta instanceof TypeError
                        ? 'Não foi possível conectar ao servidor.'
                        : erroConsulta.message);
                }
            }
        }

        carregarNomeOng();

        return () => {
            cancelado = true;
        };
    }, []);

    return (
        <header className='comp-ong-header'>
            <div className="identidade">
                <button
                    className="back-home"
                    aria-label="Voltar para a página inicial"
                    title="Voltar para a página inicial"
                    onClick={() => navegar('/')}
                >
                    <FaArrowLeft aria-hidden="true" />
                </button>
                <div className="logo">
                    <img src="/assets/images/logo4.png" alt="" />
                </div>
                <div className="title">
                    <h1>Pet<span>Vibe</span></h1>

                    <hr />

                    <p>
                        Gerencie adoções, cadastre animais ou faça pedidos de ajuda em nosso Dashboard Administrativo.
                    </p>
                </div>
            </div>
            <div className="panel-info">
                <div className="ong-info">
                    <p>{erro ? erro : `Bem-vindo, ${nomeOng}`}</p>
                </div>
            </div>
        </header>
    );
}