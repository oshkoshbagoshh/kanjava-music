import { relations } from 'drizzle-orm';
import {
  jsonb,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { producers } from './producers.js';
import { resources } from './resources.js';

export const downloads = pgTable('downloads', {
  id: uuid('id').defaultRandom().primaryKey(),
  resourceId: uuid('resource_id')
    .notNull()
    .references(() => resources.id, { onDelete: 'cascade' }),
  downloaderId: uuid('downloader_id').references(() => producers.id, {
    onDelete: 'set null',
  }),
  licenseSnapshotJson: jsonb('license_snapshot_json').notNull(),
  downloadedAt: timestamp('downloaded_at', { withTimezone: true }).defaultNow().notNull(),
});

export const downloadsRelations = relations(downloads, ({ one }) => ({
  resource: one(resources, {
    fields: [downloads.resourceId],
    references: [resources.id],
  }),
  downloader: one(producers, {
    fields: [downloads.downloaderId],
    references: [producers.id],
  }),
}));

export type Download = typeof downloads.$inferSelect;
export type NewDownload = typeof downloads.$inferInsert;

export interface LicenseSnapshot {
  resourceId: string;
  title: string;
  licenseType: string;
  producerId: string;
  producerUsername: string;
  priceCents: number | null;
  agreementVersion: string;
  termsSummary: string;
  capturedAt: string;
}
