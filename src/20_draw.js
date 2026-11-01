// ---------- drive mode ----------
function setupDrive(len,o){C.drv=Object.assign({x:0,z:0,v:0,len,obs:[],t:0,wind:0},o||{});const D=C.drv;let z=-30;
 while(z>-len+10){const k=rnd();const x=(rnd()-.5)*9;if(k<.45)D.obs.push({k:'rock',x,z});else if(k<.7)D.obs.push({k:'wreck',x,z});else D.obs.push({k:'alien',x,z,ph:rnd()*6,vx:(rnd()-.5)*2});z-=(o&&o.gap||16)*(.6+rnd()*.8)}}
function buildRoad(len,inside){for(let z=10;z>-len-40;z-=4){bx(0,-.05,z,inside?10:12,.1,4,inside?35:38,inside?[.9,.9,.9]:[.8,.78,.72]);
 for(const s of[-1,1]){const h=inside?3.6:1.5+H1(z*.37+s)*4;bx(s*(inside?6:7+H1(z)*1.5),h/2,z,inside?2:3,h,4.1,inside?(((z/4)|0)%3?37:39):38,inside?[1,1,1]:[.7,.68,.62]);
  if(!inside&&((z/4)|0)%6==0)bx(s*5.6,2,z,.2,4,.2,6),bx(s*5.2,4,z,.9,.15,.2,7,[1,.95,.7],1);if(inside&&((z/4)|0)%4==0)bx(s*4.6,3.4,z,.3,.2,3,7,[.9,1,.85],.8)}
 if(inside)bx(0,3.8,z,10,.2,4,37,[.8,.8,.8])}}
function driveStep(dt,I){const D=C.drv;D.t+=dt;const boost=I.fire;D.v=lerp(D.v,boost?21:13,dt*1.5);D.z-=D.v*dt;D.wind=Math.sin(D.t*.7)*Math.sin(D.t*.23)*(C.windy?1.6:0);
 let sx=I.mx;if(!AUTO&&!TOUCH&&performance.now()-CMT<3000&&!K.KeyA&&!K.KeyD&&!K.ArrowLeft&&!K.ArrowRight)sx=cl((CMX*5-D.x)*.8,-1,1);if(AUTO&&C.apSX!=null)sx=C.apSX;
 D.x=cl(D.x+(sx*7+D.wind)*dt,-4.6,4.6);D.boost=boost;
 D.obs.forEach(o=>{if(o.hit)return;if(o.k=='alien'){o.ph+=dt*8;o.x=cl(o.x+o.vx*dt+(D.x-o.x)*dt*.4,-4.5,4.5);o.z+=dt*2}
  if(Math.abs(o.z-D.z)<2.6&&Math.abs(o.x-D.x)<(o.k=='rock'?1.9:2)){o.hit=C.t;if(o.k=='alien'){if(boost){C.kills++;SFX.kill();for(let j=0;j<5;j++)C.fx.push({k:'acid',p:[o.x,1,o.z],v:[(rnd()-.5)*5,3,(rnd()-.5)*3],t:C.t})}else{churt(10);SFX.hiss();say('It\'s on the hull — BOOST (FIRE) to ram them!',2)}}else{churt(o.k=='rock'?12:9);D.v*=.5;SFX.boom()}}});
 if(-D.z>=D.len&&!C.dd){C.dd=1;(C.onDrive||LV[C.n].driveDone)()}}
function apDrive(){const D=C.drv;let best=0,bs=-1e9;for(let x=-4;x<=4;x+=1){let s=-Math.abs(x-D.x)*.3;D.obs.forEach(o=>{if(o.hit)return;const ah=D.z-o.z;if(ah<0||ah>34)return;const w=o.k=='alien'?-1:1;if(Math.abs(o.x-x)<2.4)s-=w*(36-ah)})
 ;if(s>bs){bs=s;best=x}}const sx=cl((best-D.x)*1.2,-1,1);const al=D.obs.some(o=>!o.hit&&o.k=='alien'&&D.z-o.z>0&&D.z-o.z<16);return{sx,fire:al||D.v<14,mx:0}}
