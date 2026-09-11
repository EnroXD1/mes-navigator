const CACHE = "ceh-znaniy-0.6.1";
const ASSETS = ["./", "./index.html", "./styles.css?v=0.6.1", "./topic-details.js?v=0.6.1", "./topic-diagrams.js?v=0.6.1", "./abbreviations.js?v=0.6.1", "./pd96-course-data.js?v=0.6.1", "./qrcode.min.js?v=0.6.1", "./app.js?v=0.6.1", "./firebase-sync.js?v=0.6.1", "./manifest.webmanifest?v=0.6.1", "./icon.svg?v=0.6.1"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
