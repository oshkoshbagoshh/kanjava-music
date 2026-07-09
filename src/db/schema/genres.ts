import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { resourceGenres } from './resource-genres.js';

export const genres = pgTable('genres', {
  slug: varchar('slug', { length: 64 }).primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const genresRelations = relations(genres, ({ many }) => ({
  resourceGenres: many(resourceGenres),
}));

export type Genre = typeof genres.$inferSelect;
export type NewGenre = typeof genres.$inferInsert;
