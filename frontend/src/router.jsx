import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { validarToken } from "./utils/validarToken";
import { obterDadosToken } from "./utils/obterInfoToken.js";

import Home from "./pages/page-home";
import Login from "./pages/page-login";
import Cadastro from "./pages/page-cadastro";
import Perfil from "./pages/page-perfil";
import Adocao from './pages/page-adocao';
import CadastroOng from './pages/page-cadastroOng';
import ONGPanel from './pages/page-painel-ong';
import RotaProtegidaQuestionario from './components/rotaProtegidaQuestionario';
import Questionario from './pages/page-questionario';
import RotaProtegidaOng from "./components/rotaProtegidaOng/index.jsx";
import RotaProtegidaUsuario from "./components/rotaProtegidaUsuario";
import Campanhas from "./pages/page-campanhas";
import SolicitacoesAdocaoUsuario from "./pages/page-solicitacoesAdocaoUsuario/index.jsx";

import ScrollToTop from "./components/scrollToTop";

export default function Router() {

    const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState(() => {
        const token = localStorage.getItem("token");

        if (!token || !validarToken(token)) {
            localStorage.removeItem("token");
            return false;
        }

        const dados = obterDadosToken();
        console.log(dados);

        const tipoUsuario = dados.tipo;

        return tipoUsuario;
    });

    const [questionarioRespondido, setQuestionarioRespondido] = useState(null);

    useEffect(() => {
        async function verificarQuestionario() {
            const token = localStorage.getItem("token");

            if (!token || !validarToken(token)) {
                setQuestionarioRespondido(false);
                return;
            }

            try {
                const resposta = await fetch("http://localhost:6767/prefs", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error("Não foi possível verificar se o usuário já possui preferências.");
                }

                const possuiPreferencias = Array.isArray(dados?.resposta) && dados.resposta.length > 0;
                setQuestionarioRespondido(possuiPreferencias);
            } catch (e) {
                console.log(e.message);
                setQuestionarioRespondido(false);
            }
        }

        verificarQuestionario();
    }, [tipoUsuarioLogado]);

    return (
        <BrowserRouter>

            <ScrollToTop />

            <Routes>

                {/* PÁGINA INICIAL */}
                <Route
                    path="/"
                    element={
                        <Home
                            usuarioLogado={tipoUsuarioLogado}
                            setUsuarioLogado={setTipoUsuarioLogado}
                        />
                    }
                />

                {/* LOGIN */}
                <Route
                    path="/Login"
                    element={
                        tipoUsuarioLogado
                            ? <Navigate to="/" replace />
                            : <Login setUsuarioLogado={setTipoUsuarioLogado} />
                    }
                />

                {/* CADASTRO DE USUÁRIO */}
                <Route
                    path="/Cadastro"
                    element={
                        tipoUsuarioLogado
                            ? <Navigate to="/" replace />
                            : <Cadastro />
                    }
                />

                {/* ROTA QUE PROTEGE A ADOÇÃO DA BURLA DE QUESTIONÁRIO */}
                <Route
                    element={
                        <RotaProtegidaQuestionario
                            questionarioRespondido={questionarioRespondido}
                            tipoUsuario={tipoUsuarioLogado}
                        />
                    }
                >

                    {/* ADOÇÃO */}
                    <Route
                        path="/Adocao"
                        element={
                            <Adocao
                                usuarioLogado={tipoUsuarioLogado}
                                setUsuarioLogado={setTipoUsuarioLogado}
                            />
                        }
                    />

                </Route>

                {/* QUESTIONÁRIO */}
                <Route path="/Questionario" element={<Questionario 
                    questionarioRespondido={questionarioRespondido}
                    setQuestionarioRespondido={setQuestionarioRespondido}
                    usuarioLogado={tipoUsuarioLogado}
                    setUsuarioLogado={setTipoUsuarioLogado}
                />} />

                {/* CADASTRO DE ONG */}
                <Route
                    path="/CadastroOng"
                    element={<CadastroOng />}
                />

                {/* ROTAS EXCLUSIVAS DE USUÁRIO */}
                <Route
                    element={
                        <RotaProtegidaUsuario
                            logado={tipoUsuarioLogado}
                        />
                    }
                >

                    <Route
                        path="/SolicitacoesAdocao"
                        element={
                            <SolicitacoesAdocaoUsuario
                                logado={tipoUsuarioLogado}
                                setUsuarioLogado={setTipoUsuarioLogado}
                            />
                        }
                    />

                    {/* PERFIL DO USUÁRIO */}
                    <Route
                        path="/Personalizacao"
                        element={
                            <Perfil
                                setUsuarioLogado={setTipoUsuarioLogado}
                                setQuestionarioRespondido={setQuestionarioRespondido}
                                tipo={tipoUsuarioLogado}
                            />
                        }
                    />

                    {/* CAMPANHAS */}
                    <Route
                        path="/campanhas"
                        element={
                            <Campanhas
                                usuarioLogado={tipoUsuarioLogado}
                                setUsuarioLogado={setTipoUsuarioLogado}
                            />
                        }
                    />

                </Route>

                {/* ROTAS EXCLUSIVAS DE ONG */}
                <Route
                    element={
                        <RotaProtegidaOng
                            logado={tipoUsuarioLogado}
                        />
                    }
                >

                    {/* PAINEL DA ONG */}
                    <Route
                        path="/PainelONG"
                        element={
                            <ONGPanel
                                setUsuarioLogado={setTipoUsuarioLogado}
                            />
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}