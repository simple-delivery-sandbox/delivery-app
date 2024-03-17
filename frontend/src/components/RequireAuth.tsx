import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { authProvider } from '../utils/auth';

interface RequireAuthProps {
    children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const isValid = await authProvider.verifyToken();
            setIsAuthenticated(isValid);
            setIsLoading(false);
        };

        verifyToken();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // 認証状態の確認中はローディング表示（必要に応じてカスタマイズ）
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;