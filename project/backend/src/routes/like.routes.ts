import { Router } from 'express';
import { likeController } from '../controllers/like.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes are protected
router.post('/post/:postId', authMiddleware, likeController.likePost);
router.delete('/post/:postId', authMiddleware, likeController.unlikePost);
router.post('/comment/:commentId', authMiddleware, likeController.likeComment);
router.delete('/comment/:commentId', authMiddleware, likeController.unlikeComment);

export const likeRouter = router; 