import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(400).json({ error: 'Acesso não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId; 
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Token inválido' });
  }
};
