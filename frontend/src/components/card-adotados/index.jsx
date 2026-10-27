import './index.scss';

import { useState } from 'react';

export default function CardAdotados({
    imgAnimal,
    nomeAnimal,
    historiaAnimalExpandida,
    previewHistAnimal
}) {

    const [histAnimalExpandida, setHistAnimalExpandida] = useState(false);

    return (
        <main className='comp-card-adotados'>
            <div className="imagem">
                <img src={imgAnimal} alt="Imagem do Animal" />
            </div>
            <div className="nome">
                <h2>{nomeAnimal}</h2>
            </div>
            <div className="historia">
                {histAnimalExpandida ? (
                    <p>
                        {historiaAnimalExpandida}
                    </p>
                ) : (
                    <p>
                        {previewHistAnimal}
                    </p>
                )}
            </div>
            <div className="ver-mais">

                {histAnimalExpandida ? (
                    <button
                        className='fechar'
                        onClick={() => setHistAnimalExpandida(!histAnimalExpandida)}
                    >
                        Fechar
                    </button>
                ) : (
                    <button
                        onClick={() => setHistAnimalExpandida(!histAnimalExpandida)}
                    >
                        Ver mais
                    </button>
                )}

            </div>
        </main>
    );
}