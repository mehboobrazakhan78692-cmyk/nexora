import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { successResponse, errorResponse } from '../utils/apiResponse';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.registerUser(req.body);
    return successResponse(
      res,
      result,
      'Registration successful. Please check your email to verify your account.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    return successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;
    const result = await authService.verifyEmail(token);
    return successResponse(res, result, 'Email verified successfully');
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return successResponse(res, result, 'If the email exists, a reset link will be sent');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    return successResponse(res, result, 'Password reset successfully');
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    return successResponse(res, result, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const result = await authService.logoutUser(userId);
    return successResponse(res, result, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    return successResponse(res, { user }, 'User fetched successfully');
  } catch (error) {
    next(error);
  }
};
