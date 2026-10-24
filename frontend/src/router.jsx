import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { validarToken } from "./utils/validarToken";

import Home from "./pages/page-home";
import Login from "./pages/page-login";
import Cadastro from "./pages/page-cadastro";
import RotaProtegida from "./components/rotaProtegida";

export default function Router() {
    const [usuarioLogado, setUsuarioLogado] = useState(() => {
        const token = localStorage.getItem('token');

        if (!token || !validarToken(token)) {
            localStorage.removeItem('token');
            return false;
        }

        return true;

    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home usuarioLogado={usuarioLogado} setUsuarioLogado={setUsuarioLogado} />} />
                <Route path="/Login" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
                <Route path="/Cadastro" element={<Cadastro />} />

                <Route element={<RotaProtegida logado={usuarioLogado} />}>
                    <Route path="/Personalizacao" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
