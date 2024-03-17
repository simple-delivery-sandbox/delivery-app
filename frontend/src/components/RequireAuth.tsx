import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { authProvider } from '../utils/auth';

interface RequireAuthProps {
    children: JSX.Element;
    requiredRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requiredRoles }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true); // ローディング状態を管理
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理

    useEffect(() => {
        const verifyToken = async () => {
            // トークンの検証とユーザー情報の取得
            const userInfo = await authProvider.verifyToken();
            if (userInfo && requiredRoles.includes(userInfo.role)) {
                setIsAuthenticated(true); // ロールが条件を満たす場合は認証成功
            } else {
                setIsAuthenticated(false); // 条件を満たさない場合は認証失敗
            }
            setIsLoading(false); // ローディング終了
        };

        verifyToken();
    }, [requiredRoles]);

    if (isLoading) {
        // ローディング中はローディング表示をする（ここでは簡単なテキストを表示）
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // 認証が不成功の場合は、ログインページにリダイレクト
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 認証が成功した場合は、子コンポーネントを表示
    return children;
};

export default RequireAuth;