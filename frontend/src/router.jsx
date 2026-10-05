import Login from './pages/login/App.jsx';
import TokenN from './pages/tokenNecessario/Index.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function Navegacao() {
  const temToken = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/tokenTeste" element={temToken ? <TokenN /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}