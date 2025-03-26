import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Get user profile
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        displayName: true,
        age: true,
        category: true,
        parent_consent: true,
        avatar: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ data: { user } });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { displayName, age, category, avatar } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is updating their own profile
    if (req.user?.id !== id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        displayName,
        age,
        category,
        avatar
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        age: true,
        category: true,
        parent_consent: true,
        avatar: true
      }
    });

    res.json({
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

export const userRouter = router; 