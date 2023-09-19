const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route all files specified in the Workbox manifest
precacheAndRoute(self.__WB_MANIFEST);

// Set up a cache strategy for pages (e.g., HTML)
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name of the cache
  plugins: [
    // CacheableResponsePlugin is used to cache valid responses (status 0 and 200)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // ExpirationPlugin sets a maximum age for cached responses (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
    }),
  ],
});

// Warm up the page cache by pre-caching specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to pre-cache
  strategy: pageCache, // Use the pageCache strategy
});

// Register a route for navigating pages (navigate mode)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Set up a cache strategy for assets (e.g., styles, scripts, workers)
registerRoute(
  // Check if the request destination is one of the specified types
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Name of the cache
    plugins: [
      // CacheableResponsePlugin is used to cache valid responses (status 0 and 200)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

