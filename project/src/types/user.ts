export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateData {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
} 