import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', postController.getAll);

// Protected routes
router.post('/', authenticate, postController.create);

// Routes with ID parameter
router.get('/:id', postController.getOne);
router.put('/:id', authenticate, postController.update);
router.delete('/:id', authenticate, postController.delete);
router.post('/:id/like', authenticate, postController.like);
router.delete('/:id/like', authenticate, postController.unlike);

export default router; 