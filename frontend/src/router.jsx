import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/page-home';
import Login from './components/login';

export default function Router() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/Login' element={<Login/>} />
                </Routes>
            </BrowserRouter>
    );
}