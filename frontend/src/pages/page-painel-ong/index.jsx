import './index.scss';

import Header from '../../components/painel-ong/header';
import CadastreAnimal from '../../components/painel-ong/cadastreAnimal';
import AjudeONGs from '../../components/painel-ong/ajudeONGs';
import SolicitacoesAdocao from '../../components/painel-ong/solicitacoesAdocao';
import ListarCampanhas from '../../components/campanhas-listagem';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageONGPanel({ setUsuarioLogado }) {
    const navegar = useNavigate();

    const [paginaSelecionada, setPaginaSelecionada] = useState('');

    function sairDaConta() {
        localStorage.removeItem('token');
        setUsuarioLogado(false);
        navegar('/Login', { replace: true });
    }

    return (
        <div className="page-panel-ong">
            <Header />

            <main>
                <aside className='navegacao'>
                    <ul>
                        <li className='nav-item'>
                            <button
                                onClick={() => setPaginaSelecionada('CadastreAnimal')}
                            >
                                Cadastre um animal
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button
                                onClick={() => setPaginaSelecionada('PedidoAjuda')}
                            >
                                Faça um pedido de ajuda
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button onClick={() => setPaginaSelecionada('ListarCampanhas')}>
                                Listar campanhas
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button
                                onClick={() => setPaginaSelecionada('SolicitacoesAdocao')}
                            >
                                Animais e solicitações
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button className='logout' onClick={sairDaConta}>
                                Sair da conta
                            </button>
                        </li>
                    </ul>
                </aside>
                {paginaSelecionada ? (
                    <div className="pagina-carregada">
                        {paginaSelecionada == 'CadastreAnimal' && (
                            <CadastreAnimal />
                        )}

                        {paginaSelecionada == 'PedidoAjuda' && (
                            <AjudeONGs />
                        )}

                        {paginaSelecionada == 'ListarCampanhas' && (
                            <ListarCampanhas />
                        )}

                        {paginaSelecionada == 'SolicitacoesAdocao' && (
                            <SolicitacoesAdocao />
                        )}
                    </div>
                ) : (
                    <div className="pagina-nao-carregada">
                        <div className="nao-carregado">
                            <h2>Nenhuma aba selecionada</h2>
                            <img src="/assets/images/dashboard-draw.png" alt="Selecione uma página" />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
