importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/069cc231414f65498b3b.js",
    "revision": "579776a4fceeb9ca9d992a043150a24b"
  },
  {
    "url": "/_nuxt/4b42ff5dc620fbd42d06.js",
    "revision": "0e54ade32a4378719d9d5adf0a75c76b"
  },
  {
    "url": "/_nuxt/76ef03979f73af47a710.js",
    "revision": "a514547ff0c913b3f61d69df29a39440"
  },
  {
    "url": "/_nuxt/84ad36bb2ec20bd2a589.js",
    "revision": "28323440ae3cc0bd3e465b8e74b3c1b3"
  },
  {
    "url": "/_nuxt/92b4d95c8a7846848f45.js",
    "revision": "3642eb35d992a004d7941752b3b53be2"
  },
  {
    "url": "/_nuxt/a6cad0bbbd7e3eb09dd1.js",
    "revision": "ef68dfa7fbb804806e8eaf8995166468"
  }
], {
  "cacheId": "nuxt-todo",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
