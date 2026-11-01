// ---------- campaign runtime ----------
let CMX=0,CMY=0,CMT=-9;addEventListener('mousemove',e=>{const r=g.getBoundingClientRect();CMX=(e.clientX-r.left)/r.width*2-1;CMY=(e.clientY-r.top)/r.height*2-1;CMT=performance.now()});
stage.addEventListener('touchstart',e=>{if(CH!=7&&C&&C.mode=='cut'){for(const t of e.changedTouches)if(!(t.target.closest&&t.target.closest('.btn')))IN.skip=true}},{passive:true});
const WPN={rifle:{n:'PULSE RIFLE',rate:.09,mag:95,dmg:1,rng:17},smart:{n:'SMARTGUN',rate:.065,mag:500,dmg:1,rng:18,auto:1},flame:{n:'FLAMETHROWER',rate:.1,mag:300,dmg:3.5,rng:5.5},gren:{n:'GRENADE',rate:.8,mag:6,dmg:6,rng:14},none:{n:'UNARMED',rate:1,mag:0,dmg:0,rng:0}};
function newC(n){return{n,mode:'cut',t:0,pt:0,p:{x:0,z:0,ya:PI,hp:100,ph:0,moving:0},allies:[],en:[],fx:[],nades:[],weaps:['rifle'],wi:0,ammo:{},rel:0,fireT:0,fireN:0,kills:0,obj:'',hint:'',msgT:0,hurtT:0,act:null,actP:0,goal:null,mus:'standoff',fc:[.07,.1,.11],fd:[14,40],flowT:0,D:null,trk:false,stage:0,latch:null,beepT:0}}
function startCh(n){audioInit();$('title').style.display='none';$('over').style.display='none';$('chap').style.display='none';
 if(n==7){goTitle(true);startIntro();return}
 CH=n;G.phase='camp';C=newC(n);for(const w in WPN)C.ammo[w]=WPN[w].mag;LV[n].init();C.chapT=0}
function goTitle(keep){CH=7;C=null;$('trk').style.display='none';$('chap').style.display='none';VN=0;FAR=1e9;CAM=[0,0,0];hive();bx(0,1.6,14.4,3.2,3.2,.3,20,[.75,1,.9],1);bx(0,3.3,14.3,3.8,.3,.4,6);upload(VS,true);reset();G.eggDirty=true;if(!keep)buildMenu()}
function cut(list,next){C.mode='cut';C.cut={list,i:0,u:0,next};IN.skip=false}
function play(mode){C.mode=mode||'foot';C.pt=0;C.cut=null}
function say(h,t){C.hint=h;C.msgT=t||4}
function churt(n){if(C.mode=='done')return;if(AUTO)n*=.3;C.p.hp-=n;C.hurtT=.5;if(C.p.hp<=0){C.p.hp=0;C.mode='done';SFX.over();overC(false)}else if(((C.t*4)|0)%2==0)SFX.hurt()}
function winCh(){if(C.mode=='done')return;C.mode='done';SFX.win();unlock(C.n+1);overC(true)}
function overC(win){$('over').style.display='flex';const n=C.n;$('ovt').textContent=win?(n==8?'THE END':'CHAPTER '+n+' COMPLETE'):'MISSION FAILED';
 $('ovs').textContent=win?(n==8?'The queen is gone. Ripley, Newt, Hicks and Bishop sleep the long way home. Thanks for playing.':`${CHN[n]} — kills ${C.kills}. Next: ${CHN[n+1]}`):`${CHN[n]}: try again.`;
 $('next').style.display=win&&n<8?'inline-block':'none';$('restart').textContent=win?'REPLAY':'RETRY';}
