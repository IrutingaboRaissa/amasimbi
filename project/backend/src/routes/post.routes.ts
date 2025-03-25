import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

// Protected routes
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

export default router; 