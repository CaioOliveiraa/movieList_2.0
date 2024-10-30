import express from 'express';
import { getMovies, addMovie, updateMovie, deleteMovie } from '../controller/movieContoller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/movies', authMiddleware, getMovies);
router.post('/movies/add', authMiddleware, addMovie);
router.put('/movies/:movieId', authMiddleware, updateMovie);
router.delete('/movies/:movieId', authMiddleware, deleteMovie);

export default router;
