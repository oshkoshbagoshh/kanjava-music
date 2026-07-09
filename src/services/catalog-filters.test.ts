import { describe, expect, it } from 'vitest';
import {
  parseBpm,
  parseDawType,
  parseFormat,
  parseGenres,
  parseResourceType,
  parseSearchQuery,
  parseTags,
} from './catalog-filters.js';
import { validateUploadMeta } from './upload-validation.js';

describe('catalog filter parsers', () => {
  it('parses comma-separated tags', () => {
    expect(parseTags('Techno, Acid, ')).toEqual(['techno', 'acid']);
  });

  it('parses genre slugs', () => {
    expect(parseGenres('house, melodic_techno')).toEqual(['house', 'melodic_techno']);
    expect(parseGenres(['trance', 'house'])).toEqual(['trance', 'house']);
  });

  it('parses bpm bounds', () => {
    expect(parseBpm('128')).toBe(128);
    expect(parseBpm('')).toBeUndefined();
    expect(parseBpm('nope')).toBeUndefined();
  });

  it('parses resource and daw types', () => {
    expect(parseResourceType('daw_template')).toBe('daw_template');
    expect(parseResourceType('invalid')).toBeUndefined();
    expect(parseDawType('ableton_live')).toBe('ableton_live');
    expect(parseDawType('pro_tools')).toBeUndefined();
  });

  it('resolves format aliases to type groups', () => {
    expect(parseFormat('templates')).toEqual(['daw_template']);
    expect(parseFormat('packs')).toContain('sample_pack');
    expect(parseFormat('unknown')).toBeUndefined();
  });

  it('builds search query with genre and format', () => {
    const filters = parseSearchQuery({
      q: 'kick',
      genre: 'house',
      format: 'stems',
      daw: 'ableton_live',
    });
    expect(filters.q).toBe('kick');
    expect(filters.genres).toEqual(['house']);
    expect(filters.types).toEqual(['stem']);
    expect(filters.daw).toBe('ableton_live');
    expect(filters.type).toBeUndefined();
  });
});

describe('upload validation', () => {
  it('requires genres', () => {
    expect(
      validateUploadMeta({
        type: 'sample',
        genres: [],
        fileOriginalname: 'kick.wav',
        hasPreviewFile: false,
      }),
    ).toBe('At least one genre is required.');
  });

  it('requires DAW for templates', () => {
    expect(
      validateUploadMeta({
        type: 'daw_template',
        genres: ['house'],
        fileOriginalname: 'project.zip',
        hasPreviewFile: true,
        previewOriginalname: 'preview.mp3',
        previewMimetype: 'audio/mpeg',
      }),
    ).toBe('DAW is required for DAW template uploads.');
  });

  it('requires zip for sample packs', () => {
    expect(
      validateUploadMeta({
        type: 'sample_pack',
        genres: ['techno'],
        fileOriginalname: 'pack.wav',
        hasPreviewFile: false,
      }),
    ).toBe('sample_pack uploads must be a .zip file.');
  });

  it('requires preview audio for zip templates', () => {
    expect(
      validateUploadMeta({
        type: 'daw_template',
        daw: 'ableton_live',
        genres: ['house'],
        fileOriginalname: 'template.zip',
        hasPreviewFile: false,
      }),
    ).toBe(
      'Preview audio is required for zip uploads (DAW templates and sample packs).',
    );
  });

  it('accepts valid template upload meta', () => {
    expect(
      validateUploadMeta({
        type: 'daw_template',
        daw: 'logic_pro',
        genres: ['trance'],
        fileOriginalname: 'track.zip',
        hasPreviewFile: true,
        previewOriginalname: 'demo.mp3',
        previewMimetype: 'audio/mpeg',
      }),
    ).toBeNull();
  });
});
