import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get user profile
router.get('/profile', async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        displayName: true,
        age: true,
        phone: true,
        location: true,
        bio: true,
        education: true,
        interests: true,
        avatar: true,
        createdAt: true,
        lastActive: true
      }
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.patch('/profile', async (req: AuthRequest, res, next) => {
  try {
    const {
      displayName,
      email,
      phone,
      location,
      bio,
      education,
      interests,
      avatar
    } = req.body;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user!.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new AppError('Email already in use', 400);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        displayName,
        email,
        phone,
        location,
        bio,
        education,
        interests,
        avatar
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        age: true,
        phone: true,
        location: true,
        bio: true,
        education: true,
        interests: true,
        avatar: true,
        createdAt: true,
        lastActive: true
      }
    });

    res.json({
      status: 'success',
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
});

// Get user activity
router.get('/activity', async (req: AuthRequest, res, next) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    res.json({
      status: 'success',
      data: { activities }
    });
  } catch (error) {
    next(error);
  }
});

export default router; 