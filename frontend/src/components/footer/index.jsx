import './index.scss';

import { NavLink } from 'react-router-dom';

export default function Footer() {

    return (
        <footer className='comp-footer'>
            <div className="area-um">
                <div className="petvibe">
                    <div className="logo">
                        <img src="/assets/images/logo4.png" alt="" />
                    </div>
                    <div className="desc">
                        <p>Patas que combinam, vidas que se completam. Encontre o seu pet perfeito através do match inteligente.</p>
                    </div>
                </div>
                <div className="navegacao">
                    <nav className="plataforma">
                        <h2>PLATAFORMA</h2>

                        <ul>
                            <li>
                                <NavLink to='/comoFunciona' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Como Funciona</NavLink>
                            </li>
                            <li>
                                <a href='#feedback' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Histórias de Sucesso</a>
                            </li>
                            <li>
                                <NavLink to='/marketplace' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >MarketPlace</NavLink>
                            </li>
                            <li>
                                <NavLink to='/Adocao' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Adoção</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <nav className="parcerias">
                        <h2>PARCERIAS</h2>

                        <ul>
                            <li>
                                <NavLink to='/comoFunciona' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Cadastrar ONGs</NavLink>
                            </li>
                            <li>
                                <a href='#feedback' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Nossos Parceiros</a>
                            </li>
                            <li>
                                <NavLink to='/marketplace' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Doações</NavLink>
                            </li>
                            <li>
                                <NavLink to='/Adocao' 
                                         style={{
                                            color: '#12a58c',
                                            textDecoration: 'none',
                                         }}
                                >Termos de Uso</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="area-dois">

            </div>
        </footer>
    );
}