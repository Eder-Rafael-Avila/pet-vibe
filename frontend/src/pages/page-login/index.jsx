import './index.scss'

import Login from '../../components/login'

export default function Usuario({
    setUsuarioLogado
}){
    return(
        <>
        <Login 
            setUsuarioLogado={setUsuarioLogado}
        />
        </>
    )
}