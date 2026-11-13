import { Outlet, Navigate } from 'react-router-dom';

export default function RotaProtegidaQuestionario({
    questionarioRespondido,
    tipoUsuario
}) {
    if (!tipoUsuario || tipoUsuario === 'ONG') {
        return <Outlet />;
    }

    if (questionarioRespondido === null) {
        return null;
    }

    if (questionarioRespondido === false) {
        return <Navigate to="/Questionario" replace />;
    }

    return <Outlet />;
}