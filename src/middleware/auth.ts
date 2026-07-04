import type { NextFunction, Request, Response } from 'express';
import { AuthError, authService } from '../services/auth.service.js';

export interface AuthedRequest extends Request {
  producerId?: string;
  username?: string;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  try {
    const header = req.headers.authorization;
    const cookieToken = req.cookies?.token as string | undefined;
    const token = header?.startsWith('Bearer ')
      ? header.slice(7)
      : cookieToken;

    if (!token) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    const payload = authService.verifyToken(token);
    req.producerId = payload.sub;
    req.username = payload.username;
    next();
  } catch (err) {
    if (err instanceof AuthError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    res.status(401).json({ error: 'Authentication required.' });
  }
}

export function optionalAuth(req: AuthedRequest, _res: Response, next: NextFunction): void {
  try {
    const header = req.headers.authorization;
    const cookieToken = req.cookies?.token as string | undefined;
    const token = header?.startsWith('Bearer ')
      ? header.slice(7)
      : cookieToken;

    if (token) {
      const payload = authService.verifyToken(token);
      req.producerId = payload.sub;
      req.username = payload.username;
    }
  } catch {
    // ignore invalid optional token
  }
  next();
}
