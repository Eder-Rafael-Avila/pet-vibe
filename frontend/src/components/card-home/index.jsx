import './index.scss';

export default function CardHome({
    icone,
    titulo,
    desc
}) {

    return (
        <main className='comp-card-home'>

            <div className="icon">
                <p>{icone}</p>
            </div>

            <div className="text">

                <h2>
                    {titulo}
                </h2>

                <p>
                    {desc}
                </p>

            </div>
        </main>
    );
}