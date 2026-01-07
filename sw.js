self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ghostchat").then(cache => cache.addAll(["./"]))
  );
});

