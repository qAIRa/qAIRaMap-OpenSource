const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'style.css',
    'index.bundle.js'
];

//Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache=>{
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets)
        })
        .then(()=>self.skipWaiting())
    )
    
});

//Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');

    e.waitUntil(
        caches.keys().then(cacheNames=> {
            return Promise.all(
                cacheNames.map(cache =>{
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        }

        )
    )
    
})

// Call Fetch Event
self.addEventListener('fetch', e=>{
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        // .then(res => {
        //     //Clone response
        //     const resClone = res.clone();
        //     //Open cache
        //     caches
        //     .open(cacheName)
        //     .then(cache =>{
        //         // Add response to cache
        //         cache.put(e.request, resClone);
        //     });
        //     return res;
        // })
        .catch(() => caches.match(e.request))
        // .then(res => res)
    )
    
})