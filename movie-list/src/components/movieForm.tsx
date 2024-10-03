import React, { useState } from 'react';
import '../components/movieForm.css'

interface MovieFormProps {
    onMovieAdded: () => void; // Adicionando a prop para lidar com a adição de um filme
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovieAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'movie' | 'series' | 'anime' | 'documentary'>('movie'); // Tipo padrão
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você deve adicionar a lógica para salvar o filme
        // Exemplo de código para adicionar um filme:
        try {
            // Chame sua API para adicionar um filme aqui
            // await addMovie({ title, description, type });

            setMessage('Mídia adicionada com sucesso!');
            setIsError(false);
            onMovieAdded(); // Chama a função para atualizar a lista de filmes na página de adição
        } catch (error) {
            console.error('Erro ao adicionar mídia:', error);
            setMessage('Erro ao adicionar mídia.');
            setIsError(true);
        }
    };

    return (
        <div className='movie-form-page'>
            <form onSubmit={handleSubmit} className="movie-form">
                <div className="container">
                    <h2>NOME</h2>
                    <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <h2>DESCRIÇÃO</h2>
                    <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <h2>TIPO</h2>
                    <div className="buttons">
                        <button type="button" className={`button ${type === 'movie' ? 'selected' : ''}`} onClick={() => setType('movie')}>Filme</button>
                        <button type="button" className={`button ${type === 'series' ? 'selected' : ''}`} onClick={() => setType('series')}>Série</button>
                        <button type="button" className={`button ${type === 'anime' ? 'selected' : ''}`} onClick={() => setType('anime')}>Anime</button>
                        <button type="button" className={`button ${type === 'documentary' ? 'selected' : ''}`} onClick={() => setType('documentary')}>Documentário</button>
                    </div>
                </div>
                <div className="add-button-container">
                    <button type="submit" className="add-button">Adicionar Mídia</button>
                </div>
                {message && <p className={isError ? 'error' : 'success'}>{message}</p>}
            </form>
        </div>
    );
};

export default MovieForm;
