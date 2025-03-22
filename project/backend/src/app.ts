import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authRouter } from './routes/auth';
import { postRouter } from './routes/post.routes';
import { commentRouter } from './routes/comment.routes';
import { likeRouter } from './routes/like.routes';

const app = express();

// Middleware
app.use(cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: config.upload.maxFileSize }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export { app }; 