import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    throw new ValidationError('Invalid email format');
  }

  if (typeof password !== 'string' || password.length < 6) {
    throw new ValidationError('Password must be at least 6 characters long');
  }

  next();
};

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, age, category } = req.body;

  if (!email || !password || !age) {
    throw new ValidationError('Email, password, and age are required');
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    throw new ValidationError('Invalid email format');
  }

  if (typeof password !== 'string' || password.length < 6) {
    throw new ValidationError('Password must be at least 6 characters long');
  }

  if (typeof age !== 'number' || age < 12 || age > 25) {
    throw new ValidationError('Age must be between 12 and 25');
  }

  if (age < 18 && !req.body.parent_consent) {
    throw new ValidationError('Parent consent is required for users under 18');
  }

  if (category && typeof category !== 'string') {
    throw new ValidationError('Invalid category format');
  }

  next();
}; 