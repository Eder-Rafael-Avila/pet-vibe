import './index.scss';

import { NavLink } from 'react-router-dom';

export default function Footer() {

    return (
        <footer className='comp-footer'>
            <div className="area-um">
                <div className="petvibe">
                    <div className="slogan">
                        <div className="logo">
                            <img src="/assets/images/logo4.png" alt="" />
                        </div>
                        <div className="title">
                            <h1>Pet<span>Vibe</span></h1>
                        </div>
                    </div>
                    <div className="desc">
                        <p>Conectando vidas. Construindo laços. Um espaço para encontros que merecem durar.</p>
                    </div>
                </div>
                <div className="navegacao">
                    <nav className="plataforma">
                        <h2>PLATAFORMA</h2>

                        <ul>
                            <li>
                                <NavLink to='/comoFunciona' 
                                    className='link'
                                >Como Funciona</NavLink>
                            </li>
                            <li>
                                <a href='#feedback' 
                                    className='link'
                                >Histórias de Sucesso</a>
                            </li>
                            <li>
                                <NavLink to='/marketplace' 
                                    className='link'
                                >MarketPlace</NavLink>
                            </li>
                            <li>
                                <NavLink to='/Adocao' 
                                    className='link'
                                >Adoção</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <nav className="parcerias">
                        <h2>PARCERIAS</h2>

                        <ul>
                            <li>
                                <NavLink to='/comoFunciona' 
                                    className='link'
                                >Cadastrar ONGs</NavLink>
                            </li>
                            <li>
                                <a href='#feedback' 
                                    className='link'
                                >Nossos Parceiros</a>
                            </li>
                            <li>
                                <NavLink to='/marketplace' 
                                    className='link'
                                >Doações</NavLink>
                            </li>
                            <li>
                                <NavLink to='/Adocao' 
                                    className='link'
                                >Termos de Uso</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <hr />

            <div className="area-dois">
                <p>© 2026 PetVibe. Feito com cuidado por todas as vidas.</p>
            </div>
        </footer>
    );
}