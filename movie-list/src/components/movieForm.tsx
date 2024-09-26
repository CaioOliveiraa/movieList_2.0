import React, { useState } from 'react';
import { addMovie } from '../services/api';
import './MovieForm.css';

const MovieForm: React.FC<{ onMovieAdded: () => void }> = ({ onMovieAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'movie' | 'series' | 'anime' | 'documentary'>('movie');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await addMovie(title, description, type);
            setTitle('');
            setDescription('');
            onMovieAdded();
            setMessage('Filme adicionado com sucesso');
            setIsError(false);
        } catch (error) {
            setMessage('Erro ao adicionar mídia');
            setIsError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="movie-form">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value as 'movie' | 'series' | 'anime' | 'documentary')} required>
                <option value="movie">Filme</option>
                <option value="series">Série</option>
                <option value="anime">Anime</option>
                <option value="documentary">Documentário</option>
            </select>
            <button type="submit">Adicionar Filme</button>
            {message && <p className={isError ? 'error' : 'success'}>{message}</p>}
        </form>
    );
};

export default MovieForm;
