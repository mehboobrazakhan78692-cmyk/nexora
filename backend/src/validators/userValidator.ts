import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    phone: z.string().optional(),
    avatar: z.string().url().optional()
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']).optional()
  })
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID')
  })
});

export const paginationSchema = z.object({
  query: z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
    search: z.string().optional(),
    sort: z.string().optional().default('createdAt'),
    order: z.enum(['asc', 'desc']).optional().default('desc')
  })
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
export type UserIdInput = z.infer<typeof userIdSchema>['params'];
export type PaginationInput = z.infer<typeof paginationSchema>['query'];
