import './index.scss';

export default function SolicitacoesAdocao({
    nomeONG = 'AdotePetz'
}) {

    let qtdSolicitacoes = 4;

    return (
        <main className="comp-solic-adocao">
            <header>
                <h2>Solicitações de adoção de {nomeONG}: <span className='qtdSolicitacoes'>{qtdSolicitacoes}</span></h2>
            </header>
        </main>
    );
}