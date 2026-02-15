import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { prisma } from '../index';
import { successResponse } from '../utils/apiResponse';

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await userService.getDashboardStats();
    return successResponse(res, stats, 'Dashboard stats fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getAllUsersAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, search, sort, order } = req.query;
    const result = await userService.getAllUsers({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
      search: search as string,
      sort: (sort as string) || 'createdAt',
      order: (order as 'asc' | 'desc') || 'desc'
    });
    return successResponse(res, result, 'Users fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const getUserByIdAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return successResponse(res, user, 'User fetched successfully');
  } catch (error) {
    next(error);
  }
};

export const updateUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    return successResponse(res, user, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, userId, action } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    const where: any = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: parseInt(limit as string) || 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true
            }
          }
        }
      }),
      prisma.auditLog.count({ where })
    ]);

    return successResponse(res, {
      logs,
      pagination: {
        page: parseInt(page as string) || 1,
        limit: parseInt(limit as string) || 10,
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    }, 'Audit logs fetched successfully');
  } catch (error) {
    next(error);
  }
};
