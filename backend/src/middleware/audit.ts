import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';

export const auditLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Store original send
  const originalSend = res.send;
  
  res.send = function (body: any) {
    // Only log important endpoints
    if (req.path.startsWith('/api/')) {
      const auditData = {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      };
      
      // Don't await - fire and forget
      if (req.user) {
        prisma.auditLog.create({
          data: {
            userId: req.user.id,
            action: req.method === 'POST' ? 'CREATE' : 
                    req.method === 'PUT' || req.method === 'PATCH' ? 'UPDATE' :
                    req.method === 'DELETE' ? 'DELETE' : 'LOGIN',
            entity: req.path.split('/')[2] || 'unknown',
            details: auditData,
            ipAddress: req.ip || undefined,
            userAgent: req.headers['user-agent'] || undefined
          }
        }).catch(console.error);
      }
    }
    
    return originalSend.call(this, body);
  };

  next();
};

// Extend Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}
