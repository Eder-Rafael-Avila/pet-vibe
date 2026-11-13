import './index.scss'

import Questionario from '../../components/questionario'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function Questionarioo({
    usuarioLogado,
    setUsuarioLogado,
    questionarioRespondido,
    setQuestionarioRespondido
}){
    return(
        <div className='page-questionario'>
        <>
      <Header
        logado={usuarioLogado}
        setUsuarioLogado={setUsuarioLogado}
      />
        <Questionario
            questionarioRespondido={questionarioRespondido}
            setQuestionarioRespondido={setQuestionarioRespondido}
        />
        <Footer />
        </>
        </div>
    )
}