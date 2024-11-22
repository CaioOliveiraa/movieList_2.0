// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import AuthForm from '../components/authForm';

const RegisterPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (name: string, password: string) => {
    try {
      await registerUser(name, password);
    } catch (error) {
      setErrorMessage('Falha ao registrar. Tente novamente.');
    }
  };

  return (
    <AuthForm 
    title="Registrar" 
    onSubmit={handleRegister} 
    errorMessage={errorMessage}
    toggleLink={{
      text: 'ja pssuio uma conta? ',
      route: '/login',
      linkName: 'Faça login aqui'
    }}
    />
  );
};

export default RegisterPage;
