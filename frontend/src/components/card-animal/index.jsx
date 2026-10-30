import './index.scss'

export default function CardAnimais({
    imagem,
    nome,
    especie,
    idade,
    genero,
    porte,
    desc,
    btn,
    castrado,

}){
    return(
        <div className="card-animal">
            <div className="imagem">
                <img src={imagem} alt="" />
            </div>
            <div className="nome">
                <h2>{nome}</h2>
            </div>
        <div className="especificacoes">

            <div className="especie">
                <p>{especie} - </p>
            </div>
            <div className="idade">
                <p>{idade} - </p>
            </div>
            <div className="genero">
                <p>{genero} - </p>
            </div>
            <div className="castrado">
                <p>{castrado}</p>
            </div>
        </div>
        <div className="loc-porte">
            <div className="porte">
                <p>Porte: {porte}</p>
            </div>
            </div>
                <div className="desc">
                <p>{desc}</p>
            </div>
                <div className="btn">
                    <button>{btn}</button>
                </div>
            
            </div>
    )
}