// ===== THE HIVE — PS1-style browser game (original homage) =====
const Q=new URLSearchParams(location.search),AUTO=Q.has('auto'),MANUAL=Q.has('manual');
const $=id=>document.getElementById(id);
// ---------- GL buffers ----------
function mkVAO(){const vao=gl.createVertexArray();gl.bindVertexArray(vao);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);
 [[3,0],[2,3],[3,5],[3,8],[1,11]].forEach(([n,o],i)=>{gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,n,gl.FLOAT,false,48,o*4)});gl.bindVertexArray(null);return{vao,b,n:0,cap:0}}
const VS=mkVAO(),VE=mkVAO(),VD=mkVAO();
function upload(o,stat){gl.bindBuffer(gl.ARRAY_BUFFER,o.b);const a=VB.subarray(0,VN);
 if(stat||VN>o.cap){gl.bufferData(gl.ARRAY_BUFFER,stat?a:new Float32Array(Math.max(VN,1<<16)*1.5|0),stat?gl.STATIC_DRAW:gl.DYNAMIC_DRAW);o.cap=stat?VN:(Math.max(VN,1<<16)*1.5|0);}
 if(!stat)gl.bufferSubData(gl.ARRAY_BUFFER,0,a);o.n=VN/12;}
function drawV(o){if(!o.n)return;gl.bindVertexArray(o.vao);gl.drawArrays(gl.TRIANGLES,0,o.n);}
// static hive
VN=0;FAR=1e9;CAM=[0,0,0];hive();bx(0,1.6,14.4,3.2,3.2,.3,20,[.75,1,.9],1);bx(0,3.3,14.3,3.8,.3,.4,6);upload(VS,true);
// ---------- audio (original WebAudio synthesis) ----------
let AC=null,MG,SG,musicOn=false;
function audioInit(){if(AC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=.16;MG.connect(AC.destination);SG=AC.createGain();SG.gain.value=.5;SG.connect(AC.destination);NB=noiseBuf();musicOn=true;}catch(e){AC=null}}
let NB=null;function noiseBuf(){const b=AC.createBuffer(1,AC.sampleRate,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b}
function tone(f,d,type,g,t0,dest,f2){if(!AC)return;const t=AC.currentTime+(t0||0),o=AC.createOscillator(),a=AC.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
 a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.005);a.gain.exponentialRampToValueAtTime(.0005,t+d);o.connect(a);a.connect(dest||SG);o.start(t);o.stop(t+d+.02)}
function noise(d,g,fq,q,t0,f2){if(!AC)return;const t=AC.currentTime+(t0||0),s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(fq,t);if(f2)f.frequency.exponentialRampToValueAtTime(f2,t+d);f.Q.value=q||1;
 const a=AC.createGain();a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.01);a.gain.exponentialRampToValueAtTime(.0005,t+d);s.connect(f);f.connect(a);a.connect(SG);s.start(t,Math.random());s.stop(t+d+.05)}
const SFX={rifle:()=>{noise(.07,.35,1800,.8);tone(140,.06,'square',.12)},click:()=>tone(1400,.03,'square',.15),flame:()=>noise(.18,.12,600,.6,0,300),
 gren:()=>{tone(300,.12,'square',.1,0,0,120)},boom:()=>{noise(.9,.5,180,.7,0,60);tone(60,.6,'triangle',.4,0,0,30)},hiss:()=>noise(1.2,.3,3000,2,0,1200),
 hurt:()=>tone(180,.25,'sawtooth',.18,0,0,90),kill:()=>{noise(.3,.25,900,1,0,200);tone(400,.2,'square',.08,0,0,120)},step:()=>noise(.05,.08,400,1),plop:()=>tone(200,.25,'sine',.3,0,0,70),
 egg:()=>noise(.35,.12,500,1.5,0,1500),win:()=>[0,4,7,12].forEach((n,i)=>tone(262*2**(n/12),.5,'square',.12,i*.15)),over:()=>[7,3,0,-5].forEach((n,i)=>tone(262*2**(n/12),.6,'triangle',.2,i*.25))};
// music: step sequencer, intensity follows phase
let mStep=0,mNext=0;const BASS=[0,0,3,0,-2,0,1,0],ARP=[12,15,19,15,13,17,20,17];
function music(){if(!AC||!musicOn)return;const now=AC.currentTime;if(mNext<now)mNext=now+.05;
 const lvl={title:0,cut:1,standoff:1,torch:2,shoot:3,gren:2,escape:3,win:0,over:0}[G.phase]||0;const bpm=[84,84,100,132][lvl],st=60/bpm/2;
 while(mNext<now+.2){const i=mStep%8,bar=(mStep>>3)%4;const root=[45,45,44,46][bar];const t0=mNext-now;
  if(i%2==0||lvl>=2)tone(440*2**((root+BASS[i]-12-69)/12),st*.9,'triangle',.5,t0,MG);
  if(lvl>=1&&(i%2==1||lvl>=3))tone(440*2**((root+ARP[i]-69)/12),st*.5,'square',.12,t0,MG);
  if(lvl>=2&&i%4==0)tone(110,.12,'sine',.6,t0,MG,40);if(lvl>=3&&i%2==1)noise(.04,.08,7000,1,t0);
  if(lvl==0&&i==0&&bar==0)tone(440*2**((root+7-69)/12),st*7,'triangle',.25,t0,MG);
  mNext+=st;mStep++;}}
