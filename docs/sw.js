var CACHE_NAME="2023-06-27 00:00",urlsToCache=["/talk-quiz-en/","/talk-quiz-en/data/0.tsv","/talk-quiz-en/data/1.tsv","/talk-quiz-en/data/2.tsv","/talk-quiz-en/data/3.tsv","/talk-quiz-en/data/4.tsv","/talk-quiz-en/data/5.tsv","/talk-quiz-en/data/6.tsv","/talk-quiz-en/index.js","/talk-quiz-en/mp3/end.mp3","/talk-quiz-en/mp3/incorrect1.mp3","/talk-quiz-en/mp3/correct3.mp3","/talk-quiz-en/img/witch-learning.png","/talk-quiz-en/favicon/favicon.svg","https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css"];self.addEventListener("install",function(a){a.waitUntil(caches.open(CACHE_NAME).then(function(a){return a.addAll(urlsToCache)}))}),self.addEventListener("fetch",function(a){a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)}))}),self.addEventListener("activate",function(a){var b=[CACHE_NAME];a.waitUntil(caches.keys().then(function(a){return Promise.all(a.map(function(a){if(b.indexOf(a)===-1)return caches.delete(a)}))}))})