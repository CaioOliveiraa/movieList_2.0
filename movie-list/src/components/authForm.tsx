import React, { useState } from 'react';
import '../components/authForm.css'

interface AuthFormProps {
    title: string;
    onSubmit: (name: string, password: string) => void;
    errorMessage?: string;
    toggleLink:{
        text: string
        route: string
        linkName?: string
    }
}
const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, errorMessage, toggleLink }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, password);
        setName('')
        setPassword('')
    }
    return (
        <div>
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
                <p>{toggleLink.text}<a href={toggleLink.route}>{toggleLink.linkName}</a></p>
            </form>
        </div>

    );
};

export default AuthForm;


