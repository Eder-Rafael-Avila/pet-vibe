import './index.scss';

import Header from '../../components/header/index.jsx';
import MainPanel from '../../components/main-panel';

import { useState } from 'react';

export default function Home() {
    const [logado, setLogado] = useState(false);

    return (
        <>
            <Header
                logado={logado}
            />

            <MainPanel />
        </>
    )
}