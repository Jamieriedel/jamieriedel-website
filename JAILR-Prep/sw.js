/* JAILR Prep offline: always the newest version when online, the last one when not. Only this app's own files. */
const C='jailr-prep',F=['./','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('jailr-prep')&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url),s=new URL(self.registration.scope);if(e.request.method!=='GET'||u.origin!==s.origin||!u.pathname.startsWith(s.pathname))return;
  const rel=u.pathname.slice(s.pathname.length),page=rel===''||rel==='index.html';if(!page&&!F.includes(rel))return;const key=page?s.href:u.origin+u.pathname;
  e.respondWith((async()=>{const c=await caches.open(C);const net=fetch(e.request).then(r=>{if(r.ok&&r.type==='basic')c.put(key,r.clone());return r});
    if(!page)return(await c.match(key))||net;
    try{return await Promise.race([net,new Promise((_,n)=>setTimeout(()=>n(new Error('langsam')),4000))])}catch(x){const m=await c.match(key);if(m){net.catch(()=>{});return m}return net}})())});
