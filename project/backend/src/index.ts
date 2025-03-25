import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

// Load environment variables
console.log('Loading environment variables...');
dotenv.config();
console.log('Environment variables loaded');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Middleware
console.log('Setting up middleware...');
app.use(cors());
app.use(express.json());
console.log('Middleware setup complete');

// Routes
console.log('Setting up routes...');
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/posts', authenticateToken, postRoutes);
console.log('Routes setup complete');

// Error handling
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
console.log('Starting server...');
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to database');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export { app }; 