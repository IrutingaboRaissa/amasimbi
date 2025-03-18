import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const commentController = {
  // Create a new comment
  async create(req: AuthRequest, res: Response) {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          authorId: userId,
          postId,
        },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      });

      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create comment' });
    }
  },

  // Update a comment
  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user?.id;

      const comment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.authorId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { content },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      });

      return res.json(updatedComment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update comment' });
    }
  },

  // Delete a comment
  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const comment = await prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.authorId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await prisma.comment.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete comment' });
    }
  },

  // Like a comment
  async like(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await prisma.like.create({
        data: {
          commentId: id,
          userId,
        },
      });

      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to like comment' });
    }
  },

  // Unlike a comment
  async unlike(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId,
            commentId: id,
          },
        },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to unlike comment' });
    }
  },
}; 