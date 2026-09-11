const CACHE = "ceh-znaniy-0.5.0";
const ASSETS = ["./", "./index.html", "./styles.css", "./topic-details.js", "./topic-diagrams.js", "./abbreviations.js", "./app.js", "./firebase-sync.js", "./manifest.webmanifest", "./icon.svg"];
const QR_LIBRARY = "https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@04f46c6a0708418cb7b96fc563eacae0fbf77674/qrcode.min.js";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then(async (cache) => {
    await cache.addAll(ASSETS);
    try {
      const response = await fetch(QR_LIBRARY, { mode: "no-cors" });
      await cache.put(QR_LIBRARY, response);
    } catch {}
  }));
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
