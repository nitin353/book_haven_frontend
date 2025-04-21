import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token'); // Token ko localStorage se lo

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;