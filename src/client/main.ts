import {
  loadBundles,
  loadFormats,
  loadGenres,
  renderBundleStrip,
  renderFormatCards,
  renderGenreCheckboxes,
  renderGenreChips,
} from './browse/discovery.js';
import type { ResourceCardData } from './browse/resource-card.js';
import {
  fetchResources,
  renderResourceGrid,
  type SearchParams,
} from './browse/resource-grid.js';

interface Producer {
  id: string;
  username: string;
  displayName: string;
}

let currentUser: Producer | null = null;

async function refreshAuth(): Promise<void> {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (!res.ok) {
      currentUser = null;
    } else {
      const data = (await res.json()) as { producer: Producer };
      currentUser = data.producer;
    }
  } catch {
    currentUser = null;
  }
  updateAuthUi();
}

function updateAuthUi(): void {
  const authStatus = document.getElementById('auth-status');
  const uploadSection = document.getElementById('upload-section');
  const authForms = document.getElementById('auth-forms');

  if (authStatus) {
    authStatus.textContent = currentUser
      ? `Signed in as ${currentUser.displayName}`
      : 'Not signed in';
  }
  if (uploadSection) {
    uploadSection.hidden = !currentUser;
  }
  if (authForms) {
    authForms.hidden = !!currentUser;
  }
}

function readSearchParams(): SearchParams {
  return {
    q: (document.getElementById('q') as HTMLInputElement)?.value || undefined,
    type: (document.getElementById('type') as HTMLSelectElement)?.value || undefined,
    format: (document.getElementById('format') as HTMLInputElement)?.value || undefined,
    bpm_min:
      (document.getElementById('bpm_min') as HTMLInputElement)?.value || undefined,
    bpm_max:
      (document.getElementById('bpm_max') as HTMLInputElement)?.value || undefined,
    key: (document.getElementById('key') as HTMLInputElement)?.value || undefined,
    license_type:
      (document.getElementById('license_type') as HTMLSelectElement)?.value ||
      undefined,
    tags: (document.getElementById('tags') as HTMLInputElement)?.value || undefined,
    genre: (document.getElementById('genre') as HTMLSelectElement)?.value || undefined,
    daw: (document.getElementById('daw') as HTMLSelectElement)?.value || undefined,
  };
}

function applyGenreFilter(slug: string): void {
  const genreSelect = document.getElementById('genre') as HTMLSelectElement | null;
  const formatInput = document.getElementById('format') as HTMLInputElement | null;
  if (genreSelect) genreSelect.value = slug;
  if (formatInput) formatInput.value = '';
  document.getElementById('resource-grid')?.scrollIntoView({ behavior: 'smooth' });
  void runSearch();
}

function applyFormatFilter(formatId: string): void {
  const formatInput = document.getElementById('format') as HTMLInputElement | null;
  const typeSelect = document.getElementById('type') as HTMLSelectElement | null;
  if (formatInput) formatInput.value = formatId;
  if (typeSelect) typeSelect.value = '';
  document.getElementById('resource-grid')?.scrollIntoView({ behavior: 'smooth' });
  void runSearch();
}

async function runSearch(): Promise<void> {
  const grid = document.getElementById('resource-grid');
  const status = document.getElementById('search-status');
  if (!grid) return;

  if (status) status.textContent = 'Searching…';
  try {
    const results = await fetchResources(readSearchParams());
    renderResourceGrid(grid, results);
    if (status) {
      status.textContent = `${results.length} royalty-free resource${results.length === 1 ? '' : 's'}`;
    }
  } catch {
    if (status) status.textContent = 'Search failed.';
  }
}

function bindSearch(): void {
  const form = document.getElementById('search-form') as HTMLFormElement | null;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    void runSearch();
  });

  document.getElementById('clear-filters')?.addEventListener('click', () => {
    form?.reset();
    const formatInput = document.getElementById('format') as HTMLInputElement | null;
    if (formatInput) formatInput.value = '';
    void runSearch();
  });
}

function bindAuth(): void {
  const registerForm = document.getElementById(
    'register-form',
  ) as HTMLFormElement | null;
  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(registerForm);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: fd.get('username'),
        displayName: fd.get('displayName'),
        email: fd.get('email'),
        password: fd.get('password'),
      }),
    });
    const data = (await res.json()) as { error?: string };
    const msg = document.getElementById('auth-message');
    if (!res.ok) {
      if (msg) msg.textContent = data.error ?? 'Registration failed';
      return;
    }
    if (msg) msg.textContent = 'Account created.';
    await refreshAuth();
  });

  const loginForm = document.getElementById('login-form') as HTMLFormElement | null;
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: fd.get('email'),
        password: fd.get('password'),
      }),
    });
    const data = (await res.json()) as { error?: string };
    const msg = document.getElementById('auth-message');
    if (!res.ok) {
      if (msg) msg.textContent = data.error ?? 'Login failed';
      return;
    }
    if (msg) msg.textContent = 'Signed in.';
    await refreshAuth();
  });

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    await refreshAuth();
  });
}

