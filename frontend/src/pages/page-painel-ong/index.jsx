import './index.scss';

import Header from '../../components/painel-ong/header';
import CadastreAnimal from '../../components/painel-ong/cadastreAnimal';
import AjudeONGs from '../../components/painel-ong/ajudeONGs';
import SolicitacoesAdocao from '../../components/painel-ong/solicitacoesAdocao';

import { useState } from 'react';

export default function PageONGPanel() {

    const [paginaSelecionada, setPaginaSelecionada] = useState('');

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
                            <button
                                onClick={() => setPaginaSelecionada('SolicitacoesAdocao')}
                            >
                                Animais cadastrados
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button className='logout'>
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