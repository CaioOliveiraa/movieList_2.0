import React, { useState, useEffect } from 'react';
import MovieForm from '../components/movieForm';
import MovieList from '../components/movieList';
import { getMovies } from '../services/api';
import './styles/moviePage.css';

interface Movie {
    id: string;
    title: string;
    description: string;
    type: 'movie' | 'series' | 'anime' | 'documentary';
}

const MoviesPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    // Função para buscar os filmes do banco de dados
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
        <div className="movies-page">
            <h2>Seus Filmes</h2>
            <MovieForm onMovieAdded={handleMovieAdded} />
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
