
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import AuthForm from '../components/authForm';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (name: string, password: string) => {
        try {
            await loginUser(name, password);
            navigate('/home')
        } catch (error) {
            setErrorMessage('Falha ao fazer login. Verifique seus dados.');
        }
    };

    return (
        <AuthForm title="Login" onSubmit={handleLogin} errorMessage={errorMessage} />
    );
};

export default LoginPage;
