import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            category: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      message: 'Posts retrieved successfully',
      data: { posts }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      message: 'Failed to fetch posts',
      errors: {
        general: 'An unexpected error occurred while fetching posts. Please try again later.'
      }
    });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            category: true
          }
        },
        comment: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                category: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        errors: {
          post: 'The requested post could not be found'
        }
      });
    }

    res.json({
      message: 'Post retrieved successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      message: 'Failed to fetch post',
      errors: {
        general: 'An unexpected error occurred while fetching the post. Please try again later.'
      }
    });
  }
});

// Create post
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;

    const post = await prisma.post.create({
      data: {
        id: '', // MySQL will generate this
        content,
        authorId: req.user!.id,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            category: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Post created successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      message: 'Failed to create post',
      errors: {
        general: 'An unexpected error occurred while creating the post. Please try again later.'
      }
    });
  }
});

// Update post
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;

    // Check if post exists and is owned by the authenticated user
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        errors: {
          post: 'The requested post could not be found'
        }
      });
    }

    if (post.authorId !== req.user?.id) {
      return res.status(403).json({
        message: 'Access denied',
        errors: {
          auth: 'You can only update your own posts'
        }
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        content,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            category: true
          }
        }
      }
    });

    res.json({
      message: 'Post updated successfully',
      data: { post: updatedPost }
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      message: 'Failed to update post',
      errors: {
        general: 'An unexpected error occurred while updating the post. Please try again later.'
      }
    });
  }
});

// Delete post
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if post exists and is owned by the authenticated user
    const post = await prisma.post.findUnique({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        errors: {
          post: 'The requested post could not be found'
        }
      });
    }

    if (post.authorId !== req.user?.id) {
      return res.status(403).json({
        message: 'Access denied',
        errors: {
          auth: 'You can only delete your own posts'
        }
      });
    }

    await prisma.post.delete({
      where: { id: req.params.id }
    });

    res.json({
      message: 'Post deleted successfully',
      data: {
        message: 'The post has been permanently deleted'
      }
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      message: 'Failed to delete post',
      errors: {
        general: 'An unexpected error occurred while deleting the post. Please try again later.'
      }
    });
  }
});

export const postRouter = router; 