// enemies
function spawn(k,x,z,o){if(C.map&&solid(x,z)){let b=null,bd=1e9;C.map.forEach((r,j)=>[...r].forEach((c,i)=>{if(!solid(i*CS,j*CS)){const d=Math.hypot(i*CS-x,j*CS-z);if(d<bd){bd=d;b=[i*CS,j*CS]}}}));if(b){x=b[0];z=b[1]}}const e=Object.assign({k,x,z,hp:k=='hugger'?1:3,ph:rnd()*6,ya:0,dead:0,atkT:0,y:0,sp:k=='hugger'?4.4:3.1},o||{});if(e.sp&&AUTO&&k!='hugger')e.sp*=.85;C.en.push(e);return e}
const alive=()=>C.en.filter(e=>!e.dead);
function killE(e){if(e.dead)return;e.dead=.01;C.kills++;SFX.kill();for(let j=0;j<5;j++)C.fx.push({k:'acid',p:[e.x,1,e.z],v:[(rnd()-.5)*3,2+rnd()*2,(rnd()-.5)*3],t:C.t})}
function dmgE(e,d){e.hp-=d;e.hitT=C.t;if(e.hp<=0)killE(e)}
function boom(x,z,r,d){SFX.boom();C.fx.push({k:'boom',p:[x,1,z],t:C.t});C.en.forEach(e=>{if(!e.dead&&Math.hypot(e.x-x,e.z-z)<r)dmgE(e,d)})}
// camera helpers
function footCam(){const p=C.p;return PORT?{e:[p.x,14.5,p.z+6.2],c:[p.x,0,p.z-1.2],fov:1.02}:{e:[p.x,9,p.z+6],c:[p.x,0,p.z-.8],fov:.95}}
function rayGround(cm,mx,my,h){const f=nrm(sub(cm.c,cm.e)),x=nrm(crs(f,[0,1,0])),y=crs(x,f),t=Math.tan(cm.fov/2);const d=[0,1,2].map(i=>f[i]+x[i]*mx*t*W/H+y[i]*(-my)*t);if(d[1]>-.01)return null;const k=(h-cm.e[1])/d[1];return[cm.e[0]+d[0]*k,h,cm.e[2]+d[2]*k]}
const CU=(x,z,ya,h,d,side)=>({e:[x+Math.sin(ya)*(d||1.15)+Math.cos(ya)*(side||0),h+.05,z+Math.cos(ya)*(d||1.15)-Math.sin(ya)*(side||0)],c:[x,h,z],fov:.72}); // face close-up
// ---------- update ----------
const _upd=update,_ren=render,_hud=hud,_mus=music,_over=showOver;
update=function(dt){if(CH==7)return _upd(dt);campUpdate(dt)};
render=function(){if(CH==7)return _ren();campRender()};
music=function(){if(CH==7||!C)return _mus();const ph=G.phase;G.phase=C.mus;_mus();G.phase=ph};
showOver=function(win){_over(win);if(win){unlock(8);$('ovt').textContent='CHAPTER 7 COMPLETE';$('ovs').textContent=`Ripley and Newt make it out of the hive. Score ${G.score}. Next: SULACO`}$('next').style.display=win?'inline-block':'none';$('restart').textContent=win?'REPLAY':'RETRY'};
function input(){let mvx=(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0),mvz=(K.KeyS||K.ArrowDown?1:0)-(K.KeyW||K.ArrowUp?1:0);if(stick){mvx=stick.dx;mvz=stick.dy}
 const l=Math.hypot(mvx,mvz);if(l>1){mvx/=l;mvz/=l}return{mx:mvx,mz:mvz,fire:!!(IN.mfire||IN.tfire||K.Space)}}
function campUpdate(dt){C.t+=dt;RT=C.t;G.t+=dt;
 if(C.mode=='cut'){const c=C.cut,sh=c.list[c.i];c.u+=dt;if(sh.set)sh.set(c.u);if(IN.skip&&C.t-(C.skipT||0)>.3){C.skipT=C.t;c.u=sh.d+1}
  if(c.u>=sh.d){c.i++;c.u=0;if(c.i>=c.list.length){C.cut=null;c.next()}}IN.skip=false;IN.switch=false;C.chapT+=dt;return}
 IN.skip=false;C.chapT+=dt;if(C.mode=='done')return;
 C.pt+=dt;if(C.msgT>0)C.msgT-=dt;if(C.hurtT>0)C.hurtT-=dt;
 let I=input();if(AUTO){const a=LV[C.n].ap?LV[C.n].ap():apFoot();I.mx=a.mx||0;I.mz=a.mz||0;I.fire=!!a.fire;if(a.ya!=null)C.p.ya=a.ya;if(a.sx!=null)C.apSX=a.sx}
 if(I.fire)C.fireN++;C.in=I;
 if(C.mode=='foot')footStep(dt,I);else if(C.mode=='drive')driveStep(dt,I);else if(C.mode=='loader')loaderStep(dt,I);
 if(C.mode!='done'&&LV[C.n].step)LV[C.n].step(dt,I);
 C.fx=C.fx.filter(f=>C.t-f.t<(f.k=='boom'?2.2:f.k=='acid'?.8:.07));IN.switch=false}
