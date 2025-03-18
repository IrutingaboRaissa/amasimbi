import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ValidationError, AuthenticationError } from '../utils/errors';

const prisma = new PrismaClient();

// Generate a random display name
const generateDisplayName = () => {
  const randomNum = Math.floor(Math.random() * 10000);
  return `User${randomNum}`;
};

// Generate a random emoji avatar
const generateEmojiAvatar = () => {
  const emojis = ['🌸', '🌺', '🌷', '🌹', '🌼', '🌻', '💐', '🌱', '🌿', '🍀'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, age, category, parentConsent, interests = [] } = req.body;

    // Validate age
    if (age > 12 ) {
      throw new ValidationError('Age must be above 12');
    }

    // Validate parent consent for minors
    if (age < 18 && !parentConsent) {
      throw new ValidationError('Parent consent is required for users under 18');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate privacy-focused user data
    const displayName = generateDisplayName();
    const avatarType = 'EMOJI';
    const avatarValue = generateEmojiAvatar();

    // Create user with privacy-focused data
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        age,
        category,
        parentConsent,
        displayName,
        avatarType,
        avatarValue,
        isAnonymous: true,
        interests: interests // Will be automatically converted to JSON
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        isAnonymous: user.isAnonymous
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An error occurred during registration'
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        isAnonymous: user.isAnonymous
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActive: new Date() }
    });

    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An error occurred during login'
      });
    }
  }
}; 