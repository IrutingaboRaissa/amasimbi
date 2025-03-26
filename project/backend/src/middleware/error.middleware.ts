import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: {
          field: 'A unique constraint would be violated on one or more fields'
        }
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        message: 'Not Found',
        errors: {
          general: 'The requested record could not be found'
        }
      });
    }
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.message
    });
  }

  // Handle unauthorized errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized',
      errors: {
        auth: err.message
      }
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid Token',
      errors: {
        auth: 'The provided token is invalid'
      }
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token Expired',
      errors: {
        auth: 'Your session has expired. Please log in again'
      }
    });
  }

  // Default error
  res.status(500).json({
    message: 'Internal Server Error',
    errors: {
      general: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    }
  });
}; 