import { Request, Response } from 'express'
import { User } from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

export const registerUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = User.create({ name, password: hashedPassword });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }

}

export const loginUser = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ error: "Dados Incorretos" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(400).json({ error: 'Erro ao realizar login' });
    }

}