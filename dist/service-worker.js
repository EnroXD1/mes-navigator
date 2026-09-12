const CACHE = "ceh-znaniy-0.7.0";
const ASSETS = ["./", "./index.html", "./styles.css?v=0.7.0", "./topic-details.js?v=0.7.0", "./topic-diagrams.js?v=0.7.0", "./abbreviations.js?v=0.7.0", "./pd96-course-data.js?v=0.7.0", "./qrcode.min.js?v=0.7.0", "./app.js?v=0.7.0", "./ai-tutor.js?v=0.7.0", "./firebase-sync.js?v=0.7.0", "./manifest.webmanifest?v=0.7.0", "./icon.svg?v=0.7.0"];

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
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then((response) => {
      if (response.ok && !url.searchParams.has("code")) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put("./index.html", copy));
      }
      return response;
    }).catch(() => caches.match("./index.html")));
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
