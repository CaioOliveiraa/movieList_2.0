import { Request, Response } from "express";
import { Movie } from "../models/movieModel";

export const addMovie = async (req: Request, res: Response) => {
    const { title, description, type } = req.body;
    const userId = req.userId;

    try {
        const newMovie = await Movie.create({ title, description, type, userId });
        return res.status(201).json(newMovie)

    } catch (error) {
        return res.status(400).json({ message: 'Erro ao adicionar filme' });
    }
}

export const getMovies = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {

        const allMedia = await Movie.find({ userId });

        return res.status(200).json(allMedia);
    } catch (error) {
        return res.status(400).json({ message: 'Erro ao buscar conteúdos' });
    }
};
