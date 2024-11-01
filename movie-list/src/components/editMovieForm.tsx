// src/components/EditMovieForm.tsx
import React, { useState, useEffect } from 'react';
import './editMovieForm.css';

interface MovieData {
    title: string;
    description: string;
    type: 'movie' | 'series' | 'anime' | 'documentary';
}

interface EditMovieFormProps {
    initialData: MovieData;
    onSubmit: (data: MovieData) => void;
    onCancel: () => void;
}

const EditMovieForm: React.FC<EditMovieFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initialData.title);
    const [description, setDescription] = useState(initialData.description);
    const [type, setType] = useState(initialData.type);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setType(initialData.type);
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        try {
            e.preventDefault();
            onSubmit({ title, description, type });
            setIsError(false)
        } catch (error) {
            console.error('Erro ao adicionar mídia:', error);
            setMessage('Erro ao adicionar mídia.');
            setIsError(true);
        }
    };

    return (
        <div className='movie-form-page'>
            {/* Quadrado Vermelho */}
            <div className="red-square">
                {/* Bolinhas no topo */}
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>
                <div className="bulb bulb-top"></div>

                {/* Bolinhas na direita */}
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>
                <div className="bulb bulb-right"></div>

                {/* Bolinhas na parte inferior */}
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>
                <div className="bulb bulb-bottom"></div>


                {/* Bolinhas na esquerda */}
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
                <div className="bulb bulb-left"></div>
            </div>

            <form onSubmit={handleSubmit} className="movie-form">
                <div className="container">
                    <h2>TÍTULO</h2>
                    <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <h2>DESCRIÇÃO</h2>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <h2>TIPO</h2>
                    <div className="buttons">
                        <button
                            type="button"
                            className={`button ${type === 'movie' ? 'selected' : ''}`}
                            onClick={() => setType('movie')}
                        >
                            Filme
                        </button>
                        <button
                            type="button"
                            className={`button ${type === 'series' ? 'selected' : ''}`}
                            onClick={() => setType('series')}
                        >
                            Série
                        </button>
                        <button
                            type="button"
                            className={`button ${type === 'anime' ? 'selected' : ''}`}
                            onClick={() => setType('anime')}
                        >
                            Anime
                        </button>
                        <button
                            type="button"
                            className={`button ${type === 'documentary' ? 'selected' : ''}`}
                            onClick={() => setType('documentary')}
                        >
                            Documentário
                        </button>
                    </div>
                </div>
                <div className="edit-button-container">
                    <button type="submit" className="edit-button">Salvar Alterações</button>
                    <button type="button" className="edit-button" onClick={onCancel}>Cancelar</button>
                </div>
                {message && <p className={isError ? 'error' : 'success'}>{message}</p>}
            </form>
        </div>
    );
};

export default EditMovieForm;
