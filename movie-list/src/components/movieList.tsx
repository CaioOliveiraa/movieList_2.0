import React from 'react';
import './movieList.css';

interface Movie {
    id: string;
    title: string;
    description: string;
    type: 'movie' | 'series' | 'anime' | 'documentary';
}

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    const filterByType = (type: Movie['type']) => movies.filter(movie => movie.type === type);

    return (
        <div className="movie-list">
            <nav className="type-menu">
                <ul>
                    <li>
                        <a className="ticket" href="#movies">
                            <img src="/assets/ticketAzul.png" alt="ticket" />
                            <span>Filmes</span>
                        </a>
                    </li>
                    <li>
                        <a className="ticket" href="#series">
                            <img src="/assets/ticketLaranja.png" alt="ticket" />
                            <span>Séries</span>
                        </a>
                    </li>
                    <li>
                        <a className="ticket" href="#anime">
                            <img src="/assets/ticketRoxo.png" alt="ticket" />
                            <span>Animes</span>
                        </a>
                    </li>
                    <li>
                        <a className="ticket" href="#documentary">
                            <img src="/assets/ticketVerde.png" alt="ticket" />
                            <span>Documentários</span>
                        </a>
                    </li>
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
                                <button>Editar</button>
                                <button>Visto</button>
                                <button>Apagar</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section id="series" className="media-section">
                <h3 className="section-title">Séries</h3>
                {filterByType('series').length === 0 ? (
                    <p>Nenhuma série adicionada ainda.</p>
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
