var CACHE_NAME = "2022-10-08 11:03";
var urlsToCache = [
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
  "/talk-quiz-en/favicon/favicon.svg",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
