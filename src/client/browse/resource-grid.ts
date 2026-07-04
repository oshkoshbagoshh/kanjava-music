import { createResourceCard, type ResourceCardData } from './resource-card.js';

export interface SearchParams {
  q?: string;
  type?: string;
  bpm_min?: string;
  bpm_max?: string;
  key?: string;
  license_type?: string;
  tags?: string;
}

export async function fetchResources(
  params: SearchParams,
): Promise<ResourceCardData[]> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) qs.set(k, v);
  }
  const res = await fetch(`/api/resources?${qs.toString()}`);
  if (!res.ok) throw new Error('Search failed');
  const data = (await res.json()) as { results: ResourceCardData[] };
  return data.results;
}

export function renderResourceGrid(
  container: HTMLElement,
  resources: ResourceCardData[],
): void {
  container.replaceChildren();

  if (resources.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No royalty-free resources match your filters.';
    container.appendChild(empty);
    return;
  }

  for (const resource of resources) {
    container.appendChild(createResourceCard(resource));
  }
}
