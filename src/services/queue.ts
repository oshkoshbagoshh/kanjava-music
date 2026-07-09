import { Queue } from 'bullmq';
import { env } from '../config/env.js';

export const PROCESS_RESOURCE_QUEUE = 'process-resource';

export interface ProcessResourceJob {
  resourceId: string;
  originalKey: string;
  /** Pre-uploaded preview for zip/MIDI when producer supplies companion audio. */
  companionPreviewKey?: string | null;
}

/** Shared BullMQ connection options (avoids ioredis version conflicts). */
export function getRedisConnectionOptions() {
  return {
    url: env.REDIS_URL,
    maxRetriesPerRequest: null as null,
  };
}

let processQueue: Queue<ProcessResourceJob> | null = null;

export function getProcessResourceQueue(): Queue<ProcessResourceJob> {
  if (!processQueue) {
    processQueue = new Queue<ProcessResourceJob>(PROCESS_RESOURCE_QUEUE, {
      connection: getRedisConnectionOptions(),
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 100,
        removeOnFail: 200,
      },
    });
  }
  return processQueue;
}

export async function enqueueProcessResource(job: ProcessResourceJob): Promise<void> {
  await getProcessResourceQueue().add('process', job);
}
