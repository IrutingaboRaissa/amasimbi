import { Router } from 'express';
import { commentController } from '../controllers/comment.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All comment routes require authentication
router.use(authenticate);

// Comment routes
router.post('/posts/:postId/comments', commentController.create);
router.put('/comments/:id', commentController.update);
router.delete('/comments/:id', commentController.delete);
router.post('/comments/:id/like', commentController.like);
router.delete('/comments/:id/like', commentController.unlike);

export default router; 