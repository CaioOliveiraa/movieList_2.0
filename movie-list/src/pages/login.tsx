import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/authForm';

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
            <AuthForm
                title="Login"
                onSubmit={handleLogin}
                errorMessage={errorMessage}
                toggleLink={{
                    text: 'Não possui conta? ',
                    route: '/register',
                    linkName: 'Registre-se aqui!'
                }}
            />
        </div>
    );
};

export default LoginPage;
