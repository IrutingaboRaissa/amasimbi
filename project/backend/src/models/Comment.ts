import { User } from './User';

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  postId: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
} 