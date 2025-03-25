import { Router } from 'express';
import { commentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/post/:postId', commentController.getComments);

// Protected routes
router.post('/post/:postId', authMiddleware, commentController.createComment);
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);

export const commentRouter = router; 