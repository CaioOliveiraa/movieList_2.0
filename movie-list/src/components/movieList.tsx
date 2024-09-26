import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import './MovieList.css';

interface Movie {
    id: string;
    title: string;
    description: string;
    type: 'movie' | 'series' | 'anime' | 'documentary';
};

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getMovies();
            setMovies(moviesData);
        };

        fetchMovies();
    }, []);

    const filterByType = (type: Movie['type']) => movies.filter(movie => movie.type === type);

    return (
        <div className="movie-list">
            <nav className="menu">
                <ul>
                    <li><a href="#movies">Filmes</a></li>
                    <li><a href="#series">Séries</a></li>
                    <li><a href="#anime">Animes</a></li>
                    <li><a href="#documentary">Documentários</a></li>
                </ul>
            </nav>

            <section id="movies" className="media-section">
                <h3 className="section-title">Filmes</h3>
                {filterByType('movie').length === 0 ? (
                    <p>Nenhum filme adicionado ainda.</p>
                ) : (
                    <div className="media-grid">
                        {filterByType('movie').map((movie) => (
                            <div key={movie.id} className="media-card">
                                <h4>{movie.title}</h4>
                                <p>{movie.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section id="series" className="media-section">
                <h3 className="section-title">Séries</h3>
                {filterByType('series').length === 0 ? (
                    <p>Nenhuma serie adicionada ainda.</p>
                ) : (
                    <div className="media-grid">
                        {filterByType('series').map((movie) => (
                            <div key={movie.id} className="media-card">
                                <h4>{movie.title}</h4>
                                <p>{movie.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section id="anime" className="media-section">
                <h3 className="section-title">Animes</h3>
                {filterByType('anime').length === 0 ? (
                    <p>Nenhum anime adicionado ainda.</p>
                ) : (
                    <div className="media-grid">
                        {filterByType('anime').map((movie) => (
                            <div key={movie.id} className="media-card">
                                <h4>{movie.title}</h4>
                                <p>{movie.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section id="documentary" className="media-section">
                <h3 className="section-title">Documentários</h3>
                {filterByType('documentary').length === 0 ? (
                    <p>Nenhum documentário adicionado ainda.</p>
                ) : (
                    <div className="media-grid">
                        {filterByType('documentary').map((movie) => (
                            <div key={movie.id} className="media-card">
                                <h4>{movie.title}</h4>
                                <p>{movie.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MovieList;
