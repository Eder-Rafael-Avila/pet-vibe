import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/page-home';
import Login from './components/login';
import Adocao from './pages/adocao';

export default function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/Login' element={<Login/>} />
                    <Route path='/Adocao' element={<Adocao />} />
                </Routes>
            </BrowserRouter>
    );
}