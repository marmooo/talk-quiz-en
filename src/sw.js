const cacheName = "2025-11-21 00:00";
const urlsToCache = [
  "/talk-quiz-en/data/0.tsv",
  "/talk-quiz-en/data/1.tsv",
  "/talk-quiz-en/data/2.tsv",
  "/talk-quiz-en/data/3.tsv",
  "/talk-quiz-en/data/4.tsv",
  "/talk-quiz-en/data/5.tsv",
  "/talk-quiz-en/data/6.tsv",
  "/talk-quiz-en/index.js",
  "/talk-quiz-en/mp3/end.mp3",
  "/talk-quiz-en/mp3/incorrect1.mp3",
  "/talk-quiz-en/mp3/correct3.mp3",
  "/talk-quiz-en/img/witch-learning.png",
  "/talk-quiz-en/favicon/favicon.svg",
  "https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css",
];

async function preCache() {
  const cache = await caches.open(cacheName);
  await Promise.all(
    urlsToCache.map((url) =>
      cache.add(url).catch((e) => console.warn("Failed to cache", url, e))
    ),
  );
  self.skipWaiting();
}

async function handleFetch(event) {
  const cached = await caches.match(event.request);
  return cached || fetch(event.request);
}

async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((name) => name !== cacheName ? caches.delete(name) : null),
  );
  self.clients.claim();
}

self.addEventListener("install", (event) => {
  event.waitUntil(preCache());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(cleanOldCaches());
});
