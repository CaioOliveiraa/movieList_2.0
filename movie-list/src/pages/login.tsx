import React, { useState } from 'react';
import { loginUser } from '../services/api';
import AuthForm from '../components/authForm';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (name: string, password: string) => {
        setLoading(true);
        try {
            // Faz o login e salva o token
            const token = await loginUser(name, password);
            console.log('Token salvo com sucesso no localStorage:', token);

            // Atualiza a autenticação
            onLoginSuccess();

            // Valida se o token está realmente salvo no localStorage
            setTimeout(() => {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    console.log('Token recuperado do localStorage:', storedToken);
                    // Redireciona para a página "/home"
                    navigate('/home', { replace: true });
                } else {
                    setErrorMessage('Erro ao validar o token. Tente novamente.');
                }
            }, 500); // Adicionando um pequeno atraso (100ms) para garantir que o token seja lido
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
