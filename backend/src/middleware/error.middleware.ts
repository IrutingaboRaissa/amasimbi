import { Request, Response, NextFunction } from 'express';
import { AuthError, ValidationError } from '../utils/errors';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof AuthError) {
    return res.status(401).json({
      success: false,
      message: error.message,
      error: 'Authentication Error'
    });
  }

  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: error.message,
      error: 'Validation Error'
    });
  }

  // Prisma error handling
  if (error.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      success: false,
      message: 'Database operation failed',
      error: 'Database Error'
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'Server Error'
  });
}; 