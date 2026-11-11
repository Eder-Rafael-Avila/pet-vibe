import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { validarToken } from "./utils/validarToken";
import { obterDadosToken } from "./utils/obterInfoToken.js";

import Home from "./pages/page-home";
import Login from "./pages/page-login";
import Cadastro from "./pages/page-cadastro";
import Perfil from "./pages/page-perfil";
import RotaProtegidaOng from "./components/rotaProtegidaOng/index.jsx";
import RotaProtegidaUsuario from "./components/rotaProtegidaUsuario";
import Campanhas from "./pages/page-campanhas";
import Adocao from "./pages/page-adocao";
import CadastroOng from "./pages/page-cadastroOng";
import ONGPanel from "./pages/page-painel-ong";
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