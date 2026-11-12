var C='daftar-cache-v1';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||u.pathname.slice(-12)==='version.json')return;
 var key=u.origin+u.pathname;
 if(u.searchParams.has('fresh')){
  e.respondWith(caches.open(C).then(function(c){return fetch(key,{cache:'reload'}).then(function(res){if(res&&res.ok)c.put(key,res.clone());return res})}));return}
 e.respondWith(caches.open(C).then(function(c){return c.match(key).then(function(hit){
  var net=fetch(key,{cache:'no-cache'}).then(function(res){if(res&&res.ok)c.put(key,res.clone());return res}).catch(function(){return null});
  if(hit){e.waitUntil(net);return hit}
  return net.then(function(res){return res||new Response('لا يوجد اتصال بالإنترنت',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})})})}))});
