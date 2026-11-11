import "./index.scss";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
    FaEnvelope,
    FaArrowLeft,
} from "react-icons/fa";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { obterDadosToken } from "../../utils/obterInfoToken.js";

export default function Login({ setUsuarioLogado }) {
    const navegar = useNavigate();

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    async function realizarLogin(e) {
        e.preventDefault();

        try {
            const resposta = await fetch(
                "http://localhost:6767/usuario/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        senha,
                    }),
                },
            );

            const dados = await resposta.json();
            console.log("Reposta do login:", dados);

            if (!resposta.ok) {
                setErro(dados?.erro || "e-mail ou senha inválidos.");
                return;
            }

            const token = dados.token;

            if (typeof token !== "string" || !token.trim()) {
                console.log("A API não retornou um token válido.");
                return;
            }

            localStorage.setItem('token', token);

            const tipoUsuario = obterDadosToken()?.tipo;

            if (tipoUsuario !== 'USUARIO' && tipoUsuario !== 'ONG') {
                localStorage.removeItem('token');
                setErro('Não foi possível identificar o tipo da conta.');
                return;
            }

            setUsuarioLogado(tipoUsuario);

            navegar("/");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="page-login">
            <div className="corpo">
                <form onSubmit={(e) => realizarLogin(e)}>
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <FaLock className="icone-senha" />
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button
                            type="button"
                            className="olhoBotao"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
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
                            Não tem uma conta de usuário?
                            <NavLink to="/Cadastro" className="cadastro-link">
                                Cadastre-se
                            </NavLink>
                        </p>

                        <p className="">
                            Cadastre sua ONG na PetVibe
                            <NavLink
                                to="/CadastroOng"
                                className="cadastro-link"
                            >
                                Cadastrar ONG
                            </NavLink>
                        </p>
                    </div>
                </form>
                <NavLink to="/">
                    <button className="Voltar-pagina">
                        <b>
                            {" "}
                            <FaArrowLeft className="seta" /> Voltar
                        </b>
                    </button>
                </NavLink>
            </div>
        </div>
    );
}
