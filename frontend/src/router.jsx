import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/page-home';
import Login from './pages/page-login'
import Cadastro from './pages/page-cadastro';

export default function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/Login' element={<Login/>} />
                    <Route path='/Cadastro' element={<Cadastro />} />
                </Routes>
            </BrowserRouter>
    );
}