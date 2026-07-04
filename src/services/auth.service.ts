import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { db } from '../db/client.js';
import { type Producer, producers } from '../db/schema/index.js';

export interface AuthTokenPayload {
  sub: string;
  username: string;
}

export interface PublicProducer {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export class AuthError extends Error {
  constructor(
    message: string,
    readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

function toPublic(producer: Producer): PublicProducer {
  return {
    id: producer.id,
    username: producer.username,
    displayName: producer.displayName,
    bio: producer.bio,
    avatarUrl: producer.avatarUrl,
    createdAt: producer.createdAt,
  };
}

export class AuthService {
  async register(input: {
    username: string;
    displayName: string;
    email: string;
    password: string;
  }): Promise<{ producer: PublicProducer; token: string }> {
    const username = input.username.trim().toLowerCase();
    const email = input.email.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,32}$/.test(username)) {
      throw new AuthError(
        'Username must be 3–32 characters: lowercase letters, numbers, underscores.',
      );
    }
    if (input.password.length < 8) {
      throw new AuthError('Password must be at least 8 characters.');
    }

    const existing = await db.query.producers.findFirst({
      where: eq(producers.username, username),
    });
    if (existing) {
      throw new AuthError('Username is already taken.', 409);
    }

    const emailTaken = await db.query.producers.findFirst({
      where: eq(producers.email, email),
    });
    if (emailTaken) {
      throw new AuthError('Email is already registered.', 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const [producer] = await db
      .insert(producers)
      .values({
        username,
        displayName: input.displayName.trim(),
        email,
        passwordHash,
      })
      .returning();

    if (!producer) {
      throw new AuthError('Failed to create producer', 500);
    }

    const token = this.signToken(producer);
    return { producer: toPublic(producer), token };
  }

  async login(input: {
    email: string;
    password: string;
  }): Promise<{ producer: PublicProducer; token: string }> {
    const email = input.email.trim().toLowerCase();
    const producer = await db.query.producers.findFirst({
      where: eq(producers.email, email),
    });

    if (!producer) {
      throw new AuthError('Invalid email or password.', 401);
    }

    const ok = await bcrypt.compare(input.password, producer.passwordHash);
    if (!ok) {
      throw new AuthError('Invalid email or password.', 401);
    }

    return { producer: toPublic(producer), token: this.signToken(producer) };
  }

  async getById(id: string): Promise<PublicProducer | null> {
    const producer = await db.query.producers.findFirst({
      where: eq(producers.id, id),
    });
    return producer ? toPublic(producer) : null;
  }

  async getByUsername(username: string): Promise<PublicProducer | null> {
    const producer = await db.query.producers.findFirst({
      where: eq(producers.username, username.toLowerCase()),
    });
    return producer ? toPublic(producer) : null;
  }

  signToken(producer: Producer): string {
    const payload: AuthTokenPayload = {
      sub: producer.id,
      username: producer.username,
    };
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  verifyToken(token: string): AuthTokenPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
    } catch {
      throw new AuthError('Invalid or expired token.', 401);
    }
  }
}

export const authService = new AuthService();
