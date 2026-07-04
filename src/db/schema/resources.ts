import { relations } from 'drizzle-orm';
import {
  customType,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { downloads } from './downloads.js';
import { producers } from './producers.js';
import { resourceTags } from './resource-tags.js';
import { uploadAgreements } from './upload-agreements.js';

export const resourceTypeEnum = pgEnum('resource_type', [
  'sample',
  'loop',
  'midi',
  'preset',
  'one_shot',
]);

export const licenseTypeEnum = pgEnum('license_type', [
  'royalty_free_standard',
  'royalty_free_exclusive',
  'cc0',
  'cc_by',
]);

export const resourceStatusEnum = pgEnum('resource_status', [
  'pending',
  'approved',
  'rejected',
]);

/** Postgres tsvector — maintained by trigger, not written from app code. */
const tsvector = customType<{ data: string }>({
  dataType() {
    return 'tsvector';
  },
});

export const resources = pgTable(
  'resources',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    producerId: uuid('producer_id')
      .notNull()
      .references(() => producers.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    type: resourceTypeEnum('type').notNull(),
    fileUrl: text('file_url').notNull(),
    fileHash: varchar('file_hash', { length: 64 }).notNull(),
    previewUrl: text('preview_url'),
    waveformJsonUrl: text('waveform_json_url'),
    durationMs: integer('duration_ms'),
    bpm: integer('bpm'),
    musicalKey: varchar('musical_key', { length: 8 }),
    licenseType: licenseTypeEnum('license_type').notNull().default('royalty_free_standard'),
    priceCents: integer('price_cents'),
    downloadCount: integer('download_count').notNull().default(0),
    playCount: integer('play_count').notNull().default(0),
    fingerprintHash: varchar('fingerprint_hash', { length: 128 }),
    status: resourceStatusEnum('status').notNull().default('pending'),
    searchVector: tsvector('search_vector'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('resources_status_created_idx').on(table.status, table.createdAt),
    index('resources_bpm_idx').on(table.bpm),
    index('resources_musical_key_idx').on(table.musicalKey),
    index('resources_type_idx').on(table.type),
    index('resources_producer_id_idx').on(table.producerId),
    index('resources_file_hash_idx').on(table.fileHash),
    index('resources_search_vector_idx').using('gin', table.searchVector),
    // title gin_trgm_ops index is created in SQL migration 0001_init.sql
  ],
);

export const resourcesRelations = relations(resources, ({ one, many }) => ({
  producer: one(producers, {
    fields: [resources.producerId],
    references: [producers.id],
  }),
  tags: many(resourceTags),
  downloads: many(downloads),
  uploadAgreements: many(uploadAgreements),
}));

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
export type ResourceType = (typeof resourceTypeEnum.enumValues)[number];
export type LicenseType = (typeof licenseTypeEnum.enumValues)[number];
export type ResourceStatus = (typeof resourceStatusEnum.enumValues)[number];
