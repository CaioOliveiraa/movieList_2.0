import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

// Criação de uma interface para estender o Request e incluir o userId
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ error: 'Acesso não autorizado, token não fornecido' });
  }

  try {
    // Verificação do token JWT e extração do userId
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId; // Salva o userId no request

    next(); // Prossegue para o próximo middleware ou controlador
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
