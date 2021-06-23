self.addEventListener('install', () => {
    self.skipWaiting();
})

self.addEventListener('activate', () => {
    clients.claim();
})

self.addEventListener('fetch', (event) => {
    console.log(event.request.url, event.request.mode);
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
                    return new Response("Hello, you !");
                }
            })()
        )
    }
});
