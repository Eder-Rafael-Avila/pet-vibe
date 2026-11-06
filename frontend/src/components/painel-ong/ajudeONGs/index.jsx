import { useState } from 'react';
import './index.scss';

export default function AjudeONGs() {

    const [campanha, setCampanha] = useState({
        titulo: '',
        descricao: '',
        imagem: '',
        valor: ''
    });

    const [preview, setPreview] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [temPermissao, setTemPermissao] = useState(() => {
        try {
            const token = localStorage.getItem('token');
            const conteudo = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(conteudo));

            return payload.tipo === 'ONG' && payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    });

    function handleChange(e) {
        setCampanha({
            ...campanha,
            [e.target.name]: e.target.value
        });
    }

    function handleImagem(e) {
        const arquivo = e.target.files[0];

        if (arquivo) {
            setCampanha({
                ...campanha,
                imagem: arquivo
            });

            setPreview(URL.createObjectURL(arquivo));
        }
    }

    function limparFormulario() {
        if (preview) URL.revokeObjectURL(preview);
        setCampanha({
            titulo: '',
            descricao: '',
            imagem: '',
            valor: ''
        });

        setPreview(null);
    }

    async function criarCampanha(e) {
        e.preventDefault();
        if (enviando || !temPermissao) return;

        const formulario = e.currentTarget;
        setErro('');
        setSucesso('');
        setEnviando(true);

        try {
            const dados = new FormData();
            dados.append('dados', JSON.stringify({
                titulo: campanha.titulo,
                descricao: campanha.descricao,
                valor: Number(campanha.valor)
            }));
            dados.append('imagem', campanha.imagem);

            const resposta = await fetch('http://localhost:6767/campanha/criar', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: dados
            });

            const resultado = await resposta.json();

            if (resposta.status === 401 || resposta.status === 403) {
                setTemPermissao(false);
                return;
            }

            if (!resposta.ok) {
                throw new Error(resultado.erro || 'Não foi possível criar a campanha.');
            }

            limparFormulario();
            formulario.reset();
            setSucesso('Campanha criada com sucesso!');
        } catch (err) {
            setErro(err instanceof TypeError
                ? 'Não foi possível conectar ao servidor. Tente novamente.'
                : err.message);
        } finally {
            setEnviando(false);
        }
    }

    if (!temPermissao) {
        return (
            <main className="comp-ajude-ongs">
                <div className="titulo-campanha">
                    <h1>Acesso restrito a ONGs</h1>
                    <p>Entre com uma conta de ONG para criar campanhas de arrecadação.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="comp-ajude-ongs">

            <div className="titulo-campanha">
                <h3>AJUDE A TRANSFORMAR VIDAS</h3>

                <h1>Crie uma campanha de arrecadação</h1>

                <p>
                    Compartilhe uma causa e mobilize pessoas para ajudar
                    os animais que precisam.
                </p>
            </div>

            <section className="info-campanha">

                <div>
                    <h2>Uma campanha pode mudar uma história!</h2>

                    <p>
                        Apresente sua causa e receba apoio de pessoas
                        que acreditam na proteção animal.
                    </p>
                </div>

                

            </section>

            <section className="form-campanha">

                <div className="titulo-form">
                    <h2>Informações da campanha</h2>

                    <p>
                        Preencha os campos para cadastrar sua campanha.
                    </p>
                </div>

                <form onSubmit={criarCampanha}>

                    <div className="campo">
                        <label>Título da campanha</label>

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Digite o título da campanha"
                            value={campanha.titulo}
                            onChange={handleChange}
                            disabled={enviando}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Descrição</label>

                        <textarea
                            name="descricao"
                            placeholder="Conte sobre sua campanha..."
                            value={campanha.descricao}
                            onChange={handleChange}
                            disabled={enviando}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Imagem da campanha</label>

                        <input
                            type="file"
                            name="imagem"
                            accept="image/*"
                            onChange={handleImagem}
                            disabled={enviando}
                            required
                        />

                        {preview && (
                            <div className="preview-imagem">
                                <img
                                    src={preview}
                                    alt="Prévia da campanha"
                                />
                            </div>
                        )}
                    </div>

                    <div className="campo">
                        <label>Valor da campanha (R$)</label>

                        <input
                            type="number"
                            name="valor"
                            placeholder="Ex: 5000"
                            min="0.01"
                            step="0.01"
                            value={campanha.valor}
                            onChange={handleChange}
                            disabled={enviando}
                            required
                        />
                    </div>

                    {erro && <p className="mensagem-erro">{erro}</p>}
                    {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

                    <div className="botoes-campanha">

                        <button
                            type="button"
                            className="btn-limpar"
                            onClick={limparFormulario}
                            disabled={enviando}
                        >
                            Limpar campos
                        </button>

                        <button
                            type="submit"
                            className="btn-criar"
                            disabled={enviando}
                        >
                            {enviando ? 'Criando...' : '+ Criar campanha'}
                        </button>

                    </div>

                </form>

            </section>

        </main>
    );
}
