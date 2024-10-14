// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import AuthForm from '../components/authForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (name: string, password: string) => {
        setLoading(true);
        try {
            // Faz o login e obtém o token
            const token = await loginUser(name, password); // Passa dois parâmetros aqui

            // Armazena o token e atualiza o estado de autenticação usando o contexto
            login(token);

            // Redireciona para a página "/home"
            navigate('/home', { replace: true });
        } catch (error) {
            setErrorMessage('Falha ao fazer login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? <p>Carregando...</p> : null}
            <AuthForm title="Login" onSubmit={handleLogin} errorMessage={errorMessage} />
        </div>
    );
};

export default LoginPage;
