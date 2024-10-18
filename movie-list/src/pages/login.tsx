// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import AuthForm from '../components/authForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (name: string, password: string) => {
        try {
            const token = await loginUser(name, password);

            login(token);

            navigate('/home', { replace: true });
        } catch (error) {
            setErrorMessage('Falha ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div>
            <AuthForm title="Login" onSubmit={handleLogin} errorMessage={errorMessage} />
        </div>
    );
};

export default LoginPage;
