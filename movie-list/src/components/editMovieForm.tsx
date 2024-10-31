// src/components/EditMovieForm.tsx
import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setType(initialData.type);
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, type });
    };

    return (
        <form onSubmit={handleSubmit} className="movie-form">
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
                {['movie', 'series', 'anime', 'documentary'].map((btnType) => (
                    <button
                        key={btnType}
                        type="button"
                        className={`button ${type === btnType ? 'selected' : ''}`}
                        onClick={() => setType(btnType as MovieData['type'])}
                    >
                        {btnType.charAt(0).toUpperCase() + btnType.slice(1)}
                    </button>
                ))}
            </div>
            <div className="button-container">
                <button type="submit" className="submit-button">Salvar Alterações</button>
                <button type="button" className="cancel-button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default EditMovieForm;
