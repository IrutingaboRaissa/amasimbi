import express from 'express';
import { login, register } from '../controllers/auth.controller';
import { validateLogin, validateRegistration } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegistration, register);

export default router; 