import { Navigate, Outlet } from 'react-router-dom';

export default function RotaProtegida({ logado }) {
    if (!logado) {
        return <Navigate to='/Login' replace />;
    }

    return <Outlet />
}