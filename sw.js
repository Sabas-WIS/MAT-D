/* MAT hub service worker: caches the hub, demos and media so the booth keeps working offline after the first visit. */
const VER='mat-hub-cc6495dc';
const FILES=["./", "assets/clips/clips.js", "assets/clips/webp.js", "assets/img/08b3c8ff0b.png", "assets/img/1021117556.png", "assets/img/17c9f252cc.png", "assets/img/21172350f6.png", "assets/img/35d516489a.png", "assets/img/468a928bc0.png", "assets/img/56d72190e1.png", "assets/img/5be8618373.png", "assets/img/8037b906f1.png", "assets/img/b0ddcfcb6c.png", "demos/autobook.html", "demos/collibry.html", "demos/dealstream.html", "demos/draftlee.html", "demos/monicio.html", "demos/mycriteria.html", "demos/spentlee.html", "demos/syfehr.html", "index.html"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{ if(res.ok&&new URL(r.url).origin===location.origin){const cp=res.clone();caches.open(VER).then(c=>c.put(r,cp))} return res }).catch(()=>caches.match('index.html'))));
});
