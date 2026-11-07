import './index.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { obterImagem } from '../../../utils/obterImagem.js';
import { obterDadosToken } from '../../../utils/obterInfoToken.js';
import { formatarTelefone } from '../../../utils/formatacaoUtils.js';
import Cropper from 'react-easy-crop';
import recortarImagem from '../../../utils/recortarImagem.js';

export default function PerfilOng({ setUsuarioLogado }) {
    const navegar = useNavigate();

    const [ongInfo, setOngInfo] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [foto, setFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);
    const [imagemParaRecorte, setImagemParaRecorte] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [areaRecorte, setAreaRecorte] = useState(null);
    const [editorAberto, setEditorAberto] = useState(false);
    const [salvandoFoto, setSalvandoFoto] = useState(false);
    const [erroFoto, setErroFoto] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [editandoNome, setEditandoNome] = useState(false);
    const [editandoTelefone, setEditandoTelefone] = useState(false);
    const [erroAlteracao, setErroAlteracao] = useState('');
    const [senha, setSenha] = useState('');
    const [codigoVerificacaoSenha, setCodigoVerificacaoSenha] = useState('');
    const [editandoSenha, setEditandoSenha] = useState(false);
    const [mensagemSenha, setMensagemSenha] = useState('');
    const [erroSenha, setErroSenha] = useState(false);
    const [processandoSenha, setProcessandoSenha] = useState(false);
    const [confirmacaoExclusaoAberta, setConfirmacaoExclusaoAberta] = useState(false);
    const [excluindoConta, setExcluindoConta] = useState(false);
    const [erroExclusao, setErroExclusao] = useState('');

    useEffect(() => {
        if (!previewFoto) return undefined;

        return () => URL.revokeObjectURL(previewFoto);
    }, [previewFoto]);

    useEffect(() => {
        async function carregarDados() {
            const token = localStorage.getItem('token');
            const dadosToken = obterDadosToken();

            if (!dadosToken?.id_ong) {
                setErro('Não foi possível identificar a ONG da conta.');
                setCarregando(false);
                return;
            }

            try {
                const resposta = await fetch(
                    `http://localhost:6767/ongs/consultar/${dadosToken.id_ong}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!resposta.ok) {
                    throw new Error('Não foi possível buscar os dados da ONG.');
                }

                const dados = await resposta.json();
                const ong = dados.resposta?.[0];

                if (!ong) {
                    throw new Error('Não foram encontrados dados para esta ONG.');
                }

                setOngInfo(ong);
            } catch (e) {
                console.error(`Erro ao consultar a ONG: ${e.message}`);
                setErro(e.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    function selecionarFoto(e) {
        const arquivo = e.target.files?.[0];
        e.target.value = '';

        if (!arquivo) return;

        if (!arquivo.type.startsWith('image/')) {
            setErroFoto('Selecione um arquivo de imagem válido.');
            return;
        }

        setErroFoto('');
        setImagemParaRecorte(URL.createObjectURL(arquivo));
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setAreaRecorte(null);
        setEditorAberto(true);
    }

    async function confirmarRecorte() {
        if (!imagemParaRecorte || !areaRecorte) return;

        try {
            const imagemRecortada = await recortarImagem(imagemParaRecorte, areaRecorte);
            setFoto(imagemRecortada);
            setPreviewFoto(URL.createObjectURL(imagemRecortada));
            URL.revokeObjectURL(imagemParaRecorte);
            setImagemParaRecorte(null);
            setEditorAberto(false);
        } catch (e) {
            console.error('Erro ao recortar imagem:', e);
            setErroFoto('Não foi possível recortar a imagem.');
        }
    }

    function cancelarRecorte() {
        if (imagemParaRecorte) {
            URL.revokeObjectURL(imagemParaRecorte);
        }

        setImagemParaRecorte(null);
        setEditorAberto(false);
        setAreaRecorte(null);
    }

    function cancelarAlteracaoFoto() {
        setFoto(null);
        setPreviewFoto(null);
        setErroFoto('');
    }

    async function alterarFoto() {
        if (!foto) {
            setErroFoto('Selecione uma foto primeiro.');
            return;
        }

        const token = localStorage.getItem('token');
        const formulario = new FormData();
        formulario.append('imagem', foto, 'foto-perfil.jpg');
        setSalvandoFoto(true);
        setErroFoto('');

        try {
            const resposta = await fetch('http://localhost:6767/ong/imagem', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formulario
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível alterar a foto.');
            }

            setOngInfo(ongAtual => ({
                ...ongAtual,
                imagem: dados.imagem
            }));
            setFoto(null);
            setPreviewFoto(null);
        } catch (e) {
            console.error(`Erro ao alterar a imagem da ONG: ${e.message}`);
            setErroFoto(e.message || 'Erro ao alterar a foto de perfil.');
        } finally {
            setSalvandoFoto(false);
        }
    }

    async function alterarNome(e) {
        e.preventDefault();
        setErroAlteracao('');

        try {
            const resposta = await fetch('http://localhost:6767/ong/alterarNome', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ nome })
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível alterar o nome da ONG.');
            }

            setOngInfo(ongAtual => ({ ...ongAtual, nome: nome.trim() }));
            setEditandoNome(false);
        } catch (e) {
            console.error(`Erro ao alterar nome da ONG: ${e.message}`);
            setErroAlteracao(e.message);
        }
    }

    async function alterarTelefone(e) {
        e.preventDefault();
        setErroAlteracao('');

        try {
            const telefoneSemMascara = telefone.replace(/\D/g, '');
            const resposta = await fetch('http://localhost:6767/ong/alterarTelefone', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ telefone: telefoneSemMascara })
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível alterar o telefone da ONG.');
            }

            setOngInfo(ongAtual => ({ ...ongAtual, telefone: telefoneSemMascara }));
            setEditandoTelefone(false);
        } catch (e) {
            console.error(`Erro ao alterar telefone da ONG: ${e.message}`);
            setErroAlteracao(e.message);
        }
    }

    async function solicitarCodigoSenha() {
        setProcessandoSenha(true);
        setMensagemSenha('');
        setErroSenha(false);

        try {
            const resposta = await fetch('http://localhost:6767/ong/alterarSenha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ senha: '' })
            });
            const dados = await resposta.json();

            if (resposta.status !== 202) {
                throw new Error(dados.erro || 'Não foi possível solicitar o código de verificação.');
            }

            setEditandoSenha(true);
            setMensagemSenha(dados.resposta || 'Enviamos um código de verificação para o e-mail da ONG.');
        } catch (e) {
            console.error(`Erro ao solicitar código para alterar senha da ONG: ${e.message}`);
            setMensagemSenha(e.message || 'Não foi possível solicitar o código de verificação.');
            setErroSenha(true);
        } finally {
            setProcessandoSenha(false);
        }
    }

    async function alterarSenha(e) {
        e.preventDefault();
        setProcessandoSenha(true);
        setMensagemSenha('');
        setErroSenha(false);

        try {
            const parametros = new URLSearchParams({ codigo: codigoVerificacaoSenha.trim() });
            const respostaVerificacao = await fetch(
                `http://localhost:6767/ong/liberarPermissao?${parametros}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const dadosVerificacao = await respostaVerificacao.json();

            if (!respostaVerificacao.ok || !dadosVerificacao.token) {
                throw new Error(
                    dadosVerificacao.erro ||
                    dadosVerificacao.resposta ||
                    'O código de verificação está incorreto ou expirou.'
                );
            }

            const resposta = await fetch('http://localhost:6767/ong/alterarSenha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    tokenpermitido: dadosVerificacao.token
                },
                body: JSON.stringify({ senha })
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível alterar a senha da ONG.');
            }

            setSenha('');
            setCodigoVerificacaoSenha('');
            setEditandoSenha(false);
            setMensagemSenha('Senha alterada com sucesso.');
        } catch (e) {
            console.error(`Erro ao alterar senha da ONG: ${e.message}`);
            setMensagemSenha(e.message || 'Não foi possível alterar a senha da ONG.');
            setErroSenha(true);
        } finally {
            setProcessandoSenha(false);
        }
    }

    async function excluirConta() {
        const token = localStorage.getItem('token');
        setExcluindoConta(true);
        setErroExclusao('');

        try {
            const resposta = await fetch('http://localhost:6767/ong/excluir', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível excluir a conta da ONG.');
            }

            localStorage.removeItem('token');
            setUsuarioLogado(false);
            navegar('/');
        } catch (e) {
            console.error(`Erro ao excluir a conta da ONG: ${e.message}`);
            setErroExclusao(e.message || 'Não foi possível excluir a conta da ONG.');
        } finally {
            setExcluindoConta(false);
        }
    }

    return (
        <div className="comp-perfil-ong">
            <header className="main-header">
                <div className="voltar">
                    <button
                        type="button"
                        aria-label="Voltar para o início"
                        onClick={() => navegar('/')}
                    >
                        <i className="fa-solid fa-arrow-left-long" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="title">
                    <h1>Personalização da Conta</h1>
                </div>
                <div className="account-name">
                    <div className="icon">
                        <i className="fa-solid fa-paw" aria-hidden="true"></i>
                    </div>
                    <div className="ong">
                        <p>{ongInfo?.nome || 'ONG'}</p>
                        <p className="my-account">Minha conta</p>
                    </div>
                </div>
            </header>

            {editorAberto && (
                <div className="modal-recorte">
                    <div className="conteudo-recorte">
                        <h2>Ajustar foto de perfil</h2>

                        <div className="area-cropper">
                            <Cropper
                                image={imagemParaRecorte}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(_, pixels) => setAreaRecorte(pixels)}
                            />
                        </div>

                        <div className="controle-zoom">
                            <i className="fa-solid fa-magnifying-glass-minus" aria-hidden="true"></i>
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={e => setZoom(Number(e.target.value))}
                                aria-label="Zoom da imagem"
                            />
                            <i className="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i>
                        </div>

                        <div className="botoes-recorte">
                            <button type="button" onClick={cancelarRecorte}>
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={confirmarRecorte}
                                disabled={!areaRecorte}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmacaoExclusaoAberta && (
                <div className="modal-exclusao" role="presentation">
                    <section
                        className="conteudo-exclusao"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="titulo-exclusao-ong"
                        aria-describedby="descricao-exclusao-ong"
                    >
                        <h2 id="titulo-exclusao-ong">Excluir conta da ONG?</h2>
                        <p id="descricao-exclusao-ong">
                            Esta ação não pode ser desfeita. Tem certeza de que deseja excluir a conta?
                        </p>
                        {erroExclusao && <p className="erro-exclusao" role="alert">{erroExclusao}</p>}
                        <div className="botoes-exclusao">
                            <button
                                type="button"
                                className="cancelar"
                                onClick={() => setConfirmacaoExclusaoAberta(false)}
                                disabled={excluindoConta}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="confirmar"
                                onClick={excluirConta}
                                disabled={excluindoConta}
                            >
                                {excluindoConta ? 'Excluindo...' : 'Sim, excluir conta'}
                            </button>
                        </div>
                    </section>
                </div>
            )}

            <main>
                <header className="perfil-header">
                    <div className="desc">
                        <p>Informações da conta da ONG</p>
                    </div>
                    <div className="alterar-foto">
                        <div className="pfp">
                            <div className="foto">
                                <img
                                    src={previewFoto || obterImagem(ongInfo?.imagem)}
                                    alt={`Logo da ONG ${ongInfo?.nome || ''}`}
                                />
                            </div>
                            <label className="botao-foto">
                                <i className="fa-solid fa-camera" aria-hidden="true"></i>
                                Escolher foto
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={selecionarFoto}
                                />
                            </label>
                        </div>

                        {foto && (
                            <div className="acoes-foto">
                                <button
                                    type="button"
                                    onClick={alterarFoto}
                                    disabled={salvandoFoto}
                                >
                                    {salvandoFoto ? 'Salvando...' : 'Salvar foto'}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelarAlteracaoFoto}
                                    disabled={salvandoFoto}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                        {erroFoto && (
                            <p className="erro-foto" role="alert">{erroFoto}</p>
                        )}
                    </div>
                </header>

                <hr />

                <section className="ong-info" aria-live="polite">
                    {carregando ? (
                        <p className="status-message">Carregando dados da ONG...</p>
                    ) : erro ? (
                        <p className="status-message erro">{erro}</p>
                    ) : (
                        <>
                            <div className="campo">
                                <label htmlFor="ong-nome">Nome da ONG</label>
                                {editandoNome ? (
                                    <form className="container editando" onSubmit={alterarNome}>
                                        <button
                                            type="button"
                                            className="cancelar"
                                            onClick={() => {
                                                setEditandoNome(false);
                                                setNome('');
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="enviar">Salvar</button>
                                        <input
                                            id="ong-nome"
                                            type="text"
                                            required
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                        />
                                    </form>
                                ) : (
                                    <div className="container">
                                        <button
                                            type="button"
                                            className="editar"
                                            onClick={() => {
                                                setNome(ongInfo.nome || '');
                                                setEditandoNome(true);
                                            }}
                                        >
                                            editar
                                        </button>
                                        <input id="ong-nome" type="text" value={ongInfo.nome || ''} disabled />
                                    </div>
                                )}
                            </div>

                            <hr />

                            <div className="campo">
                                <label htmlFor="ong-email">E-mail</label>
                                <input id="ong-email" type="email" value={ongInfo.email || ''} disabled />
                            </div>
                            <div className="campo">
                                <label htmlFor="ong-telefone">Telefone</label>
                                {editandoTelefone ? (
                                    <form className="container editando" onSubmit={alterarTelefone}>
                                        <button
                                            type="button"
                                            className="cancelar"
                                            onClick={() => {
                                                setEditandoTelefone(false);
                                                setTelefone('');
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                        <button type="submit" className="enviar">Salvar</button>
                                        <input
                                            id="ong-telefone"
                                            type="tel"
                                            required
                                            value={telefone}
                                            onChange={e => setTelefone(formatarTelefone(e.target.value))}
                                        />
                                    </form>
                                ) : (
                                    <div className="container">
                                        <button
                                            type="button"
                                            className="editar"
                                            onClick={() => {
                                                setTelefone(formatarTelefone(ongInfo.telefone || ''));
                                                setEditandoTelefone(true);
                                            }}
                                        >
                                            editar
                                        </button>
                                        <input
                                            id="ong-telefone"
                                            type="text"
                                            value={formatarTelefone(ongInfo.telefone || '')}
                                            disabled
                                        />
                                    </div>
                                )}
                            </div>

                            <hr />

                            <div className="campo">
                                <label htmlFor="ong-cnpj">CNPJ</label>
                                <input id="ong-cnpj" type="text" value={ongInfo.cnpj || ''} disabled />
                            </div>

                            <hr />

                            <div className="campo">
                                <label htmlFor="senha-ong-atual">Senha</label>
                                <div className="container cont-senha">
                                    <div className="aviso-senha">
                                        * exige verificação por e-mail para alterar
                                    </div>
                                    <input
                                        id="senha-ong-atual"
                                        type="password"
                                        placeholder="Senha privada"
                                        disabled
                                    />
                                    {!editandoSenha ? (
                                        <button
                                            type="button"
                                            className="editar verificar"
                                            onClick={solicitarCodigoSenha}
                                            disabled={processandoSenha}
                                        >
                                            {processandoSenha ? 'Enviando código...' : 'Enviar código'}
                                        </button>
                                    ) : (
                                        <form className="verificacao-senha" onSubmit={alterarSenha}>
                                            <label htmlFor="codigo-verificacao-ong">Código enviado para o e-mail da ONG</label>
                                            <input
                                                id="codigo-verificacao-ong"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="one-time-code"
                                                maxLength={4}
                                                required
                                                value={codigoVerificacaoSenha}
                                                onChange={e => setCodigoVerificacaoSenha(e.target.value.replace(/\D/g, ''))}
                                            />

                                            <label htmlFor="nova-senha-ong">Nova senha</label>
                                            <input
                                                id="nova-senha-ong"
                                                type="password"
                                                autoComplete="new-password"
                                                minLength={8}
                                                required
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                            />

                                            <div className="acoes-verificacao-senha">
                                                <button
                                                    type="button"
                                                    className="reenviar"
                                                    onClick={solicitarCodigoSenha}
                                                    disabled={processandoSenha}
                                                >
                                                    Reenviar código
                                                </button>
                                                <button
                                                    type="button"
                                                    className="cancelar"
                                                    onClick={() => {
                                                        setEditandoSenha(false);
                                                        setCodigoVerificacaoSenha('');
                                                        setSenha('');
                                                        setMensagemSenha('');
                                                        setErroSenha(false);
                                                    }}
                                                    disabled={processandoSenha}
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="confirmar"
                                                    disabled={processandoSenha}
                                                >
                                                    {processandoSenha ? 'Validando...' : 'Confirmar e alterar'}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                    {mensagemSenha && (
                                        <p
                                            className={`mensagem-senha ${erroSenha ? 'erro' : 'sucesso'}`}
                                            role={erroSenha ? 'alert' : 'status'}
                                        >
                                            {mensagemSenha}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {erroAlteracao && (
                                <p className="status-message erro" role="alert">{erroAlteracao}</p>
                            )}
                        </>
                    )}
                </section>

                <hr />

                <footer>
                    <button
                        type="button"
                        onClick={() => {
                            setErroExclusao('');
                            setConfirmacaoExclusaoAberta(true);
                        }}
                    >
                        Excluir conta
                    </button>
                </footer>
            </main>
        </div>
    );
}
