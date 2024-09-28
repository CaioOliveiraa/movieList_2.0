import React, { useState } from 'react';
import '../components/authForm.css'

interface AuthFormProps {
    title: string;
    onSubmit: (name: string, password: string) => void;
    errorMessage?: string;
}
const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, errorMessage }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, password);
    }
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>{title}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
                type="name"
                placeholder="Name"
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
            <button type="submit">{title}</button>
        </form>
    );
};

export default AuthForm;


