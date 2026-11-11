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
                                <NavLink to='/' 
                                    className='link'
                                    onClick={() => {
                                        window.scrollTo({
                                            top:0,
                                            behavior:'smooth'
                                        })
                                    }}
                                >Inicio</NavLink>
                            </li>
                            <li>
                                <a href='/campanhas' 
                                    className='link'
                                >Campanhas</a>
                            </li>
                            <li>
                                <NavLink to='/Adocao' 
                                    className='link'
                                    onClick={() => {
                                        window.scrollTo({
                                            top:0,
                                            behavior:'smooth'
                                        })
                                    }}
                                >Adoção</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <nav className="parcerias">
                        <h2>PARCERIAS</h2>

                        <ul>
                            <li>
                                <NavLink to='/PainelONG' 
                                    className='link'
                                >Cadastrar ONGs</NavLink>
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