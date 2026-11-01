// ===== CH3 THE NEST =====
const MAP3=["###############",
"#S...c...c...S#",
"#.............#",
"#c....###....c#",
"#.....#X#.....#",
"#S....#.#....S#",
"#c...........c#",
"#.............#",
"#S..c.....c..S#",
"######...######",
"     #...#     ",
"     #...#     ",
"     #.P.#     ",
"     #####     "];
const NEST={wall:37,floor:37,fc:[.75,.8,.85],wc:[1,1,1]};
LV[3]={init(){C.fc=[.05,.07,.08];C.fd=[11,30];C.mus='standoff';setMap(MAP3);C.pk='vasq';C.pf=29;C.weaps=['smart','rifle'];C.fireMsg='FIRE allowed';
 build(()=>{buildMap(NEST);const[x,z]=mk('X');bx(x,1.1,z-.3,1.2,2.2,.8,37);bx(x,1.5,z+.12,.37,.4,.02,41,[1,1,1],.4)});
 const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:PI});C.allies=[{x:px-1.2,z:pz+.8,face:27,gun:'rifle',ph:0,ya:PI},{x:px+1.2,z:pz+.8,face:28,gun:'rifle',ph:0,ya:PI},{x:px,z:pz+1.6,face:30,gun:'rifle',ph:0,ya:PI}];
 cut([{d:3.4,sub:'Deep in the atmosphere processor, the walls turn to glistening resin.',actors:1,draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:u=>({e:[px+2.5,1.8,pz-4-u*.4],c:[px,1.4,pz],fov:.9})},
  {d:2.6,sub:'Vasquez hefts the smartgun. She has been waiting for this.',draw:drawP,cam:()=>CU(px,pz,PI,1.81)},
  {d:2.8,sub:'In the APC, Gorman orders them not to fire — the reactor is right above.',draw:()=>marine(M(T(40,0,40)),{face:31,helm:false,gun:'none'},0),cam:()=>CU(40,40,0,1.81)}],()=>{play();C.goal=(([x,z])=>({x,z:z+2}))(mk('X'));C.obj='Advance to the cocooned colonist';say('Follow the beacon. Allies follow you.',3)})},
 step(dt){const p=C.p;
  if(C.stage==0&&dist(p,C.goal)<1.6){C.stage=1;C.goal=null;const[x,z]=mk('X');
   cut([{d:3.2,sub:'A colonist, sealed into the wall. She begs them to end it.',draw:()=>{},cam:()=>({e:[x+.2,1.55,z+1.2],c:[x,1.5,z],fov:.75})},
    {d:2.4,sub:'Hicks looks away. Hudson stares at the walls.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(C.allies[1].x,C.allies[1].z,PI,1.81)},
    {d:2.8,sub:'Then the walls move.',actors:1,draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[p.x,6,p.z+5],c:[p.x,0,p.z-3],fov:1})}],()=>{play();C.mus='shoot';C.stage=2;C.amb=0;C.obj='AMBUSH! Survive';say('They\'re everywhere! Hold them off — mouse aim, click/Space fire',4)})}
  if(C.stage==2){C.amb+=dt;C.bar=()=>['SURVIVE',C.amb/45,'#e0a030'];C.sT=(C.sT||0)-dt;if(C.sT<=0&&alive().length<6&&C.amb<43){C.sT=1.5;const S=C.mk.S;let s=S[(rnd()*S.length)|0];if(dist(p,{x:s[0],z:s[1]})<5)s=S[(rnd()*S.length)|0];spawn('alien',s[0],s[1])}
   if(C.amb>18&&!C.apone){C.apone=1;C.allies[2].gone=1;say('Apone is dragged into the dark!',3)}
   if(C.ammo.smart<=0&&C.weaps[C.wi]=='smart'){C.wi=1;say('Smartgun dry — pulse rifle!',2)}
   if(C.amb>=45){C.stage=3;C.bar=null;this.rescue()}}},
 rescue(){C.en=[];C.map=null;C.D=null;build(()=>{buildRoad(300,true);bx(0,1.5,-320,10,3,1,37)});setupDrive(300,{gap:11});C.drv.obs=C.drv.obs.map(o=>o.k=='rock'?Object.assign(o,{k:'wreck'}):o);
  cut([{d:2.6,sub:'Gorman freezes. Ripley shoves past him and takes the APC controls.',draw:()=>ripley(M(T(40,0,40)),{noNewt:1,rf:12,noGun:1},0),cam:()=>CU(40,40,0,1.82)},
   {d:3,sub:'She floors it — straight into the nest.',draw:u=>apc(M(T(0,0,lerp(6,-4,u/3)),RY(PI)),u*3,1),cam:()=>({e:[2.5,1,-12],c:[0,1.4,0],fov:.9})}],()=>{play('drive');C.obj='Smash through to the survivors';C.fireMsg='FIRE = BOOST · ram aliens while boosting';say('Steer A/D or mouse · hold FIRE to boost and ram',4)});
  C.onDrive=()=>{const z=C.drv.z;cut([{d:3.2,sub:'Hicks and Hudson dive aboard. The APC tears free of the nest.',draw:u=>apc(M(T(0,0,z-u*6),RY(PI)),u*4,1),cam:()=>({e:[3,2,z-14],c:[0,1.2,z],fov:.9})},
   {d:2.6,sub:'Hicks, shaking: half the squad is gone.',draw:()=>marine(M(T(40,0,40)),{face:26},0),cam:()=>CU(40,40,0,1.81)}],winCh)}}};
