import { Navigate, Outlet } from 'react-router-dom';

export default function RotaProtegida() {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/Login' replace />;
    }

    return <Outlet />
}