import React, { useState, useEffect } from 'react';
import MovieForm from '../components/movieForm';
import { getMovies } from '../services/api';
import './styles/addpage.css'

interface Movie {
    id: string;
    title: string;
    description: string;
    type: 'movie' | 'series' | 'anime' | 'documentary';
}

const AddPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    const fetchMovies = async () => {
        try {
            const moviesData = await getMovies();
            const movieArray = Array.isArray(moviesData) ? moviesData : moviesData.movies;
            const formattedMovies = movieArray.map((movie: any) => ({
                id: movie._id,
                title: movie.title,
                description: movie.description,
                type: movie.type,
            }));
            setMovies(formattedMovies);
        } catch (error) {
            console.error('Erro ao buscar mídias:', error);
        }
    };

    useEffect(() => {
        fetchMovies(); // Carrega as mídias ao montar o componente
    }, []);

    const handleMovieAdded = () => {
        fetchMovies(); // Atualiza a lista de filmes quando uma nova mídia é adicionada
    };

    return (
        <div>
            <nav className='menu'>
                <a href="/home" className="arrow-button-left">HOME</a>
                <a href="/movies" className="arrow-button-right">MÍDIAS</a>
            </nav>
            <MovieForm onMovieAdded={handleMovieAdded} />
        </div>
    );
}

export default AddPage;
