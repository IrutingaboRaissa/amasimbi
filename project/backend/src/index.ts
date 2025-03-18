import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { authRouter } from './routes/auth';
import postRouter from './routes/post.routes';
import { prisma } from './lib/prisma';
import { app } from './app';

// Load environment variables
console.log('Loading environment variables...');
dotenv.config();
console.log('Environment variables loaded');

const startServer = async (port: number): Promise<void> => {
  try {
    console.log('Attempting to start server...');
    console.log('Port:', port);
    console.log('Database URL:', process.env.DATABASE_URL);

    // Test database connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connection successful');

    // Add debug middleware
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });

    const server = app.listen(port, '0.0.0.0', () => {
      console.log('Server started successfully');
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Server is also accessible on http://127.0.0.1:${port}`);
      console.log(`Test page available at http://localhost:${port}/test.html`);
    });

    // Handle shutdown gracefully
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        prisma.$disconnect();
      });
    });

    // Handle errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      console.error('Server error occurred:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });

    // Handle uncaught exceptions
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

const port = parseInt(process.env.PORT || '5000', 10);

// Middleware
console.log('Setting up middleware...');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));
console.log('Middleware setup complete');

// Routes
console.log('Setting up routes...');
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
console.log('Routes setup complete');

// Health check route
app.get('/health', async (req, res) => {
  try {
    console.log('Health check requested');
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database health check successful');
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      server: 'running',
      port: port,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start server
console.log('Starting server...');
startServer(port);

export { app }; 