// ---------- render ----------
function campRender(){const sh=C.cut?C.cut.list[C.cut.i]:null;VN=0;FAR=60;let cm;const L=LV[C.n];
 if(sh)cm=sh.cam(C.cut.u);else if(C.mode=='drive'){const D=C.drv;cm=PORT?{e:[D.x*.6,7.5,D.z+11],c:[D.x,0,D.z-9],fov:1.05}:{e:[D.x*.6,4.6,D.z+9.5],c:[D.x,1,D.z-9],fov:.95}}
 else if(C.mode=='loader'&&L.cam)cm=L.cam();else cm=footCam();
 CAM=cm.e;
 if(L.draw)L.draw(sh,C.cut?C.cut.u:0);if(sh&&sh.draw)sh.draw(C.cut.u);
 if(!sh){if(C.mode=='foot'||C.mode=='done'&&!C.drv&&L.kind!='loader'){drawP();C.allies.forEach(a=>{if(!a.gone)drawAlly(a)})}if(C.mode=='drive'||C.drv&&C.mode=='done')drawDrive()}
 if(!sh||sh.actors){C.en.forEach(e=>{if(e.k=='hugger')hugger(M(T(e.x,e.y,e.z),RY(e===C.latch?C.p.ya:e.ya),e===C.latch?T(0,1.55,.28):I(),e===C.latch?RX(-1.4):I()),e.ph,e.dead);else warrior(M(T(e.x,e.y,e.z),RY(e.ya)),e.ph,e.dead)})}
 C.fx.forEach(f=>{const u=C.t-f.t;if(f.k=='tr'){const d=sub(f.b,f.a),l=Math.hypot(...d);bx((f.a[0]+f.b[0])/2,(f.a[1]+f.b[1])/2,(f.a[2]+f.b[2])/2,.04,.04,l,7,[1,.9,.5],1,RY(Math.atan2(d[0],d[2])))}
  else if(f.k=='acid'){bx(f.p[0]+f.v[0]*u,f.p[1]+f.v[1]*u-5*u*u,f.p[2]+f.v[2]*u,.1,.1,.1,7,[.75,1,.3],1)}
  else if(f.k=='boom'){const k=sm(u/.5),fa=1-sm((u-.8)/1.2);if(fa>0)for(let j=0;j<7;j++){const a=H1(j*9+f.t)*6.28,r=k*1.5*(.5+H1(j+3)*.5),s=.8*k*fa+.08;bx(f.p[0]+Math.cos(a)*r,f.p[1]+Math.sin(a*1.3)*r*.5,f.p[2]+Math.sin(a)*r,s,s,s,15,[1,1,1],1,RY(a))}}});
 C.nades.forEach(n=>bx(n.x,1.2,n.z,.15,.15,.15,6));
 if(!sh&&C.goal&&C.mode=='foot'){const g=C.goal,b=.5+.5*Math.sin(C.t*4);bx(g.x,.06,g.z,1.4,.04,1.4,7,[.35,1,.6],.5+.4*b);bx(g.x,1.6,g.z,.08,3.2,.08,7,[.35,1,.6],.8)}
 if(!sh&&C.act&&C.mode=='foot'){const a=C.act;bx(a.x,.07,a.z,a.r*1.6,.04,a.r*1.6,7,[1,.85,.3],.6)}
 // mouse reticle (desktop)
 if(!sh&&C.mode=='foot'&&!TOUCH&&!AUTO){const gp=rayGround(cm,CMX,CMY,.06);if(gp){bx(gp[0],.08,gp[2],.6,.03,.08,7,[.5,1,.6],1);bx(gp[0],.08,gp[2],.08,.03,.6,7,[.5,1,.6],1)}}
 // rain
 if(L.rain&&(C.mode=='drive'||L.rain>1||sh&&sh.rain))for(let j=0;j<40;j++){const x=cm.e[0]+(H1(j*1.7)-.5)*16,z=cm.e[2]-2-H1(j*3.1)*16,y=((H1(j*5.3)*8-C.t*14)%8+8)%8-1;bx(x,y,z,.025,.5,.025,7,[.6,.7,.8],.5,RX(.25))}
 upload(VD,false);
 gl.viewport(0,0,W,H);const fc=C.fc;gl.clearColor(...fc,1);gl.clear(16640);gl.enable(gl.DEPTH_TEST);
 const P=persp(cm.fov,W/H,.05,140);VP=mul(P,look(cm.e,cm.c,[0,1,0]));gl.uniformMatrix4fv(U('VP'),false,VP);gl.uniform3fv(U('cam'),cm.e);gl.uniform3fv(U('fc'),fc);gl.uniform2fv(U('FD'),sh&&sh.fd||C.fd);gl.uniform3fv(U('LD'),[.3,.75,.6]);
 drawV(VS);drawV(VD);campHud(sh);}
