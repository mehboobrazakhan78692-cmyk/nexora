import { prisma } from '../index';
import { AppError } from '../middleware/error';
import { hashPassword } from '../utils/password';

export const getAllUsers = async (options: {
  page: number;
  limit: number;
  search?: string;
  sort: string;
  order: 'asc' | 'desc';
}) => {
  const { page, limit, search, sort, order } = options;
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' as const } },
          { firstName: { contains: search, mode: 'insensitive' as const } },
          { lastName: { contains: search, mode: 'insensitive' as const } }
        ]
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sort]: order },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        isEmailVerified: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    prisma.user.count({ where })
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      status: true,
      isEmailVerified: true,
      phone: true,
      avatar: true,
      lastLogin: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUser = async (id: string, data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      status: true,
      isEmailVerified: true,
      phone: true,
      avatar: true,
      updatedAt: true
    }
  });

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  await prisma.user.delete({
    where: { id }
  });

  return { message: 'User deleted successfully' };
};

export const updateProfile = async (id: string, data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      avatar: true,
      updatedAt: true
    }
  });

  return updatedUser;
};

export const getDashboardStats = async () => {
  const [
    totalUsers,
    activeUsers,
    adminUsers,
    newUsersThisMonth
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: 'ACTIVE' } }),
    prisma.user.count({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } } }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(1))
        }
      }
    })
  ]);

  return {
    totalUsers,
    activeUsers,
    adminUsers,
    newUsersThisMonth
  };
};
