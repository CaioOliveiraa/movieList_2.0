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
