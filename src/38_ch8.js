// ===== CH8 SULACO =====
function hangar(){for(let x=-14;x<=14;x+=2)for(let z=-16;z<=14;z+=2){const pit=z<=-11&&Math.abs(x)<=5;bx(x,pit?-1.05:-.05,z,2,.1,2,pit?36:35)}
 for(let x=-14;x<=14;x+=4){bx(x,4,-17,4,8,.5,19,[.7,.72,.74]);bx(x,4,15,4,8,.5,19,[.7,.72,.74])}for(let z=-16;z<=14;z+=4){bx(-15,4,z,.5,8,4,19,[.7,.72,.74]);bx(15,4,z,.5,8,4,19,[.7,.72,.74])}
 for(const s of[-1,1])bx(s*5.6,-.5,-13.5,.3,1,5,36);bx(0,-1.08,-16.6,10,.1,.4,7,[.9,.5,.3],.7);for(const x of[-14.6,14.6])bx(x,6,0,.2,.3,28,7,[.9,1,.95],.8);
 dropship(M(T(9,3,6),RY(-.6),S(.8,.8,.8)))}
LV[8]={kind:'loader',init(){C.fc=[.1,.12,.14];C.fd=[18,48];C.mus='standoff';C.map=null;build(hangar);C.lp={x:0,z:8,ya:PI,ph:0,pn:[0,0],side:0};C.q={x:0,z:-4,hp:100,st:'stalk',sT:2,ph:0,ya:0};C.p.hp=100;
 cut([{d:3.2,sub:'Back aboard the Sulaco. The dropship settles into the hangar.',draw:()=>{},cam:u=>({e:[-6,3,10],c:[9,2.5,6],fov:.9})},
  {d:2.6,sub:'Bishop says they cut it close. Then something drips from the landing gear.',draw:()=>marine(M(T(3,0,4),RY(-PI*.8)),{face:33,helm:false,gun:'none'},0),cam:()=>CU(3,4,-PI*.8,1.81)},
  {d:3,sub:'The queen bursts out and throws Bishop across the deck.',draw:u=>queenB(M(T(3,0,0),RY(PI*.8)),{lunge:sm(u/1.5)},C.t*2),cam:()=>({e:[-4,2.5,8],c:[2,3,0],fov:.95})},
  {d:2.6,sub:'Newt dives under the deck plating. The queen tears after her.',draw:()=>kid(M(T(-2,0,2),RY(-PI/2)),{face:13},0),cam:()=>CU(-2,2,-PI/2,1.17,1)},
  {d:3,sub:'A cargo door rumbles open. Ripley strides out in a power loader.',draw:u=>{const z=lerp(14,8,sm(u/3));loader(M(T(0,0,z),RY(PI)),{walk:1,rf:12},u*5)},cam:()=>({e:[0,1.5,-1],c:[0,3,8],fov:.9})},
  {d:2.6,sub:'She tells the queen to get away from the girl.',draw:()=>loader(M(T(0,0,8),RY(PI)),{rf:12},0),cam:()=>({e:[0,2.85,6.6],c:[0,2.8,8.1],fov:.72})}],()=>{play('loader');C.obj='Fight the queen: FIRE = punch';C.fireMsg='back off (S) when she winds up';say('WASD move · FIRE / click punches · watch for her wind-up!',5)})},
 cam(){const L=C.lp,q=C.q;const mx=(L.x+q.x)/2,mz=(L.z+q.z)/2;return PORT?{e:[L.x*.7,11,Math.min(L.z+9,13.5)],c:[mx,1.5,mz],fov:1.05}:{e:[L.x*.7,7.5,Math.min(L.z+8.5,13.5)],c:[mx,2,mz],fov:.95}},
 step(dt,I){},
 draw(sh){if(sh)return;const L=C.lp,q=C.q;loader(M(T(L.x,0,L.z),RY(L.ya)),{walk:L.mv,rf:12,punch:L.pn},L.ph);
  if(!C.gone)queenB(M(T(q.x,q.y||0,q.z),RY(q.ya)),{crouch:q.st=='wind'?sm(q.sT0-q.sT):0,lunge:q.st=='strike'?1:0},C.t*2)}};
