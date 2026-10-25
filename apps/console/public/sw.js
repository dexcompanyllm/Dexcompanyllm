const CACHE_PREFIX = 'dex-company-shell-';
const CACHE = `${CACHE_PREFIX}v8`;
const SHELL = new Set(['/styles.css', '/app.js', '/manifest.webmanifest', '/icon.svg']);
const SENSITIVE_PREFIXES = ['/api', '/mcp', '/auth', '/.well-known', '/oauth'];

function isSensitivePath(pathname) {
  return SENSITIVE_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function canUseShellCache(request) {
  if (request.method !== 'GET') return false;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !SHELL.has(url.pathname) || isSensitivePath(url.pathname)) return false;
  return !request.headers.has('authorization') && !request.headers.has('cookie');
}

function credentialFreeShellRequest(pathname) {
  return new Request(new URL(pathname, self.location.origin), {
    method: 'GET',
    credentials: 'omit',
    cache: 'reload',
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll([...SHELL].map(credentialFreeShellRequest)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (!canUseShellCache(event.request)) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      if (response.ok && response.type !== 'opaque') {
        const cache = await caches.open(CACHE);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      return caches.match(event.request);
    }
  })());
});
