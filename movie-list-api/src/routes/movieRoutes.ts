import { Router } from 'express';
import { getMovies, addMovie} from '../controller/movieContoller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authMiddleware, addMovie);
router.post('/', authMiddleware, getMovies);

export default router;
