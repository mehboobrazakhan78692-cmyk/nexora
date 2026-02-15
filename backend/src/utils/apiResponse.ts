import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    error
  });
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Resource created successfully'
): Response => {
  return successResponse(res, data, message, 201);
};

export const noContentResponse = (res: Response): Response => {
  return res.status(204).json();
};

export const unauthorizedResponse = (
  res: Response,
  message: string = 'Unauthorized'
): Response => {
  return errorResponse(res, message, 401);
};

export const forbiddenResponse = (
  res: Response,
  message: string = 'Forbidden'
): Response => {
  return errorResponse(res, message, 403);
};

export const notFoundResponse = (
  res: Response,
  message: string = 'Resource not found'
): Response => {
  return errorResponse(res, message, 404);
};

export const validationErrorResponse = (
  res: Response,
  message: string = 'Validation error'
): Response => {
  return errorResponse(res, message, 400);
};
