import { User } from './User';
import { Comment } from './Comment';

export interface Post {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  category: string;
  likes: number;
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
} 