function updateUploadConditionalFields(): void {
  const typeSelect = document.getElementById('upload-type') as HTMLSelectElement | null;
  const dawField = document.getElementById('daw-field');
  const dawSelect = document.getElementById('upload-daw') as HTMLSelectElement | null;
  const previewField = document.getElementById('preview-file-field');
  const previewInput = document.getElementById('upload-preview') as HTMLInputElement | null;
  const fileInput = document.getElementById('upload-file') as HTMLInputElement | null;

  const type = typeSelect?.value ?? '';
  const fileName = fileInput?.files?.[0]?.name?.toLowerCase() ?? '';
  const isZip = fileName.endsWith('.zip');
  const showDaw = type === 'daw_template';

  if (dawField) {
    dawField.hidden = !showDaw;
  }
  if (dawSelect) {
    dawSelect.disabled = !showDaw;
    if (!showDaw) dawSelect.value = '';
  }

  const needsPreview =
    type === 'daw_template' || type === 'sample_pack' || isZip;
  if (previewField) {
    previewField.hidden = !needsPreview;
  }
  if (previewInput) {
    previewInput.required = needsPreview;
  }
}

function bindUpload(): void {
  const typeSelect = document.getElementById('upload-type');
  const fileInput = document.getElementById('upload-file');
  typeSelect?.addEventListener('change', updateUploadConditionalFields);
  fileInput?.addEventListener('change', updateUploadConditionalFields);

  const form = document.getElementById('upload-form') as HTMLFormElement | null;
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('upload-message');
    if (!currentUser) {
      if (msg) msg.textContent = 'Sign in to upload.';
      return;
    }

    const fd = new FormData(form);
    if (!fd.get('agreementAccepted')) {
      if (msg) msg.textContent = 'You must accept the producer agreement.';
      return;
    }

    if (fd.get('type') !== 'daw_template') {
      fd.delete('daw');
    } else if (!fd.get('daw')) {
      if (msg) msg.textContent = 'Select a DAW for template uploads.';
      return;
    }

    const genreBoxes = form.querySelectorAll<HTMLInputElement>(
      'input[name="genre"]:checked',
    );
    if (genreBoxes.length === 0) {
      if (msg) msg.textContent = 'Select at least one genre.';
      return;
    }
    fd.set('agreementAccepted', 'true');
    fd.set('genres', Array.from(genreBoxes).map((el) => el.value).join(','));

    if (msg) msg.textContent = 'Uploading…';
    const res = await fetch('/api/resources', {
      method: 'POST',
      credentials: 'include',
      body: fd,
    });
    const data = (await res.json()) as { error?: string; resource?: { id: string } };
    if (!res.ok) {
      if (msg) msg.textContent = data.error ?? 'Upload failed';
      return;
    }
    if (msg) {
      msg.textContent =
        'Upload accepted. Preview processing runs in the background — refresh search shortly.';
    }
    form.reset();
    updateUploadConditionalFields();
    setTimeout(() => void runSearch(), 3000);
  });
}

async function initDiscovery(): Promise<void> {
  const discoveryRoot = document.getElementById('discovery');
  if (!discoveryRoot || window.location.pathname.startsWith('/artist/')) {
    discoveryRoot?.setAttribute('hidden', '');
    return;
  }

  const [genres, formats, bundles] = await Promise.all([
    loadGenres(),
    loadFormats(),
    loadBundles(),
  ]);

  const genreDiscovery = document.getElementById('genre-discovery');
  const formatDiscovery = document.getElementById('format-discovery');
  const bundleDiscovery = document.getElementById('bundle-discovery');
  const genreFilter = document.getElementById('genre') as HTMLSelectElement | null;
  const genreCheckboxes = document.getElementById('genre-checkboxes');

  if (genreFilter) {
    for (const genre of genres) {
      const opt = document.createElement('option');
      opt.value = genre.slug;
      opt.textContent = genre.name;
      genreFilter.appendChild(opt);
    }
  }

  if (genreCheckboxes) {
    renderGenreCheckboxes(genreCheckboxes, genres);
  }

  if (genreDiscovery) {
    renderGenreChips(genreDiscovery, genres, applyGenreFilter);
  }
  if (formatDiscovery) {
    renderFormatCards(formatDiscovery, formats, applyFormatFilter);
  }
  if (bundleDiscovery) {
    renderBundleStrip(bundleDiscovery, bundles);
  }
}

function bindArtistRoute(): void {
  const path = window.location.pathname;
  const match = path.match(/^\/artist\/([^/]+)/);
  if (!match) return;

  document.getElementById('discovery')?.setAttribute('hidden', '');

  const username = decodeURIComponent(match[1]!);
  const heading = document.getElementById('page-heading');
  if (heading) heading.textContent = `@${username}`;

  void (async () => {
    const res = await fetch(`/api/producers/${encodeURIComponent(username)}`);
    const grid = document.getElementById('resource-grid');
    const status = document.getElementById('search-status');
    if (!res.ok) {
      if (status) status.textContent = 'Producer not found.';
      return;
    }
    const data = (await res.json()) as {
      producer: Producer & { bio: string | null };
      resources: ResourceCardData[];
    };
    if (heading) {
      heading.textContent = data.producer.displayName;
    }
    if (status) {
      status.textContent = data.producer.bio ?? `Royalty-free catalog · @${username}`;
    }
    if (grid) {
      renderResourceGrid(grid, data.resources);
    }
  })();
}

async function init(): Promise<void> {
  bindSearch();
  bindAuth();
  bindUpload();
  updateUploadConditionalFields();
  await refreshAuth();

  if (window.location.pathname.startsWith('/artist/')) {
    bindArtistRoute();
  } else {
    await initDiscovery();
    await runSearch();
  }
}

void init();
