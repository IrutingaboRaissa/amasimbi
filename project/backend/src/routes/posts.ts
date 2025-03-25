import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

const router = Router();
const prisma = new PrismaClient();

// Generate anonymous ID
const generateAnonymousId = () => {
  return crypto.randomBytes(8).toString('hex');
};

// Get all posts
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform posts to handle anonymous authors
    const transformedPosts = posts.map(post => ({
      ...post,
      author: post.isAnonymous ? {
        id: post.anonymousId,
        displayName: `Anonymous ${post.anonymousId.slice(0, 4)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.anonymousId}`
      } : post.author
    }));

    res.json({
      status: 'success',
      data: { posts: transformedPosts }
    });
  } catch (error) {
    next(error);
  }
});

// Create a post
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const { title, content, isAnonymous } = req.body;

    if (!title || !content) {
      throw new AppError('Title and content are required', 400);
    }

    const postData: any = {
      title,
      content,
      isAnonymous: isAnonymous || false
    };

    if (isAnonymous) {
      postData.anonymousId = generateAnonymousId();
    } else if (req.user) {
      postData.authorId = req.user.id;
    }

    const post = await prisma.post.create({
      data: postData,
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    // Transform post to handle anonymous author
    const transformedPost = {
      ...post,
      author: post.isAnonymous ? {
        id: post.anonymousId,
        displayName: `Anonymous ${post.anonymousId.slice(0, 4)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.anonymousId}`
      } : post.author
    };

    // Record activity only for non-anonymous posts
    if (!isAnonymous && req.user) {
      await prisma.activity.create({
        data: {
          type: 'post_created',
          details: `Created post: ${title}`,
          userId: req.user.id
        }
      });
    }

    res.status(201).json({
      status: 'success',
      data: { post: transformedPost }
    });
  } catch (error) {
    next(error);
  }
});

// Get post by ID
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            avatar: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                displayName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    // Transform post and comments to handle anonymous authors
    const transformedPost = {
      ...post,
      author: post.isAnonymous ? {
        id: post.anonymousId,
        displayName: `Anonymous ${post.anonymousId.slice(0, 4)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.anonymousId}`
      } : post.author,
      comments: post.comments.map(comment => ({
        ...comment,
        author: comment.isAnonymous ? {
          id: comment.anonymousId,
          displayName: `Anonymous ${comment.anonymousId.slice(0, 4)}`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.anonymousId}`
        } : comment.author
      }))
    };

    res.json({
      status: 'success',
      data: { post: transformedPost }
    });
  } catch (error) {
    next(error);
  }
});

// Add comment to post
router.post('/:id/comments', async (req: AuthRequest, res, next) => {
  try {
    const { content, isAnonymous } = req.body;

    if (!content) {
      throw new AppError('Comment content is required', 400);
    }

    const commentData: any = {
      content,
      postId: req.params.id,
      isAnonymous: isAnonymous || false
    };

    if (isAnonymous) {
      commentData.anonymousId = generateAnonymousId();
    } else if (req.user) {
      commentData.authorId = req.user.id;
    }

    const comment = await prisma.comment.create({
      data: commentData,
      include: {
        author: {
          select: {
            id: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    // Transform comment to handle anonymous author
    const transformedComment = {
      ...comment,
      author: comment.isAnonymous ? {
        id: comment.anonymousId,
        displayName: `Anonymous ${comment.anonymousId.slice(0, 4)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.anonymousId}`
      } : comment.author
    };

    // Record activity only for non-anonymous comments
    if (!isAnonymous && req.user) {
      await prisma.activity.create({
        data: {
          type: 'comment_created',
          details: `Commented on post: ${req.params.id}`,
          userId: req.user.id
        }
      });
    }

    res.status(201).json({
      status: 'success',
      data: { comment: transformedComment }
    });
  } catch (error) {
    next(error);
  }
});

export default router; 