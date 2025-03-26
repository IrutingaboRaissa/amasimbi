import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const likeController = {
  // Like a post
  async likePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if post exists
      const post = await prisma.post.findUnique({
        where: { id: postId }
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if already liked
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      if (existingLike) {
        return res.status(400).json({ error: 'Post already liked' });
      }

      // Create like
      await prisma.like.create({
        data: {
          userId,
          postId
        }
      });

      res.status(201).json({ message: 'Post liked successfully' });
    } catch (error) {
      console.error('Like post error:', error);
      res.status(500).json({ error: 'Failed to like post' });
    }
  },

  // Unlike a post
  async unlikePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if like exists
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId
          }
        }
      });

      if (!like) {
        return res.status(404).json({ error: 'Like not found' });
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

      res.status(204).send();
    } catch (error) {
      console.error('Unlike post error:', error);
      res.status(500).json({ error: 'Failed to unlike post' });
    }
  },

  // Like a comment
  async likeComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if comment exists
      const comment = await prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Check if already liked
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId
          }
        }
      });

      if (existingLike) {
        return res.status(400).json({ error: 'Comment already liked' });
      }

      // Create like
      await prisma.like.create({
        data: {
          userId,
          commentId
        }
      });

      res.status(201).json({ message: 'Comment liked successfully' });
    } catch (error) {
      console.error('Like comment error:', error);
      res.status(500).json({ error: 'Failed to like comment' });
    }
  },

  // Unlike a comment
  async unlikeComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if like exists
      const like = await prisma.like.findUnique({
        where: {
          userId_commentId: {
            userId,
            commentId
          }
        }
      });

      if (!like) {
        return res.status(404).json({ error: 'Like not found' });
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

      res.status(204).send();
    } catch (error) {
      console.error('Unlike comment error:', error);
      res.status(500).json({ error: 'Failed to unlike comment' });
    }
  }
}; 