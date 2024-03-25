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
            <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}