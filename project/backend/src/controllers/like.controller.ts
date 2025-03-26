import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const likeController = {
  // Like a post
  likePost: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: 'Unauthorized',
          errors: { auth: 'You must be logged in to like a post' }
        });
      }

      // Check if like already exists
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      if (existingLike) {
        return res.status(400).json({
          message: 'Already liked',
          errors: { like: 'You have already liked this post' }
        });
      }

      // Create like
      const like = await prisma.like.create({
        data: {
          id: Math.random().toString(36).substring(7),
          userId,
          postId
        }
      });

      res.json({
        message: 'Post liked successfully',
        data: { like }
      });
    } catch (error) {
      console.error('Like post error:', error);
      res.status(500).json({
        message: 'Failed to like post',
        errors: { general: 'An unexpected error occurred while liking the post' }
      });
    }
  },

  // Unlike a post
  unlikePost: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: 'Unauthorized',
          errors: { auth: 'You must be logged in to unlike a post' }
        });
      }

      // Delete like
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      res.json({
        message: 'Post unliked successfully'
      });
    } catch (error) {
      console.error('Unlike post error:', error);
      res.status(500).json({
        message: 'Failed to unlike post',
        errors: { general: 'An unexpected error occurred while unliking the post' }
      });
    }
  },

  // Like a comment
  likeComment: async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: 'Unauthorized',
          errors: { auth: 'You must be logged in to like a comment' }
        });
      }

      // Check if like already exists
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId
          }
        }
      });

      if (existingLike) {
        return res.status(400).json({
          message: 'Already liked',
          errors: { like: 'You have already liked this comment' }
        });
      }

      // Create like
      const like = await prisma.like.create({
        data: {
          id: Math.random().toString(36).substring(7),
          userId,
          commentId
        }
      });

      res.json({
        message: 'Comment liked successfully',
        data: { like }
      });
    } catch (error) {
      console.error('Like comment error:', error);
      res.status(500).json({
        message: 'Failed to like comment',
        errors: { general: 'An unexpected error occurred while liking the comment' }
      });
    }
  },

  // Unlike a comment
  unlikeComment: async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          message: 'Unauthorized',
          errors: { auth: 'You must be logged in to unlike a comment' }
        });
      }

      // Delete like
      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId,
            commentId
          }
        }
      });

      res.json({
        message: 'Comment unliked successfully'
      });
    } catch (error) {
      console.error('Unlike comment error:', error);
      res.status(500).json({
        message: 'Failed to unlike comment',
        errors: { general: 'An unexpected error occurred while unliking the comment' }
      });
    }
  }
}; 