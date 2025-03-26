import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { postRouter } from './routes/post.routes';
import { commentRouter } from './routes/comment.routes';
import { errorHandler } from './middleware/error.middleware';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Load environment variables
console.log('Loading environment variables...');
dotenv.config();
console.log('Environment variables loaded');

// Initialize Express app
const app = express();

// Initialize Prisma client
const prisma = new PrismaClient();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(express.json());
app.use(limiter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
console.log('Setting up routes...');
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
console.log('Routes setup complete');

// Error handling
app.use(errorHandler);

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start server
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Closing HTTP server...');
      await prisma.$disconnect();
      process.exit(0);
    });

    // Handle errors
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();

export { app }; 