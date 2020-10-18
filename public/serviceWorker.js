// const CACHE_NAME = "version-1";
// const urlsToCache = [ 'index.html', 'offline.html' ];
//
// const self = this;
//
// // Install SW
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Opened cache');
//
//         return cache.addAll(urlsToCache);
//       })
//   )
// });
//
// // Listen for requests
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(() => {
//         return fetch(event.request)
//           .catch(() => caches.match('offline.html'))
//       })
//   )
// });
//
// // Activate the SW
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [];
//   cacheWhitelist.push(CACHE_NAME);
//
//   event.waitUntil(
//     caches.keys().then((cacheNames) => Promise.all(
//       cacheNames.map((cacheName) => {
//         if(!cacheWhitelist.includes(cacheName)) {
//           return caches.delete(cacheName);
//         }
//       })
//     ))
//
//   )
// });


// // This is the "Offline page" service worker
//
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
//
// const CACHE = "pwabuilder-page";
//
// // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
// const offlineFallbackPage = "ToDo-replace-this-name.html";
//
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });
//
// self.addEventListener('install', async (event) => {
//   event.waitUntil(
//     caches.open(CACHE)
//       .then((cache) => cache.add(offlineFallbackPage))
//   );
// });
//
// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }
//
// self.addEventListener('fetch', (event) => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResp = await event.preloadResponse;
//
//         if (preloadResp) {
//           return preloadResp;
//         }
//
//         const networkResp = await fetch(event.request);
//         return networkResp;
//       } catch (error) {
//
//         const cache = await caches.open(CACHE);
//         const cachedResp = await cache.match(offlineFallbackPage);
//         return cachedResp;
//       }
//     })());
//   }
// });


const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => caches.match('offline.html'))
      })
  )
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if(!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))

  )
});
