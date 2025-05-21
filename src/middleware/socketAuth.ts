import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { envConfig } from '@/config/env.config';

export const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET!);
    (socket as any).user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
};