function footStep(dt,I){const p=C.p,cm=footCam();
 // weapon switch
 if(IN.switch&&C.weaps.length>1){C.wi=(C.wi+1)%C.weaps.length;say(WPN[C.weaps[C.wi]].n,1.2);SFX.click()}
 const wn=C.weaps[C.wi],W0=WPN[wn];
 // movement
 const sp=(C.speed||4.6)*(C.latch?.35:1);moveE(p,I.mx*sp*dt,I.mz*sp*dt,.32);p.moving=Math.hypot(I.mx,I.mz)>.1;if(p.moving)p.ph+=dt*9;
 // aim
 const vis=alive().filter(e=>e.y<.5&&dist(p,e)<(W0.rng||12)+2&&los(p.x,p.z,e.x,e.z));let tgt=null;
 if(!AUTO){if(!TOUCH&&performance.now()-CMT<1e5){const gp=rayGround(cm,CMX,CMY,1.2);if(gp){p.ya=Math.atan2(gp[0]-p.x,gp[2]-p.z);let bd=.35;vis.forEach(e=>{const a=Math.abs(((Math.atan2(e.x-p.x,e.z-p.z)-p.ya+PI*3)%(PI*2))-PI);if(a<bd){bd=a;tgt=e}})}}
  else{let bd=1e9;vis.forEach(e=>{const d=dist(p,e);if(d<bd){bd=d;tgt=e}});if(!tgt&&p.moving)p.ya=Math.atan2(I.mx,I.mz)}
  if(W0.auto&&!tgt){let bd=1e9;vis.forEach(e=>{const d=dist(p,e);if(d<bd){bd=d;tgt=e}})}
  if(tgt&&wn!='gren')p.ya=Math.atan2(tgt.x-p.x,tgt.z-p.z)}
 else{let bd=1e9;vis.forEach(e=>{const d=dist(p,e);if(d<bd){bd=d;tgt=e}});if(tgt)p.ya=Math.atan2(tgt.x-p.x,tgt.z-p.z);else if(p.moving)p.ya=Math.atan2(I.mx,I.mz)}
 // interaction zones / hugger latch take FIRE first
 let fire=I.fire;C.actOn=false;
 if(C.latch){if(fire){C.latchP=(C.latchP||0)+dt;if(C.latchP>1){killE(C.latch);C.latch=null;C.latchP=0;say('Tore it off!',1.5)}}else C.latchP=Math.max(0,(C.latchP||0)-dt*.5);if(C.latch){C.latch.x=p.x;C.latch.z=p.z;churt(7*dt)}fire=false}
 if(C.act&&dist(p,C.act)<C.act.r){C.actOn=true;if(fire){C.actP+=dt/C.act.dur;if(((C.t*6)|0)%2)noise(.05,.05,C.act.snd||2500,3);if(C.actP>=1){const a=C.act;C.act=null;C.actP=0;a.done()}}fire=false}
 // shooting
 C.firing=false;if(C.rel>0){C.rel-=dt;if(C.rel<=0){C.ammo[wn]=W0.mag;say('Reloaded',1)}}
 if(fire&&wn!='none'&&C.rel<=0){if(C.ammo[wn]<=0){if(wn=='rifle'){C.rel=1.2;say('Reloading...',1.2)}else if(C.t-(C.clickT||0)>.4){C.clickT=C.t;SFX.click()}}
  else if(C.t-C.fireT>W0.rate){C.fireT=C.t;C.ammo[wn]--;C.firing=true;fireW(wn,p.ya)}}
 // enemies
 C.flowT-=dt;if(C.flowT<=0||!C.D){C.flowT=.35;C.D=bfs(p.x,p.z)}
 C.en.forEach(e=>{if(e.dead){e.dead+=dt;return}e.ph+=dt*(e.k=='hugger'?14:7);
  if(e.y>0){e.y=Math.max(0,e.y-dt*3.5);return}
  if(e.idle){if(dist(p,e)<(e.wake||6)&&los(p.x,p.z,e.x,e.z))e.idle=0;else return}
  if(e===C.latch)return;
  const d=dist(p,e);if(e.k=='hugger'&&d<2.4&&!C.latch&&C.t-(e.jT||-9)>2){e.jT=C.t;if(d<1.1){C.latch=e;C.latchP=0;SFX.hiss();say('FACEHUGGER! Hold FIRE to tear it off!',2.5);return}}
  if(d>(e.k=='hugger'?.5:1.05)){const dir=pathDir(C.D,e,p.x,p.z);const s=e.sp*(e.hitT&&C.t-e.hitT<.15?.3:1);moveE(e,dir[0]*s*dt,dir[1]*s*dt,.3);if(dir[2]>0)e.ya=Math.atan2(dir[0],dir[1])}
  else if(e.k!='hugger'&&C.t-e.atkT>.8){e.atkT=C.t;churt(9)}});
 C.en=C.en.filter(e=>!e.dead||e.dead<2.5);
 // allies
 C.allies.forEach((a,i)=>{if(a.gone)return;const off=[[-1.3,1.1],[1.3,1.1],[0,1.8],[-1.6,-.4]][i%4];const tx=p.x+off[0],tz=p.z+off[1];
  if(a.hold){a.moving=0}else{const d=Math.hypot(tx-a.x,tz-a.z);if(d>.6){const dir=d>3.5&&C.D?pathDir(C.D,a,p.x,p.z):[(tx-a.x)/d,(tz-a.z)/d,d];const s=Math.min(5.4,d*2.2);moveE(a,dir[0]*s*dt,dir[1]*s*dt,.3);a.moving=1;a.ph+=dt*9;a.ya=Math.atan2(dir[0],dir[1])}else a.moving=0}
  if(a.gun&&a.gun!='none'){let t=null,bd=12;alive().forEach(e=>{if(e.y>.5||e.idle)return;const d=dist(a,e);if(d<bd&&los(a.x,a.z,e.x,e.z)){bd=d;t=e}});
   if(t){a.ya=Math.atan2(t.x-a.x,t.z-a.z);if(C.t-(a.fT||0)>(a.gun=='smart'?.12:.22)){a.fT=C.t;dmgE(t,.5);C.fx.push({k:'tr',a:[a.x+Math.sin(a.ya)*.5,1.35,a.z+Math.cos(a.ya)*.5],b:[t.x,1.1,t.z],t:C.t});if(i==0&&((C.t*8)|0)%2)noise(.05,.12,1600,.8)}}}});
 // grenades
 C.nades.forEach(n=>{n.t+=dt;n.x+=n.vx*dt;n.z+=n.vz*dt;if(n.t>n.T||solid(n.x,n.z)){n.dead=1;boom(n.x,n.z,2.8,6)}});C.nades=C.nades.filter(n=>!n.dead);
 // tracker
 if(C.trk){let nd=1e9;alive().forEach(e=>nd=Math.min(nd,dist(p,e)));if(C.goal)nd=Math.min(nd,dist(p,C.goal)+4);C.beepT-=dt;if(nd<22&&C.beepT<=0){C.beepT=.25+nd/22*1.1;tone(nd<8?1560:1180,.07,'sine',.12)}}}
