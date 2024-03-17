import { Container, Form, Col, Button, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { authProvider } from '../utils/auth';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false); // バリデーション状態を追加

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await authProvider.verifyToken();
            if (isAuthenticated.isValid) {
                navigate("/home");
            } else {
                navigate("/login");
            }
        }
        checkAuthentication();
    }, [navigate])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            await authProvider.signup(email, password);
            navigate("/login");
        } catch (error) {
            console.log("Registration failed. Please check your email and password.")
        }
    };

    return (
        <div className="box">
            <Container className="login-container d-flex justify-content-center align-items-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
                    <p className="title">Login</p>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3">Email</Form.Label>
                    <Col sm="9">
                        <Form.Control 
                            required 
                            type="email" 
                            placeholder="sample@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                             />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email.
                        </Form.Control.Feedback>
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">Password</Form.Label>
                    <Col sm="9">
                        <Form.Control 
                            required 
                            type="password" 
                            placeholder="12345"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a password.
                        </Form.Control.Feedback>
                    </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submit-button">
                        Register
                    </Button>
                    <div className="register-link">
                        <Link to="/login">ログイン</Link>
                    </div>
                </Form>
            </Container>
        </div>
    );
}