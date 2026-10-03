import './index.scss';

import { NavLink } from 'react-router-dom';

export default function Header({ 
    logado
 }) {
    
    return (
        <header className='comp-header'>
            <div className="imagem">
                <img src="/assets/images/logo.png" alt="Logo PetVibe" />
            </div>
            <div className="title">
                <h1>Pet<span>Vibe</span></h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#0F3D5E',
                            textDecoration: 'none'
                        })}
                        ><p>Início</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/sobreNos"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#0F3D5E',
                            textDecoration: 'none'
                        })}
                        ><p>Sobre Nós</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/comoFunciona"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#0F3D5E',
                            textDecoration: 'none'
                        })}
                        ><p>Marketplace</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/animais"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#0F3D5E',
                            textDecoration: 'none'
                        })}
                        ><p>Adoção</p></NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="/ongsParceiras"
                        style={({ isActive }) => ({
                            fontWeight: 'bold',
                            color: isActive ? '#F8561F' : '#0F3D5E',
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