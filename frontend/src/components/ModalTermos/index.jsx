import './index.scss';

export default function ModalTermos({ fechar }) {
    return (
        <div className="fundo-modal-termos" onClick={fechar}>

            <div
                className="modal-termos"
                onClick={(e) => e.stopPropagation()}
            >

                <header className="cabecalho-modal-termos">
                    <div className="titulo-modal-termos">
                        <h2>Termos e Condições de Uso</h2>
                        <p>PetVibe — Documento oficial</p>
                    </div>

                    <button
                        className="fechar-modal-termos"
                        onClick={fechar}
                    >
                        ×
                    </button>
                </header>

                <main className="conteudo-modal-termos">

                    <p className="data-termos">
                        Última atualização: 31 de outubro de 2026
                    </p>

                    <p>
                        Bem-vindo ao PetVibe! Leia atentamente as condições
                        para utilizar nossa plataforma.
                    </p>

                    <section>
                        <h3>1. Apresentação</h3>
                        <p>
                            O PetVibe é uma plataforma desenvolvida com o objetivo
                            de conectar pessoas interessadas em adotar animais
                            a Organizações Não Governamentais (ONGs) e instituições
                            de proteção animal.
                        </p>
                        <p>
                            Nossa missão é facilitar o processo de adoção
                            responsável, proporcionando um ambiente onde
                            organizações possam divulgar animais disponíveis
                            para adoção.
                        </p>
                    </section>

                    <section>
                        <h3>2. Cadastro e criação de conta</h3>
                        <p>
                            Para utilizar determinadas funcionalidades do PetVibe,
                            é necessário criar uma conta na plataforma.
                        </p>
                        <p>
                            Durante o cadastro, o usuário deverá fornecer
                            informações verdadeiras, completas e atualizadas.
                        </p>
                        <ul>
                            <li>Usuários: pessoas interessadas em adotar animais.</li>
                            <li>ONGs: organizações que desejam divulgar animais disponíveis para adoção.</li>
                        </ul>
                        <p>
                            Cada usuário é responsável pela segurança de suas
                            credenciais de acesso.
                        </p>
                    </section>

                    <section>
                        <h3>3. Responsabilidades dos usuários</h3>
                        <p>Os usuários comprometem-se a:</p>
                        <ul>
                            <li>Fornecer informações verdadeiras.</li>
                            <li>Utilizar a plataforma de maneira ética e respeitosa.</li>
                            <li>Respeitar as organizações e os demais usuários.</li>
                            <li>Agir com responsabilidade durante o processo de adoção.</li>
                            <li>Não utilizar a plataforma para atividades fraudulentas.</li>
                        </ul>
                        <p>
                            A adoção de um animal envolve responsabilidades
                            permanentes, incluindo alimentação, cuidados
                            veterinários, segurança e bem-estar.
                        </p>
                    </section>

                    <section>
                        <h3>4. Responsabilidades das ONGs</h3>
                        <p>As organizações cadastradas comprometem-se a:</p>
                        <ul>
                            <li>Fornecer informações verdadeiras sobre sua organização.</li>
                            <li>Publicar informações corretas sobre os animais.</li>
                            <li>Utilizar imagens correspondentes aos animais anunciados.</li>
                            <li>Manter os anúncios atualizados.</li>
                            <li>Informar quando um animal não estiver mais disponível.</li>
                            <li>Atender os interessados de maneira respeitosa.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>5. Publicação e divulgação de animais</h3>
                        <p>
                            As ONGs poderão utilizar a plataforma para divulgar
                            animais disponíveis para adoção.
                        </p>
                        <p>
                            As publicações deverão apresentar informações
                            relevantes, como nome, espécie, raça, idade,
                            sexo, porte, condição de castração e fotografias.
                        </p>
                        <p>
                            É proibida a publicação de anúncios falsos ou
                            informações enganosas.
                        </p>
                    </section>

                    <section>
                        <h3>6. Processo de adoção</h3>
                        <p>
                            O PetVibe facilita o contato entre pessoas
                            interessadas em adotar e organizações responsáveis
                            pelos animais.
                        </p>
                        <p>
                            As condições específicas da adoção, incluindo
                            entrevistas, avaliações, documentos e entrega
                            do animal, poderão ser estabelecidas diretamente
                            pela ONG responsável.
                        </p>
                        <p>
                            Demonstrar interesse por um animal não representa
                            garantia de aprovação da adoção.
                        </p>
                    </section>

                    <section>
                        <h3>7. Condutas proibidas</h3>
                        <p>É proibido utilizar o PetVibe para:</p>
                        <ul>
                            <li>Praticar fraudes ou golpes.</li>
                            <li>Divulgar informações falsas.</li>
                            <li>Comercializar animais de maneira irregular.</li>
                            <li>Praticar discriminação, assédio ou ameaças.</li>
                            <li>Utilizar dados de outros usuários sem autorização.</li>
                            <li>Realizar atividades que prejudiquem a plataforma.</li>
                        </ul>
                    </section>

                    <section>
                        <h3>8. Privacidade e proteção de dados</h3>
                        <p>
                            O PetVibe poderá coletar e utilizar informações
                            pessoais fornecidas durante o cadastro e a utilização
                            da plataforma.
                        </p>
                        <p>
                            O tratamento dos dados seguirá a legislação aplicável,
                            especialmente a Lei Geral de Proteção de Dados
                            Pessoais (Lei nº 13.709/2018 — LGPD).
                        </p>
                        <p>
                            Mais informações estarão disponíveis na Política
                            de Privacidade do PetVibe.
                        </p>
                    </section>

                    <section>
                        <h3>9. Disponibilidade da plataforma</h3>
                        <p>
                            O PetVibe buscará manter seus serviços disponíveis.
                            Entretanto, poderão ocorrer interrupções temporárias
                            decorrentes de manutenções, atualizações ou falhas
                            técnicas.
                        </p>
                    </section>

                    <section>
                        <h3>10. Suspensão e encerramento de contas</h3>
                        <p>
                            O PetVibe poderá restringir, suspender ou encerrar
                            contas que apresentem comportamentos contrários
                            a estes termos ou à legislação aplicável,
                            observados os procedimentos adequados.
                        </p>
                        <p>
                            Os usuários também poderão solicitar o encerramento
                            de suas contas, respeitadas as obrigações legais
                            de conservação de dados.
                        </p>
                    </section>

                    <section>
                        <h3>11. Alterações nos termos</h3>
                        <p>
                            O PetVibe poderá atualizar estes Termos e Condições
                            sempre que necessário. Alterações relevantes
                            serão comunicadas aos usuários.
                        </p>
                    </section>

                    <section>
                        <h3>12. Contato</h3>
                        <p>
                            Em caso de dúvidas ou problemas relacionados
                            à utilização da plataforma, entre em contato
                            com a equipe responsável pelos canais oficiais
                            de atendimento do PetVibe.
                        </p>
                    </section>

                    <div className="final-modal-termos">
                        <strong>PetVibe</strong>
                        <p>
                            Conectando pessoas, ONGs e animais por meio
                            da adoção responsável.
                        </p>
                    </div>

                </main>

                <footer className="rodape-modal-termos">
                    <button onClick={fechar}>
                        Fechar
                    </button>
                </footer>

            </div>
        </div>
    );
}