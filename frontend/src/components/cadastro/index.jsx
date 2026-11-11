import './index.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import * as formatacao from '../../utils/formatacaoUtils.js';

export default function Cadastro(){

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [erro, setErro] = useState('');
    const [usuarioCadastro, setUsuarioCadastro] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [tokenCadastro, setTokenCadastro] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function enviarCadastro(usuario, token = '') {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.cadastropermitido = token;
        const resposta = await fetch('http://localhost:6767/usuario/cadastrar', {
            method: 'POST',
            headers,
            body: JSON.stringify(usuario)
        });
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Não foi possível concluir o cadastro.');
        }

        return dados;
    }

    async function cadastrarUsuario(e) {
        e.preventDefault();
        if (enviando) return;

        const usuario = {
            nome, email, telefone, cpf, senha,
            confirmar_senha: confirmarSenha,
            data_nascimento: dataNasc
        };

        setEnviando(true);
        setErro('');

        try {
            await enviarCadastro(usuario);
            setUsuarioCadastro(usuario);
            setCodigo('');
            setTokenCadastro('');
        } catch (err) {
            setErro(err.message);
        } finally {
            setEnviando(false);
        }
    }

    async function confirmarCadastro(e) {
        e.preventDefault();
        if (enviando) return;

        setEnviando(true);
        setErro('');

        try {
            let token = tokenCadastro;

            if (!token) {
                const resposta = await fetch('http://localhost:6767/verificar/cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: usuarioCadastro.email, codigo })
                });
                const dados = await resposta.json();

                if (!resposta.ok || !dados.token) {
                    throw new Error(dados.erro || 'Não foi possível verificar o código.');
                }

                token = dados.token;
                setTokenCadastro(token);
            }

            const dados = await enviarCadastro(usuarioCadastro, token);
            if (dados.resposta !== 'ok') {
                throw new Error('Não foi possível concluir o cadastro.');
            }
            window.location.href = '/Login';
        } catch (err) {
            setErro(err.message);
        } finally {
            setEnviando(false);
        }
    }

    async function reenviarCodigo() {
        if (enviando) return;
        setEnviando(true);
        setErro('');

        try {
            await enviarCadastro(usuarioCadastro);
            setCodigo('');
            setTokenCadastro('');
        } catch (err) {
            setErro(err.message);
        } finally {
            setEnviando(false);
        }
    }

    return(
        <div className="page-cadastro">
            <div className="corpo">
                <form onSubmit={e => cadastrarUsuario(e)}>
                    <div className="cabecalho-cadastro">
                        <div className="logo">
                            <div className="imagem">
                                <img src="public/assets/images/logo4.webp" alt="Logo da petvibe" />
                            </div>
                        </div>
                        <h1>Crie a sua conta na PetVibe</h1>
                    </div>

                    <div className="campos-cadastro">
                        <div className="input input-nome">
                            <p>Nome completo *</p>

                            <input type="text"
                                placeholder='Seu nome completo'
                                required
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </div>

                        <div className="input">
                            <p>E-mail *</p>

                            <input type="text"
                                placeholder='exemploemail@gmail.com'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="linha-documentos">
                            <div className="input">
                                <p>Telefone *</p>
                                <input type="text"
                                    placeholder='(00) 00000-0000'
                                    required
                                    value={telefone}
                                    onChange={e => setTelefone(formatacao.formatarTelefone(e.target.value))}
                                />
                            </div>

                            <div className="input">
                                <p>CPF *</p>
                                <input type="text"
                                    placeholder='123.123.123-67'
                                    required
                                    value={cpf}
                                    onChange={e => setCpf(formatacao.formatarCpf(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="input">
                            <p>Data de nascimento *</p>
                            <input type="date"
                                required
                                value={dataNasc}
                                onChange={e => setDataNasc(e.target.value)}
                            />
                        </div>

                        <div className="linha-senha">
                            <div className="input-senha">
                                <p>Senha *</p>
                                <div className="campo">
                                    <input type={mostrarSenha ? "text" : "password"}
                                        placeholder="Mín. 8 caracteres"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                    />

                                    <FaEye className="olho"/>

                                    {mostrarSenha ? (
                                        <FaEyeSlash className='olho' onClick={() => setMostrarSenha(false)} />
                                    ) : (
                                        <FaEye className='olho' onClick={() => setMostrarSenha(true)} />
                                    )}
                                </div>
                            </div>

                            <div className="input-senha">
                                <p>Confirmar senha *</p>
                                <div className="campo">
                                    <input type={mostrarConfirmar ? "text" : "password"}
                                        value={confirmarSenha}
                                        onChange={e => setConfirmarSenha(e.target.value)}
                                    />
                                    <FaEye className="olho" />

                                    {mostrarConfirmar ? (
                                        <FaEyeSlash className='olho' onClick={() => setMostrarConfirmar(false)} />
                                    ) : (
                                        <FaEye className='olho' onClick={() => setMostrarConfirmar(true)} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="button">
                            {erro && !usuarioCadastro ? (
                                <p id='mensagem-erro'>{erro}</p>
                            ) : (<></>)}

                            <button disabled={enviando}>
                                {enviando ? 'Enviando...' : 'Criar minha conta'}
                            </button>
                        </div>

                        <div className="entrar">
                            <p>Já tem uma conta?
                                <NavLink to='/login'
                                    style={{
                                        color: "#F8561F",
                                        marginLeft: ".5rem"
                                    }}
                                >Entrar</NavLink>
                            </p>
                        </div>
                    </div>
                </form>
                                                        <NavLink to="/"  ><button className="Voltar-pagina" ><b> <FaArrowLeft className="seta" /> Voltar</b></button></NavLink>

            </div>

            {usuarioCadastro && (
                <div className="modal-verificacao-cadastro">
                    <form className="card-verificacao" onSubmit={confirmarCadastro}>
                        <h2>Confirme seu e-mail</h2>
                        <p>Enviamos um código de quatro dígitos para <strong>{usuarioCadastro.email}</strong>.</p>
                        <p>Confira sua caixa de entrada ou spam. O código expira em 10 minutos.</p>

                        <label htmlFor="codigo-cadastro">Código de verificação</label>
                        <input
                            id="codigo-cadastro"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder="0000"
                            maxLength={4}
                            pattern="[0-9]{4}"
                            value={codigo}
                            onChange={e => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            disabled={enviando || Boolean(tokenCadastro)}
                            required
                        />

                        {erro && <p className="erro-verificacao">{erro}</p>}

                        <button type="submit" disabled={enviando}>
                            {enviando ? 'Aguarde...' : 'Confirmar e criar conta'}
                        </button>
                        <button type="button" className="botao-secundario" onClick={reenviarCodigo} disabled={enviando}>
                            Reenviar código
                        </button>
                        <button type="button" className="botao-secundario" disabled={enviando} onClick={() => {
                            setUsuarioCadastro(null);
                            setCodigo('');
                            setTokenCadastro('');
                            setErro('');
                        }}>
                            Voltar ao cadastro
                        </button>
                    </form>
                </div>
            )}

        </div>
    )
}
