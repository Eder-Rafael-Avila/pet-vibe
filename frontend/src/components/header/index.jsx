import './index.scss';

import { Link } from 'react';

export default function Header() {
    return (
        <header className='comp-header'>
            <div className="imagem">
                <img src="" alt="" />
            </div>
            <div className="title">
                <h1>Pet<span>Vibe</span></h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link></Link>
                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                    <li>

                    </li>
                </ul>
            </nav>
            <div className="buttons">
                <button>
                    Entrar
                </button>
                <button>
                    Cadastrar
                </button>
            </div>
        </header>
    );
}