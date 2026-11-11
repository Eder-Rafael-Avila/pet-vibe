import './index.scss';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { obterImagem } from '../../../utils/obterImagem.js';
import { formatarTelefone } from '../../../utils/formatacaoUtils';

import Cropper from 'react-easy-crop';
import recortarImagem from '../../../utils/recortarImagem';

function mascararCpf(cpf) {
    if (!cpf) return '';

    let digitosRestantes = String(cpf).replace(/\D/g, '').length;

    return String(cpf).replace(/\d/g, digito => {
        digitosRestantes -= 1;
        return digitosRestantes < 2 ? digito : '•';
    });
}

export default function PerfilUsuario({ setUsuarioLogado }) {

    const navegar = useNavigate();

    const location = useLocation();
    const nomeUsuario = location.state?.nome;

    const [userInfo, setUserInfo] = useState({});

    const [email, setEmail] = useState('');
    const [editandoEmail, setEditandoEmail] = useState(false);

    const [senha, setSenha] = useState('');
    const [editandoSenha, setEditandoSenha] = useState(false);
    const [codigoVerificacaoSenha, setCodigoVerificacaoSenha] = useState('');
    const [mensagemSenha, setMensagemSenha] = useState('');
    const [processandoSenha, setProcessandoSenha] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);

    const [telefone, setTelefone] = useState('');
    const [editandoTel, setEditandoTel] = useState(false);

    const [foto, setFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    const [imagemParaRecorte, setImagemParaRecorte] = useState(null);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [areaRecorte, setAreaRecorte] = useState(null);

    const [editorAberto, setEditorAberto] = useState(false);

    const [erro, setErro] = useState('');
    const [confirmacaoExclusaoAberta, setConfirmacaoExclusaoAberta] = useState(false);
    const [excluindoConta, setExcluindoConta] = useState(false);
    const [erroExclusao, setErroExclusao] = useState('');

    async function confirmarExclusao() {
        setExcluindoConta(true);
        try {
            await excluirConta();
        } finally {
            setExcluindoConta(false);
        }
    }

    async function excluirConta() {

        const token = localStorage.getItem('token');

        try {

            const resposta = await fetch('http://localhost:6767/usuario/excluir', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!resposta.ok) {
                throw new Error('Ocorreu um erro ao deletar o usuário.')
            }

            localStorage.removeItem('token');
            setUsuarioLogado(null);
            navegar('/');

        } catch (e) {
            console.error(`Erro ao excluir a conta: ${e.message}`);
            setErroExclusao(e.message || 'Não foi possível excluir a conta.');
        }


    }

    async function alterarTel(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {

            const resposta = await fetch('http://localhost:6767/usuario/alterarTelefone', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ telefone })
            });
    
            const dados = await resposta.json();
    
            if (!resposta.ok) {
                setErro(dados?.erro);
                throw new Error('Não foi possível alterar o telefone.')
            }

            setEditandoTel(false);
            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }

    async function solicitarCodigoSenha() {
        const token = localStorage.getItem('token');
        setProcessandoSenha(true);
        setMensagemSenha('');
        setErroSenha(false);

        try {
            const resposta = await fetch('http://localhost:6767/usuario/alterarSenha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ senha: '' })
            });
            const dados = await resposta.json();

            if (resposta.status !== 202) {
                throw new Error(dados.erro || 'Não foi possível solicitar o código de verificação.');
            }

            setEditandoSenha(true);
            setMensagemSenha(dados.resposta || 'Enviamos um código de verificação para seu e-mail.');
        } catch (e) {
            console.error(`Erro ao solicitar código para alterar senha: ${e.message}`);
            setMensagemSenha(e.message || 'Não foi possível solicitar o código de verificação.');
            setErroSenha(true);
        } finally {
            setProcessandoSenha(false);
        }
    }

    async function alterarSenha(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const codigo = codigoVerificacaoSenha.trim();
        setProcessandoSenha(true);
        setMensagemSenha('');
        setErroSenha(false);

        try {
            const parametros = new URLSearchParams({ codigo });
            const respostaVerificacao = await fetch(
                `http://localhost:6767/usuario/liberarPermissao?${parametros}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
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

            const resposta = await fetch('http://localhost:6767/usuario/alterarSenha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    tokenpermitido: dadosVerificacao.token
                },
                body: JSON.stringify({ senha })
            });
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.erro || 'Não foi possível alterar a senha.');
            }

            setSenha('');
            setCodigoVerificacaoSenha('');
            setEditandoSenha(false);
            setUserInfo(usuarioAtual => ({ ...usuarioAtual, senha: '' }));
            setMensagemSenha('Senha alterada com sucesso.');
        } catch (e) {
            console.error(`Erro ao alterar senha: ${e.message}`);
            setMensagemSenha(e.message || 'Não foi possível alterar a senha.');
            setErroSenha(true);
        } finally {
            setProcessandoSenha(false);
        }
    }

    async function alterarEmail(e) {
        console.log('Submit foi chamado')

        e.preventDefault();

        const token = localStorage.getItem('token');

        try {

            const resposta = await fetch('http://localhost:6767/usuario/alterarEmail', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ email }) 
            });
            
            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados?.erro);
                throw new Error('Erro ao mudar e-mail.');
            }

            setEditandoEmail(false);
            window.location.reload();

        } catch (e) {
            console.log(`Erro ao mudar e-mail: ${e}`);
        }

    }

    function selecionarFoto(e) {
        const arquivo = e.target.files[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith('image/')) {
            alert('Selecione um arquivo de imagem válido.');
            e.target.value = '';
            return;
        }

        const imagemURL = URL.createObjectURL(arquivo);

        setImagemParaRecorte(imagemURL);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setAreaRecorte(null);
        setEditorAberto(true);
    }

    async function confirmarRecorte() {
        if (!imagemParaRecorte || !areaRecorte) return;

        try {
            const imagemRecortada = await recortarImagem(
                imagemParaRecorte,
                areaRecorte
            );

            setFoto(imagemRecortada);
            setPreviewFoto(URL.createObjectURL(imagemRecortada));

            URL.revokeObjectURL(imagemParaRecorte);
            setImagemParaRecorte(null);
            setEditorAberto(false);

        } catch (e) {
            console.log('Erro ao recortar imagem:', e);
            alert('Não foi possível recortar a imagem.');
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

    async function alterarFoto() {
        if (!foto) {
            alert('Selecione uma foto primeiro.');
            return;
        }

        const token = localStorage.getItem('token');
        const formulario = new FormData();

        formulario.append('imagem', foto, 'foto-perfil.jpg');

        try {
            const resposta = await fetch('http://localhost:6767/usuario/imagem', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formulario
            })

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || 'Não foi possível alterar a foto.'
                );
            }

            setUserInfo(usuarioAtual => ({
                ...usuarioAtual,
                imagem: dados.imagem
            }))
            
            setFoto(null);
            setPreviewFoto(null);

            alert('Foto de perfil alterada!');

        } catch (e) {
            console.log(`Ocorreu um erro ao alterar imagem: ${e}`);
            alert('Erro ao alterar a foto de perfil.')
        }
    }

    function formatarData(data) {
        if (!data) return '';

        return new Date(data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    }

    async function getAccountInfo() {

        const token = localStorage.getItem('token');

        try {
            const resposta = await fetch('http://localhost:6767/usuario/listarTudo',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error('Não foi possível buscar os dados da conta.')
            }

            const dados = await resposta.json();
            const usuario = dados.resposta;
            console.log(usuario);

            return usuario;

        } catch (e) {
            console.log(`Erro ao consultar: ${e}`);
        }
    }

    useEffect(() => {
        async function carregarDados() {
            const usuario = await getAccountInfo();
            setUserInfo(usuario);
        }

        carregarDados();
    }, []);

    return(
        <div className="comp-perfil-usuario">
            <header className='main-header'>
                <div className="voltar">
                    <button
                        onClick={() => navegar('/')}
                    >
                        <i class="fa-solid fa-arrow-left-long" style={{color: "#156957",}}></i>
                    </button>
                </div>
                <div className="title">
                    <h1>Personalização da Conta</h1>
                </div>
                <div className="account-name">
                    <div className="icon">
                        <i class="fa-regular fa-user" style={{color: "#156957",}}></i>
                    </div>
                    <div className="user">
                        <p>{nomeUsuario}</p>
                        <p id='my-account'>Minha conta</p>
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
                                onCropComplete={(_, pixels) => {
                                    setAreaRecorte(pixels);
                                }}
                            />
                        </div>

                        <div className="controle-zoom">
                            <i className="fa-solid fa-magnifying-glass-minus"></i>

                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                            />

                            <i className="fa-solid fa-magnifying-glass-plus"></i>
                        </div>

                        <div className="botoes-recorte">
                            <button
                                type="button"
                                onClick={cancelarRecorte}
                            >
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
                        aria-labelledby="titulo-exclusao-usuario"
                        aria-describedby="descricao-exclusao-usuario"
                    >
                        <h2 id="titulo-exclusao-usuario">Excluir conta?</h2>
                        <p id="descricao-exclusao-usuario">
                            Esta ação não pode ser desfeita. Tem certeza de que deseja excluir sua conta?
                        </p>
                        {erroExclusao && <p className="erro-exclusao" role="alert">{erroExclusao}</p>}
                        <div className="botoes-exclusao">
                            <button
                                type="button"
                                className="cancelar"
                                onClick={() => {
                                    setErroExclusao('');
                                    setConfirmacaoExclusaoAberta(false);
                                }}
                                disabled={excluindoConta}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="confirmar"
                                onClick={confirmarExclusao}
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
                        <p>Personalize sua conta da forma que desejar</p>
                    </div>
                    <div className="alterar-foto">
                        <div className="pfp">
                            <div className="foto">
                                <img src={previewFoto || obterImagem(userInfo.imagem)} alt="Foto de Perfil" />
                            </div>

                            <label className="botao-foto">
                                <i className="fa-solid fa-camera"></i>
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
                                >
                                    Salvar foto
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFoto(null);
                                        setPreviewFoto(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <hr />

                <section className="user-info">
                    <div className="campo">
                        <label htmlFor="">E-mail</label>
                        {editandoEmail ? (
                            <form className='container editando'
                                onSubmit={alterarEmail}
                            >
                                <button className="cancelar"
                                    onClick={() => setEditandoEmail(!editandoEmail)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type='submit' 
                                    className='enviar'
                                >
                                    alterar
                                </button>

                                <input type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </form>
                        ) : (
                            <div className="container">
                                <button className='editar'
                                    onClick={() => setEditandoEmail(!editandoEmail)}
                                >
                                    editar
                                </button>

                                <input type="text"
                                    value={userInfo.email}
                                    disabled
                                />
                            </div>
                        )}
                    </div>

                    <hr />

                    <div className="campo">
                        <label htmlFor="">Senha</label>
                        <div className="container cont-senha">
                            <div className="aviso-senha">
                                * exige verificação por e-mail para alterar
                            </div>
                            <input
                                type="password"
                                value={userInfo.senha || ''}
                                placeholder="Senha privada"
                                disabled
                            />
                            {!editandoSenha ? (
                                <button className="editar verificar"
                                    type="button"
                                    onClick={solicitarCodigoSenha}
                                    disabled={processandoSenha}
                                >
                                    {processandoSenha ? 'Enviando código...' : 'Enviar código'}
                                </button>
                            ) : (
                                <form className="verificacao-senha" onSubmit={alterarSenha}>
                                    <label htmlFor="codigo-verificacao-senha">Código enviado para seu e-mail</label>
                                    <input
                                        id="codigo-verificacao-senha"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={4}
                                        required
                                        value={codigoVerificacaoSenha}
                                        onChange={e => setCodigoVerificacaoSenha(e.target.value.replace(/\D/g, ''))}
                                    />

                                    <label htmlFor="nova-senha">Nova senha</label>
                                    <input
                                        id="nova-senha"
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
                                <p className={`mensagem-senha ${erroSenha ? 'erro' : 'sucesso'}`} role={erroSenha ? 'alert' : 'status'}>
                                    {mensagemSenha}
                                </p>
                            )}
                        </div>
                    </div>

                    <hr />

                    <div className="campo">
                        <label htmlFor="">Telefone</label>
                        {editandoTel ? (
                            <form className='container editando'
                                onSubmit={alterarTel}
                            >
                                <button className="cancelar"
                                    onClick={() => setEditandoTel(!editandoTel)}
                                >
                                    Cancelar
                                </button>
                                <button type='submit' className="enviar">
                                    alterar
                                </button>

                                <input type='text'
                                    value={telefone}
                                    onChange={e => setTelefone(formatarTelefone(e.target.value))}
                                />
                            </form>
                        ) : (
                            <div className="container">
                                <button className="editar"
                                    onClick={() => setEditandoTel(!editandoTel)}
                                >
                                    editar
                                </button>

                                <input type="text"
                                    value={userInfo.telefone}
                                    disabled
                                />
                            </div>
                        )}
                    </div>
                    <div className="campo">
                        <label htmlFor="">CPF</label>
                        <input type="text" disabled
                            value={mascararCpf(userInfo.cpf)}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="">Data de Nascimento</label>
                        <input type="text" disabled
                            value={formatarData(userInfo.data_nascimento)}
                        />
                    </div>

                    {erro && (
                        <div className="erro">
                            <p>{erro}</p>
                        </div>
                    )}
                </section>

                <hr />

                <footer>
                    <button
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