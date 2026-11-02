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
                                Solicitações de adoção
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button className='logout'>
                                Sair da conta
                            </button>
                        </li>
                    </ul>
                </aside>
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
            </main>
        </div>
    );
}