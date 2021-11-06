var CACHE_NAME = '2021-11-06 11:50';
var urlsToCache = [
  "/talk-quiz-en/",
  "/talk-quiz-en/0.lst",
  "/talk-quiz-en/1.lst",
  "/talk-quiz-en/2.lst",
  "/talk-quiz-en/3.lst",
  "/talk-quiz-en/4.lst",
  "/talk-quiz-en/5.lst",
  "/talk-quiz-en/6.lst",
  "/talk-quiz-en/index.js",
  "/talk-quiz-en/mp3/end.mp3",
  "/talk-quiz-en/mp3/incorrect1.mp3",
  "/talk-quiz-en/mp3/correct3.mp3",
  "/talk-quiz-en/favicon/original.svg",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
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
