
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { validarToken } from "./utils/validarToken";
import { obterDadosToken } from './utils/obterInfoToken.js';

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

        <ScrollToTop/>
        
            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            usuarioLogado={tipoUsuarioLogado}
                            setUsuarioLogado={setTipoUsuarioLogado}
                        />
                    }
                />

                <Route
                    path="/Login"
                    element={
                        <Login
                            setUsuarioLogado={setTipoUsuarioLogado}
                        />
                    }
                />

                <Route
                    path="/Cadastro"
                    element={<Cadastro />}
                />

                <Route
                    path="/Adocao"
                    element={
                        <Adocao
                            usuarioLogado={tipoUsuarioLogado}
                            setUsuarioLogado={setTipoUsuarioLogado}
                        />
                    }
                />

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
                        path="/Personalizacao"
                        element={
                            <Perfil
                                setUsuarioLogado={setTipoUsuarioLogado}
                                tipo={tipoUsuarioLogado}
                            />
                        }
                    />

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

                    <Route
                        path="/PainelONG"
                        element={<ONGPanel />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}
