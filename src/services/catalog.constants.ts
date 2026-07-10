import type { DawType, ResourceType } from '../db/schema/index.js';

/** Homepage category cards → resource type filter. */
export const CATALOG_FORMATS = [
  {
    id: 'templates',
    title: 'DAW Templates',
    description: 'Production-ready project files. Open, learn, and remix complete tracks.',
    types: ['daw_template'] as ResourceType[],
  },
  {
    id: 'stems',
    title: 'Audio Stems',
    description: 'Individual track layers — drums, bass, synths, FX. Perfect for remixing.',
    types: ['stem'] as ResourceType[],
  },
  {
    id: 'midi',
    title: 'MIDI Files',
    description: 'Drag-and-drop MIDI patterns. Melodies, chords, bass lines, and drum grooves.',
    types: ['midi'] as ResourceType[],
  },
  {
    id: 'packs',
    title: 'Sample Packs',
    description: 'Drums, loops, one-shots, and textures. Curated for electronic production.',
    types: ['sample_pack', 'sample', 'loop', 'one_shot'] as ResourceType[],
  },
  {
    id: 'vocals',
    title: 'Vocal Packs',
    description: 'Vocal loops, chops, and ad-libs. Ready to layer into your mix.',
    types: ['vocal_pack'] as ResourceType[],
  },
  {
    id: 'presets',
    title: 'Synth Presets',
    description: 'Synth presets and effects banks for your favorite plugins.',
    types: ['preset'] as ResourceType[],
  },
] as const;

export type CatalogFormatId = (typeof CATALOG_FORMATS)[number]['id'];

const FORMAT_MAP = new Map<CatalogFormatId, ResourceType[]>(
  CATALOG_FORMATS.map((f) => [f.id, [...f.types]]),
);

export function resolveFormatTypes(format: string): ResourceType[] | undefined {
  if (FORMAT_MAP.has(format as CatalogFormatId)) {
    return FORMAT_MAP.get(format as CatalogFormatId);
  }
  return undefined;
}

export const DAW_LABELS: Record<DawType, string> = {
  ableton_live: 'Ableton Live',
  logic_pro: 'Logic Pro',
  fl_studio: 'FL Studio',
  cubase: 'Cubase',
  studio_one: 'Studio One',
  bitwig: 'Bitwig',
  multi_daw: 'Multi-DAW',
  not_applicable: '',
};

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  sample: 'Sample',
  loop: 'Loop',
  midi: 'MIDI',
  preset: 'Preset',
  one_shot: 'One-shot',
  daw_template: 'DAW Template',
  stem: 'Stem',
  sample_pack: 'Sample Pack',
  vocal_pack: 'Vocal Pack',
};
