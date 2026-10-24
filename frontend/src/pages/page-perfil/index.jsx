import './index.scss';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { obterImagem } from '../../utils/obterImagem';
import { formatarTelefone } from '../../utils/formatacaoUtils';

export default function PagePerfil({ setUsuarioLogado }) {

    const navegar = useNavigate();

    const location = useLocation();
    const nomeUsuario = location.state?.nome;

    const [userInfo, setUserInfo] = useState({});

    const [email, setEmail] = useState('');
    const [editandoEmail, setEditandoEmail] = useState(false);

    const [senha, setSenha] = useState('');
    const [editandoSenha, setEditandoSenha] = useState(false);

    const [telefone, setTelefone] = useState('');
    const [editandoTel, setEditandoTel] = useState(false);

    const [foto, setFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    const [erro, setErro] = useState('');

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
            setUsuarioLogado(false);
            navegar('/');

        } catch (e) {
            console.log(e);
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

    async function alterarSenha(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {

            const resposta = await fetch('http://localhost:6767/usuario/alterarSenha', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ senha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados?.erro);
                throw new Error('Não foi possível mudar a senha.');
            }

            setEditandoSenha(false);
            window.location.reload();

        } catch (e) {
            console.log(e);
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
            alert('Selecione um arquivo de imagem válido');
            e.target.value = '';
            return;
        }

        setFoto(arquivo);
        setPreviewFoto(URL.createObjectURL(arquivo));
    }

    async function alterarFoto() {
        if (!foto) {
            alert('Selecione uma foto primeiro.');
            return;
        }

        const token = localStorage.getItem('token');
        const formulario = new FormData();

        formulario.append('imagem', foto);

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
        <div className="page-perfil">
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
                    <div className="campo">
                        <label htmlFor="">Senha</label>
                        {editandoSenha ? (
                            <form className='container editando'
                                onSubmit={alterarSenha}
                            >
                                <button className="cancelar"
                                    onClick={() => setEditandoSenha(!editandoSenha)}
                                >
                                    Cancelar
                                </button>
                                <button type='submit' className="enviar">
                                    alterar
                                </button>

                                <input type='text'
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                />
                            </form>
                        ) : (
                            <div className="container">
                                <button className="editar"
                                    onClick={() => setEditandoSenha(!editandoSenha)}
                                >
                                    editar
                                </button>

                                <input type="password"
                                    value={userInfo.senha}
                                    disabled
                                />
                            </div>
                        )}
                    </div>
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
                            value={userInfo.cpf}
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
                        onClick={excluirConta}
                    >
                        Excluir conta
                    </button>
                </footer>
            </main>
        </div>
    );
}