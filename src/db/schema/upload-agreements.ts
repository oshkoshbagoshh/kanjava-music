import { relations } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { producers } from './producers.js';
import { resources } from './resources.js';

export const uploadAgreements = pgTable('upload_agreements', {
  id: uuid('id').defaultRandom().primaryKey(),
  producerId: uuid('producer_id')
    .notNull()
    .references(() => producers.id, { onDelete: 'cascade' }),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resources.id, { onDelete: 'cascade' }),
  agreementVersion: varchar('agreement_version', { length: 32 }).notNull(),
  acceptedAt: timestamp('accepted_at', { withTimezone: true }).defaultNow().notNull(),
});

export const uploadAgreementsRelations = relations(uploadAgreements, ({ one }) => ({
  producer: one(producers, {
    fields: [uploadAgreements.producerId],
    references: [producers.id],
  }),
  resource: one(resources, {
    fields: [uploadAgreements.resourceId],
    references: [resources.id],
  }),
}));

export type UploadAgreement = typeof uploadAgreements.$inferSelect;
export type NewUploadAgreement = typeof uploadAgreements.$inferInsert;
