const CACHE_NAME = "2025-10-14 00:00";
const urlsToCache = [
  "/talk-quiz-en/",
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
