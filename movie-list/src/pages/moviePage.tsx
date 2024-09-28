import React from 'react';
import MovieForm from '../components/movieForm';
import MovieList from '../components/movieList';
import './styles/MoviesPage.css';

const MoviesPage: React.FC = () => {
    const handleMovieAdded = () => {
        console.log('Movie added');
    };

    return (
        <div className="movies-page">
            <h2>Seus Filmes</h2>
            <MovieForm onMovieAdded={handleMovieAdded} />
            <MovieList />
        </div>
    );
};

export default MoviesPage;
