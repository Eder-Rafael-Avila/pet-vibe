import './index.scss';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PagePerfil() {

    const location = useLocation();
    const nomeUsuario = location.state?.nome;
    

    async function getAccountInfo() {
        // const resposta = await fetch(`http://localhost:6767/usuario/nome/${encodeURIComponent(nomeUsuario)}`)
    }

    return(
        <div className="page-perfil">
            <header>
                <button className="voltar">
                    <i className='fa fa-arrow-left' />
                </button>
                <div className="title">
                    <h1>Personalização da Conta</h1>
                </div>
                <div className="account-name">
                    <p>{nomeUsuario}</p>
                </div>
            </header>
        </div>
    );
}