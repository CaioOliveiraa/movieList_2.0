
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import AuthForm from '../components/authForm';

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (name: string, password: string) => {
        try {
            await loginUser(name, password);
        } catch (error) {
            setErrorMessage('Falha ao fazer login. Verifique seus dados.');
        }
    };

    return (
        <AuthForm title="Login" onSubmit={handleLogin} errorMessage={errorMessage} />
    );
};

export default LoginPage;
