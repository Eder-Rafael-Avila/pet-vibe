import './index.scss';

export default function MainPanel() {

    return (
        <>
            <section className='comp-main-panel'>
                <div className="text-area">
                    <div className="balloon-text">
                        <i className="fa-solid fa-paw"></i><span>Novo conceito em adoção de animais</span>
                    </div>
                    <div className="main-text">
                        <h2>Mais que adoção,<br/> é <span>conexão.</span></h2>

                        <p>
                            Encontre o pet ideal com base na sua personalidade, no seu estilo de vida e no que realmente combina com a rotina do seu lar. Esqueça as buscas aleatórias.
                        </p>
                    </div>
                    <div className="buttons">
                        <button>
                            Quero fazer meu match <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <button id='animais-disponiveis'>
                            Ver animais disponíveis
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}