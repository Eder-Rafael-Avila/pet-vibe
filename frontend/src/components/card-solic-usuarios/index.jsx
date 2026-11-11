import './index.scss';
import { FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa';
import { obterImagem } from '../../utils/obterImagem.js';

const statusAdocao = {
    pendente: { texto: 'Aguardando resposta', classe: 'pendente' },
    aprovada: { texto: 'Aprovada', classe: 'aprovada' },
    reprovada: { texto: 'Não aprovada', classe: 'reprovada' }
};

export default function CardSolicitacaoUsuario({
    solicitacao,
    excluindo,
    bloqueado,
    onExcluir
}) {
    const status = statusAdocao[solicitacao.situacao] || {
        texto: 'Status indisponível',
        classe: 'desconhecido'
    };
    const podeExcluir = solicitacao.situacao === 'pendente';
    const nomeAnimal = solicitacao.nome_animal || 'Animal sem nome';
    const caracteristicas = [
        solicitacao.tipo_animal,
        solicitacao.raca_animal,
        solicitacao.idade_animal != null
            ? `${solicitacao.idade_animal} ${Number(solicitacao.idade_animal) === 1 ? 'ano' : 'anos'}`
            : null
    ].filter(Boolean);

    return (
        <article className="card-solic-usuario">
            <div className="imagem">
                <img
                    src={obterImagem(solicitacao.imagem_animal)}
                    alt={`Foto de ${nomeAnimal}`}
                    loading="lazy"
                />
            </div>

            <div className="conteudo">
                <div className="cabecalho">
                    <div>
                        <p className="rotulo">Animal solicitado</p>
                        <h3>{nomeAnimal}</h3>
                    </div>
                    <span className={`status ${status.classe}`} role="status">
                        {status.texto}
                    </span>
                </div>

                {caracteristicas.length > 0 && (
                    <p className="caracteristicas">{caracteristicas.join(' • ')}</p>
                )}

                <div className="dados-ong">
                    <p className="rotulo">ONG responsável</p>
                    <strong>{solicitacao.nome_ong || 'ONG não informada'}</strong>
                    {solicitacao.situacao === 'aprovada' && (
                        <div className="contatos">
                            {solicitacao.email_ong && (
                                <a href={`mailto:${solicitacao.email_ong}`}>
                                    <FaEnvelope aria-hidden="true" />
                                    {solicitacao.email_ong}
                                </a>
                            )}
                            {solicitacao.telefone_ong && (
                                <a href={`tel:${solicitacao.telefone_ong}`}>
                                    <FaPhone aria-hidden="true" />
                                    {solicitacao.telefone_ong}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {podeExcluir && (
                    <button
                        className="botao-excluir"
                        type="button"
                        disabled={bloqueado}
                        onClick={() => onExcluir(solicitacao.id_adocao)}
                        aria-label={`Excluir solicitação para ${nomeAnimal}`}
                    >
                        <FaTrash aria-hidden="true" />
                        {excluindo ? 'Excluindo...' : 'Excluir solicitação'}
                    </button>
                )}
            </div>
        </article>
    );
}