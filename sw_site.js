const cacheName ='V2'


// Installing
self.addEventListener('install',e=>{
    console.log('Service worker installed');

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
        fetch(e.request)
        .then(res=>{
            const resClone = res.clone();
            caches.open(cacheName).then(cache=>{
                cache.put(e.request,resClone);
            })
            return res;
        })
        .catch(err=>caches.match(e.request).then(res=>res))
    )

})