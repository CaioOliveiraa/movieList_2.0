// src/pages/MoviesPage.tsx
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        fetchMovies();
    }, []);

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

    const handleMovieDeleted = (movieId: string) => {
        setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
    };

    return (
        <div className="movies-page">
            <nav className="menu">
                <a href="/home" className="arrow-button-left">HOME</a>
                <a href="/addMovie" className="arrow-button-right">ADICIONAR</a>
            </nav>
            <MovieList movies={movies} onMovieDeleted={handleMovieDeleted} />
            <footer></footer>
        </div>
    );
};

export default MoviesPage;