function fireW(wn,ya){const p=C.p,W0=WPN[wn],dx=Math.sin(ya),dz=Math.cos(ya),m=[p.x+dx*.55,1.35,p.z+dz*.55];
 if(wn=='rifle'||wn=='smart'){SFX.rifle();let best=null,bd=W0.rng;alive().forEach(e=>{if(e.y>.5)return;const rx=e.x-p.x,rz=e.z-p.z,along=rx*dx+rz*dz,perp=Math.abs(rx*dz-rz*dx);if(along>0&&along<bd&&perp<(e.k=='hugger'?.5:.65)&&los(p.x,p.z,e.x,e.z)){bd=along;best=e}});
  let L=bd;if(!best){L=0;while(L<W0.rng&&!solid(p.x+dx*L,p.z+dz*L))L+=.3}else dmgE(best,W0.dmg);C.fx.push({k:'tr',a:m,b:[p.x+dx*L,1.2,p.z+dz*L],t:C.t});C.flash=C.t}
 else if(wn=='flame'){if(((C.t*10)|0)%2==0)SFX.flame();alive().forEach(e=>{const rx=e.x-p.x,rz=e.z-p.z,along=rx*dx+rz*dz,perp=Math.abs(rx*dz-rz*dx);if(along>0&&along<W0.rng&&perp<.6+along*.3&&los(p.x,p.z,e.x,e.z))dmgE(e,W0.dmg*W0.rate)})}
 else if(wn=='gren'){SFX.gren();C.nades.push({x:m[0],z:m[2],vx:dx*14,vz:dz*14,t:0,T:.75})}}
// default autopilot for foot mode: go to C.goal, shoot visible enemies, hold fire in act zones / latched
function apFoot(){const p=C.p;if(C.mode=='drive')return apDrive();if(C.mode=='loader')return{};let mx=0,mz=0,fire=false;
 if(C.latch)return{fire:true};
 if(C.act&&dist(p,C.act)<C.act.r*.8)return{fire:true};
 const g=C.act||C.goal;if(g){const n=navIn(g.x,g.z);if(n.l>.3){mx=n.mx;mz=n.mz}}
 const near=alive().filter(e=>e.y<.5&&!e.idle&&dist(p,e)<9&&los(p.x,p.z,e.x,e.z));if(near.length&&C.weaps[C.wi]!='none'){fire=true;if(C.act&&dist(p,C.act)<C.act.r)fire=false}
 if(C.weaps[C.wi]=='none'){const th=alive().filter(e=>dist(p,e)<3.2);th.forEach(e=>{const d=dist(p,e)+.01;mx+=(p.x-e.x)/d*.6;mz+=(p.z-e.z)/d*.6})}
 return{mx,mz,fire}}
