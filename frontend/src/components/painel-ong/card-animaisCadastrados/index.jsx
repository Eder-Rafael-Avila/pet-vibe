import './index.scss';
import { obterImagem } from '../../../utils/obterImagem.js';

function formatarIdade(idade) {
    if (idade === null || idade === undefined || idade === '') {
        return 'Idade não informada';
    }

    const idadeNumerica = Number(idade);
    if (!Number.isFinite(idadeNumerica)) {
        return String(idade);
    }

    return `${idadeNumerica} ${idadeNumerica === 1 ? 'ano' : 'anos'}`;
}

function formatarSexo(sexo) {
    const sexoNormalizado = String(sexo || '').toLowerCase();
    if (sexoNormalizado === 'masculino') return 'Macho';
    if (sexoNormalizado === 'feminino') return 'Fêmea';
    return 'Sexo não informado';
}

function formatarCastracao(castrado) {
    const estaCastrado = castrado === true || castrado === 1 || castrado === '1' || castrado === 'true';
    return estaCastrado ? 'Castrado' : 'Não castrado';
}

export default function CardAnimaisCadastrados({ animal }) {
    return (
        <article className="card-solicitacao">
            <div className="imagem-animal">
                <img
                    src={obterImagem(animal.imagem)}
                    alt={`Foto de ${animal.nome_animal || 'animal cadastrado'}`}
                    loading="lazy"
                />
                <span className="status-animal">
                    <span className="bola" aria-hidden="true" />
                    Cadastrado
                </span>
            </div>

            <div className="conteudo-animal">
                <div className="cabecalho-animal">
                    <div>
                        <span className="rotulo">Animal cadastrado</span>
                        <h2>{animal.nome_animal || 'Animal sem nome'}</h2>
                        <p>{[animal.tipo, animal.raca].filter(Boolean).join(' • ') || 'Espécie não informada'}</p>
                    </div>
                    {animal.porte && <span className="porte">{animal.porte}</span>}
                </div>

                <div className="detalhes-animal" aria-label="Características do animal">
                    <span>{formatarIdade(animal.idade)}</span>
                    <span>{formatarSexo(animal.sexo)}</span>
                    <span>{formatarCastracao(animal.castrado)}</span>
                </div>

                {animal.data_nascimento && (
                    <p className="data-nascimento">
                        Nascimento: <time>{animal.data_nascimento}</time>
                    </p>
                )}

                {animal.descricao && <p className="descricao">{animal.descricao}</p>}
            </div>
        </article>
    );
}
