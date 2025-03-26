import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth';
import postRouter from './routes/post.routes';
import { prisma } from './lib/prisma';
import { app } from './app';

// Load environment variables
console.log('Loading environment variables...');
dotenv.config();
console.log('Environment variables loaded');

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Vite's default development port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname)));

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

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found'
  });
});

const port = parseInt(process.env.PORT || '5000', 10);

const startServer = async () => {
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
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Closing HTTP server...');
      await prisma.$disconnect();
      server.close(() => {
        console.log('HTTP server closed');
      });
      process.exit(0);
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

// Start server
console.log('Starting server...');
startServer();

export { app }; 