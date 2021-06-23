const PREFIX = "V1";

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntill((async () => {
        const cache = await caches.open(PREFIX);
        cache.add(new Request('offline.html'));
    })())
})

self.addEventListener('activate', () => {
    clients.claim();
})

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async () => {
                try {
                    const preloadresponse = await event.preloadResponse;
                    if (preloadresponse) {
                        return preloadresponse;
                    }
                    return await fetch(event.request);
                } catch (e) {
                    const cache = await caches.open(PREFIX);
                    return await cache.match("/offline.html");
                }
            })()
        )
    }
});
