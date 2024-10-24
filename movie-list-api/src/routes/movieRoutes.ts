import express from 'express';
import { getMovies, addMovie } from '../controller/movieContoller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/movies', authMiddleware, getMovies);
router.post('/movies/add', authMiddleware, addMovie);

export default router;
