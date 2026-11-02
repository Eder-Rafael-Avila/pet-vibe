import './index.scss';

export default function Header() {

    let nomeONG = 'AdotePetz'

    return (
        <header className='comp-ong-header'>
            <div className="identidade">
                <div className="logo">
                    <img src="/assets/images/logo-ong-panel.png" alt="" />
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