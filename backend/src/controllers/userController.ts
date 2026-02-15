import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { successResponse } from '../utils/apiResponse';

export const getAllUsers = async (
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

export const getUserById = async (
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

export const updateUser = async (
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

export const deleteUser = async (
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

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const user = await userService.updateProfile(userId, req.body);
    return successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const user = await userService.getUserById(userId);
    return successResponse(res, user, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
};
