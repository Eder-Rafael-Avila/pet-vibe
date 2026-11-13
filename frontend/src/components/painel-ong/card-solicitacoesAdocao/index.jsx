import './index.scss';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTimes, FaCheck } from 'react-icons/fa';
import { obterImagem } from '../../../utils/obterImagem.js';

export default function CardSolicitacaoAdocao({
    solicitacao,
    acaoEmAndamento,
    bloqueado,
    onAprovar,
    onReprovar
}) {
    const estaOcupado = Boolean(bloqueado || acaoEmAndamento);
    const preferencias = [
        ['Moradia', solicitacao.preferencia_moradia],
        ['Tempo que ficará sozinho', solicitacao.preferencia_tempo_sozinho],
        ['Possui outros animais', solicitacao.preferencia_outros_animais],
        ['Há crianças na residência', solicitacao.preferencia_criancas],
        ['Experiência com animais', solicitacao.preferencia_experiencia]
    ];
    const possuiPreferencias = preferencias.some(([, valor]) => valor);

    return (
        <article className="card-solicitacao-adocao">
            <div className="card-solicitacao-adocao__imagem">
                <img
                    src={obterImagem(solicitacao.imagem_animal)}
                    alt={`Foto de ${solicitacao.nome_animal || 'animal solicitado'}`}
                    loading="lazy"
                />
            </div>

            <div className="card-solicitacao-adocao__conteudo">
                <div>
                    <span className="card-solicitacao-adocao__rotulo">Solicitação para</span>
                    <h3>{solicitacao.nome_animal || 'Animal sem nome'}</h3>
                    <p className="card-solicitacao-adocao__animal">
                        {[solicitacao.tipo_animal, solicitacao.raca_animal].filter(Boolean).join(' • ')}
                        {solicitacao.idade_animal != null && ` • ${solicitacao.idade_animal} ${Number(solicitacao.idade_animal) === 1 ? 'ano' : 'anos'}`}
                    </p>
                </div>

                <div className="card-solicitacao-adocao__usuario">
                    <span className="card-solicitacao-adocao__rotulo">Pessoa interessada</span>
                    <strong>{solicitacao.nome_usuario || 'Nome não informado'}</strong>
                    <span className="card-solicitacao-adocao__cidade">
                        <FaMapMarkerAlt aria-hidden="true" />
                        {solicitacao.cidade_usuario || 'Cidade não informada'}
                    </span>
                    {solicitacao.email_usuario && (
                        <a href={`mailto:${solicitacao.email_usuario}`}>
                            <FaEnvelope aria-hidden="true" />
                            {solicitacao.email_usuario}
                        </a>
                    )}
                    {solicitacao.telefone_usuario && (
                        <a href={`tel:${solicitacao.telefone_usuario}`}>
                            <FaPhone aria-hidden="true" />
                            {solicitacao.telefone_usuario}
                        </a>
                    )}
                </div>

                <section className="card-solicitacao-adocao__preferencias" aria-label="Preferências do questionário">
                    <span className="card-solicitacao-adocao__rotulo">Preferências de adoção</span>
                    {possuiPreferencias ? (
                        <dl>
                            {preferencias.map(([label, valor]) => (
                                <div key={label}>
                                    <dt>{label}</dt>
                                    <dd>{valor || 'Não informado'}</dd>
                                </div>
                            ))}
                        </dl>
                    ) : (
                        <p>Este usuário ainda não respondeu ao questionário.</p>
                    )}
                </section>

                <div className="card-solicitacao-adocao__acoes">
                    <button
                        type="button"
                        className="aprovar"
                        disabled={estaOcupado}
                        onClick={() => onAprovar(solicitacao.id_adocao)}
                    >
                        <FaCheck aria-hidden="true" />
                        {acaoEmAndamento === 'aprovar' ? 'Aprovando...' : 'Aprovar'}
                    </button>
                    <button
                        type="button"
                        className="reprovar"
                        disabled={estaOcupado}
                        onClick={() => onReprovar(solicitacao.id_adocao)}
                    >
                        <FaTimes aria-hidden="true" />
                        {acaoEmAndamento === 'reprovar' ? 'Reprovando...' : 'Reprovar'}
                    </button>
                </div>
            </div>
        </article>
    );
}