function loaderStep(dt,I){const L=C.lp,q=C.q;q.ph+=dt;
 if(C.stage==0){const sp=2.8;let mx=I.mx,mz=I.mz;const nx=cl(L.x+mx*sp*dt,-12,12),nz=cl(L.z+mz*sp*dt,-10,12);const dq=Math.hypot(nx-q.x,nz-q.z);if(dq>2.2){L.x=nx;L.z=nz}L.mv=Math.hypot(mx,mz)>.1;if(L.mv)L.ph+=dt*5;
  L.ya=Math.atan2(q.x-L.x,q.z-L.z);q.ya=Math.atan2(L.x-q.x,L.z-q.z);const d=Math.hypot(L.x-q.x,L.z-q.z);
  L.pn=L.pn.map(v=>Math.max(0,v-dt*3));C.pc=(C.pc||0)-dt;
  if(I.fire&&C.pc<=0){C.pc=.5;L.side^=1;L.pn[L.side]=1;tone(90,.15,'square',.25,0,0,50);if(d<3.8){const k=q.st=='recover'||q.st=='wind'?2:1;q.hp-=4*k;q.hitT=C.t;noise(.2,.3,600,1);if(q.st=='wind'&&rnd()<.5){q.st='recover';q.sT=.9;say('Staggered her!',1.2)}}}
  q.sT-=dt;if(q.st=='stalk'){if(d>3){q.x+=(L.x-q.x)/d*2.2*dt;q.z+=(L.z-q.z)/d*2.2*dt}if(q.sT<=0){q.st='wind';q.sT0=q.sT=1.1;SFX.hiss();say('She\'s winding up — BACK OFF!',1.2)}}
  else if(q.st=='wind'){if(q.sT<=0){q.st='strike';q.sT=.35;if(d<3.9)churt(15)}}
  else if(q.st=='strike'){if(q.sT<=0){q.st='recover';q.sT=1}}
  else if(q.st=='recover'&&q.sT<=0){q.st='stalk';q.sT=1.6+rnd()*1.4}
  C.scoreTxt='QUEEN '+Math.max(0,q.hp|0)+'%';C.bar=()=>['QUEEN',q.hp/100,'#c06a4a'];
  if(q.hp<=35){C.stage=1;C.bar=null;cut([{d:2.8,sub:'She seizes the loader\'s arms. They lock together, grinding.',draw:()=>{loader(M(T(L.x,0,L.z),RY(L.ya)),{rf:12,punch:[1,1]},0);queenB(M(T(q.x,0,q.z),RY(q.ya)),{lunge:1},C.t*2)},cam:()=>({e:[L.x+3,3.2,L.z+2],c:[(L.x+q.x)/2,2.6,(L.z+q.z)/2],fov:.9})},
   {d:2.4,sub:'Ripley drags her toward the open airlock pit.',draw:()=>loader(M(T(L.x,0,L.z),RY(L.ya)),{rf:12},0),cam:()=>({e:[L.x+Math.sin(L.ya)*1.4,2.85,L.z+Math.cos(L.ya)*1.4],c:[L.x,2.8,L.z],fov:.72})}],()=>{play('loader');C.obj='Push her into the airlock pit (yellow stripes)';say('Walk toward the striped pit — she fights back!',4)})}}
 else if(C.stage==1){const sp=1.6;L.mv=Math.hypot(I.mx,I.mz)>.1;if(L.mv)L.ph+=dt*4;const pull=Math.sin(C.t*1.3)*.5;L.x=cl(L.x+(I.mx*sp+pull*.3)*dt,-8,8);L.z=cl(L.z+(I.mz*sp+.35)*dt,-9.6,12);
  L.ya=PI;q.x=L.x;q.z=L.z-2.3;q.ya=0;C.bar=()=>['DISTANCE TO PIT',1-cl((L.z+9.4)/18,0,1),'#e0a030'];
  if(L.z<-9.3&&C.stage==1){C.stage=2;C.bar=null;C.act={x:L.x,z:L.z,r:3,dur:1.6,label:'OPEN THE OUTER DOORS',snd:300,done:()=>LV[8].end()};C.obj='Hit the airlock release — hold FIRE'}}
 else if(C.stage==2){L.mv=0;C.actOn=true;if(I.fire){C.actP+=dt/C.act.dur;if(C.actP>=1){C.actP=0;C.act=null;C.stage=3;LV[8].end()}}}}
LV[8].end=function(){const L=C.lp,q=C.q;C.mode='cut';
 cut([{d:3.2,sub:'Ripley drops with her into the airlock and slams the release.',draw:u=>{q.y=-u*.6;loader(M(T(L.x,-u*.4,L.z),RY(L.ya)),{rf:12},0)},cam:()=>({e:[L.x+5,3,L.z+4],c:[L.x,0,L.z-1.5],fov:.95})},
  {d:3.4,sub:'The outer doors open. The queen is torn away into space.',draw:u=>{C.gone=1;queenB(M(T(0,-2-u*8,-16-u*20),RX(u*3)),{lunge:1},C.t*3)},cam:u=>({e:[0,1,-6],c:[0,-3-u*4,-20],fov:.95})},
  {d:3,sub:'Ripley climbs out. Newt runs into her arms.',draw:()=>{ripley(M(T(0,0,2),RY(0)),{noNewt:1,rf:11,noGun:1},0);kid(M(T(0,0,3),RY(PI)),{face:14,arms:-2},0)},cam:()=>CU(0,2,0,1.82,1.6,.8)},
  {d:3.5,sub:'Hypersleep. For once, they will dream.',draw:()=>{bx(0,.5,0,1,1,2.4,40,[.9,1,1],.4);bx(1.6,.5,0,1,1,2.4,40,[.9,1,1],.4)},cam:()=>({e:[.8,3,3],c:[.8,.6,0],fov:.9})}],winCh)};
LV[8].ap=function(){const L=C.lp,q=C.q;if(!L)return{};if(C.stage==0){const d=Math.hypot(L.x-q.x,L.z-q.z);const dx=(q.x-L.x)/d,dz=(q.z-L.z)/d;
  if(q.st=='wind'&&q.sT<.9)return{mx:-dx,mz:-dz,fire:false};if(d>3.2)return{mx:dx,mz:dz,fire:false};return{mx:0,mz:0,fire:true}}
 if(C.stage==1)return{mx:-L.x*.2,mz:-1};return{fire:true}};
