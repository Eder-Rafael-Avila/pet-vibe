
import './index.scss';
import { obterImagem } from '../../utils/obterImagem';

export default function CardCampanha({ campanha, ajudarCampanha }) {
    const meta = Number(campanha.valor) || 0;
    const arrecadado = Number(campanha.valor_arrecadado) || 0;

    const progresso = meta > 0
        ? Math.min(100, (arrecadado / meta) * 100)
        : 0;

    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    return (
        <article className="comp-card-campanha">
            <img
                src={campanha.imagem ? obterImagem(campanha.imagem) : '/assets/images/adote.webp'}
                alt={campanha.titulo}
                loading="lazy"
                onError={event => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/assets/images/adote.webp';
                }}
            />

            <div className="campanha-info">
                <div className="ong-campanha">
                    <img
                        src={obterImagem(campanha.imagem_ong)}
                        alt={campanha.nome_ong ? `Foto da ONG ${campanha.nome_ong}` : 'Foto da ONG'}
                        loading="lazy"
                        onError={event => {
                            if (!event.currentTarget.src.endsWith('/assets/images/pfp.png')) {
                                event.currentTarget.src = '/assets/images/pfp.png';
                            }
                        }}
                    />

                    <div>
                        <p className="ong-label">Campanha organizada por</p>
                        <p className="ong-nome">
                            {campanha.nome_ong || 'ONG não informada'}
                        </p>
                    </div>
                </div>

                <h2>{campanha.titulo}</h2>

                <p className="descricao">{campanha.descricao}</p>

                <p className="arrecadado">
                    {formatarValor(arrecadado)} arrecadados
                </p>

                <div className="barra-progresso">
                    <div
                        className="progresso"
                        style={{ width: `${progresso}%` }}
                    />
                </div>

                <p>Meta: {formatarValor(meta)}</p>

                <button
                    type="button"
                    className="ajudar-campanha"
                    onClick={() => ajudarCampanha(campanha)}
                >
                    Ajudar campanha
                </button>
            </div>
        </article>
    );
}
