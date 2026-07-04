import { relations } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  primaryKey,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { resources } from './resources.js';

export const resourceTags = pgTable(
  'resource_tags',
  {
    resourceId: uuid('resource_id')
      .notNull()
      .references(() => resources.id, { onDelete: 'cascade' }),
    tag: varchar('tag', { length: 64 }).notNull(),
    weight: integer('weight').notNull().default(1),
  },
  (table) => [
    primaryKey({ columns: [table.resourceId, table.tag] }),
    index('resource_tags_tag_idx').on(table.tag),
  ],
);

export const resourceTagsRelations = relations(resourceTags, ({ one }) => ({
  resource: one(resources, {
    fields: [resourceTags.resourceId],
    references: [resources.id],
  }),
}));

export type ResourceTag = typeof resourceTags.$inferSelect;
export type NewResourceTag = typeof resourceTags.$inferInsert;
