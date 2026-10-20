import './index.scss';
import DropdownMenu from '../dropdown-menu';

import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header({ 
    logado
 }) {
    
    const [isActive, setIsActive] = useState(false);

    const [profileImg, setProfileImg] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const imgDefault = '/assets/images/pfp.png';

    useEffect(() => {
        if (logado) {
            getUsuarioInfo();
        }
    }, [logado])

    async function getUsuarioInfo() {

        try {

            const token = localStorage.getItem('token');

            const resposta = await fetch('http://localhost:6767/usuario/listarNomeeIMG', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(resposta);

            if (!resposta.ok) {
                throw new Error('Não foi possível encontar um usuário');
            }

            const dados = await resposta.json();

            console.log('Dados recebidos:', dados);
            console.log('Dados recebidos:', dados.resposta.nome);
            console.log('Dados recebidos:', dados.resposta.imagem);

            setNomeUsuario(dados.resposta.nome);
            setProfileImg(dados.resposta.imagem || imgDefault);
            
            return;

        } catch(e) {
            console.log(e.message);
        }

    }

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
                    <button className="dropdown-arrow">
                        <i className='fa fa-arrow-right'></i>
                    </button>
                    <div className="nome">
                        <p>{nomeUsuario}</p>
                    </div>
                    <div className="icone">
                        <img src={profileImg} alt="PFP" />
                    </div>
                </div>
            )}
            
        </header>
    );
}