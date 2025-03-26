# AMASIMBI - Empowering Young Women's Community Platform

AMASIMBI is a social platform designed to empower and connect young women through shared experiences, resources, and support. The platform provides a safe space for users to share their stories, seek advice, and build meaningful connections.

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Password hashing and security

- **Social Features**
  - Create and share posts
  - Comment on posts
  - Like posts and comments
  - User profiles with customizable information

- **Community Engagement**
  - Anonymous posting option
  - Age-appropriate content filtering
  - Parent consent system for minors

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- MySQL Database
- JWT Authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/amasimbi.git
cd amasimbi
```

2. Install dependencies:
```bash
# Install backend dependencies
cd project/backend
npm install

# Install frontend dependencies
cd project
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables with your configuration

4. Set up the database:
```bash
cd project/backend
npx prisma migrate dev
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd project/backend
npm run dev
```

2. Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Project Structure

```
amasimbi/
├── project/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── prisma/
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── contexts/
│       │   ├── services/
│       │   └── types/
│       └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/me` - Get current user profile

### Posts
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create a new post
- GET `/api/posts/:id` - Get a specific post
- PUT `/api/posts/:id` - Update a post
- DELETE `/api/posts/:id` - Delete a post

### Comments
- GET `/api/comments/post/:postId` - Get comments for a post
- POST `/api/comments/post/:postId` - Create a new comment
- PUT `/api/comments/:id` - Update a comment
- DELETE `/api/comments/:id` - Delete a comment

### Likes
- POST `/api/likes/post/:postId` - Like a post
- DELETE `/api/likes/post/:postId` - Unlike a post
- POST `/api/likes/comment/:commentId` - Like a comment
- DELETE `/api/likes/comment/:commentId` - Unlike a comment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Raissa IRUTINGABO - [https://www.linkedin.com/in/ra%C3%AFssa-irutingabo-8b84a9284/] - r.irutingab@alustudent.com

Project Link: [https://github.com/IrutingaboRaissa/amasimbi]