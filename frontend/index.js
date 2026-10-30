// index.js — Panel de buses (Connect Flotas), proyecto propio.
// Sin login aquí: se llega vía /flotas?t=<jwt de un solo uso> minteado por
// portalConnect (api/flotas-sso.js) después de validar sesión + allowlist
// allá. Este token se guarda en sessionStorage y se manda como bearer a
// /api/data — si falta o venció, se muestra el gate pidiendo volver a
// Portal Connect (no hay forma de loguearse acá directamente).
const PORTAL_URL = 'https://connect.grupokaufmann.com/workspace';

function getToken(){
 const url = new URL(location.href);
 const fromUrl = url.searchParams.get('t');
 if (fromUrl){
  try{ sessionStorage.setItem('flotasToken', fromUrl); }catch(e){}
  url.searchParams.delete('t');
  history.replaceState({}, '', url.pathname + (url.search ? '?'+url.searchParams.toString() : ''));
  return fromUrl;
 }
 try{ return sessionStorage.getItem('flotasToken') || ''; }catch(e){ return ''; }
}
function showGate(msg, showBack){
 document.getElementById('gateMsg').textContent = msg;
 document.getElementById('gateBack').style.display = showBack ? '' : 'none';
 document.getElementById('gateBack').href = PORTAL_URL;
 document.getElementById('gate').classList.remove('hidden');
}
function hideGate(){ document.getElementById('gate').classList.add('hidden'); }

