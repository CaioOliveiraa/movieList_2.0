import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import AuthForm from '../components/authForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Verificar se o token já existe e redirecionar imediatamente para '/home' se estiver autenticado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home', { replace: true });  
        }
    }, [navigate]);

    const handleLogin = async (name: string, password: string) => {
        try {
            await loginUser(name, password);  
            navigate('/home', { replace: true });  
        } catch (error) {
            setErrorMessage('Falha ao fazer login. Verifique seus dados.');
        }
    };

    return (
        <AuthForm title="Login" onSubmit={handleLogin} errorMessage={errorMessage} />
    );
};

export default LoginPage;
