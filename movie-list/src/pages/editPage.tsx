// src/pages/EditMoviePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, updateMovie } from '../services/api';
import EditMovieForm from '../components/editMovieForm';

interface MovieData {
    title: string;
    description: string;
    type: 'movie' | 'series' | 'anime' | 'documentary';
}

const EditMoviePage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState<MovieData | null>(null);

    // Fetch movie data when the page loads
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movie = await getMovie(movieId!);
                setMovieData(movie);
            } catch (error) {
                console.error('Erro ao buscar dados do filme:', error);
            }
        };
        fetchMovie();
    }, [movieId]);

    const handleUpdateMovie = async (data: MovieData) => {
        try {
            await updateMovie(movieId!, data);
            navigate('/movies');
        } catch (error) {
            console.error('Erro ao atualizar filme:', error);
        }
    };

    if (!movieData) {
        return <p>Carregando dados do filme...</p>;
    }

    return (
        <EditMovieForm
            initialData={movieData} 
            onSubmit={handleUpdateMovie}
            onCancel={() => navigate('/movies')}
        />
    );
};

export default EditMoviePage;
