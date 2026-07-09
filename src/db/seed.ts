/**
 * Seed sample bundles from existing approved resources.
 * Genres are seeded in migration 0003_catalog_expansion.sql.
 */
import { desc, eq } from 'drizzle-orm';
import { config as loadDotenv } from 'dotenv';
import { db } from './client.js';
import { bundleItems, bundles } from './schema/bundles.js';
import { resources } from './schema/resources.js';

loadDotenv();

async function seedBundles(): Promise<void> {
  const approved = await db.query.resources.findMany({
    where: eq(resources.status, 'approved'),
    limit: 6,
    orderBy: [desc(resources.createdAt)],
  });

  if (approved.length < 2) {
    console.log('Skip bundle seed: need at least 2 approved resources.');
    return;
  }

  const existing = await db.query.bundles.findFirst({
    where: eq(bundles.slug, 'starter-production-pack'),
  });

  if (existing) {
    console.log('Bundles already seeded.');
    return;
  }

  const [starterBundle] = await db
    .insert(bundles)
    .values({
      slug: 'starter-production-pack',
      title: 'Starter Production Pack',
      description:
        'A curated selection of royalty-free samples and loops to kickstart your next track.',
      regularPriceCents: 2999,
      compareAtPriceCents: 5999,
      status: 'active',
    })
    .returning();

  if (!starterBundle) {
    throw new Error('Failed to create starter bundle');
  }

  const starterItems = approved.slice(0, Math.min(4, approved.length));
  await db.insert(bundleItems).values(
    starterItems.map((resource, index) => ({
      bundleId: starterBundle.id,
      resourceId: resource.id,
      sortOrder: index,
    })),
  );

  if (approved.length >= 4) {
    const [megaBundle] = await db
      .insert(bundles)
      .values({
        slug: 'producer-essentials-bundle',
        title: 'Producer Essentials Bundle',
        description:
          'Six hand-picked resources spanning loops, one-shots, and MIDI — built by producers, for producers.',
        regularPriceCents: 4999,
        compareAtPriceCents: 9999,
        status: 'active',
      })
      .returning();

    if (megaBundle) {
      await db.insert(bundleItems).values(
        approved.slice(0, 6).map((resource, index) => ({
          bundleId: megaBundle.id,
          resourceId: resource.id,
          sortOrder: index,
        })),
      );
    }
  }

  console.log('Seeded sample bundles.');
}

async function main(): Promise<void> {
  await seedBundles();
  console.log('Seed complete.');
  process.exit(0);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
