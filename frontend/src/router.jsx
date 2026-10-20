import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/page-home";
import Login from "./pages/page-login";
import Cadastro from "./pages/page-cadastro";
import RotaProtegida from "./components/rotaProtegida";

export default function Router() {
    const [usuarioLogado, setUsuarioLogado] = useState(() =>
        Boolean(localStorage.getItem("token")),
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home usuarioLogado={usuarioLogado} />} />
                <Route path="/Login" element={<Login setUsuarioLogado={setUsuarioLogado} />} />
                <Route path="/Cadastro" element={<Cadastro />} />

                <Route element={<RotaProtegida />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
