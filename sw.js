// GD Pocket – service worker : met l'appli en cache pour qu'elle marche hors ligne.
// Change VERSION à chaque mise à jour de l'appli pour forcer le rafraîchissement.
const VERSION = "gd-pocket-v0.7.4";
const CDN = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";
const FILES = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png",
  CDN + "codemirror.min.css", CDN + "theme/dracula.min.css", CDN + "addon/hint/show-hint.min.css",
  CDN + "codemirror.min.js", CDN + "addon/mode/simple.min.js", CDN + "addon/hint/show-hint.min.js",
  CDN + "addon/edit/closebrackets.min.js", CDN + "addon/edit/matchbrackets.min.js",
  CDN + "addon/selection/active-line.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord pour la page (pour avoir la dernière version), cache sinon.
// Cache d'abord pour les bibliothèques et icônes (elles ne changent pas).
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).hostname === "api.github.com") return; // jamais de cache pour GitHub
  const isPage = e.request.mode === "navigate";
  if (isPage) {
    e.respondWith(
      fetch(new Request(e.request.url, {cache: "no-cache"}))   // toujours vérifier s'il y a une nouvelle version
        .then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return r; })
        .catch(() => caches.match("./index.html"))
    );
  } else {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
  }
});
