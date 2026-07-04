/**
 * Single global preview player — one active source at a time.
 * Never receives original file URLs; only preview encodes.
 */

import { resumeAudioContext } from './audio-context.js';

type PlayerEvent = 'play' | 'stop' | 'error' | 'ended';
type Listener = (resourceId: string | null) => void;

class PreviewPlayer {
  private source: AudioBufferSourceNode | null = null;
  private currentId: string | null = null;
  private listeners = new Map<PlayerEvent, Set<Listener>>();
  private bufferCache = new Map<string, AudioBuffer>();

  on(event: PlayerEvent, fn: Listener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(fn);
    return () => this.listeners.get(event)?.delete(fn);
  }

  private emit(event: PlayerEvent): void {
    this.listeners.get(event)?.forEach((fn) => fn(this.currentId));
  }

  get isPlaying(): boolean {
    return this.source !== null;
  }

  get playingId(): string | null {
    return this.currentId;
  }

  async play(resourceId: string, previewUrl: string): Promise<void> {
    if (this.currentId === resourceId && this.source) {
      this.stop();
      return;
    }

    this.stop();

    const audioCtx = await resumeAudioContext();
    let buffer = this.bufferCache.get(previewUrl);

    if (!buffer) {
      const response = await fetch(previewUrl);
      if (!response.ok) {
        this.emit('error');
        throw new Error('Failed to load preview');
      }
      const arrayBuffer = await response.arrayBuffer();
      buffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
      this.bufferCache.set(previewUrl, buffer);
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.onended = () => {
      if (this.source === source) {
        this.source = null;
        this.currentId = null;
        this.emit('ended');
      }
    };

    this.source = source;
    this.currentId = resourceId;
    source.start(0);
    this.emit('play');

    // Fire-and-forget play count
    void fetch(`/api/resources/${resourceId}/play`, { method: 'POST' });
  }

  stop(): void {
    if (this.source) {
      try {
        this.source.stop();
      } catch {
        // already stopped
      }
      this.source.disconnect();
      this.source = null;
    }
    const wasPlaying = this.currentId !== null;
    this.currentId = null;
    if (wasPlaying) {
      this.emit('stop');
    }
  }
}

export const previewPlayer = new PreviewPlayer();
