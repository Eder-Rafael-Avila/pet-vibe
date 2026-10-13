import './index.scss'

export default function CardAnimais({
    imagem,
    status,
    nome,
    especie,
    idade,
    genero,
    porte,
    localizacao,
    desc, 

}){
    return(
        <div className="animais-card">
            <div className="imagem">
                <img src={imagem} alt="" />
            </div>
            <div className="status">
                <p>{status}</p>
            </div>
            <div className="nome">
                <h2>{nome}</h2>
            </div>
            <div className="especie">
                <p>{especie}</p>
            </div>
            <div className="idade">
                <p>{idade}</p>
            </div>
            <div className="genero">
                <p>{genero}</p>
            </div>
            <div className="porte">
                <p>{porte}</p>
            </div>
            <div className="localizacao">
                <p>{localizacao}</p>

                <div className="desc">
                <p>{desc}</p>
            </div>
            </div>
        </div>
    )
}