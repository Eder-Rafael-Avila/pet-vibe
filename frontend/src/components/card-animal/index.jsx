import './index.scss';
import { obterImagem } from '../../utils/obterImagem.js';

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

function formatarIdade(idade) {
    if (idade === null || idade === undefined || idade === '') return 'Idade não informada';
    const idadeNumerica = Number(idade);

    if (!Number.isFinite(idadeNumerica)) return `${idade} anos`;
    return `${idadeNumerica} ${idadeNumerica === 1 ? 'ano' : 'anos'}`;
}

export default function CardAnimais({
    imagem,
    nome,
    especie,
    idade,
    genero,
    castrado,
    porte,
    raca,
    dataNascimento,
    nomeOng,
    descricao,
    btn = 'Adotar animal',
    onAdotar
}) {
    return (
        <article className="card-animal">
            <div className="imagem">
                <img
                    src={obterImagem(imagem)}
                    alt={nome ? `Foto de ${nome}` : 'Foto do animal para adoção'}
                    loading="lazy"
                />
                <span className="status">
                    <span className="bola" aria-hidden="true" />
                    Disponível para adoção
                </span>
            </div>

            <div className="conteudo">
                <div className="cabecalho">
                    <div className="nome">
                        <h2>{nome || 'Animal sem nome'}</h2>
                        <p>{[especie, raca].filter(Boolean).join(' • ') || 'Espécie não informada'}</p>
                    </div>
                    {porte && <span className="porte">{porte}</span>}
                </div>

                <div className="especificacoes" aria-label="Características do animal">
                    <span>{formatarIdade(idade)}</span>
                    <span>{formatarSexo(genero)}</span>
                    <span>{formatarCastracao(castrado)}</span>
                </div>

                {dataNascimento && (
                    <p className="data-nascimento">
                        Nascimento: <time>{dataNascimento}</time>
                    </p>
                )}

                {descricao && <p className="desc">{descricao}</p>}

                {nomeOng && <p className="ong">Responsável: <strong>{nomeOng}</strong></p>}

                <button className="btn-adotar" type="button" onClick={onAdotar}>{btn}</button>
            </div>
        </article>
    );
}
