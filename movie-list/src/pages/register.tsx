import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(name, password);
            setMessage('Usuário registrado com sucesso');
            setIsError(false);
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            setMessage('Erro ao registrar usuário');
            setIsError(true);
        }
    };

    return (
        <div>
          <h2>Registrar</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Registrar</button>
          </form>
          {message && (
            <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
          )}
        </div>
      );
};

export default Register;