// Nombre/avatar del usuario: vienen en el propio JWT (email, nombre si
// portalConnect pudo leer el perfil) — no se verifica la firma acá, solo se
// lee para mostrar; la verificación real la hace api/data.js en el backend.
function decodeJwtPayload(token){
 try{
  const base64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
  const json = decodeURIComponent(atob(base64).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(json);
 }catch(e){ return null; }
}
function renderUser(token){
 const payload = decodeJwtPayload(token);
 if(!payload) return;
 const email = payload.email || '';
 const nombre = payload.nombre || (email ? email.split('@')[0].replace(/\./g,' ').replace(/\b\w/g,c=>c.toUpperCase()) : '');
 if(!nombre) return;
 const initials = nombre.split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('').toUpperCase();
 document.getElementById('userpill').textContent = nombre;
 if(initials) document.getElementById('avatar').textContent = initials;
}

let DATA = [], HEAT = [];
let empSel='';  // '' = todas las empresas
const es=x=>Number(x).toLocaleString('es-CL');
const fmt=(x,d=0)=>x==null?'<span class="muted">&mdash;</span>':Number(x).toLocaleString('es-CL',{minimumFractionDigits:d,maximumFractionDigits:d});
const col=d=>d==null?'var(--neutral)':d<=2?'var(--ok)':d<=30?'var(--warn)':'var(--crit)';
const pill=d=>{if(d==null)return '<span class="pill na">s/d</span>';const c=d<=2?'ok':d<=30?'warn':'crit';return '<span class="pill '+c+'">'+d+' d</span>';};
const cs=getComputedStyle(document.documentElement), cvar=v=>cs.getPropertyValue(v).trim();
const emp0=r=>r.empresa||'—';
function cur(){return empSel?DATA.filter(r=>emp0(r)===empSel):DATA;}
function curHeat(){return empSel?HEAT.filter(h=>(h[3]||'—')===empSel):HEAT;}

function computeK(rows){const n=rows.length;
 const km=rows.filter(r=>r.km_30d).map(r=>r.km_30d);const kmSum=km.reduce((a,b)=>a+b,0);
 const ri=rows.filter(r=>r.rinde_kml).map(r=>r.rinde_kml).sort((a,b)=>a-b);
 const med=ri.length?ri[Math.floor(ri.length/2)]:0;
 const aldia=rows.filter(r=>r.dias_sin_gps!=null&&r.dias_sin_gps<=2).length;
 return {total:n,con_pos:rows.filter(r=>r.lat!=null).length,
  km_dia:km.length?Math.round(kmSum/km.length/30):0,
  rinde:med?Math.round(med*100)/100:0,
  pct_gps:n?Math.round(100*aldia/n):0,
  sin_tlm:rows.filter(r=>r.dias_sin_can==null).length,
  km_total:Math.round(kmSum)};}

function kpiCard(l,ic,v,s,hero){return '<div class="kpi"><div class="top"><span class="l">'+l+
 '</span><span class="ic"><span data-lucide="'+ic+'"></span></span></div><div class="v'+(hero?' hero':'')+
 '">'+v+'</div><div class="s">'+s+'</div></div>';}

function porEmpresa(rows){const m={};for(const r of rows){const e=emp0(r);(m[e]=m[e]||[]).push(r);}
 return Object.entries(m).map(([e,rs])=>{const km=rs.filter(x=>x.km_30d).map(x=>x.km_30d);
  const ri=rs.filter(x=>x.rinde_kml).map(x=>x.rinde_kml).sort((a,b)=>a-b);
  const med=ri.length?ri[Math.floor(ri.length/2)]:null;const kmt=km.reduce((a,b)=>a+b,0);
  return {e,buses:rs.length,kmt,kmd:km.length?kmt/km.length/30:0,rinde:med};}).sort((a,b)=>b.kmt-a.kmt);}

// ── Dashboard ──
function renderDashboard(rows,K){
 document.getElementById('kpis').innerHTML=
  kpiCard('Buses en la flota','bus',es(K.total),empSel||'categoría BUS')
 +kpiCard('GPS al día (&le;2 d)','satellite',K.pct_gps+'%',Math.round(K.pct_gps*K.total/100)+' de '+K.total,1)
 +kpiCard('km/día promedio','route',es(K.km_dia),'ventana 30 d')
 +kpiCard('Rendimiento mediano','fuel',String(K.rinde).replace('.',','),'km/L · telemetría')
 +kpiCard('Sin dato CAN','unplug',es(K.sin_tlm),'telemetría a revisar');
 const tb=document.querySelector('#topkm tbody');tb.innerHTML='';
 rows.filter(r=>r.km_30d).slice(0,10).forEach(r=>{const t=document.createElement('tr');
  t.innerHTML='<td class="pat">'+(r.patente||'')+'</td><td>'+(r.empresa||'')+'</td><td class="num">'+fmt(r.km_30d)+'</td><td class="num">'+fmt(r.rinde_kml,2)+'</td>';tb.appendChild(t);});
 const emp=porEmpresa(rows).filter(x=>x.kmt>0).slice(0,10);const mx=Math.max(...emp.map(x=>x.kmt),1);
 document.getElementById('empbars').innerHTML=emp.length
  ?emp.map(x=>'<div class="barrow"><span class="nm" title="'+x.e+'">'+x.e+
   '</span><span class="tk"><i style="width:'+(100*x.kmt/mx)+'%"></i></span><span class="vl">'+es(Math.round(x.kmt))+'</span></div>').join('')
  :'<p class="note" style="margin:0">Sin kilometraje en la ventana.</p>';}

// ── Rendimiento ──
function renderRend(rows,K){
 document.getElementById('rkpis').innerHTML=
  kpiCard('Km total flota (30 d)','route',es(K.km_total),'suma de recorridos')
 +kpiCard('Rendimiento mediano','fuel',String(K.rinde).replace('.',','),'km/L',1)
 +kpiCard('Buses con km/L','badge-check',es(rows.filter(r=>r.rinde_kml).length),'cobertura telemetría');
 const emp=porEmpresa(rows);document.getElementById('rcnt').textContent=emp.length+(emp.length===1?' empresa':' empresas');
 const tb=document.querySelector('#remp tbody');tb.innerHTML='';
 emp.forEach(x=>{const t=document.createElement('tr');
  t.innerHTML='<td>'+x.e+'</td><td class="num">'+x.buses+'</td><td class="num">'+fmt(Math.round(x.kmt))+
  '</td><td class="num">'+fmt(Math.round(x.kmd))+'</td><td class="num">'+(x.rinde?fmt(x.rinde,2):'<span class="muted">&mdash;</span>')+'</td>';tb.appendChild(t);});}

// ── Unidades ──
let sortK='km_30d',sortDir=-1;
function renderT(){const q=(document.getElementById('q').value||'').toLowerCase();
 let rows=cur().filter(r=>!q||(r.patente||'').toLowerCase().includes(q)||(r.empresa||'').toLowerCase().includes(q));
 rows.sort((a,b)=>{let x=a[sortK],y=b[sortK];if(x==null)return 1;if(y==null)return -1;
  if(typeof x==='string')return sortDir*x.localeCompare(y);return sortDir*(x-y);});
 const tb=document.querySelector('#t tbody');tb.innerHTML='';
 for(const r of rows){const tr=document.createElement('tr');
  tr.innerHTML='<td class="pat">'+(r.patente||'')+'</td><td>'+(r.empresa||'')+'</td>'
   +'<td>'+(r.modelo||'<span class="muted">&mdash;</span>')+'</td>'
   +'<td class="num">'+fmt(r.km_30d)+'</td><td class="num">'+fmt(r.rinde_kml,2)+'</td>'
   +'<td class="num">'+fmt(r.odometro)+'</td><td class="num">'+fmt(r.horas_motor)+'</td>'
   +'<td class="num">'+pill(r.dias_sin_gps)+'</td>'
   +'<td class="num">'+(r.dias_sin_can==null?'<span class="muted">&mdash;</span>':pill(r.dias_sin_can))+'</td>'
   +'<td>'+(r.telemetria?'sí':'<span class="muted">no</span>')+'</td>';tb.appendChild(tr);}
 document.getElementById('ucnt').textContent=rows.length+' buses';}
document.querySelectorAll('#t th').forEach(th=>th.onclick=()=>{const k=th.dataset.k;
 if(k===sortK)sortDir*=-1;else{sortK=k;sortDir=(k==='patente'||k==='empresa')?1:-1;}renderT();});
document.getElementById('q').oninput=renderT;
document.getElementById('gq').addEventListener('input',e=>{document.getElementById('q').value=e.target.value;renderT();if(e.target.value)go('unidades');});

// ── Conectividad ──
function tiers(rows,key){const b={aldia:0,rec:0,caido:0,sd:0};for(const r of rows){const d=r[key];
 if(d==null)b.sd++;else if(d<=2)b.aldia++;else if(d<=30)b.rec++;else b.caido++;}return b;}
function renderTiers(elid,b,tot){const defs=[['Al día (&le;2 d)',b.aldia,'var(--ok)'],
 ['Reciente (3-30)',b.rec,'var(--warn)'],['Caído (+30)',b.caido,'var(--crit)'],['Sin dato',b.sd,'var(--neutral)']];
 document.getElementById(elid).innerHTML=defs.map(([l,v,c])=>'<div class="tier"><span>'+l+
  '</span><span class="tk"><i style="width:'+(tot?100*v/tot:0)+'%;background:'+c+'"></i></span><span class="vl">'+es(v)+'</span></div>').join('');}
function renderConect(rows){
 renderTiers('gpstiers',tiers(rows,'dias_sin_gps'),rows.length);
 renderTiers('cantiers',tiers(rows,'dias_sin_can'),rows.length);
 const rev=rows.filter(r=>r.telemetria&&(r.dias_sin_can==null||r.dias_sin_can>30)&&r.dias_sin_gps!=null&&r.dias_sin_gps<=2);
 document.getElementById('revcnt').textContent=rev.length+' buses';
 const tb=document.querySelector('#rev tbody');tb.innerHTML='';
 rev.forEach(r=>{const t=document.createElement('tr');t.innerHTML='<td class="pat">'+(r.patente||'')+'</td><td>'+(r.empresa||'')+'</td><td class="num">'+pill(r.dias_sin_gps)+'</td><td class="num">'+(r.dias_sin_can==null?'<span class="pill crit">nunca</span>':pill(r.dias_sin_can))+'</td>';tb.appendChild(t);});}

// ── Mapa (lazy) ──
let map=null,posLayer=null,heatLayer=null,rutaLayer=null,mapMode='pos';
let FLOTAS_TOKEN='';   // seteado en boot(), para poder pedir dataset=rutas bajo demanda
let RUTAS_VINS=null;   // Set de vin con viajes en bus_viajes (rutas/, export manual) — lazy
function buildLayers(){const rows=cur().filter(r=>r.lat!=null&&r.lon!=null);
 posLayer=L.layerGroup();const pts=[];
 for(const r of rows){const c=cvar(col(r.dias_sin_gps).replace('var(','').replace(')',''));
  L.circleMarker([r.lat,r.lon],{radius:5,color:c,weight:1,fillColor:c,fillOpacity:.8})
   .bindPopup('<b>'+(r.patente||'')+'</b><br>'+(r.empresa||'')+(r.modelo?'<br>'+r.modelo:'')+'<br>km 30d: '+fmt(r.km_30d)+'<br>km/L: '+fmt(r.rinde_kml,2)).addTo(posLayer);
  pts.push([r.lat,r.lon]);}
 const h=curHeat();const mx=Math.max(...h.map(x=>x[2]),1);
 heatLayer=L.heatLayer(h.map(x=>[x[0],x[1],x[2]]),{radius:18,blur:14,max:Math.max(8,mx*0.6),minOpacity:.25,
  gradient:{0.25:'#0EA78C',0.55:'#00B4DB',0.85:'#FE931A',1:'#B01212'}});
 document.getElementById('mapasub').textContent=rows.length+' buses con posición'+(empSel?' · '+empSel:'');
 return pts;}
function applyMapMode(pts){
 if(mapMode==='pos'){if(heatLayer)map.removeLayer(heatLayer);posLayer.addTo(map);
  document.getElementById('maptitle').textContent='Última posición por unidad';
  document.getElementById('maplegend').style.display='';
  document.getElementById('mapnote').textContent='Posición actual (al día) o última conocida (mudo). Color = estado GPS.';}
 else{if(posLayer)map.removeLayer(posLayer);heatLayer.addTo(map);
  document.getElementById('maptitle').textContent='Heatmap de movimiento (90 d)';
  document.getElementById('maplegend').style.display='none';
  document.getElementById('mapnote').textContent='Densidad de posiciones en los últimos 90 días (una posición por bus por día). Muestra dónde se concentra la operación, no la ruta exacta.';}
 if(pts&&pts.length)map.fitBounds(pts,{padding:[30,30]});}
function initMap(){if(map)return;map=L.map('mapBig').setView([-35,-71],5);
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap',maxZoom:18}).addTo(map);}
function rebuildMap(){if(!map)return;
 if(mapMode==='rutas'){loadRutas();return;}
 if(posLayer)map.removeLayer(posLayer);if(heatLayer)map.removeLayer(heatLayer);
 applyMapMode(buildLayers());}

// ── Rutas (tabla bus_viajes, export manual — ver rutas/README.md). Overlay
// visual de viajes recientes por unidad o por empresa, no identifica rutas
// (decisión de producto 2026-10-19 documentada ahí). ──
function populateRutaSel(){
 const sel=document.getElementById('rutaVin');
 const rows=cur().filter(r=>r.vin&&RUTAS_VINS&&RUTAS_VINS.has(r.vin))
  .sort((a,b)=>(a.patente||'').localeCompare(b.patente||'','es'));
 const prev=sel.value;
 sel.innerHTML='<option value="">'+(empSel?'Todas las unidades con viajes ('+rows.length+')':'— elegí una unidad —')+'</option>'
  +rows.map(r=>'<option value="'+r.vin+'">'+(r.patente||r.vin)+(empSel?'':' · '+(r.empresa||''))+'</option>').join('');
 sel.value=rows.some(r=>r.vin===prev)?prev:'';
}
async function loadRutas(){
 if(RUTAS_VINS===null){
  const v=await fetchDataset(FLOTAS_TOKEN,'rutas');
  RUTAS_VINS=new Set(v.ok?v.data:[]);
 }
 populateRutaSel();
 const vinSel=document.getElementById('rutaVin').value;
 if(rutaLayer){map.removeLayer(rutaLayer);rutaLayer=null;}
 if(!vinSel&&!empSel){
  document.getElementById('mapasub').textContent='Elegí una empresa (arriba) o una unidad para ver sus rutas';
  return;
 }
 document.getElementById('mapasub').textContent='Cargando rutas…';
 const r=await fetchDataset(FLOTAS_TOKEN,'rutas',vinSel?'vin='+encodeURIComponent(vinSel):'empresa='+encodeURIComponent(empSel));
 if(!r.ok){document.getElementById('mapasub').textContent='No se pudieron cargar las rutas.';return;}
 const trips=r.data,pts=[];
 rutaLayer=L.layerGroup();
 trips.forEach(t=>{
  const latlngs=(t.polyline||[]).map(p=>[p[1],p[0]]);
  if(latlngs.length<2)return;
  L.polyline(latlngs,{color:'#2563EB',weight:3,opacity:.7}).bindPopup(
   '<b>'+(t.inicio?new Date(t.inicio).toLocaleString('es-CL'):'s/f')+'</b><br>'+
   (t.distancia_km!=null?fmt(t.distancia_km,1)+' km':'<span class="muted">&mdash;</span>')+
   (t.duracion_h!=null?' · '+fmt(t.duracion_h,1)+' h':'')+
   (t.vel_prom!=null?'<br>vel. prom '+fmt(t.vel_prom,0)+' km/h':'')
  ).addTo(rutaLayer);
  latlngs.forEach(p=>pts.push(p));
  if(t.start_lat!=null&&t.start_lon!=null)L.circleMarker([t.start_lat,t.start_lon],{radius:4,color:cvar('--ok'),fillColor:cvar('--ok'),fillOpacity:1,weight:1}).addTo(rutaLayer);
  if(t.end_lat!=null&&t.end_lon!=null)L.circleMarker([t.end_lat,t.end_lon],{radius:4,color:cvar('--crit'),fillColor:cvar('--crit'),fillOpacity:1,weight:1}).addTo(rutaLayer);
 });
 rutaLayer.addTo(map);
 document.getElementById('mapasub').textContent=trips.length+' viaje'+(trips.length===1?'':'s')+(vinSel?' · '+vinSel:' · '+empSel);
 if(pts.length)map.fitBounds(pts,{padding:[30,30]});
}
document.getElementById('rutaVin').onchange=()=>{if(mapMode==='rutas')loadRutas();};

function setMapMode(m){mapMode=m;document.querySelectorAll('#maptoggle button').forEach(b=>b.classList.toggle('on',b.dataset.m===m));
 document.getElementById('rutasel').style.display=m==='rutas'?'':'none';
 if(!map)return;
 if(m==='rutas'){
  if(posLayer)map.removeLayer(posLayer);if(heatLayer)map.removeLayer(heatLayer);
  document.getElementById('maptitle').textContent='Rutas recientes';
  document.getElementById('maplegend').style.display='none';
  document.getElementById('mapnote').textContent='Trazado de los viajes más recientes por unidad (bus_viajes, actualización manual — ver rutas/README.md). Es un overlay visual, no identifica ni nombra rutas.';
  loadRutas();
 }else{
  if(rutaLayer)map.removeLayer(rutaLayer);
  applyMapMode(null);
 }
}
document.querySelectorAll('#maptoggle button').forEach(b=>b.onclick=()=>setMapMode(b.dataset.m));

// ── Re-render global al cambiar de empresa ──
function renderAll(){const rows=cur();const K=computeK(rows);
 renderDashboard(rows,K);renderRend(rows,K);renderConect(rows);renderT();rebuildMap();
 if(window.lucide)lucide.createIcons();}

// ── Navegación ──
function go(v){document.querySelectorAll('.view').forEach(s=>s.classList.toggle('on',s.id==='view-'+v));
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===v));
 document.getElementById('crumb').textContent={dashboard:'Dashboard',mapa:'Mapa de flota',rendimiento:'Rendimiento',unidades:'Unidades',conectividad:'Conectividad'}[v];
 if(v==='mapa'){initMap();setTimeout(()=>{if(!map)return;map.invalidateSize();rebuildMap();},60);}
 window.scrollTo(0,0);}
