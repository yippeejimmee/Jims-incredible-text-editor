const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { StaleWhileRevalidate } = require('workbox-strategies');

precacheAndRoute(self.__WB_MANIFEST);
//takes self.wb_manifest array which contains list of URLs to precache

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  //sets the name of the cache

  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
      //sets it so that only status 0 and 200 are cached
      
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
      //sets max age at which the itsm stored in cache will be cleared
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);


registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  //defines callback function that will filter through requests for this cache

  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
        //will cache reponses up to a maximum age
      }),
    ],
  })
);
