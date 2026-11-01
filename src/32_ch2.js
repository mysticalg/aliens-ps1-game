// ===== CH2 HADLEY'S HOPE =====
const MAP2=["###############",
"#.....#.......#",
"#..N..#..g.g..#",
"#.....#.......#",
"#...t.#..g.g..#",
"##.####...M...#",
" #.#  ####.####",
" #.#     #.#   ",
" #.#######D### ",
" #...........# ",
" #.....S.....# ",
" #####.#####.# ",
"     #.#   #.# ",
"   ###B###.#.# ",
"   #.......#.# ",
"   #...P.....# ",
"   ###########"];
function sandbag(x,z){for(let k=-1;k<=1;k+=2)bx(x+k*.75,.35,z,.6,.7,.5,16,[.7,.65,.5])}
function weldDoor(x,z,open,hz){if(open<1)bx(x,1.1,z,hz?.3:2,2.2,hz?2:.3,36,[.9,.9,.9]);}
LV[2]={init(){C.fc=[.08,.1,.11];C.fd=[13,34];C.mus='standoff';C.trk=true;setMap(MAP2);C.pk='hicks';C.pf=27;C.weaps=['rifle'];
 build(()=>{buildMap({wall:39,floor:35,strip:[.9,1,.85]});const[bxp,bz]=mk('B');sandbag(bxp,bz-.4);
  for(const[x,z]of[[12,18],[20,22],[8,28]])bx(x,.02,z,.6,.02,.5,23,[.6,.8,.3],.3); // acid holes
  const[nx,nz]=mk('N');bx(nx-2,.5,nz-1.5,1.6,1,1,6);bx(nx,.3,nz-1.8,.8,.6,.1,21)});
 const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:PI});C.allies=[{x:px-1.2,z:pz+.8,face:34,gun:'rifle',ph:0,ya:PI},{x:px+1.2,z:pz+.8,face:29,gun:'smart',helm:false,ph:0,ya:PI}];
 for(const[x,z]of[[4,18],[24,18],[22,28]])spawn('hugger',x,z,{idle:1,wake:5});
 const[dx,dz]=mk('D');C.dcell=[dx/2,dz/2];
 cut([{d:3.5,sub:'The marines fan out into the silent colony, rain hammering the walls.',actors:1,draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:u=>({e:[px+3,2.2,pz-3+u*.3],c:[px,1.2,pz+1],fov:.9})},
  {d:2.6,sub:'Hudson sweeps the motion tracker. Nothing. Yet.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(px-1.2,pz+.8,PI,1.81,1.1,0)},
  {d:2.6,sub:'Hicks keeps his voice low and his rifle up.',draw:()=>drawP(),cam:()=>CU(px,pz,PI,1.81)}],()=>{play();LV[2].stage(0)})},
 stage(n){C.stage=n;const g=k=>{const[x,z]=mk(k);return{x,z}};
  if(n==0){C.goal=g('B');C.obj='Sweep the colony: reach the barricade';say('WASD move · mouse aim · click/Space fire · follow the green beacon',5)}
  if(n==1){C.goal=null;const[dx,dz]=mk('D');C.act={x:dx,z:dz+1.6,r:1.6,dur:3.2,label:'CUTTING WELDED DOOR',snd:3200,done:()=>{C.open[C.dcell.join(',')]=1;SFX.boom();LV[2].stage(2)}};C.obj='The corridor door is welded shut — cut through it';say('Barricade torn open from inside. Acid holes in the floor...',4)}
  if(n==2){C.goal=g('M');C.obj='Check the medlab';say('Door open. Medlab ahead.',3)}
  if(n==3){C.goal=null;C.obj='Kill the loose facehuggers';const[mx,mz]=mk('M');for(const[x,z]of[[mx-3,mz-6],[mx+3,mz-6],[mx,mz-7]])spawn('hugger',x,z);
   cut([{d:3.2,sub:'Specimen tanks. Pale, spider-like things float inside — two still alive.',draw:()=>{for(const[x,z]of C.mk.g)hugger(M(T(x,1.25,z+.3),RX(-.9),S(.9,.9,.9)),C.t,0)},cam:()=>({e:[mx+.6,1.6,mz-1],c:[mx-1,1.3,mz-6],fov:.85})},
    {d:2.4,sub:'Hicks sees the cracked glass a second too late.',draw:()=>drawP(),cam:()=>CU(C.p.x,C.p.z,C.p.ya,1.81)}],()=>{play();say('Huggers! Shoot them before they leap on you',3)})}
  if(n==4){C.goal=g('N');C.obj='Motion! Follow the tracker blip';say('Tracker: a blip, small and fast... follow it',4)}},
 step(dt){const p=C.p;if(C.stage==0&&dist(p,C.goal)<1.6)this.stage(1);if(C.stage==2&&dist(p,C.goal)<1.5)this.stage(3);
  if(C.stage==3){const a=alive();if(a.length){let b=a[0];a.forEach(e=>{if(dist(p,e)<dist(p,b))b=e});C.goal=AUTO?{x:b.x,z:b.z}:null}}
  if(C.stage==3&&C.mode=='foot'&&C.en.filter(e=>!e.dead&&!e.idle).length==0&&C.pt>1){C.en.forEach(e=>{if(!e.dead)e.idle=0});if(!alive().length)this.stage(4)}
  if(C.stage==4&&dist(p,C.goal)<2){C.stage=5;const[nx,nz]=mk('N');
   cut([{d:3,sub:'Under a table, behind a vent grille: a little girl, filthy and terrified.',draw:()=>{kid(M(T(nx,0,nz-1.2),RY(0)),{face:13},0);drawP()},cam:()=>CU(nx,nz-1.2,0,1.17,1)},
    {d:3,sub:'She bolts into the vents. Ripley crawls in after her.',draw:()=>{ripley(M(T(nx,0,nz+.4),RY(PI)),{noNewt:1,rf:11,noGun:1},0)},cam:()=>CU(nx,nz+.4,PI,1.82)},
    {d:3.2,sub:'Her name is Newt. The only survivor of Hadley\'s Hope.',draw:()=>kid(M(T(nx,0,nz-1.2),RY(0)),{face:14},0),cam:()=>CU(nx,nz-1.2,0,1.17,1)}],winCh)}}};
