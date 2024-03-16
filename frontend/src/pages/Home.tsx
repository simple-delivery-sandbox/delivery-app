import { useNavigate } from 'react-router-dom';
import { fakeAuthProvider } from '../utils/auth';

export default function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        fakeAuthProvider.signout(() => navigate("/"))

    }

    return (
        <div>
            <h2>Home Page</h2>
            <p>Welcome! You are logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}