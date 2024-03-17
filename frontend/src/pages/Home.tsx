import { useNavigate } from 'react-router-dom';

import { authProvider } from "../utils/auth";

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        authProvider.signout();
        navigate("/login");
    }

    return (
        <div>
            <h2>Home Page</h2>
            <p>Welcome! You are logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}