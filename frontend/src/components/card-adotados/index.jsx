import './index.scss';

import { useId, useState } from 'react';

export default function CardAdotados({
    imgAnimal,
    nomeAnimal,
    historiaAnimalExpandida,
    previewHistAnimal
}) {
    const [histAnimalExpandida, setHistAnimalExpandida] = useState(false);
    const historiaId = useId();

    return (
        <article className={`comp-card-adotados${histAnimalExpandida ? ' expandido' : ''}`}>
            <div className="imagem">
                <img src={imgAnimal} alt={`Foto de ${nomeAnimal}`} loading="lazy" />
            </div>
            <div className="conteudo">
                <div className="nome">
                    <span className="rotulo">História de adoção</span>
                    <h2>{nomeAnimal}</h2>
                </div>
                <div
                    className={`historia${histAnimalExpandida ? ' aberta' : ''}`}
                    id={historiaId}
                >
                    <div className="historia-conteudo">
                        <p>
                            {histAnimalExpandida ? historiaAnimalExpandida : previewHistAnimal}
                        </p>
                    </div>
                </div>
                <div className="ver-mais">
                    <button
                        type="button"
                        className={histAnimalExpandida ? 'fechar' : ''}
                        aria-expanded={histAnimalExpandida}
                        aria-controls={historiaId}
                        onClick={() => setHistAnimalExpandida(!histAnimalExpandida)}
                    >
                        {histAnimalExpandida ? 'Mostrar menos' : 'Ler história completa'}
                    </button>
                </div>
            </div>
        </article>
    );
}