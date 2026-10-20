import './index.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

    async function cadastrarUsuario(e) {
        e.preventDefault();

        const resposta = await fetch('http://localhost:6767/usuario/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                cpf,
                senha,
                confirmar_senha: confirmarSenha,
                data_nascimento: dataNasc
            })
        });

        const dados = await resposta.json();
        console.log(dados);

        if (dados?.erro) {
            setErro(dados.erro);
        } else {
            setErro('');
        }

        if (dados?.resposta === 'ok') {
            window.location.href = '/Login';
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
                            {erro ? (
                                <p id='mensagem-erro'>{erro}</p>
                            ) : (<></>)}

                            <button>Criar minha conta</button>
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
            </div>
        </div>
    )
}