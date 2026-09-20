const CACHE_NAME = 'agra-mandal-v1'; // 'Const' को 'const' कर दिया गया है
const ASSETS_TO_CACHE = [
  '/', 
  '/index.html', 
  '/manifest.json',
  '/icon.png' // आइकॉन को भी लिस्ट में जोड़ दिया गया है
];

// 1. Install Event: फाइल्स को कैशे में सेव करना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// 2. Activate Event: पुराने कैशे को डिलीट करना (ताकि ऐप अपडेट हो सके)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Event: नेटवर्क ना होने पर कैशे से फाइल देना
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
