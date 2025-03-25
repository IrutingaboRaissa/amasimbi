import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from '../routes/auth';
import { userRouter } from '../routes/users';
import { postRouter } from '../routes/posts';
import { errorHandler } from '../middleware/errorHandler';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Error handling
app.use(errorHandler);

// Create handler for Netlify Functions
const handler: Handler = serverless(app);

export { handler }; 