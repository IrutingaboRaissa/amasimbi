import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user
router.get('/me', authController.getCurrentUser);

export { router as authRouter }; 