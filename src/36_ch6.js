// ===== CH6 ESCAPE =====
const MAP6=["###################",
"#X......#.........#",
"#######.#.#######.#",
"#.......#.#.....#.#",
"#.#######.#.###.#.#",
"#.........#...#...#",
"#############.#####",
"#S...........P....#",
"###################"];
const MAP6B=["#################",
"#.....#...#.....#",
"#.c.c.#...#.c.c.#",
"#..N..#...#..E..#",
"###.#########.###",
"#...............#",
"#.c...c...c...c.#",
"#S.............S#",
"#...............#",
"######..P..######",
"#################"];
LV[6]={init(){LV[6].rain=0;C.fc=[.06,.07,.08];C.fd=[10,28];C.mus='torch';setMap(MAP6);C.pk='ripley';C.rf=11;C.weaps=['rifle'];C.fireMsg='FIRE allowed';C.speed=4.8;
 build(()=>buildMap({wall:19,floor:35,wh:1.7,wc:[.6,.65,.62],strip:[1,.6,.3]}));
 const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:-PI/2});C.allies=[{kid:1,x:px+1,z:pz,face:13,ph:0,ya:-PI/2},{x:px+2,z:pz,face:27,gun:'rifle',ph:0,ya:-PI/2}];
 cut([{d:3,sub:'The ceiling gives way. They pour in from everywhere.',actors:1,draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[px+4,1.5,pz],c:[px,1,pz],fov:.95})},
  {d:2.4,sub:'Newt knows the vents. She leads them in.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(px+1,pz,-PI/2,1.17,1)}],()=>{play();C.goal=(([x,z])=>({x,z}))(mk('X'));C.obj='Crawl through the vents to the dropship';say('They\'re coming up behind! Keep moving.',4)})},
 step(dt){const p=C.p;if(C.part!='B'){C.sT=(C.sT||3)-dt;if(C.sT<=0&&alive().length<4&&C.stage==0){C.sT=3.6;const[sx,sz]=mk('S');spawn('alien',sx,sz,{sp:2.8})}
   if(C.stage==0&&dist(p,C.goal)<1.6){C.stage=1;C.goal=null;C.en=[];this.fall()}return}
  C.left-=dt;C.bar=()=>['EVAC: '+Math.max(0,C.left).toFixed(0)+' s',C.left/150,C.left<40?'#e06a40':'#7ac0a0'];if(C.left<=0){C.mode='done';SFX.over();overC(false);$('ovs').textContent='The reactor blew. Try again — be faster.';return}
  if(C.stage==2&&dist(p,C.goal)<1.6){C.stage=3;C.act=null;C.goal=null;const[ex,ez]=mk('E');say('Her tracker bracelet, dropped on the grating. She is deeper in.',4);C.obj='Head for the hive entrance';C.goal={x:ex,z:ez};for(const s of C.mk.S)spawn('alien',s[0],s[1])}
  if(C.stage==3&&dist(p,C.goal)<1.6){C.stage=4;cut([{d:3,sub:'Into the hive. Toward the egg chamber.',draw:()=>drawP(),cam:()=>CU(p.x,p.z,p.ya,1.82,1.4)}],winCh)}},
 fall(){const[x,z]=mk('X');
  cut([{d:2.6,sub:'A shaft drops away beneath them. Newt slips — and falls.',draw:u=>{for(const[a,b]of[[-1.3,0],[1.3,0],[0,-1.3]])bx(40+a,-2,30+b,a?.2:2.6,8,b?.2:2.6,35,[.6,.62,.6]);kid(M(T(40,1-u*2.2,30),RX(u*.8)),{face:13,arms:-2.6},0)},cam:u=>({e:[40,3.2,32.4],c:[40,.6-u*1.2,30],fov:.9})},
   {d:2.4,sub:'Ripley screams her name into the dark.',draw:()=>ripley(M(T(x+2,0,z),RY(-PI/2)),{noNewt:1,rf:10,noGun:1},0),cam:()=>CU(x+2,z,-PI/2,1.82)},
   {d:2.8,sub:'Hicks is burned by acid. Bishop brings the dropship down by remote.',draw:()=>marine(M(T(40,0,40)),{face:33,helm:false,gun:'none'},0),cam:()=>CU(40,40,0,1.81)},
   {d:3.2,sub:'Ripley tapes a flamethrower under a pulse rifle. Grenades. Flares.',draw:u=>{ripley(M(T(40,0,44)),{noNewt:1,rf:12,pilot:1},u*4)},cam:()=>CU(40,44,0,1.82,1.3,.4)},
   {d:3,sub:'Fifteen minutes to the blast. The freight lift drops her alone into the processor.',draw:u=>{const y=lerp(6,0,sm(u/3));bx(60,y+1.4,60,2.4,.1,2.4,36);ripley(M(T(60,y,60)),{noNewt:1,rf:12,pilot:1},0);for(const s of[-1,1])bx(60+s*1.25,y+1.4,60,.1,2.8,2.4,35)},cam:u=>({e:[64,2,64],c:[60,lerp(6,0,sm(u/3))+1.5,60],fov:.9})}],()=>this.partB())},
 partB(){C.part='B';setMap(MAP6B);C.D=null;C.aK=null;C.trk=true;LV[6].rain=0;C.fc=[.08,.06,.06];C.fd=[11,30];
  build(()=>{buildMap({wall:37,floor:35,wc:[.9,.85,.85],strip:[1,.5,.3]})});const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:PI,hp:100});C.allies=[];C.weaps=['rifle','flame','gren'];C.wi=0;C.left=150;
  for(const[x,z]of[[6,10],[26,10],[10,2],[22,2],[16,12]])spawn('alien',x,z,{idle:1,wake:7});
  const[nx,nz]=mk('N');C.goal={x:nx,z:nz};C.stage=2;play();C.obj='Follow Newt\'s tracker signal';say('Q / ⇄ switches: pulse rifle · flamethrower · grenades',5)}};
