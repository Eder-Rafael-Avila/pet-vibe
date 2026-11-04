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
        setCampanha({
            titulo: '',
            descricao: '',
            imagem: '',
            valor: ''
        });

        setPreview(null);
    }

    function criarCampanha(e) {
        e.preventDefault();

        console.log(campanha);
        alert('Campanha criada com sucesso!');

        limparFormulario();
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

                <span>🐾</span>

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
                            min="1"
                            value={campanha.valor}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="botoes-campanha">

                        <button
                            type="button"
                            className="btn-limpar"
                            onClick={limparFormulario}
                        >
                            Limpar campos
                        </button>

                        <button
                            type="submit"
                            className="btn-criar"
                        >
                            + Criar campanha
                        </button>

                    </div>

                </form>

            </section>

        </main>
    );
}