document.querySelectorAll('#nav a').forEach(a=>a.onclick=e=>{e.preventDefault();go(a.dataset.v);});
window.addEventListener('resize',()=>{if(map&&document.getElementById('view-mapa').classList.contains('on'))map.invalidateSize();});

// ── Colapsar menú ──
function setCollapsed(v){document.body.classList.toggle('collapsed',v);
 document.getElementById('collapseBtn').setAttribute('aria-label',v?'Expandir menú':'Colapsar menú');
 try{localStorage.setItem('sbCollapsed',v?'1':'0');}catch(e){}
 if(map)setTimeout(()=>map.invalidateSize(),160);}
try{if(localStorage.getItem('sbCollapsed')==='1')document.body.classList.add('collapsed');}catch(e){}
document.getElementById('collapseBtn').onclick=()=>setCollapsed(!document.body.classList.contains('collapsed'));

// ── Carga de datos en vivo (token de handoff -> /api/data) ──
async function fetchDataset(token,name,extraQs){
 try{
  // Ruta RELATIVA a propósito, no absoluta (/api/data): esta app se sirve
  // tanto en su propio dominio (connect-flotas.vercel.app/) como detrás del
  // rewrite /flotas/* de portalConnect (connect.grupokaufmann.com/flotas/) —
  // una ruta absoluta pegaría contra el dominio equivocado en el segundo caso.
  const res=await fetch('api/data?dataset='+name+(extraQs?'&'+extraQs:''),{headers:{Authorization:'Bearer '+token}});
  if(!res.ok)return {ok:false,status:res.status};
  return {ok:true,data:await res.json()};
 }catch(e){return {ok:false,status:0};}
}
async function boot(){
 const token=getToken();
 if(!token){
  showGate('Esta app se abre desde Portal Connect. Volvé e ingresá por la tarjeta "Connect Flotas".', true);
  return;
 }
 renderUser(token);
 FLOTAS_TOKEN=token;
 const metricas=await fetchDataset(token,'metricas');
 if(!metricas.ok){
  const msg=metricas.status===401
   ?'Tu acceso venció. Volvé a Portal Connect y entrá de nuevo por la tarjeta "Connect Flotas".'
   :'No se pudo cargar la información de flota. Si el problema persiste, contacta al equipo Connect.';
  showGate(msg, metricas.status===401);
  return;
 }
 hideGate();
 DATA=metricas.data;
 const heat=await fetchDataset(token,'heat');
 HEAT=heat.ok?heat.data:[];
 if(DATA[0]&&DATA[0].fecha)document.getElementById('dashdate').textContent='Datos al '+DATA[0].fecha;

 const sel=document.getElementById('empsel');
 const emps=[...new Set(DATA.map(emp0))].sort((a,b)=>a.localeCompare(b,'es'));
 sel.innerHTML='<option value="">Todas las empresas ('+DATA.length+')</option>'+
  emps.map(e=>'<option value="'+e.replace(/"/g,'&quot;')+'">'+e+' ('+DATA.filter(r=>emp0(r)===e).length+')</option>').join('');
 sel.onchange=()=>{empSel=sel.value;renderAll();};

 renderAll();
}
boot();
