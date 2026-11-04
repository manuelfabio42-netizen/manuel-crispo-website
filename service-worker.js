/* Offline support for the Manuel Crispo author site.
 * Network-first keeps new Weekly Stories and edits current.
 * Cached stories and visited illustrations remain available offline.
 */
const CACHE_NAME = 'manuel-crispo-writer-pwa-2026-11-04-v1';
const SHELL = [
  '/', '/index.html', '/weekly/stories.json',
  '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(name => name.startsWith('manuel-crispo-writer-pwa-') && name !== CACHE_NAME).map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  const eligible = request.mode === 'navigate' ||
    url.pathname === '/weekly/stories.json' ||
    url.pathname === '/index.html' ||
    url.pathname === '/' ||
    url.pathname.startsWith('/media/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest';
  if (!eligible) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(request);
      if (fresh.ok) {
        try { const cache = await caches.open(CACHE_NAME); await cache.put(request, fresh.clone()); }
        catch (e) { /* Storage quota may be limited; online reading still works. */ }
      }
      return fresh;
    } catch (e) {
      const cached = await caches.match(request, {ignoreSearch: true});
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const page = await caches.match('/index.html');
        if (page) return page;
      }
      return Response.error();
    }
  })());
});
