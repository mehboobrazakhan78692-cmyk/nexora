# NEXORA - Advanced Full Stack Platform

NEXORA is a professional SaaS-grade full stack platform built with modern technologies. It includes advanced features like JWT authentication, role-based access control, and an advanced admin panel.

## 🚀 Features

- **User Authentication**: Register, Login, Logout with JWT tokens
- **Email Verification**: Verify email addresses with secure tokens
- **Password Reset**: Secure forgot/reset password functionality
- **Role-Based Access Control**: User, Admin, and Super Admin roles
- **Advanced Admin Panel**: User management, audit logs, dashboard analytics
- **Secure API**: Rate limiting, input validation, security headers
- **Modern Tech Stack**: Next.js, React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT + Refresh Tokens

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## 🏁 Quick Start

### Option 1: Use the automation script (recommended)

```
bash
node start.js
```

This will:
1. Install all dependencies
2. Run database migrations
3. Start the backend server (port 5000)
4. Start the frontend server (port 3000)

### Option 2: Manual Setup

1. **Install dependencies**

```
bash
# Root
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

2. **Setup database**

Make sure PostgreSQL is running and create a database named `nexora`:

```
sql
CREATE DATABASE nexora;
```

3. **Configure environment variables**

```
bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run migrations**

```
bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

5. **Start the application**

```
bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📱 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/health

## 🔐 Default Roles

| Role | Description |
|------|-------------|
| USER | Regular user with basic access |
| ADMIN | Admin with user management access |
| SUPER_ADMIN | Super admin with full system access |

## 📁 Project Structure

```
nexora/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── validators/     # Input validation
│   │   └── index.ts       # Entry point
│   ├── prisma/            # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   ├── context/       # React context
│   │   └── lib/          # Utilities
│   └── package.json
├── start.js              # Automation script
└── package.json          # Root package.json
```

## 🔧 Available Scripts

### Root
- `npm run dev` - Run both frontend and backend
- `npm run install:all` - Install all dependencies
- `npm run start` - Run the automation script

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🔐 Security Features

- JWT Access + Refresh Tokens
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation with Zod
- SQL injection prevention via Prisma

## 📝 License

MIT License

## 👤 Author

NEXORA Team
