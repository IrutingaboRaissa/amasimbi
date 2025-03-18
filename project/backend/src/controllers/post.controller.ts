import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';

export const postController = {
  // Create a new post
  async create(req: AuthRequest, res: Response) {
    try {
      const { content } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const post = await prisma.post.create({
        data: {
          content,
          author: {
            connect: { id: userId },
          },
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

      return res.status(201).json(post);
    } catch (error) {
      console.error('Create post error:', error);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  },

  // Get all posts
  async getAll(_req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatar: true,
            },
          },
          likes: true,
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  displayName: true,
                  avatar: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Return empty array if no posts found
      return res.json(posts || []);
    } catch (error) {
      console.error('Get all posts error:', error);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  // Get a single post
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              displayName: true,
              avatar: true,
            },
          },
          likes: true,
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  displayName: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.json(post);
    } catch (error) {
      console.error('Get post error:', error);
      return res.status(500).json({ error: 'Failed to fetch post' });
    }
  },

  // Update a post
  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const post = await prisma.post.findUnique({
        where: { id },
        select: { authorId: true },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.authorId !== userId) {
        return res.status(403).json({ error: 'Not authorized to update this post' });
      }

      const updatedPost = await prisma.post.update({
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

      return res.json(updatedPost);
    } catch (error) {
      console.error('Update post error:', error);
      return res.status(500).json({ error: 'Failed to update post' });
    }
  },

  // Delete a post
  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const post = await prisma.post.findUnique({
        where: { id },
        select: { authorId: true },
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.authorId !== userId) {
        return res.status(403).json({ error: 'Not authorized to delete this post' });
      }

      await prisma.post.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error('Delete post error:', error);
      return res.status(500).json({ error: 'Failed to delete post' });
    }
  },

  // Like a post
  async like(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Check if already liked
      const existingLike = await prisma.like.findFirst({
        where: {
          postId: id,
          userId,
        },
      });

      if (existingLike) {
        return res.status(400).json({ error: 'Post already liked' });
      }

      const like = await prisma.like.create({
        data: {
          post: {
            connect: { id },
          },
          user: {
            connect: { id: userId },
          },
        },
      });

      return res.status(201).json(like);
    } catch (error) {
      console.error('Like post error:', error);
      return res.status(500).json({ error: 'Failed to like post' });
    }
  },

  // Unlike a post
  async unlike(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find and delete the like
      const like = await prisma.like.findFirst({
        where: {
          postId: id,
          userId,
        },
      });

      if (!like) {
        return res.status(404).json({ error: 'Like not found' });
      }

      await prisma.like.delete({
        where: { id: like.id },
      });

      return res.status(204).send();
    } catch (error) {
      console.error('Unlike post error:', error);
      return res.status(500).json({ error: 'Failed to unlike post' });
    }
  },
}; 