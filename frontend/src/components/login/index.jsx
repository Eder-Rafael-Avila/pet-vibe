import "./index.scss";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login({
    setUsuarioLogado
}) {
    const navegar = useNavigate();

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    async function realizarLogin(e) {
        e.preventDefault();

        try {
            const resposta = await fetch('http://localhost:6767/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            });

            const dados = await resposta.json();
            console.log('Reposta do login:', dados);

            if (!resposta.ok) {
                setErro(dados?.erro || 'e-mail ou senha inválidos.');
                return;
            }

            const token = dados.token;

            if (typeof token !== 'string' || !token.trim()) {
                console.log('A API não retornou um token válido.');
                return;
            }

            localStorage.setItem('token', token);
            setUsuarioLogado(true);

            navegar('/');

        } catch (e) {
            console.error(e);
        }
        


    }

    return (
        <div className="page-login">
            <div className="corpo">
                <form onSubmit={e => realizarLogin(e)}>
                    <div className="logo">
                        <div className="imagem">
                            <img src="public/assets/images/logo4.webp" alt="" />
                        </div>
                    </div>
                    <h1>Acesse a sua conta</h1>
                    <p>Bem-vindo de volta!</p>
                    <div className="input">
                        <FaEnvelope className="icone-email" />
                        <input
                            type="email"
                            placeholder="exemploemail@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <FaLock className="icone-senha" />
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />

                        <button
                            type="button"
                            className="olhoBotao"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="opcoes-senha">
                        <label>
                            <input type="checkbox" className="input-senha" />
                            Lembrar minha senha?
                        </label>

                        <NavLink to="#" id="senha">
                            <span>Esqueci minha senha</span>
                        </NavLink>
                    </div>

                    {erro ? (
                        <div className="area-erro">
                            <p>{erro}</p>
                        </div>
                    ) : (
                        <></>
                    )}

                    <button type="submit" className="Login">
                        Login
                    </button>

                    <div className="Cadastrar">
                        <p>
                            Não tem uma conta?
                            <NavLink to="/Cadastro" className="cadastro-link">
                                <span>Cadastre-se</span>
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
