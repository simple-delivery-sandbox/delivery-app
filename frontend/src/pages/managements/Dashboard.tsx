import { useNavigate } from "react-router-dom"
import { authProvider } from "../../utils/auth";

export default function Dashboard() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        authProvider.signout();
        navigate("/login");
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome! You are logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}