function drawP(){const p=C.p,B=M(T(p.x,0,p.z),RY(p.ya)),wn=C.weaps[C.wi];
 if(C.pk=='ripley')ripley(B,{walk:p.moving,noNewt:1,rf:C.latch?10:C.rf||11,noGun:wn=='none',pilot:wn=='flame',yaw:0},p.ph);else marine(B,{walk:p.moving,face:C.pf||27,gun:wn=='smart'?'smart':'rifle'},p.ph);
 if(C.firing&&wn=='flame'){const dx=Math.sin(p.ya),dz=Math.cos(p.ya);for(let i=0;i<12;i++){const d=.6+(i+(C.t*20)%1)*.42,w=.12+d*.12;bx(p.x+dx*d,1.25,p.z+dz*d,w,w,w,15,[1,1,1],1,RY(i+C.t*7))}}
 if(C.flash&&C.t-C.flash<.04){bx(p.x+Math.sin(p.ya)*.9,1.38,p.z+Math.cos(p.ya)*.9,.14,.14,.14,7,[1,.85,.45],1)}}
function drawAlly(a){if(a.kid){kid(M(T(a.x,0,a.z),RY(a.ya)),{walk:a.moving,face:a.face},a.ph);return}if(a.rip){ripley(M(T(a.x,0,a.z),RY(a.ya)),{walk:a.moving,noNewt:1,rf:a.face||11,yaw:0},a.ph);return}marine(M(T(a.x,0,a.z),RY(a.ya)),{walk:a.moving,face:a.face,gun:a.gun,armor:a.armor,helm:a.helm},a.ph)}
function drawDrive(){const D=C.drv;apc(M(T(D.x,0,D.z),RY(PI+D.x*.0+(C.in?-(C.in.mx||0)*.08:0))),D.t*D.v*.3,1);
 if(D.boost)for(let j=0;j<3;j++)bx(D.x+(j-1)*.8,.4,D.z+3.4+H1(j+((C.t*12)|0))*.6,.3,.3,.3,15,[1,1,1],.8);
 D.obs.forEach(o=>{if(Math.abs(o.z-D.z)>60||o.z>D.z+12)return;if(o.k=='rock'){if(o.hit&&C.t-o.hit>.3)return;bx(o.x,.7,o.z,2.2,1.4,1.8,38,[.85,.8,.72],0,RY(o.x))}
  else if(o.k=='wreck'){if(o.hit&&C.t-o.hit>.3)return;bx(o.x,.6,o.z,2.4,1.2,1.4,6,[.6,.5,.45],0,RY(.6));bx(o.x,.3,o.z,2.6,.12,.12,36)}
  else{if(o.hit&&C.boost===0)return;const dd=o.hit?Math.min(1,(C.t-o.hit)*3):0;if(o.hit&&C.t-o.hit>1.5)return;warrior(M(T(o.x,0,o.z),RY(0)),o.ph,dd||0)}})}
