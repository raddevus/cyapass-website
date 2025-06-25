self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open('cya-cache').then(function(cache) {
        return cache.addAll(
        [
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
            'https://code.jquery.com/jquery-2.2.3.min.js',
            'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js',
            'https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js',
            'https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js',
            '/custom/main.css',
            '/custom/crypt.js',
            '/custom/multiHash.js',
            '/custom/app.js',
            '/custom/cyapass.js',
            'offline.htm',
        ]
        );
    })
    );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("offline.htm");
        }
      });
    })
  );
});
