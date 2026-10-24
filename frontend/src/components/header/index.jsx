import './index.scss';
import DropdownMenu from '../dropdown-menu';

import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';


export default function Header({ 
    logado,
    setUsuarioLogado
 }) {
    
    const [isActive, setIsActive] = useState(false);
    
    const imgDefault = '/assets/images/pfp.png';
    const [profileImg, setProfileImg] = useState(imgDefault);
    const [nomeUsuario, setNomeUsuario] = useState('');

    const [dropdownAtivo, setDropdownAtivo] = useState(false);

    console.log(logado);

    async function getUsuarioInfo() {

        try {
            const token = localStorage.getItem('token');

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

        } catch(e) {
            console.log(e.message);
        }

    }

    function sairDaConta() {
        localStorage.removeItem('token');
        setUsuarioLogado(false);
        window.location.reload();
    }

    useEffect(() => {
        async function carregarUsuario() {
            const infoUsuario = await getUsuarioInfo();

            if (infoUsuario) {
                setNomeUsuario(infoUsuario.nome);
                setProfileImg(infoUsuario.img || imgDefault);
            }
        }

        carregarUsuario();
    }, [logado])

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
                        <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Início</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/sobreNos"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Sobre Nós</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/comoFunciona"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Marketplace</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/animais"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>Adoção</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/ongsParceiras"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#156957',
                            textDecoration: 'none'
                        })}
                        ><p>ONGs Parceiras</p></NavLink>
                    </li>
                </ul>
            </nav>

            {!logado ? (
                <div className="buttons">
                    <button>
                        <NavLink 
                        to="/Login"
                        style={() => ({
                            color: 'white',
                            textDecoration: 'none'
                        })}
                        >Entrar</NavLink>
                    </button>

                    <button id='cadastro'>
                        <NavLink 
                        to="/cadastro"
                        style={() => ({
                            color: '#F8561F',
                            textDecoration: 'none'
                        })}
                        >Cadastre-se</NavLink>
                    </button>
                </div>
            ) : (
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
                            <i class="fa-solid fa-gear" style={{color: "#156957",}}></i>
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
            )}
            
        </header>
    );
}