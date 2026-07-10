import type { DawType, ResourceType } from '../db/schema/index.js';

const ZIP_TYPES: ResourceType[] = ['daw_template', 'sample_pack'];
const ZIP_REQUIRED_PREVIEW_TYPES: ResourceType[] = ['daw_template', 'sample_pack'];

export function isZipFilename(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.endsWith('.zip');
}

export function isAudioPreviewFile(filename: string, mimetype: string): boolean {
  const lower = filename.toLowerCase();
  return (
    mimetype.startsWith('audio/') ||
    ['.mp3', '.wav', '.aiff', '.aif', '.flac', '.m4a'].includes(
      lower.slice(lower.lastIndexOf('.')),
    )
  );
}

export interface UploadMetaInput {
  type: ResourceType;
  daw?: DawType;
  genres: string[];
  fileOriginalname: string;
  hasPreviewFile: boolean;
  previewOriginalname?: string;
  previewMimetype?: string;
}

export function validateUploadMeta(input: UploadMetaInput): string | null {
  if (input.genres.length === 0) {
    return 'At least one genre is required.';
  }

  const daw = input.daw ?? 'not_applicable';
  if (input.type === 'daw_template' && daw === 'not_applicable') {
    return 'DAW is required for DAW template uploads.';
  }

  const fileIsZip = isZipFilename(input.fileOriginalname);
  if (ZIP_TYPES.includes(input.type) && !fileIsZip) {
    return `${input.type} uploads must be a .zip file.`;
  }

  if (
    fileIsZip &&
    ZIP_REQUIRED_PREVIEW_TYPES.includes(input.type) &&
    !input.hasPreviewFile
  ) {
    return 'Preview audio is required for zip uploads (DAW templates and sample packs).';
  }

  if (
    input.hasPreviewFile &&
    input.previewOriginalname &&
    input.previewMimetype &&
    !isAudioPreviewFile(input.previewOriginalname, input.previewMimetype)
  ) {
    return 'Preview file must be an audio file.';
  }

  return null;
}
