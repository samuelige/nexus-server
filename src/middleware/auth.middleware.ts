import { envConfig } from '@/config/env.config';
import { AuthenticatedRequest } from '@/interface/auth';
import { UserPayload } from '@/types/express/userPayload';
import { UnauthenticatedError } from '@/utils/errors';
import { NextFunction, Response, Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, envConfig.JWT_SECRET as string) as UserPayload;
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

export const roleMiddleware = (role: 'user' | 'admin') => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};
