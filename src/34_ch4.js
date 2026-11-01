// ===== CH4 OPS SIEGE =====
const MAP4=["#########S#########",
"#########.#########",
"#########.#########",
"#########.#########",
"#########A#########",
"#########.#########",
"#######.....#######",
"#S...B..t.t..W...S#",
"#######.....#######",
"#######..P..#######",
"#######.....#######",
"###################"];
LV[4]={init(){C.fc=[.07,.09,.1];C.fd=[13,34];C.mus='standoff';setMap(MAP4);C.pk='hicks';C.pf=27;C.weaps=['rifle'];C.fireMsg='FIRE allowed';C.trk=true;
 const[wx,wz]=mk('W');C.wk=(wx/2)+','+(wz/2);C.open[C.wk]=1;
 build(()=>{buildMap({wall:39,floor:35,strip:[.9,1,.85]});for(const k of'AB'){const[x,z]=mk(k);bx(x,.03,z,1.6,.04,1.6,36)}});
 const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:PI});C.allies=[{x:px-1,z:pz+.8,face:28,gun:'rifle',ph:0,ya:PI},{x:px+1,z:pz+.8,face:29,gun:'smart',helm:false,ph:0,ya:PI},{x:px,z:pz+1.4,rip:1,face:11,gun:'rifle',ph:0,ya:PI}];
 C.sen=[];const g=k=>{const[x,z]=mk(k);return{x,z}};
 cut([{d:3.2,sub:'Back in the colony operations block. The dropship is gone. Rescue is weeks away.',actors:1,draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[px+3,2.4,pz+3],c:[px,1,pz-3],fov:.95})},
  {d:2.6,sub:'Hudson loses it: game over, man.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(px-1,pz+.8,PI,1.81)},
  {d:2.8,sub:'Ripley cuts him off. They have sixteen hours. Seal the place up.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(px,pz+1.4,PI,1.82)},
  {d:2.6,sub:'Hicks sets the plan: sentry guns in the corridors, weld the rest.',draw:drawP,cam:()=>CU(px,pz,PI,1.81)}],()=>{play();this.stage(0)})},
 stage(n){C.stage=n;const g=k=>{const[x,z]=mk(k);return{x,z}};
  if(n==0){const a=g('A');C.act={x:a.x,z:a.z,r:1.4,dur:2,label:'PLACE SENTRY A',snd:900,done:()=>{C.sen.push({x:a.x,z:a.z,ya:PI,am:500,id:'A'});SFX.click();this.stage(1)}};C.obj='Set up sentry gun A in the north corridor';say('Walk onto the yellow pad and hold FIRE',4)}
  if(n==1){const b=g('B');C.act={x:b.x,z:b.z,r:1.4,dur:2,label:'PLACE SENTRY B',snd:900,done:()=>{C.sen.push({x:b.x,z:b.z,ya:-PI/2,am:500,id:'B'});SFX.click();this.stage(2)}};C.obj='Set up sentry gun B in the west corridor'}
  if(n==2){const w=g('W');C.act={x:w.x-1.6,z:w.z,r:1.4,dur:3,label:'WELDING DOOR',snd:3400,done:()=>{delete C.open[C.wk];C.D=null;this.stage(3)}};C.obj='Weld the east door shut'}
  if(n==3){C.act=null;C.siege=0;C.mus='torch';C.obj='SIEGE: hold the ops room. Sentries fire on their own';say('Here they come! Watch the sentry counters.',4)}
  if(n==4){C.mus='shoot';C.br=0;C.brK=C.kills;C.obj='They\'re in the ceiling! Kill 10';say('Movement right on top of us... THE CEILING!',4)}},
 step(dt){const p=C.p;if(C.sen.length)C.scoreTxt=C.sen.map(s=>`SENTRY ${s.id} ${String(Math.max(0,s.am|0)).padStart(3,'0')}`).join('  ');
  C.sen.forEach(s=>{if(s.am<=0)return;let t=null,bd=11;alive().forEach(e=>{if(e.y>.3)return;const d=dist(s,e);if(d<bd&&los(s.x,s.z,e.x,e.z)){bd=d;t=e}});s.fl=0;
   if(t){s.ya=Math.atan2(t.x-s.x,t.z-s.z);if(C.t-(s.fT||0)>.07){s.fT=C.t;s.am--;s.fl=1;dmgE(t,.36);if(((C.t*14)|0)%2)noise(.04,.07,2200,.8);if(s.am%5==0)C.fx.push({k:'tr',a:[s.x,.95,s.z],b:[t.x,1,t.z],t:C.t})}}});
  if(C.stage==3){C.siege+=dt;C.sT=(C.sT||0)-dt;const low=C.sen.every(s=>s.am<40);C.bar=()=>['SIEGE',C.siege/70,'#e0a030'];
   if(C.sT<=0&&!low&&C.siege<66){C.sT=.75;const k=((C.siege*4)|0)%2;const S=C.mk.S;const s=k?S[0]:S[1];spawn('alien',s[0],s[1],{sp:2.9})}
   if((low||C.siege>=70)&&alive().length==0){C.bar=null;say(low?'Sentries nearly dry... and they pulled back.':'They pulled back.',3);this.stage(4)}}
  if(C.stage==4){C.br+=dt;C.bar=()=>['CEILING BREACH',(C.kills-C.brK)/10,'#e0a030'];C.sT=(C.sT||0)-dt;const sp=C.kills-C.brK+alive().length;
   if(C.sT<=0&&sp<10&&alive().length<4){C.sT=1.6;const cells=[[14,12],[18,12],[22,12],[14,16],[22,16],[18,20],[14,20],[22,20]];const c=cells[(rnd()*8)|0];spawn('alien',c[0],c[1],{y:2.4});SFX.hiss()}
   if(C.kills-C.brK>=10){C.stage=5;C.bar=null;cut([{d:3,sub:'The last one drops. Silence, except for the alarms.',draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[p.x+3,3,p.z+4],c:[p.x,1,p.z],fov:.95})},
    {d:2.8,sub:'Ripley realises Newt is nowhere in the room.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(C.allies[2].x,C.allies[2].z,C.allies[2].ya,1.82)}],winCh)}}},
 draw(){C.sen&&C.sen.forEach(s=>sentryM(s.x,s.z,s.ya,s.fl&&((C.t*20)|0)%2));
  const[wx,wz]=mk('W');if(C.open[C.wk])bx(wx,2,wz,.3,.3,2,21);else bx(wx,1.1,wz,.4,2.2,2,36,[1,.95,.85],.15);
  if(C.stage==4)for(const[x,z]of[[14,12],[18,12],[22,12],[14,16],[22,16],[18,20],[14,20],[22,20]])bx(x,2.25,z,1.2,.05,1.2,21)}};
