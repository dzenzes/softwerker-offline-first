const CACHE_NAME = 'softwerker-sample-cache-v1';
const urlsToCache = [
  '/',
  '/css/style.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then((cacheKeys) => Promise.all(
      cacheKeys.map((cacheKey) => caches.delete(cacheKey))
    ))
  );
});

self.addEventListener('fetch', (event) => {

  const handleNetworkResponse = (response) => {
    var cacheCopy = response.clone();
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.put(event.request, cacheCopy));
    return response;
  }

  const handleNoResponse = () => new Response('<h1>Service Unavailable</h1>', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/html'
    })
  });

  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(
    caches
    .match(event.request)
    .then((cached) => {
      const networked = fetch(event.request)
        .then(handleNetworkResponse, handleNoResponse)
        .catch(handleNoResponse);

      return cached || networked;
    })
  );
});