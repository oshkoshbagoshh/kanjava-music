import { Router } from 'express';
import { z } from 'zod';
import { AuthError, authService } from '../services/auth.service.js';
import { requireAuth, type AuthedRequest } from '../middleware/auth.js';

const registerSchema = z.object({
  username: z.string().min(3).max(32),
  displayName: z.string().min(1).max(128),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const body = registerSchema.parse(req.body);
    const result = await authService.register(body);
    res.cookie('token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.APP_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors[0]?.message ?? 'Invalid input' });
      return;
    }
    if (err instanceof AuthError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);
    const result = await authService.login(body);
    res.cookie('token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.APP_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.errors[0]?.message ?? 'Invalid input' });
      return;
    }
    if (err instanceof AuthError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    console.error(err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

authRouter.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

authRouter.get('/me', requireAuth, async (req: AuthedRequest, res) => {
  const producer = await authService.getById(req.producerId!);
  if (!producer) {
    res.status(401).json({ error: 'Producer not found.' });
    return;
  }
  res.json({ producer });
});
