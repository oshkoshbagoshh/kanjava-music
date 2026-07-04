import { relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { downloads } from './downloads.js';
import { resources } from './resources.js';
import { uploadAgreements } from './upload-agreements.js';

export const producers = pgTable('producers', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  displayName: varchar('display_name', { length: 128 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const producersRelations = relations(producers, ({ many }) => ({
  resources: many(resources),
  downloads: many(downloads),
  uploadAgreements: many(uploadAgreements),
}));

export type Producer = typeof producers.$inferSelect;
export type NewProducer = typeof producers.$inferInsert;
