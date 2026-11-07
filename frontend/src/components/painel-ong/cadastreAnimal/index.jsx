import './index.scss';

import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import recortarImagem from '../../../utils/recortarImagem.js';

export default function CadastreAnimal() {
    const [foto, setFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);
    const [imagemParaRecorte, setImagemParaRecorte] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [areaRecorte, setAreaRecorte] = useState(null);
    const [erroImagem, setErroImagem] = useState('');
    const [erroCadastro, setErroCadastro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (!previewFoto) return undefined;
        return () => URL.revokeObjectURL(previewFoto);
    }, [previewFoto]);

    useEffect(() => {
        if (!imagemParaRecorte) return undefined;
        return () => URL.revokeObjectURL(imagemParaRecorte);
    }, [imagemParaRecorte]);

    function selecionarFoto(e) {
        const arquivo = e.target.files?.[0];
        e.target.value = '';

        if (!arquivo) return;

        if (!arquivo.type.startsWith('image/')) {
            setErroImagem('Selecione um arquivo de imagem válido.');
            return;
        }

        setErroImagem('');
        setImagemParaRecorte(URL.createObjectURL(arquivo));
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setAreaRecorte(null);
    }

    async function confirmarRecorte() {
        if (!imagemParaRecorte || !areaRecorte) {
            setErroImagem('Ajuste o recorte da imagem antes de confirmar.');
            return;
        }

        try {
            const imagemRecortada = await recortarImagem(imagemParaRecorte, areaRecorte);
            setFoto(imagemRecortada);
            setPreviewFoto(URL.createObjectURL(imagemRecortada));
            setImagemParaRecorte(null);
            setErroImagem('');
        } catch (e) {
            console.error('Erro ao recortar imagem:', e);
            setErroImagem('Não foi possível recortar a imagem.');
        }
    }

    function cancelarRecorte() {
        setImagemParaRecorte(null);
        setAreaRecorte(null);
    }

    function removerFoto() {
        setFoto(null);
        setPreviewFoto(null);
        setErroImagem('');
    }

    async function cadastrarAnimal(e) {
        e.preventDefault();
        setErroCadastro('');
        setMensagemSucesso('');

        if (!foto) {
            setErroCadastro('Adicione e confirme uma imagem quadrada do animal.');
            return;
        }

        const formularioElemento = e.currentTarget;
        const campos = Object.fromEntries(new FormData(formularioElemento).entries());
        const dados = {
            ...campos,
            idade: Number(campos.idade),
            castrado: campos.castrado === 'true'
        };
        const formulario = new FormData();
        formulario.append('dados', JSON.stringify(dados));
        formulario.append('imagem', foto, 'imagem-animal.jpg');

        setEnviando(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Faça login como ONG para cadastrar um animal.');
            }

            const resposta = await fetch('http://localhost:6767/animal/cadastrar', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formulario
            });
            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(resultado.erro || 'Não foi possível cadastrar o animal.');
            }

            formularioElemento.reset();
            removerFoto();
            setMensagemSucesso(resultado.mensagem || 'Animal cadastrado com sucesso!');
        } catch (e) {
            console.error('Erro ao cadastrar animal:', e);
            setErroCadastro(e.message || 'Não foi possível cadastrar o animal.');
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form className='comp-cadastre-animal' onSubmit={cadastrarAnimal}>
            <div className="title">
                <div className="icon">1</div>
                <h2>Informações Básicas</h2>
            </div>
            <div className="infos-basicas">
                <div className="essencial">
                    <div className="campo">
                        <label htmlFor="situacao">Situação</label>
                        <input id="situacao" type="text" className='disabled' disabled value='Para adoção' />
                    </div>
                    <div className="campo">
                        <label htmlFor="tipo">Espécie</label>
                        <select name="tipo" id="tipo" required defaultValue="">
                            <option value="" disabled>Selecione</option>
                            <option value="Cachorro">Cachorro</option>
                            <option value="Gato">Gato</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="sexo">Gênero</label>
                        <select name="sexo" id="sexo" required defaultValue="">
                            <option value="" disabled>Selecione</option>
                            <option value="masculino">Macho</option>
                            <option value="feminino">Fêmea</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="castrado">Castrado?</label>
                        <select name="castrado" id="castrado" required defaultValue="">
                            <option value="" disabled>Selecione</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                </div>
                <div className="imagem-animal">
                    <div className="acoes">
                        {previewFoto && !imagemParaRecorte && (
                            <button type="button" className='cancel' onClick={removerFoto}>
                                Remover imagem
                            </button>
                        )}
                        <label className='botao-foto'>
                            <i className="fa-solid fa-camera camera" aria-hidden="true"></i>
                            {previewFoto ? 'Alterar imagem' : 'Adicionar imagem'}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={selecionarFoto}
                            />
                        </label>
                    </div>
                    <div className="area-foto">
                        {imagemParaRecorte ? (
                            <div className="editor-recorte">
                                <div className="crop-container">
                                    <Cropper
                                        image={imagemParaRecorte}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={(_, areaPixels) => setAreaRecorte(areaPixels)}
                                    />
                                </div>
                                <label className="controle-zoom">
                                    Zoom
                                    <input
                                        type="range"
                                        min="1"
                                        max="3"
                                        step="0.1"
                                        value={zoom}
                                        onChange={e => setZoom(Number(e.target.value))}
                                    />
                                </label>
                                <div className="acoes-recorte">
                                    <button type="button" className="cancel" onClick={cancelarRecorte}>
                                        Cancelar
                                    </button>
                                    <button type="button" onClick={confirmarRecorte}>
                                        Confirmar recorte
                                    </button>
                                </div>
                            </div>
                        ) : previewFoto ? (
                            <img className="preview-imagem" src={previewFoto} alt="Prévia quadrada da imagem do animal" />
                        ) : (
                            <div className="area-imagem">
                                <div className="sem-imagem">
                                    <p>Foto do animal</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {erroImagem && <p className="mensagem-form erro" role="alert">{erroImagem}</p>}

            <div className="title-prefs">
                <div className="icon">2</div>
                <h2>Preferências e Características</h2>
            </div>
            <div className="prefs">
                <div className="campo nome-animal">
                    <label htmlFor="nome">Nome do animal *</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome do seu animal aqui"
                        required
                        minLength={2}
                    />
                </div>

                <hr />

                <div className="campo">
                    <label htmlFor="raca">Raça *</label>
                    <input
                        type="text"
                        id="raca"
                        name="raca"
                        placeholder="Ex: Golden Retriever, Pastor Alemão, Vira-lata..."
                        required
                    />
                </div>
                <div className="campo">
                    <label htmlFor="porte">Porte *</label>
                    <select name="porte" id="porte" required defaultValue="">
                        <option value="" disabled>Selecione</option>
                        <option value="grande">Grande</option>
                        <option value="medio">Médio</option>
                        <option value="pequeno">Pequeno</option>
                    </select>
                </div>
                <div className="campo">
                    <label htmlFor="idade">Idade (anos) *</label>
                    <input type="number" id="idade" name="idade" min="0" step="1" required />
                </div>
                <div className="campo">
                    <label htmlFor="data_de_nascimento">Data de nascimento *</label>
                    <input type="date" id="data_de_nascimento" name="data_de_nascimento" required />
                </div>

                <hr />

                <div className="campo desc-area">
                    <label htmlFor="descricao">Adicione uma pequena descrição para seu animal *</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        className='desc'
                        maxLength={100}
                        required
                    />
                </div>
            </div>

            <div className="button">
                {erroCadastro && <p className="mensagem-form erro" role="alert">{erroCadastro}</p>}
                {mensagemSucesso && <p className="mensagem-form sucesso" role="status">{mensagemSucesso}</p>}
                <button type="submit" disabled={enviando}>
                    {enviando ? 'Cadastrando...' : 'Anunciar meu pet'}
                    {!enviando && <i className="fa-solid fa-bullhorn announce" aria-hidden="true"></i>}
                </button>
            </div>
        </form>
    );
}
