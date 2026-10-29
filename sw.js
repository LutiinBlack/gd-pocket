// GD Pocket – service worker : met l'appli en cache pour qu'elle marche hors ligne.
// Change VERSION à chaque mise à jour de l'appli (et APP_VERSION dans index.html, et changelog.json).
// Une nouvelle version s'installe en arrière-plan puis ATTEND : l'appli affiche la fenêtre
// « Nouvelle version » et ne passe à la nouvelle version que si l'utilisateur appuie sur « Mettre à jour ».
const VERSION = "gd-pocket-v0.8.0";
const CDN = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";
const CDN_FILES = [
  CDN + "codemirror.min.css", CDN + "theme/dracula.min.css", CDN + "addon/hint/show-hint.min.css",
  CDN + "codemirror.min.js", CDN + "addon/mode/simple.min.js", CDN + "addon/hint/show-hint.min.js",
  CDN + "addon/edit/closebrackets.min.js", CDN + "addon/edit/matchbrackets.min.js",
  CDN + "addon/selection/active-line.min.js"
];
const LOCAL_FILES = ["./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all([
    c.addAll(CDN_FILES),
    // « ?v= » évite de récupérer une ancienne copie gardée par GitHub Pages (cache de 10 min)
    ...LOCAL_FILES.map(u => fetch(u + "?v=" + VERSION).then(r => {
      if (!r.ok) throw new Error("Téléchargement impossible : " + u);
      return c.put(u, r);
    }))
  ])));
  // Pas de skipWaiting ici : on attend l'accord de l'utilisateur
});

self.addEventListener("message", e => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.hostname === "api.github.com") return;                 // jamais de cache pour GitHub
  if (url.pathname.endsWith("/changelog.json")) return;          // toujours la liste à jour
  const fromMyCache = req => caches.open(VERSION).then(c => c.match(req));
  if (e.request.mode === "navigate") {
    // La page vient de la version installée : elle ne change qu'après « Mettre à jour »
    e.respondWith(fromMyCache("./index.html").then(hit => hit || fetch(e.request)));
  } else {
    e.respondWith(fromMyCache(e.request).then(hit => hit || fetch(e.request)));
  }
});
