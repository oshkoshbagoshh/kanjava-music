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
    bpm_min:
      (document.getElementById('bpm_min') as HTMLInputElement)?.value || undefined,
    bpm_max:
      (document.getElementById('bpm_max') as HTMLInputElement)?.value || undefined,
    key: (document.getElementById('key') as HTMLInputElement)?.value || undefined,
    license_type:
      (document.getElementById('license_type') as HTMLSelectElement)?.value ||
      undefined,
    tags: (document.getElementById('tags') as HTMLInputElement)?.value || undefined,
  };
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

function bindUpload(): void {
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
    fd.set('agreementAccepted', 'true');

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
    setTimeout(() => void runSearch(), 3000);
  });
}

function bindArtistRoute(): void {
  const path = window.location.pathname;
  const match = path.match(/^\/artist\/([^/]+)/);
  if (!match) return;

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
      resources: import('./browse/resource-card.js').ResourceCardData[];
    };
    if (heading) {
      heading.textContent = data.producer.displayName;
    }
    if (status) {
      status.textContent = data.producer.bio ?? `Royalty-free catalog · @${username}`;
    }
    if (grid) {
      const { renderResourceGrid: render } = await import('./browse/resource-grid.js');
      render(grid, data.resources);
    }
  })();
}

async function init(): Promise<void> {
  bindSearch();
  bindAuth();
  bindUpload();
  await refreshAuth();

  if (window.location.pathname.startsWith('/artist/')) {
    bindArtistRoute();
  } else {
    await runSearch();
  }
}

void init();