// ---------- input ----------
const K={},IN={mx:0,my:0,mvx:0,mvz:0,fire:false,switch:false,skip:false,ax:0,ay:0};let TOUCH=Q.has('touch')||(matchMedia('(pointer: coarse)').matches&&!matchMedia('(any-pointer: fine)').matches);
addEventListener('keydown',e=>{K[e.code]=1;if(['Space','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault();if(e.code=='KeyQ'||e.code=='KeyE'||e.code=='Tab'){IN.switch=true;e.preventDefault()}if(e.code=='Enter'||e.code=='Space')IN.skip=true;audioInit()});
addEventListener('keyup',e=>{K[e.code]=0});
const stage=$('stage');
addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect();IN.mx=(e.clientX-r.left)/r.width*2-1;IN.my=(e.clientY-r.top)/r.height*2-1});
addEventListener('mousedown',e=>{if(e.button!==0||(e.target.closest&&e.target.closest('button,.btn')))return;audioInit();IN.mfire=true;IN.skip=true});addEventListener('blur',()=>IN.mfire=false);addEventListener('mouseup',()=>IN.mfire=false);
// touch: left stick, right aim drag, buttons
let stick=null,aimT=null;
function tstart(e){audioInit();for(const t of e.changedTouches){const el=t.target;if(el.closest&&el.closest('.btn'))continue;if(G.phase=='cut'||G.phase=='title'){IN.skip=true;continue}
 if(t.clientX<innerWidth*.45&&!stick){stick={id:t.identifier,x:t.clientX,y:t.clientY,dx:0,dy:0};const s=$('stickb');s.style.display='block';s.style.left=t.clientX+'px';s.style.top=t.clientY+'px';}
 else if(!aimT)aimT={id:t.identifier,x:t.clientX,y:t.clientY};}e.preventDefault()}
function tmove(e){for(const t of e.changedTouches){if(stick&&t.identifier==stick.id){const R=50;let dx=t.clientX-stick.x,dy=t.clientY-stick.y;const l=Math.hypot(dx,dy);if(l>R){dx*=R/l;dy*=R/l}stick.dx=dx/R;stick.dy=dy/R;$('stickn').style.transform=`translate(${dx}px,${dy}px)`}
 if(aimT&&t.identifier==aimT.id){IN.ax+=(t.clientX-aimT.x)*.008;IN.ay+=(t.clientY-aimT.y)*.006;aimT.x=t.clientX;aimT.y=t.clientY}}e.preventDefault()}
function tend(e){for(const t of e.changedTouches){if(stick&&t.identifier==stick.id){stick=null;$('stickb').style.display='none';$('stickn').style.transform=''}if(aimT&&t.identifier==aimT.id)aimT=null}}
stage.addEventListener('touchstart',tstart,{passive:false});stage.addEventListener('touchmove',tmove,{passive:false});stage.addEventListener('touchend',tend);stage.addEventListener('touchcancel',tend);
const fb=$('bfire'),sb=$('bswitch');
fb.addEventListener('touchstart',e=>{audioInit();IN.tfire=true;e.preventDefault()},{passive:false});fb.addEventListener('touchend',e=>{IN.tfire=false;e.preventDefault()});
sb.addEventListener('touchstart',e=>{IN.switch=true;e.preventDefault()},{passive:false});
fb.addEventListener('mousedown',e=>{IN.mfire=true;e.stopPropagation()});sb.addEventListener('mousedown',e=>{IN.switch=true;e.stopPropagation()});
$('restart').addEventListener('click',()=>{reset();startIntro()});$('restart').addEventListener('touchend',e=>{e.preventDefault();reset();startIntro()});
$('start').addEventListener('click',()=>{audioInit();startIntro()});$('start').addEventListener('touchend',e=>{e.preventDefault();audioInit();startIntro()});
// ---------- game state ----------
let G;const NEW_EGG=[1.3,-35.3];
function reset(){G={phase:'title',t:0,pt:0,px:0,pz:13,yaw:0,pitch:-.3,hp:100,score:0,tension:20,ammo:95,gren:0,weap:'flame',unlocked:['flame'],
 burn:new Float32Array(EGGS.length),bt:new Float32Array(EGGS.length),op:new Float32Array(EGGS.length),burned:0,warriors:[],spawned:0,killed:0,nades:[],fx:[],sacHits:0,
 fall:0,qz:0,drift:[0,0],dv:[0,0],cut:null,clickT:0,fireT:0,msgT:0,hurtT:0,eggDirty:true,lastFire:0,hint:'',stepT:0,dryT:-1,result:''};QR=0;HISS=0;QTILT=0;QOFF=I();
 $('over').style.display='none';$('title').style.display='flex';}
reset();
const dirOf=(y,p)=>[-Math.sin(y)*Math.cos(p),Math.sin(p),-Math.cos(y)*Math.cos(p)];
const RHp=()=>[G.px,1.82,G.pz],NHp=()=>FPS.n?tp(FPS.n,[0,0,0]):[G.px-.34,1.66,G.pz];
function aimGround(){const o=[G.px,1.35,G.pz],d=dirOf(G.yaw,G.pitch);if(d[1]>-.02)return null;const k=(o[1]-.5)/-d[1];if(k>9)return null;return[o[0]+d[0]*k,.5,o[2]+d[2]*k]}
function eggAt(p,r){let best=-1,bd=r;EGGS.forEach(([x,z],i)=>{if(G.burn[i]>=1)return;const d=Math.hypot(x-p[0],z-p[2]);if(d<bd){bd=d;best=i}});return best}
// ---------- cutscenes ----------
const CUTS={
intro:[
 {d:3.5,sub:'Ripley sprints into the hive with Newt, glancing back for the thing chasing them...',set:u=>{G.pz=lerp(13,6.5,u/3.5);G.px=0;G.run=1},po:{run:1,yaw:-2.3,lean:.25,rf:10,nf:13},cam:()=>({e:[1.2,1.6,G.pz-3.2],c:add(RHp(),[0,-.4,0]),fov:.95})},
 {d:3,sub:'',set:u=>{G.pz=lerp(6.5,1.4,u/3)},po:{run:1,yaw:-1.4,lean:.25,rf:10,nf:13},cam:()=>({e:add(RHp(),[1.3,0,.3]),c:RHp(),fov:.72})},
 {d:5,sub:'She stops. All around her, packed close: eggs. Dozens of them.',set:u=>{G.pz=1.2;G.run=0},po:u=>({rf:u<2.5?22:10,nf:13}),cam:u=>{const k=sm(u/4.5),R=RHp();return{e:add(R,[.3*k+.15,4.2*k,-lerp(1.2,6,k)]),c:add(R,[0,-1.4*k,-k]),fov:lerp(.7,1,k)}}},
 {d:4,sub:'Deeper in, a vast translucent egg sac pulses in the dark.',po:{rf:10,nf:13},cam:u=>{const k=sm(u/4);return{e:[3.6,2.6,lerp(-21,-31,k)],c:[0,2.8,lerp(-24,-34,k)],fov:.95}}},
 {d:3.5,sub:'With a wet heave, a new egg is pushed out.',set:u=>{G.newEggU=u;if(u>1.75&&!G.plopped){G.plopped=1;SFX.plop()}},po:{rf:10,nf:13},cam:()=>({e:[3.4,1.1,-33.6],c:[1,.6,-35.3],fov:.85})},
 {d:2.2,sub:'',po:{rf:10,nf:13},cam:()=>({e:add(RHp(),[.15,0,-1.2]),c:RHp(),fov:.7})},
 {d:1.8,sub:'',po:{rf:10,nf:13},cam:()=>({e:add(NHp(),[-.3,0,-1.05]),c:NHp(),fov:.7})},
 {d:4.5,sub:'Above the sac, the queen unfolds and rises into the light.',set:u=>{QR=sm(u/4)},po:{rf:10,nf:13,pilot:1},cam:()=>({e:add(RHp(),[1.3,-.5,1.7]),c:queenHead(G.t).p,fov:.85})},
 {d:2.5,sub:'',set:u=>{HISS=sm(u/.5)*(1-sm((u-1.8)/.5));if(u<.05)SFX.hiss()},po:{rf:10,nf:13},cam:()=>{const h=queenHead(G.t).p;return{e:add(h,[-.6,-.4,3.3]),c:add(h,[0,-.2,.8]),fov:.8}}},
 {d:2.5,sub:'Ripley levels the flamethrower at the eggs. A silent threat.',po:{rf:11,nf:14,aimP:.45,pilot:1,thrust:.3},cam:()=>({e:add(RHp(),[-2.6,-.4,-1]),c:add(RHp(),[0,-.8,-1.1]),fov:.9})}],
fury:[
 {d:2.4,sub:'Beside her, an egg peels open.',set:u=>{G.op[G.openI]=sm(u/2);if(u<.05)SFX.egg()},po:{rf:10,nf:14},cam:()=>{const[x,z]=EGGS[G.openI];return{e:[x+.5,1.6,z+1.6],c:[x,.5,z],fov:.8}}},
 {d:2.2,sub:'Her fear turns to fury.',po:{rf:12,nf:14,pilot:1},cam:()=>({e:add(RHp(),[.15,0,-1.2]),c:RHp(),fov:.7})}],
scream:[
 {d:3,sub:'The queen shrieks. Her warriors charge.',set:u=>{HISS=1-sm((u-2.4)/.5);if(u<.05)SFX.hiss()},po:{rf:12,nf:14},cam:()=>{const h=queenHead(G.t).p;return{e:add(h,[.6,-.6,3.6]),c:add(h,[0,-.2,.8]),fov:.85}}},
 {d:1.8,sub:'Ripley swaps to the pulse rifle.',po:{rf:12,nf:14,rifle:1},cam:()=>({e:add(RHp(),[.2,-.1,-1.25]),c:RHp(),fov:.72})}],
gren:[
 {d:2.6,sub:'Counter at zero. One weapon left: the grenade launcher.',po:{rf:11,nf:14},cam:()=>({e:add(RHp(),[.2,-.15,-1.3]),c:RHp(),fov:.72})}],
fall:[
 {d:4,sub:'The egg sac tears apart and the queen wrenches free!',set:u=>{G.fall=sm(u/2.2);HISS=.8},po:{rf:12,nf:14},cam:()=>({e:[-3,5.2,G.pz-2],c:[0,3.2,-21],fov:.95})},
 {d:1.6,sub:'RUN!',po:{rf:10,nf:13},cam:()=>({e:add(RHp(),[.15,0,-1.2]),c:RHp(),fov:.75})}]};
function startCut(name,next){G.phase='cut';G.cut={list:CUTS[name],i:0,u:0,next,name};$('title').style.display='none';}
function startIntro(){if(G.phase!='title'&&G.phase!='win'&&G.phase!='over')return;reset();$('title').style.display='none';startCut('intro',()=>enter('standoff'))}
function enter(p){G.phase=p;G.pt=0;HISS=0;
 if(p=='standoff'){G.pz=1.2;G.px=0;G.yaw=0;G.pitch=-.35;G.weap='flame';G.hint='STANDOFF: don\'t fire. Aim at the eggs and back away (S / ↓).';G.msgT=4}
 if(p=='torch'){G.hint='Hold FIRE — torch the eggs!'}
 if(p=='shoot'){G.weap='rifle';G.unlocked=['flame','rifle'];G.pitch=0;G.hint='Pulse rifle! Cut down the warriors.'}
 if(p=='gren'){G.weap='gren';G.unlocked=['flame','rifle','gren'];G.pitch=.12;G.yaw=0;G.warriors.forEach(w=>w.flee=1);G.hint='Aim high: launch grenades into the EGG SAC.'}
 if(p=='escape'){G.weap='rifle';G.yaw=PI;G.pitch=0;G.hint='Get out! Run for the light!'}
 G.msgT=4;}
// ---------- update ----------
function hurt(n){if(AUTO)n*=.4;G.hp-=n;G.hurtT=.6;if(G.hp<=0&&G.phase!='over'){G.hp=0;G.phase='over';G.result='lose';SFX.over();showOver(false)}else if(((G.t*4)|0)%2==0)SFX.hurt()}
function showOver(win){$('over').style.display='flex';$('ovt').textContent=win?'YOU ESCAPED':'GAME OVER';$('ovs').textContent=win?`Ripley and Newt make it out. Score ${G.score}`:`Score ${G.score}. The hive claims another.`;}
function update(dt){G.t+=dt;RT=G.t;const ph=G.phase;
 if(ph=='cut'){const c=G.cut,sh=c.list[c.i];c.u+=dt;if(sh.set)sh.set(c.u);if(IN.skip&&G.t-(G.skipT||0)>.3){G.skipT=G.t;c.u=sh.d+1}
  if(c.u>=sh.d){c.i++;c.u=0;if(c.i>=c.list.length){G.cut=null;c.next()}}IN.skip=false;return}
 IN.skip=false;if(ph=='title'||ph=='win'||ph=='over')return;
 G.pt+=dt;if(G.msgT>0)G.msgT-=dt;if(G.hurtT>0)G.hurtT-=dt;
 // inputs -> movement + aim
 let mvx=(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0),mvz=(K.KeyS||K.ArrowDown?1:0)-(K.KeyW||K.ArrowUp?1:0);if(stick){mvx=stick.dx;mvz=stick.dy}
 let fire=IN.mfire||IN.tfire||K.Space;
 if(AUTO){const a=autopilot();mvx=a.mx;mvz=a.mz;fire=a.fire;}
 if(IN.switch){IN.switch=false;const u=G.unlocked;G.weap=u[(u.indexOf(G.weap)+1)%u.length]}
 const face=ph=='escape'?PI:0;
 if(!TOUCH&&!AUTO){G.yaw=face-IN.mx*1.1;G.pitch=-IN.my*.75}else if(!AUTO){G.yaw=cl(face-IN.ax,face-1.3,face+1.3);G.pitch=cl(-.3-IN.ay+ (ph=='gren'?.45:ph=='shoot'||ph=='escape'?.3:0),-.8,.6)}
 if(ph=='standoff'){ // nozzle drift the player must correct
  G.dv[0]+=(Math.random()-.5)*dt*1.6-G.drift[0]*dt*.3;G.dv[1]+=(Math.random()-.5)*dt*1.2-G.drift[1]*dt*.3;G.dv=G.dv.map(v=>v*.985);G.drift[0]=cl(G.drift[0]+G.dv[0]*dt,-.6,.6);G.drift[1]=cl(G.drift[1]+G.dv[1]*dt,-.4,.4);
  if(!AUTO){G.yaw+=G.drift[0];G.pitch+=G.drift[1]}}
 G.pitch=cl(G.pitch,-.85,.7);
 const sp=ph=='standoff'?.55:ph=='escape'?3.6:2.4;const rot=ph=='escape'?-1:1;
 G.px=cl(G.px+mvx*sp*dt*rot,-6.5,6.5);G.pz=cl(G.pz+mvz*sp*dt*rot,ph=='escape'?-8:-6,14);G.moving=Math.hypot(mvx,mvz)>.2;
 if(G.moving){G.stepT-=dt;if(G.stepT<0){G.stepT=ph=='escape'?.28:.5;SFX.step()}}
 // weapon fire
 G.firing=false;
 if(fire&&ph!='standoff'){if(G.weap=='flame'){G.firing=true;if(G.t-G.lastFire>.16){G.lastFire=G.t;SFX.flame()}
   const p=aimGround();if(p)EGGS.forEach(([x,z],i)=>{if(G.burn[i]<1&&Math.hypot(x-p[0],z-p[2])<1.4&&Math.hypot(x-G.px,z-G.pz)<8){if(G.burn[i]==0)G.eggDirty=true;G.burn[i]+=dt*1.8;if(G.burn[i]>=1){G.burn[i]=1;G.bt[i]=G.t;G.burned++;G.score+=10}}});
   G.warriors.forEach(w=>{if(!w.dead&&Math.hypot(w.x-G.px,w.z-G.pz)<5){const d=dirOf(G.yaw,0),v=[w.x-G.px,w.z-G.pz],l=Math.hypot(...v);if((d[0]*v[0]+d[2]*v[1])/l>.85)hitW(w,dt*2.5)}})}
  else if(G.weap=='rifle'){if(G.t-G.lastFire>.1){G.lastFire=G.t;if(G.ammo>0){G.ammo--;G.flash=G.t;SFX.rifle();const d=dirOf(G.yaw+(Math.random()-.5)*.04,G.pitch);let best=null,bd=99;
     G.warriors.forEach(w=>{if(w.dead)return;const v=[w.x-G.px,1.1-1.35,w.z-G.pz];const k=v[0]*d[0]+v[1]*d[1]+v[2]*d[2];if(k<0)return;const pr=Math.hypot(v[0]-d[0]*k,v[1]-d[1]*k,v[2]-d[2]*k);if(pr<.65&&k<bd){bd=k;best=w}});
     if(best){hitW(best,1);G.fx.push({p:[best.x,1.2,best.z],t:G.t,k:'spark'})}else G.fx.push({p:add([G.px,1.35,G.pz],d.map(v=>v*7)),t:G.t,k:'spark'});
     if(G.ammo==0)G.dryT=G.t}else{SFX.click();G.clickT=G.t}}}
  else if(G.weap=='gren'){if(G.t-G.lastFire>.9){G.lastFire=G.t;SFX.gren();const d=dirOf(G.yaw,G.pitch);G.nades.push({p:[G.px+.3,1.4,G.pz-.4],v:d.map(v=>v*16),t:G.t})}}}
 if(G.weap=='rifle'&&G.ammo==0&&!fire)G.clickHint=1;
 // grenades
 G.nades=G.nades.filter(n=>{n.v[1]-=9.8*dt*.35;n.p=n.p.map((v,i)=>v+n.v[i]*dt);let hit=false;
  if(G.fall<1&&n.p[2]<-21.7&&n.p[2]>-36&&Math.abs(n.p[0])<1.6&&Math.abs(n.p[1]-3.5)<1.6){hit=true;if(ph=='gren'){G.sacHits++;G.score+=250}}
  if(n.p[1]<.1||n.p[2]<-36.5||Math.abs(n.p[0])>8.5)hit=true;
  G.warriors.forEach(w=>{if(!w.dead&&Math.hypot(w.x-n.p[0],w.z-n.p[2])<1&&n.p[1]<2.2){hit=true;hitW(w,9)}});
  if(hit){G.fx.push({p:n.p.slice(),t:G.t,k:'boom'});SFX.boom()}return!hit});
 G.fx=G.fx.filter(f=>G.t-f.t<(f.k=='boom'?2.5:.15));
 // warriors
 G.warriors.forEach(w=>{if(w.dead){w.dead=Math.min(1,w.dead+dt*2);return}const dx=G.px-w.x,dz=G.pz-w.z,l=Math.hypot(dx,dz);w.ya=Math.atan2(dx,dz);w.ph+=dt*6;
  if(w.flee){w.z-=dt*4;w.x+=Math.sign(w.x||1)*dt*2;if(w.z<-16)w.gone=1;return}
  if(ph=='standoff'){const want=lerp(7.5,1.6,G.tension/100),side=w.side;const tx=G.px+side*2.4,tz=G.pz-want;w.x+=(tx-w.x)*dt*1.5;w.z+=(tz-w.z)*dt*1.5;return}
  if(l>1.1){w.x+=dx/l*w.sp*dt;w.z+=dz/l*w.sp*dt}else hurt(18*dt)});
 G.warriors=G.warriors.filter(w=>!w.gone);
 // phase logic
 if(ph=='standoff'){if(!G.warriors.length)[-1,1].forEach(s=>G.warriors.push({x:s*5,z:-6,side:s,ph:0,hp:4,sp:2.5}));
  const p=aimGround();const on=p&&eggAt(p,.75)>=0&&Math.hypot(p[0]-G.px,p[2]-G.pz)<6;G.onTarget=on;
  G.tension=cl(G.tension+(on?-16:34)*dt,0,100);if(fire&&G.pt>1){G.tension=cl(G.tension+60*dt,0,100);G.hint='NO FIRING YET! Just keep it aimed at the eggs and back away (S / ↓).';G.msgT=2}else if(G.msgT<=0){G.hint='STANDOFF: don\'t fire. Aim at the eggs and back away (S / ↓).';G.msgT=1}
  if(G.tension>=100){hurt(25);G.tension=55;SFX.hiss();G.hint='The warriors lunge! Keep the nozzle on the eggs!';G.msgT=2.5}
  HISS=G.tension>70?.6:0;QTILT=on?.35:0;G.score+=on?Math.round(dt*20):0;
  if(G.pz>=4.6){G.score+=Math.round(200*(G.hp/100));let bi=-1,bd=9;EGGS.forEach(([x,z],i)=>{const d=Math.hypot(x-G.px-.8,z-G.pz+1.5);if(d<bd){bd=d;bi=i}});G.openI=bi;G.warriors.forEach(w=>w.flee=1);
   startCut('fury',()=>enter('torch'))}}
 if(ph=='torch'){if(G.burned>=24||G.pt>30){startCut('scream',()=>{G.warriors=[];enter('shoot')})}}
 if(ph=='shoot'){const alive=G.warriors.filter(w=>!w.dead).length;if(G.spawned<9&&alive<3&&G.pt>.5&&(!G.lastSpawn||G.t-G.lastSpawn>1.6)){G.lastSpawn=G.t;const s=G.spawned%2?1:-1;G.warriors.push({x:s*(5+Math.random()*2),z:G.pz-9-Math.random()*4,side:s,ph:0,hp:4,sp:2.6});G.spawned++}
  if(G.ammo==0&&G.t-G.dryT>1.6&&G.clickT>G.dryT){startCut('gren',()=>enter('gren'))}else if(G.ammo==0&&G.t-G.dryT>3.5){startCut('gren',()=>enter('gren'))}
  if(G.spawned>=9&&alive==0&&G.ammo>0){G.score+=G.ammo*5;G.ammo=0;G.dryT=G.t;G.clickT=G.t+.01;SFX.click()}}
 if(ph=='gren'){HISS=.4+.3*Math.sin(G.t*2);if(G.sacHits>=4){startCut('fall',()=>enter('escape'))}}
 if(ph=='escape'){if(G.pt>1.2)G.qz+=dt*(G.pt<3?2:3.1);QOFF=T(0,0,G.qz);G.fall=1;const qh=-19+G.qz+4;if(G.pz-qh<2.2)hurt(30*dt);
  if(G.pz>=13.4){G.phase='win';G.score+=Math.round(G.hp*10);SFX.win();showOver(true)}}
}
function hitW(w,n){w.hp-=n;if(w.hp<=0&&!w.dead){w.dead=.01;G.killed++;G.score+=100;SFX.kill()}}
// ---------- autopilot (testing) ----------
function autopilot(){const ph=G.phase;let mx=0,mz=0,fire=false;const aimAt=(x,y,z)=>{const v=[x-G.px,y-1.35,z-G.pz];G.yaw=Math.atan2(-v[0],-v[2]);G.pitch=Math.atan2(v[1],Math.hypot(v[0],v[2]))};
 if(ph=='standoff'){let bi=-1,bd=99;EGGS.forEach(([x,z],i)=>{const d=Math.hypot(x-G.px,z-(G.pz-2.5));if(z<G.pz-1&&d<bd){bd=d;bi=i}});if(bi>=0)aimAt(EGGS[bi][0],.5,EGGS[bi][1]);mz=1}
 if(ph=='torch'){let bi=-1,bd=99;EGGS.forEach(([x,z],i)=>{if(G.burn[i]>=1)return;const d=Math.hypot(x-G.px,z-G.pz);if(d<bd&&d>1.5){bd=d;bi=i}});if(bi>=0)aimAt(EGGS[bi][0],.5,EGGS[bi][1]);fire=true}
 if(ph=='shoot'){const w=G.warriors.filter(w=>!w.dead).sort((a,b)=>Math.hypot(a.x-G.px,a.z-G.pz)-Math.hypot(b.x-G.px,b.z-G.pz))[0];if(w){aimAt(w.x,1.1,w.z);fire=true}else{G.yaw=0;G.pitch=0;fire=G.spawned>=9}}
 if(ph=='gren'){G.yaw=0;G.pitch=Math.atan2(3.5-1.4+3,Math.abs(-26-G.pz))*.5+.05;const d=Math.abs(-26-G.pz);G.pitch=Math.asin(cl(9.8*.35*d/(16*16),-1,1))/2+Math.atan2(2.1,d)*.6;fire=true}
 if(ph=='escape'){G.yaw=PI;G.pitch=0;mz=-1}
 return{mx,mz,fire}}
// ---------- render ----------
function rebuildEggs(){VN=0;FAR=1e9;CAM=[0,0,0];EGGS.forEach(([x,z],i)=>{const b=G.burn[i];if(b>0&&(b<1||G.t-G.bt[i]<3))return;if(G.op[i]>0)return;
  if(G.burn[i]>=1){bx(x,.12,z,.55,.24,.55,21,[.5,.45,.4]);bx(x,.3,z,.35,.25,.35,21,[.35,.3,.3]);}else egg(x,z,0,0,0,i)});upload(VE,true);G.eggDirty=false;G.lastEggBuild=G.t}
function render(){const ph=G.phase,c=G.cut,sh=c?c.list[c.i]:null;let po=sh?(typeof sh.po=='function'?sh.po(c.u):sh.po):null;
 // egg buffer: rebuild when burn states change (throttled)
 const transitioning=EGGS.some((e,i)=>G.burn[i]>=1&&G.t-G.bt[i]>3&&G.t-G.bt[i]<3.4);
 if(G.eggDirty||(transitioning&&G.t-(G.lastEggBuild||0)>.4)||G.lastEggBuild==null)rebuildEggs();
 VN=0;FAR=60;
 let cm;if(sh)cm=sh.cam(c.u);else if(ph=='title'){const a=G.t*.15;cm={e:[Math.sin(a)*5,3.2,1.5+Math.cos(a)*3],c:[0,2,-10],fov:1}}
 else{const d=dirOf(G.yaw,0),r=[-d[2],0,d[0]],back=PORT?3.4:2.7,up=PORT?2.6:2.2;cm={e:[G.px-d[0]*back+r[0]*.75,up,G.pz-d[2]*back+r[2]*.75],c:[G.px+d[0]*6,1.3+Math.tan(G.pitch)*6*.8,G.pz+d[2]*6],fov:PORT?1.2:.95}}
 CAM=cm.e;
 // dynamic geometry
 const B=M(T(G.px,0,G.pz),RY(PI+(sh?0:G.yaw)));
 const wpn=po&&po.rifle?'rifle':G.weap;
 const o=po?Object.assign({walk:!!po.run,aimP:0,yaw:0,newtYaw:-.5},po):{walk:G.moving,run:ph=='escape',lean:ph=='escape'?.25:0,rf:ph=='torch'||ph=='shoot'?12:ph=='escape'?10:11,nf:ph=='standoff'||ph=='escape'?13:14,aimP:-G.pitch*.9,pilot:wpn=='flame',newtYaw:-.5,thrust:ph=='standoff'?.25+.1*Math.sin(G.t*3):0};
 ripley(B,o,G.t*(o.run?5:4));
 if(G.firing&&G.weap=='flame'&&MUZ){const p0=tp(MUZ,[0,0,0]),f=nrm(sub(tp(MUZ,[0,0,1]),p0));for(let i=0;i<14;i++){const d=(i+(G.t*20)%1)*.45,w=.12+d*.13;const p=add(p0,f.map(v=>v*d));bx(p[0],p[1]-d*d*.02,p[2],w,w,w,15,[1,1,1],1,RY(i+G.t*7))}}
 if(G.flash&&G.t-G.flash<.05&&MUZ){const p=tp(MUZ,[0,.13,.25]);bx(p[0],p[1],p[2],.14,.14,.14,7,[1,.85,.45],1)}
 EGGS.forEach(([x,z],i)=>{const b=G.burn[i];if(G.op[i]>0){egg(x,z,G.op[i],0,G.t,i);return}if(b>0&&(b<1||G.t-G.bt[i]<3))egg(x,z,0,b<1?b:1-sm((G.t-G.bt[i]-2)/1),G.t,i)});
 if(G.newEggU!=null)newEgg(40.6+G.newEggU);
 queen(G.t,G.fall);
 G.warriors.forEach(w=>warrior(M(T(w.x,0,w.z),RY(w.ya||0)),w.ph,w.dead));
 G.nades.forEach(n=>bx(n.p[0],n.p[1],n.p[2],.14,.14,.14,6));
 G.fx.forEach(f=>{const u=G.t-f.t;if(f.k=='spark'){for(let j=0;j<3;j++)bx(f.p[0]+(H1(j+f.t)-.5)*.3,f.p[1]+(H1(j*3+f.t)-.5)*.3,f.p[2],.07,.07,.07,7,[1,.9,.5],1)}
  else{const k=sm(u/.6),fa=1-sm((u-1)/1.4);if(fa>0)for(let j=0;j<7;j++){const a=H1(j*9+f.t)*6.28,r=k*1.3*(.5+H1(j+3)*.5);const s=.7*k*fa+.08;bx(f.p[0]+Math.cos(a)*r,f.p[1]+Math.sin(a*1.3)*r*.6,f.p[2]+Math.sin(a)*r,s,s,s,15,[1,1,1],1,RY(a))}}});
 // reticle
 if(!sh&&ph!='title'&&ph!='win'&&ph!='over'){const p=(G.weap=='flame')?aimGround():null;if(p){bx(p[0],.52,p[2],.5,.02,.08,7,G.onTarget||ph!='standoff'?[.5,1,.6]:[1,.8,.3],1);bx(p[0],.52,p[2],.08,.02,.5,7,G.onTarget||ph!='standoff'?[.5,1,.6]:[1,.8,.3],1)}}
 upload(VD,false);
 gl.viewport(0,0,W,H);const fc=[.09,.14,.15];gl.clearColor(...fc,1);gl.clear(16640);gl.enable(gl.DEPTH_TEST);
 const P=persp(cm.fov,W/H,.05,120);VP=mul(P,look(cm.e,cm.c,[0,1,0]));gl.uniformMatrix4fv(U('VP'),false,VP);gl.uniform3fv(U('cam'),cm.e);gl.uniform3fv(U('fc'),fc);gl.uniform2fv(U('FD'),[14,42]);gl.uniform3fv(U('LD'),[.3,.75,-.6]);
 drawV(VS);drawV(VE);drawV(VD);
 hud(sh,cm);}
// ---------- HUD (DOM, crisp text) ----------
let lastHud='';
function hud(sh,cm){const ph=G.phase;const st=[];
 const show=!sh&&!['title','win','over'].includes(ph);$('hud').style.display=show?'block':'none';$('sub').style.display=sh&&sh.sub?'block':'none';if(sh)$('sub').textContent=sh.sub;
 $('skip').style.display=sh?'block':'none';$('ctrls').style.display=TOUCH&&show?'block':'none';
 if(show){$('hp').style.width=G.hp+'%';$('score').textContent='SCORE '+G.score;
  $('tens').style.display=ph=='standoff'?'block':'none';$('tensf').style.width=G.tension+'%';$('tensf').style.background=G.tension>70?'#e0a030':'#7ac0a0';
  $('ammo').style.display=G.weap=='rifle'?'block':'none';$('ammon').textContent=String(G.ammo).padStart(2,'0');$('click').style.visibility=(G.ammo==0&&G.t-G.clickT<.6)?'visible':'hidden';
  $('weap').textContent={flame:'FLAMETHROWER',rifle:'PULSE RIFLE',gren:'GRENADES'}[G.weap];
  const obj={standoff:`Edge back: ${Math.max(0,4.6-G.pz).toFixed(1)} m`,torch:`Eggs burned ${G.burned}/24`,shoot:`Warriors ${G.killed}/9`,gren:`Sac hits ${G.sacHits}/4`,escape:'Reach the exit!'}[ph]||'';$('obj').textContent=obj;
  $('hint').textContent=G.msgT>0?G.hint:'';$('vig').style.opacity=G.hurtT>0?Math.min(.5,G.hurtT):0;
  const glow=(ph=='torch'||G.firing&&G.weap=='flame')?.1:0;$('glow').style.opacity=glow;}
 else{$('vig').style.opacity=0;$('glow').style.opacity=ph=='cut'&&G.cut&&G.cut.name=='scream'?.06:0}}
// ---------- loop ----------
let last=performance.now(),acc=0,fpsN=0,fpsT=0,FPSV=0;
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(G.phase=='title'){G.t+=dt}else update(dt);music();render();fpsN++;fpsT+=dt;if(fpsT>1){FPSV=fpsN/fpsT;fpsN=0;fpsT=0;if(Q.has('fps'))$('fps').textContent=FPSV.toFixed(0)+' fps'}if(!MANUAL)requestAnimationFrame(frame)}
window.__game={get G(){return G},start:()=>{audioInit();startIntro()},step:(n,dt)=>{dt=dt||1/30;for(let i=0;i<n;i++){if(G.phase=='title')G.t+=dt;else update(dt)}render()},skip:()=>{IN.skip=true},fps:()=>FPSV,
 perf:n=>{const t0=performance.now();for(let i=0;i<n;i++){update(1/60);render()}gl.finish();return (performance.now()-t0)/n}};
if(!MANUAL)requestAnimationFrame(frame);else render();
