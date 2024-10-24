import { Request, Response } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from '../config';

export const registerUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, password: hashedPassword });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: 'Dados Incorretos' });
        }

        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao realizar login' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET) as { userId: string };
        const userId = decoded.userId;

        // Verifique se o usuário existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(401).json({ message: 'Token de renovação inválido' });
    }
};
