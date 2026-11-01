// ===== CH5 MEDLAB =====
const MAP5=["#################",
"#...t.......t...#",
"#...............F",
"#..t.........t..#",
"#.......P.......#",
"#..t.........t..#",
"#...............#",
"#...t.......t...#",
"######ggggg######",
"     #.....#     ",
"     #######     "];
LV[5]={init(){LV[5].rain=0;C.fc=[.08,.1,.12];C.fd=[13,36];C.mus='standoff';setMap(MAP5);C.pk='ripley';C.rf=10;C.weaps=['none'];C.fireMsg='No weapon — FIRE = use / tear off';C.speed=5;
 build(()=>{buildMap({wall:39,floor:35,strip:[.9,1,.85]});const[fx,fz]=mk('F');bx(fx-1.02,1.8,fz,.06,.35,.35,7,[1,.4,.3],.8)});
 const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:PI});C.allies=[{kid:1,x:px-1,z:pz+.6,face:14,ph:0,ya:PI}];
 const bz=mk('g',2);C.burke={x:bz[0],z:bz[1]+2};
 cut([{d:3,sub:'Ripley wakes in the medlab with Newt asleep beside her.',draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[px+2,2.2,pz-3],c:[px-.5,.9,pz],fov:.9})},
  {d:2.8,sub:'Both specimen tanks are empty. Her rifle is gone.',draw:()=>{},cam:()=>({e:[px,2,pz],c:[px-10,1,pz-5],fov:.95})},
  {d:3,sub:'Through the window, Burke watches — and switches off the camera.',draw:()=>marine(M(T(C.burke.x,0,C.burke.z),RY(PI)),{face:32,helm:false,gun:'none'},0),cam:()=>CU(C.burke.x,C.burke.z,PI,1.81,1.4)},
  {d:2.6,sub:'Something skitters under the beds.',draw:()=>drawP(),cam:()=>CU(px,pz,PI,1.82)}],()=>{play();this.stage(0)})},
 stage(n){C.stage=n;if(n==0){const[fx,fz]=mk('F');C.act={x:fx-2,z:fz,r:1.4,dur:2,label:'LIGHTER UNDER THE FIRE SENSOR',snd:500,done:()=>this.stage(1)};C.obj='No weapon! Reach the fire sensor and hold FIRE';say('Move with WASD / stick. FIRE = use. Avoid the facehuggers!',5);
   spawn('hugger',4,4,{sp:2.7});spawn('hugger',28,12,{idle:1,wake:30,sp:2.7})}
  if(n==1){C.ev=0;LV[5].rain=2;C.mus='torch';C.obj='Sprinklers on! Stay alive until help arrives';C.en.forEach(e=>{e.idle=0;e.sp=3.1});spawn('hugger',4,12,{sp:3.1});say('Alarm tripped! Keep moving — if one grabs you, hold FIRE',4)}},
 step(dt){if(C.stage==1){C.ev+=dt;C.bar=()=>['HELP ARRIVING',C.ev/30,'#e0a030'];if(C.ev>=30){C.stage=2;C.bar=null;C.latch=null;const p=C.p;
   cut([{d:2.6,sub:'Hicks and the marines smash through the glass.',draw:()=>marine(M(T(C.burke.x,0,C.burke.z-1),RY(PI)),{face:27},0),cam:()=>({e:[C.burke.x+1.5,1.7,C.burke.z-5],c:[C.burke.x,1.3,C.burke.z-1],fov:.9})},
    {d:2.6,sub:'The facehuggers are shot apart. Ripley gasps for air.',draw:()=>drawP(),cam:()=>CU(p.x,p.z,p.ya,1.82)},
    {d:3,sub:'Ripley: Burke set it up. He wanted them carried home — inside us.',draw:()=>marine(M(T(40,0,40)),{face:32,helm:false,gun:'none'},0),cam:()=>CU(40,40,0,1.81)}],()=>{C.en=[];winCh()})}}},
 ap(){const p=C.p;if(C.latch)return{fire:true};if(C.stage==0&&C.act){const n=navIn(C.act.x,C.act.z);let mx=n.mx,mz=n.mz;const h=alive().filter(e=>dist(p,e)<3);h.forEach(e=>{const d=dist(p,e)+.01;mx+=(p.x-e.x)/d;mz+=(p.z-e.z)/d});return{mx,mz,fire:dist(p,C.act)<1.1}}
  let mx=0,mz=0;alive().forEach(e=>{const d=dist(p,e)+.01;mx+=(p.x-e.x)/d/d*4;mz+=(p.z-e.z)/d/d*4});mx+=(16-p.x)*.04;mz+=(8-p.z)*.04;const l=Math.hypot(mx,mz)+1e-3;return{mx:mx/l,mz:mz/l}},
 draw(){if(C.stage<2&&C.mode!='cut')marine(M(T(C.burke.x,0,C.burke.z),RY(PI)),{face:32,helm:false,gun:'none'},0)}};
