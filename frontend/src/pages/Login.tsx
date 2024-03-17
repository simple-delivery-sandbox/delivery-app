import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../styles/login.css';
import { Button } from "react-bootstrap";
import { authProvider } from '../utils/auth';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            await authProvider.signin(email, password);
            navigate("/home");
        } catch (error) {
            console.log("Login failed. Please check your email and password.")
        }
    }

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
                        Login
                    </Button>
                    <div className="register-link">
                        <Link to="/signup">新規登録</Link>
                    </div>
                </Form>
            </Container>
        </div>
    );
}