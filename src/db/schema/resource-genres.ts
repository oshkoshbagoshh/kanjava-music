import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core';
import { genres } from './genres.js';
import { resources } from './resources.js';

export const resourceGenres = pgTable(
  'resource_genres',
  {
    resourceId: uuid('resource_id')
      .notNull()
      .references(() => resources.id, { onDelete: 'cascade' }),
    genreSlug: varchar('genre_slug', { length: 64 })
      .notNull()
      .references(() => genres.slug, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.resourceId, table.genreSlug] })],
);

export const resourceGenresRelations = relations(resourceGenres, ({ one }) => ({
  resource: one(resources, {
    fields: [resourceGenres.resourceId],
    references: [resources.id],
  }),
  genre: one(genres, {
    fields: [resourceGenres.genreSlug],
    references: [genres.slug],
  }),
}));

export type ResourceGenre = typeof resourceGenres.$inferSelect;
export type NewResourceGenre = typeof resourceGenres.$inferInsert;
