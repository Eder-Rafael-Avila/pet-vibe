import './index.scss';
import DropdownMenu from '../dropdown-menu';

import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { obterImagem } from '../../utils/obterImagem';
import { obterDadosToken } from '../../utils/obterInfoToken.js';


export default function Header({ 
    logado,
    setUsuarioLogado
 }) {
    
    const [isActive, setIsActive] = useState(false);
    
    const imgDefault = '/assets/images/pfp.png';
    const [profileImg, setProfileImg] = useState(imgDefault);
    const [nomeUsuario, setNomeUsuario] = useState('');

    const [dropdownAtivo, setDropdownAtivo] = useState(false);

    console.log('Tipo de usuário:', logado);



    function sairDaConta() {
        localStorage.removeItem('token');
        setUsuarioLogado(false);
        setDropdownAtivo(false);
    }

    useEffect(() => {
        let requisicaoAtual = true;

        async function getUsuarioInfo() {
            try {
                if (logado === 'USUARIO') {
                    const token = localStorage.getItem('token');
                    if (!token) return null;

                    const resposta = await fetch('http://localhost:6767/usuario/listarNomeeIMG', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!resposta.ok) {
                        throw new Error('Não foi possível encontar um usuário');
                    }

                    const dados = await resposta.json();

                    const infoUsuario = {
                        nome: dados.resposta.nome,
                        img: dados.resposta.imagem
                    }
                    
                    return infoUsuario;
                } else if (logado === 'ONG') {
                    const token = localStorage.getItem('token');
                    const dadosToken = obterDadosToken();
                    const idOng = dadosToken?.id_ong;
                    if (!token || !idOng) return null;

                    const resposta = await fetch(`http://localhost:6767/ongs/consultar/${idOng}`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!resposta.ok) {
                        throw new Error('Não foi possível encontar uma ONG');
                    }

                    const dados = await resposta.json();
                    const ong = dados.resposta?.[0];
                    if (!ong) return null;

                    const infoOng = {
                        nome: ong.nome,
                        img: ong.imagem
                    }
                    
                    return infoOng;
                }
            } catch(e) {
                console.log('Erro ao consultar:', e.message);
            }
        }

        async function carregarUsuario() {

            setNomeUsuario('');
            setProfileImg(imgDefault);

            if (!logado) return;

            const infoUsuario = await getUsuarioInfo();

            if (requisicaoAtual && infoUsuario) {
                setNomeUsuario(infoUsuario.nome);
                setProfileImg(obterImagem(infoUsuario.img) || imgDefault);
            }
        }

        carregarUsuario();

        return () => {
            requisicaoAtual = false;
        };
    }, [logado]);

    return (
        <header className='comp-header'>
            <div className="show-nav">
                <DropdownMenu 
                    isActive={isActive}
                    setIsActive={setIsActive}
                />
            </div>
            <div className='identity'>
                <div className="imagem">
                    <img src="/assets/images/logo4.png" alt="Logo PetVibe" />
                </div>
                <div className="title">
                    <h1>Pet<span>Vibe</span></h1>
                </div>
            </div>
            <nav className='default-nav'>
                <ul>
                    <li>
                        <NavLink id='inicio'
                        to="/"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })} end
                        ><p>Início</p></NavLink>
                    </li>

                    
                    <li>
                        <a href='/#sobre'><p>Sobre Nós</p></a>
                    </li>
                    <li>
                        <NavLink
                        to="/campanhas"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Campanhas de ONGs</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/Adocao" id='Adocao'
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Adoção</p></NavLink>
                    </li>
                    <li>
                        {logado === 'ONG' ? (
                            <NavLink
                                to='/PainelONG'
                                className='ong-panel'
                            >
                                <button>Painel ONG</button>
                            </NavLink>
                        ) : (
                            <NavLink
                            to="/CadastroOng"
                            style={({ isActive }) => ({
                                fontWeight: 'bold',
                                color: isActive ? '#F8561F' : '#156957',
                                textDecoration: 'none'
                            })}
                            ><p>Cadastre sua ONG</p></NavLink>
                        )}
                    </li>
                </ul>
            </nav>

            {!logado ? (
                <div className="buttons">
                    <NavLink 
                        to="/Login"
                        style={() => ({
                            color: 'white',
                            textDecoration: 'none'
                        })}
                        >
                    <button>
                        Entrar
                    </button></NavLink>

                     <NavLink 
                        to="/cadastro"
                        style={() => ({
                            color: '#F8561F',
                            textDecoration: 'none'
                        })}
                        ><button id='cadastro'>
                       Cadastre-se
                    </button></NavLink>
                </div>
            ) : logado === 'USUARIO' ? (
                <div className="conta-preview">
                    <div className={`temp ${dropdownAtivo ? 'absolute' : ''}`}>
                        <div className="nome">
                            <p>{nomeUsuario}</p>
                        </div>
                        <div className="icone">
                            <img src={profileImg} alt="PFP" />
                        </div>
                        <button className={`dropdown-arrow ${dropdownAtivo ? 'rotacionado' : ''}`}
                            onClick={() => setDropdownAtivo(!dropdownAtivo)}
                        >
                            <i className="fa-solid fa-gear" style={{color: "#156957",}}></i>
                        </button>
                    </div>
                    <div className={`account-dropdown ${dropdownAtivo ? 'active' : 'inactive'}`}>
                        <div className='items'>        
                            <NavLink
                                to='/Personalizacao'
                                className="link-personalizacao"
                                state={{ nome: nomeUsuario }}
                            >
                                Personalização de Conta
                            </NavLink>
                            <button
                                onClick={sairDaConta}
                            >
                                Sair da conta
                            </button>
                        </div>
                    </div>
                </div>
            ) : logado === 'ONG' ? (
                <div className="conta-preview">
                    <div className={`temp ${dropdownAtivo ? 'absolute' : ''}`}>
                        <div className="nome">
                            <p>{nomeUsuario}</p>
                        </div>
                        <div className="icone">
                            <img src={profileImg} alt="PFP" />
                        </div>
                        <button className={`dropdown-arrow ${dropdownAtivo ? 'rotacionado' : ''}`}
                            onClick={() => setDropdownAtivo(!dropdownAtivo)}
                        >
                            <i className="fa-solid fa-gear" style={{color: "#156957",}}></i>
                        </button>
                    </div>
                    <div className={`account-dropdown ${dropdownAtivo ? 'active' : 'inactive'}`}>
                        <div className='items'>        
                            <NavLink
                                to='/Personalizacao'
                                className="link-personalizacao"
                                state={{ nome: nomeUsuario }}
                            >
                                Personalização de Conta
                            </NavLink>
                            <button
                                onClick={sairDaConta}
                            >
                                Sair da conta
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            
        </header>
    );
}