// ---------- HUD ----------
function campHud(sh){const show=!sh&&C.mode!='done';$('hud').style.display=show?'block':'none';$('sub').style.display=sh&&sh.sub?'block':'none';if(sh)$('sub').textContent=sh.sub;
 $('skip').style.display=sh?'block':'none';$('ctrls').style.display=TOUCH&&show?'block':'none';
 $('chap').style.display=C.chapT<2.8&&sh?'block':'none';$('chap').innerHTML=`CHAPTER ${C.n}<br><small style="font-size:.6em">${CHN[C.n]}</small>`;
 $('trk').style.display=show&&C.trk?'block':'none';if(show&&C.trk)drawTrk();
 if(!show){$('vig').style.opacity=0;$('glow').style.opacity=0;return}
 $('hp').style.width=C.p.hp+'%';$('score').textContent=C.mode=='drive'?`${Math.max(0,C.drv.len+C.drv.z).toFixed(0)} m TO GO`:(C.scoreTxt||'KILLS '+C.kills);
 const wn=C.mode=='foot'?C.weaps[C.wi]:'';const showAm=wn=='rifle'||wn=='smart'||wn=='gren';$('ammo').style.display=showAm?'block':'none';$('ammon').textContent=String(C.ammo[wn]||0).padStart(wn=='smart'?3:2,'0');$('click').style.visibility=C.rel>0?'visible':'hidden';
 $('weap').textContent=C.mode=='drive'?(C.drv.boost?'APC — BOOST':'APC'):C.mode=='loader'?'POWER LOADER':WPN[wn].n+(C.weaps.length>1?'  [Q]':'');
 let ob=C.obj;if(L_fire())ob+=C.fireMsg?'  · '+C.fireMsg:'';$('obj').textContent=ob;
 const tb=C.latch?['TEAR IT OFF — hold FIRE',C.latchP||0]:C.actOn&&C.act?[C.act.label+' — hold FIRE',C.actP]:C.bar?C.bar():null;
 $('tens').style.display=tb?'block':'none';if(tb){$('tensl').textContent=tb[0];$('tensf').style.width=cl(tb[1]*100,0,100)+'%';$('tensf').style.background=tb[2]||'#7ac0a0'}
 $('hint').textContent=C.msgT>0?C.hint:'';$('vig').style.opacity=C.hurtT>0?Math.min(.5,C.hurtT):0;$('glow').style.opacity=C.firing&&C.weaps[C.wi]=='flame'?.08:0}
const L_fire=()=>true;
function drawTrk(){const c=$('trk'),x=c.getContext('2d'),n=120,p=C.p;x.clearRect(0,0,n,n);x.fillStyle='rgba(6,20,14,.82)';x.beginPath();x.arc(60,60,58,0,7);x.fill();x.strokeStyle='#3c8a5c';x.lineWidth=1;for(const r of[20,40,57]){x.beginPath();x.arc(60,60,r,0,7);x.stroke()}
 const sw=(C.t*1.6)%1;x.strokeStyle='rgba(120,255,160,.55)';x.beginPath();x.arc(60,60,sw*57,0,7);x.stroke();
 const sc=57/24;const pt=(wx,wz,col,s)=>{const dx=(wx-p.x)*sc,dz=(wz-p.z)*sc;if(Math.hypot(dx,dz)>56)return;x.fillStyle=col;x.fillRect(60+dx-s/2,60+dz-s/2,s,s)};
 alive().forEach(e=>pt(e.x,e.z,'#c8ffd0',5));if(C.goal)pt(C.goal.x,C.goal.z,'#60d0ff',6);x.fillStyle='#fff';x.fillRect(58,58,4,4);x.fillStyle='#8fc';x.font='bold 11px monospace';x.fillText('TRACKER',33,116)}
// ---------- menu ----------
function buildMenu(){const m=$('menu');if(!m)return;m.innerHTML='';for(let n=1;n<=8;n++){const b=document.createElement('button');b.className='chb';b.textContent=`${n}. ${CHN[n]}`;b.disabled=n>UNL;const go=e=>{if(e){e.preventDefault();e.stopPropagation()}if(!b.disabled)startCh(n)};b.addEventListener('click',go);b.addEventListener('touchend',go);m.appendChild(b)}
 const s=$('start');s.textContent=UNL>1?`CONTINUE — CH ${UNL}`:'START';}
function rebtn(id,fn){const o=$(id),b=o.cloneNode(true);o.parentNode.replaceChild(b,o);b.addEventListener('click',e=>{e.stopPropagation();fn()});b.addEventListener('touchend',e=>{e.preventDefault();e.stopPropagation();fn()})}
rebtn('start',()=>startCh(UNL));rebtn('restart',()=>{const n=C?C.n:7;startCh(n)});rebtn('next',()=>{const n=C?C.n:7;startCh(n+1)});rebtn('tomenu',()=>{goTitle()});
window.__game.startCh=startCh;Object.defineProperty(window.__game,'C',{get:()=>C});window.__game.CH=()=>CH;window.__game.setAuto=v=>{AUTO=v};
