// Offline cache for the Weekly Budget Planner. Bump VERSION to ship an update.
const VERSION='budget-v4';
const SHELL=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION&&k!=='budget-fonts').map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  // Google Fonts: keep a copy so the app looks right offline
  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open('budget-fonts').then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{c.put(req,r.clone());return r}).catch(()=>hit))));return;
  }
  if(url.origin!==location.origin)return;
  // The app itself: open instantly from the cache, refresh the cache in the background
  e.respondWith(caches.open(VERSION).then(c=>c.match(req,{ignoreSearch:true}).then(hit=>{
    const net=fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r}).catch(()=>hit||c.match('index.html'));
    return hit||net;
  })));
});
