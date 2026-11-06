import './index.scss'

import Questionario from '../../components/questionario'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function Questionarioo(){
    return(
        <div className='page-questionario'>
        <>
        <Header />
        <Questionario />
        <Footer />
        </>
        </div>
    )
}