const cacheName ='V1'

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
];


// Installing
self.addEventListener('install',e=>{
    console.log('Service worker installed');

    e.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Service worker : Caching files');
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    )

})

//Activate

self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });

// Call fetch

self.addEventListener('fetch',e=>{
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
})