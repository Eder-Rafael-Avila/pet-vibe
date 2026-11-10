import './index.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function Header() {
    const navegar = useNavigate();

    let nomeONG = 'AdotePetz'

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
                    <p>Bem vindo, {nomeONG}</p>
                </div>
            </div>
        </header>
    );
}