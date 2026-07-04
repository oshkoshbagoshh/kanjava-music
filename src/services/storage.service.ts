import { createReadStream, existsSync, mkdirSync } from 'node:fs';
import { writeFile, readFile, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { Readable } from 'node:stream';
import { env } from '../config/env.js';

export interface StorageService {
  put(key: string, data: Buffer, contentType?: string): Promise<string>;
  get(key: string): Promise<Buffer>;
  getStream(key: string): Promise<Readable>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  /** Public or app-relative URL for serving the object. */
  publicUrl(key: string): string;
}

class LocalStorageService implements StorageService {
  private readonly root: string;

  constructor(root: string) {
    this.root = root;
    mkdirSync(join(root, 'originals'), { recursive: true });
    mkdirSync(join(root, 'previews'), { recursive: true });
    mkdirSync(join(root, 'waveforms'), { recursive: true });
  }

  private pathFor(key: string): string {
    return join(this.root, key);
  }

  async put(key: string, data: Buffer): Promise<string> {
    const fullPath = this.pathFor(key);
    mkdirSync(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, data);
    return key;
  }

  async get(key: string): Promise<Buffer> {
    return readFile(this.pathFor(key));
  }

  async getStream(key: string): Promise<Readable> {
    return createReadStream(this.pathFor(key));
  }

  async delete(key: string): Promise<void> {
    const fullPath = this.pathFor(key);
    if (existsSync(fullPath)) {
      await unlink(fullPath);
    }
  }

  async exists(key: string): Promise<boolean> {
    return existsSync(this.pathFor(key));
  }

  publicUrl(key: string): string {
    return `${env.APP_URL}/media/${key}`;
  }
}

/**
 * S3-compatible adapter stub. Phase 1 uses local storage by default.
 * Wire @aws-sdk/client-s3 when STORAGE_DRIVER=s3 credentials are present.
 */
class S3StorageService implements StorageService {
  async put(_key: string, _data: Buffer): Promise<string> {
    throw new Error('S3 storage is not configured. Set STORAGE_DRIVER=local for development.');
  }

  async get(_key: string): Promise<Buffer> {
    throw new Error('S3 storage is not configured.');
  }

  async getStream(_key: string): Promise<Readable> {
    throw new Error('S3 storage is not configured.');
  }

  async delete(_key: string): Promise<void> {
    throw new Error('S3 storage is not configured.');
  }

  async exists(_key: string): Promise<boolean> {
    return false;
  }

  publicUrl(key: string): string {
    if (env.S3_PUBLIC_URL) {
      return `${env.S3_PUBLIC_URL}/${key}`;
    }
    return `${env.APP_URL}/media/${key}`;
  }
}

export function createStorageService(): StorageService {
  if (env.STORAGE_DRIVER === 's3') {
    return new S3StorageService();
  }
  return new LocalStorageService(env.STORAGE_LOCAL_PATH);
}

export const storage = createStorageService();
