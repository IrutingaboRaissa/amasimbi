import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, displayName, age } = req.body;

  if (!email || !password || !displayName || !age) {
    return res.status(400).json({
      message: 'Missing required fields',
      errors: {
        email: !email ? 'Email is required' : null,
        password: !password ? 'Password is required' : null,
        displayName: !displayName ? 'Display name is required' : null,
        age: !age ? 'Age is required' : null
      }
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format'
    });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long'
    });
  }

  // Validate age
  if (typeof age !== 'number' || age < 12 || age > 100) {
    return res.status(400).json({
      message: 'Age must be between 12 and 100'
    });
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing required fields',
      errors: {
        email: !email ? 'Email is required' : null,
        password: !password ? 'Password is required' : null
      }
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format'
    });
  }

  next();
}; 