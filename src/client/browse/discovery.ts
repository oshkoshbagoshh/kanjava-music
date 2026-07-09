export interface GenreOption {
  slug: string;
  name: string;
  resourceCount: number;
}

export interface CatalogFormat {
  id: string;
  title: string;
  description: string;
}

export interface BundleSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  regularPriceCents: number;
  compareAtPriceCents: number | null;
  itemCount: number;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export async function loadGenres(): Promise<GenreOption[]> {
  const res = await fetch('/api/genres');
  if (!res.ok) return [];
  const data = (await res.json()) as { genres: GenreOption[] };
  return data.genres;
}

export async function loadFormats(): Promise<CatalogFormat[]> {
  const res = await fetch('/api/catalog/formats');
  if (!res.ok) return [];
  const data = (await res.json()) as { formats: CatalogFormat[] };
  return data.formats;
}

export async function loadBundles(): Promise<BundleSummary[]> {
  const res = await fetch('/api/bundles');
  if (!res.ok) return [];
  const data = (await res.json()) as { bundles: BundleSummary[] };
  return data.bundles;
}

export function renderGenreChips(
  container: HTMLElement,
  genres: GenreOption[],
  onSelect: (slug: string) => void,
): void {
  container.replaceChildren();
  const heading = document.createElement('h2');
  heading.className = 'discovery__heading';
  heading.textContent = 'Browse by Genre';
  container.appendChild(heading);

  const row = document.createElement('div');
  row.className = 'genre-chips';
  for (const genre of genres) {
    if (genre.resourceCount === 0) continue;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'genre-chip';
    btn.textContent = genre.name;
    btn.title = `${genre.resourceCount} resources`;
    btn.addEventListener('click', () => onSelect(genre.slug));
    row.appendChild(btn);
  }
  container.appendChild(row);
}

export function renderFormatCards(
  container: HTMLElement,
  formats: CatalogFormat[],
  onSelect: (formatId: string) => void,
): void {
  container.replaceChildren();
  const heading = document.createElement('h2');
  heading.className = 'discovery__heading';
  heading.textContent = 'Production Assets';
  container.appendChild(heading);

  const sub = document.createElement('p');
  sub.className = 'discovery__sub';
  sub.textContent = 'Built by producers. For producers.';
  container.appendChild(sub);

  const grid = document.createElement('div');
  grid.className = 'format-cards';
  for (const format of formats) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'format-card';
    card.innerHTML = `
      <span class="format-card__title"></span>
      <span class="format-card__desc"></span>
    `;
    card.querySelector('.format-card__title')!.textContent = format.title;
    card.querySelector('.format-card__desc')!.textContent = format.description;
    card.addEventListener('click', () => onSelect(format.id));
    grid.appendChild(card);
  }
  container.appendChild(grid);
}

export function renderBundleStrip(
  container: HTMLElement,
  bundles: BundleSummary[],
): void {
  container.replaceChildren();
  if (bundles.length === 0) {
    container.hidden = true;
    return;
  }
  container.hidden = false;

  const heading = document.createElement('h2');
  heading.className = 'discovery__heading';
  heading.textContent = 'Bundles';
  container.appendChild(heading);

  const row = document.createElement('div');
  row.className = 'bundle-strip';
  for (const bundle of bundles) {
    const card = document.createElement('article');
    card.className = 'bundle-card';
    const savings =
      bundle.compareAtPriceCents && bundle.compareAtPriceCents > bundle.regularPriceCents
        ? Math.round(
            (1 - bundle.regularPriceCents / bundle.compareAtPriceCents) * 100,
          )
        : null;

    card.innerHTML = `
      <h3 class="bundle-card__title"></h3>
      <p class="bundle-card__desc"></p>
      <p class="bundle-card__meta"></p>
      <p class="bundle-card__price">
        <span class="bundle-card__compare"></span>
        <span class="bundle-card__current"></span>
        <span class="bundle-card__save"></span>
      </p>
    `;
    card.querySelector('.bundle-card__title')!.textContent = bundle.title;
    card.querySelector('.bundle-card__desc')!.textContent =
      bundle.description ?? '';
    card.querySelector('.bundle-card__meta')!.textContent =
      `${bundle.itemCount} item${bundle.itemCount === 1 ? '' : 's'}`;

    const compareEl = card.querySelector('.bundle-card__compare') as HTMLElement;
    const currentEl = card.querySelector('.bundle-card__current') as HTMLElement;
    const saveEl = card.querySelector('.bundle-card__save') as HTMLElement;
    currentEl.textContent = formatPrice(bundle.regularPriceCents);
    if (bundle.compareAtPriceCents) {
      compareEl.textContent = formatPrice(bundle.compareAtPriceCents);
      compareEl.classList.add('bundle-card__compare--struck');
    }
    if (savings) {
      saveEl.textContent = `Save ${savings}%`;
    }

    row.appendChild(card);
  }
  container.appendChild(row);
}

export function renderGenreCheckboxes(
  container: HTMLElement,
  genres: GenreOption[],
): void {
  container.replaceChildren();
  for (const genre of genres) {
    const label = document.createElement('label');
    label.className = 'checkbox genre-checkbox';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'genre';
    input.value = genre.slug;
    label.appendChild(input);
    label.append(`${genre.name}`);
    container.appendChild(label);
  }
}
