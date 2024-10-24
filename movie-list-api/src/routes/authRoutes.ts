import express from 'express';
import { registerUser, loginUser, refreshToken } from '../controller/authController';

const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/refresh-token', refreshToken);

export default router;
