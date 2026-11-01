// ===== CH1 DROP =====
function seated(x,z,ya,face,kind){const B=M(T(x,-.45,z),RY(ya));if(kind=='rip')ripley(B,{noNewt:1,rf:face,noGun:1},0);else marine(B,{face,gun:'none',helm:kind!='nohelm'},0)}
const BAY=[[58.9,-2,PI/2,30],[58.9,0,PI/2,34],[58.9,2,PI/2,26],[61.1,-1,-PI/2,29,'nohelm'],[61.1,1,-PI/2,10,'rip'],[61.1,3,-PI/2,31,'nohelm'],[61.1,-3,-PI/2,32,'nohelm']];
function bayStatic(){bx(60,-.05,0,4,.1,10,35);bx(57.6,1.4,0,.3,2.8,10,19,[.7,.75,.72]);bx(62.4,1.4,0,.3,2.8,10,19,[.7,.75,.72]);bx(60,2.85,0,5,.2,10,6);
 for(const s of[-1,1])bx(60+s*.95,.4,0,.5,.12,9,6);for(let z=-4;z<=4;z+=2)bx(60,2.7,z,.3,.08,.9,7,[.9,1,.9],.9);bx(60,1.4,-4.9,4.6,2.8,.2,36);bx(60,1.4,5,4.6,2.8,.2,6,[.5,.5,.5])}
function colony(z0){for(let k=0;k<10;k++){const s=k%2?1:-1,x=s*(11+H1(k)*7),z=z0-k*6,h=3+H1(k*3)*5;bx(x,h/2,z,7,h,5,39,[.85,.88,.85]);for(let w=0;w<3;w++)bx(x-s*3.52,h*.6,z-1.5+w*1.5,.05,.4,.7,21,[.3,.35,.4])}
 bx(0,5,z0+4,14,.6,.6,6);bx(-7,2.5,z0+4,.6,5,.6,6);bx(7,2.5,z0+4,.6,5,.6,6);bx(0,5,z0+4.35,8,.8,.05,36);bx(0,9,z0-40,4,18,4,19,[.6,.6,.62])}
LV[1]={rain:1,init(){C.fc=[.17,.19,.23];C.fd=[22,75];C.windy=true;C.mus='standoff';const len=1000;
 build(()=>{buildRoad(len);bayStatic();colony(-len-26)});setupDrive(len,{gap:14});C.drv.obs=C.drv.obs.filter(o=>o.k!='alien');C.obj='Drive the APC to Hadley\'s Hope';C.fireMsg='FIRE = BOOST';
 const ds=u=>[0,lerp(60,6,sm(u/4)),lerp(-80,10,sm(u/4))];
 cut([{d:4,sub:'The dropship falls out of the Sulaco\'s belly and dives into the storm.',rain:1,fd:[30,110],draw:u=>dropship(M(T(...ds(u)),RX(.25*(1-sm(u/4))))),cam:u=>{const p=ds(u);return{e:[p[0]+9,p[1]+3,p[2]+16],c:p,fov:.9}}},
  {d:4,sub:'Strapped in, the marines ride out the turbulence.',draw:()=>BAY.forEach(b=>seated(...b)),cam:u=>({e:[60+.3*Math.sin(u*9),1.7,lerp(4.4,-1,sm(u/4))],c:[60,1.1,lerp(-4,-6,u/4)],fov:1.05})},
  {d:2.6,sub:'Sergeant Apone barks out the drop orders.',draw:()=>BAY.forEach(b=>seated(...b)),cam:()=>CU(58.9,-2,PI/2,1.36)},
  {d:2.6,sub:'Hudson brags that this squad can handle anything.',draw:()=>BAY.forEach(b=>seated(...b)),cam:()=>CU(58.9,0,PI/2,1.36)},
  {d:2.4,sub:'Vasquez just stares him down.',draw:()=>BAY.forEach(b=>seated(...b)),cam:()=>CU(61.1,-1,-PI/2,1.36)},
  {d:2.4,sub:'Corporal Hicks dozes through all of it.',draw:()=>BAY.forEach(b=>seated(...b)),cam:()=>CU(58.9,2,PI/2,1.36)},
  {d:3,sub:'Ripley grips her harness. She knows what is down there.',draw:()=>BAY.forEach(b=>seated(...b)),cam:()=>CU(61.1,1,-PI/2,1.37)},
  {d:4,sub:'Wheels down. The APC rolls out into the wind.',rain:1,draw:u=>{dropship(M(T(0,4,17)));apc(M(T(0,0,lerp(9,1,sm(u/4))),RY(PI)),u,1)},cam:u=>({e:[4.5,1.3,-7],c:[0,1.5,lerp(8,1,u/4)],fov:.9})}],()=>{play('drive');say('A/D or mouse to steer · hold FIRE to boost',4)})},
 driveDone(){const z=C.drv.z;C.drv.v=0;cut([{d:4,sub:'Hadley\'s Hope. No lights. No answer on any channel.',rain:1,draw:()=>apc(M(T(C.drv.x,0,z),RY(PI)),0,1),cam:u=>({e:[C.drv.x*.5+1.5,3.6,z+9],c:[0,3,z-30],fov:.9})},
  {d:3,sub:'Hicks checks his rifle. Time to go in on foot.',draw:()=>marine(M(T(0,0,z-4),RY(0)),{face:27},0),cam:()=>CU(0,z-4,0,1.81)}],winCh)}};
