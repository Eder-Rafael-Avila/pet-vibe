import './index.scss';

import Header from '../../components/header/index.jsx'
import { useState } from 'react';

export default function Home() {
    const [logado, setLogado] = useState(false);

    return (
        <>
            <Header
                logado={logado}
            />
        </>
    )
}