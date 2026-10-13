import './index.scss';
import DropdownMenu from '../dropdown-menu';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ 
    logado
 }) {
    
    const [isActive, setIsActive] = useState(false);

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
                            color: 'white',
                            textDecoration: 'none'
                        })}
                        >Cadastre-se</NavLink>
                    </button>
                </div>
            ) : (
                <>
                    {/* Aqui quando o usuário estiver logado. */}
                </>
            )}
            
        </header>
    );
}