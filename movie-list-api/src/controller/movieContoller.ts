import { Request, Response } from 'express';
import { Movie } from '../models/movieModel';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const getMovies = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const allMovies = await Movie.find({ userId });
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar filmes' });
    }
};

export const getMovie = async (req: Request, res: Response) => {
    const movieId = req.params.movieId;

    try {
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        return res.status(500).json({ message: 'Erro ao buscar filme' });
    }
};

export const addMovie = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, type } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const newMovie = await Movie.create({ title, description, type, userId });
        return res.status(201).json(newMovie);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao adicionar filme' });
    }
};

export const updateMovie = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const movieId = req.params.movieId;
    const { title, description, type } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const movie = await Movie.findOne({ _id: movieId, userId });

        if (!movie) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }

        movie.title = title || movie.title;
        movie.description = description || movie.description;
        movie.type = type || movie.type;

        const updatedMovie = await movie.save();
        console.log(`Filme atualizado: ${updatedMovie._id}`);
        return res.status(200).json(updatedMovie);

    } catch (error) {
        console.error('Erro ao editar filme:', error);
        return res.status(500).json({ message: 'Erro ao editar filme' });
    }
};

export const deleteMovie = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const movieId = req.params.movieId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const movie = await Movie.findOneAndDelete({ _id: movieId, userId });

        if (!movie) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }

        return res.status(200).json({ message: 'Filme excluído com sucesso' });

    } catch (error) {
        console.error('Erro ao excluir filme:', error);
        return res.status(500).json({ message: 'Erro ao excluir filme' });
    }
};
