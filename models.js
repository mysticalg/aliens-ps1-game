const tp=(m,q)=>[m[0]*q[0]+m[4]*q[1]+m[8]*q[2]+m[12],m[1]*q[0]+m[5]*q[1]+m[9]*q[2]+m[13],m[2]*q[0]+m[6]*q[1]+m[10]*q[2]+m[14]];
let VP=null;const PI=Math.PI;const cl=(a,b,c)=>Math.max(b,Math.min(c,a)),lerp=(a,b,k)=>a+(b-a)*k,sm=k=>{k=cl(k,0,1);return k*k*(3-2*k)};
function pw(tb,x){if(x<=tb[0][0])return tb[0][1];for(let i=1;i<tb.length;i++)if(x<tb[i][0]){const[a,b]=tb[i-1],[c,d]=tb[i];return b+(d-b)*(x-a)/(c-a)}return tb[tb.length-1][1]}
const END=131,add=(a,b)=>a.map((x,i)=>x+b[i]);
const RZt=[[0,13],[8.5,1.4],[9.3,1.2],[20,1.2],[56,.8],[79,.8],[90,2.6],[125,2.6],[128,6]];
const rz=t=>pw(RZt,t);const walking=t=>(t<9.2)||(t>79&&t<90)||t>125.3;
const RH=t=>[0,1.82,rz(t)],NH=t=>{const p=FPS.n?tp(FPS.n,[0,0,0]):[-.34,1.66,rz(t)-.1];return p};
const T3=(a,b,c)=>T(a,b,c);const FPS={};let DBG=null;
function head(B,ft,hair,id,sc){sc=sc||1;const Hd=M(B,S(sc,sc,sc));box(M(Hd,S(.36,.4,.36)),hair);
 const FP=M(Hd,T(0,-.02,.186),S(.37,.4,.004));FPS[id]=FP;const dbg=DBG&&DBG.includes(id);box(FP,dbg?7:ft,dbg?[1,0,1]:[1,1,1],dbg?0:.5);}
let MUZ=null,GUNTOP=null;
function ripley(B,o,ph){const sw=o.walk?Math.sin(ph):0;
 [-1,1].forEach(s=>{const L=M(B,T(s*.13,.92,0),RX(s*sw*.45));box(M(L,T(0,-.45,0),S(.19,.9,.21)),16);box(M(L,T(0,-.88,.06),S(.2,.1,.32)),3);});
 const Tor=M(B,T(0,.95,0),RX(o.lean||0));if(o.run)ph*=1.9;box(M(Tor,T(0,.36,0),S(.46,.62,.26)),9);
 // left arm around Newt
 box(M(Tor,T(-.3,.45,.05),RX(.2),S(.12,.45,.13)),4);box(M(Tor,T(-.3,.2,.2),S(.12,.12,.4)),4);
 // Newt on left hip
 const N=M(Tor,T(-.4,.22,.08),RY(o.newtYaw||0));box(M(N,T(0,.25,0),S(.28,.4,.2)),18);
 [-1,1].forEach(s=>box(M(N,T(s*.1,-.02,.12),S(.1,.1,.3)),18));
 box(M(N,T(.13,.32,-.12),RY(.5),S(.08,.08,.32)),4);
 head(M(N,T(0,.6,0),RX(o.newtPitch||0)),o.nf,17,'n',.78);
 // right arm + weapon
 const A=M(Tor,T(.28,.5,0),RY(o.aimY||0),RX(o.aimP||0));box(M(A,T(0,-.06,.2),S(.12,.12,.45)),4);
 const G=M(A,T(-.08,-.05,.5+(o.thrust||0)));box(M(G,S(.13,.17,.75)),6);box(M(G,T(0,-.13,.15),S(.08,.08,.8)),6,[.8,.8,.7]);box(M(G,T(0,.1,-.05),S(.06,.06,.2)),6);
 MUZ=M(G,T(0,-.13,.6));if(o.pilot)box(M(G,T(0,-.13,.58),S(.13,.13,.13)),7,[1,.7,.3],1);GUNTOP=tp(G,[0,.15,0]);
 {const Hh=M(Tor,T(0,.86,0),RY(o.yaw||0),RX(o.pitch||0));head(Hh,o.rf,5,'r');box(M(Hh,T(0,-.05,-.1),S(.42,.42,.24)),5);}}
function warrior(B,ph,dead){if(dead)B=M(B,T(0,.2,0),RX(-PI/2*Math.min(1,dead)));const sw=Math.sin(ph);
 [-1,1].forEach(s=>{const L=M(B,T(s*.16,.95,0),RX(s*sw*.4-.3));box(M(L,T(0,-.47,.1),S(.13,.95,.14)),3,[1,1,1],.08);});
 const Tor=M(B,T(0,1.05,0),RX(.55));box(M(Tor,T(0,.38,0),S(.42,.72,.3)),3,[1,1,1],.22);
 [-1,1].forEach(s=>box(M(Tor,T(s*.28,.5,.25),RX(-.9),S(.08,.08,.75)),3,[1,1,1],.08));
 box(M(Tor,T(0,.86,.12),RX(-1.25),S(.32,.3,1.1)),3,[1,1,1],.22);box(M(Tor,T(0,.68,.38),S(.18,.08,.3)),19,[1,1,1],.2);
 box(M(B,T(0,.8,-.7),RX(.6+.2*Math.sin(ph*.5)),S(.1,.1,1.4)),3,[1,1,1],.08);}
let RT=0;
function egg(x,z,op,burn,t,i){const B=T(x,0,z);box(M(B,T(0,.38,0),S(.52,.66,.52)),2,[1,1,1],.06);box(M(B,T(0,.12,0),S(.6,.24,.6)),2);
 for(let k=0;k<4;k++){const R=M(B,T(0,.72,0),RY(k*PI/2),T(0,0,.13),RX(op*1.1),T(0,.06,0));box(M(R,S(.26,.12,.26)),2,[1,1,1],.06);}
 if(op>.5)box(M(B,T(0,.78,0),S(.2,.2,.2)),23,[1,1,1],.3);
 if(burn>0){const k=sm(burn);for(let j=0;j<3;j++){const h=k*(.7+.4*Math.sin(t*6+i*1.7+j*2.1));bx(x+(j-1)*.15,.6+h/2,z+(H1(i+j)-.5)*.3,.3*k,h,.3*k,15,[1,1,1],1,RY(i+j));}}}
const EGGS=[];for(let x=-4.2;x<=4.3;x+=1.2)for(let z=-2.4;z<=4.6;z+=1.15){const xx=x+(H1(x*31+z*7)-.5)*.4;if(Math.hypot(xx,z-1.2)<1.05||Math.hypot(xx-1.6,z+.6)<.9||(Math.abs(xx)<.85&&z>1))continue;EGGS.push([xx,z])}
for(let i=0;i<9;i++)for(let j=0;j<8;j++){const x=-5.6+i*1.4+(H1(i*13+j)-.5)*.5,z=-3.6-j*1.3+(H1(i*7+j*3)-.5)*.4;if(Math.abs(x)<.4&&j<1)continue;EGGS.push([x,z])}
const OPENEGG=[-1.4,-3.4];
let QR=0,QTILT=0,HISS=0,QOFF=I();
function queenHead(t){const r=QR;const p=[0,lerp(8.4,3.6,r)+.15*Math.sin(t*.9),lerp(-21,-12.5,r)];let tilt=.15*Math.sin(t*.4)+QTILT;return{p,tilt}}
function queen(t,fall){const base=M(QOFF,T(0,0,-19),RX(-.6*fall),T(0,-2.5*fall,0));
 box(M(base,T(0,4.2,-1),RX(-.35),S(2.2,2.6,3.6)),3,[1,1,1],.22);box(M(base,T(0,2.8,-3.5),RX(.4),S(1.6,1.6,3)),3,[1,1,1],.08);
 [-1,1].forEach(s=>{box(M(base,T(s*1.6,2.2,0),RZ(s*.3),S(.25,4,.25)),3,[1,1,1],.08);box(M(base,T(s*2.4,.8,1),RZ(s*.8),S(.25,2.2,.25)),3,[1,1,1],.08);
  box(M(base,T(s*1.2,4.6,.8),RZ(s*.6),RX(-.9),S(.2,.2,2.4)),3,[1,1,1],.22);box(M(base,T(s*.8,4.0,1.3),RX(-1.2),S(.15,.15,1.6)),3,[1,1,1],.22);});
 // egg sac (torn away when fall>0)
 const sac=fall>0?T(0,0,-.5*fall):I();
 for(let k=0;k<12;k++){const z=-22.3-k*1.15,y=k<6?3.7:3.7-(k-5)*.45,w=(k<10?2.3+.4*Math.sin(k*.9):1.9-(k-10)*.5)*(1+.06*Math.sin(RT*2.4-k*.8));
  box(M(sac,T(0,y,z),S(w,w*.85,1.2)),24,[1.1,1.1,1],.45);box(M(sac,T(0,y,z-.58),S(w*1.04,w*.88,.14)),24,[.7,.65,.6],.3);
  if(k%3==1&&k<9)for(const s2 of[-1,1])box(M(sac,T(s2*w*.35,y+(9.5-y)/2,z),RZ(s2*.08),S(.18,9.5-y,.18)),8,[.8,.8,.7],.15);}
 const h=queenHead(t);const neck=M(base,T(0,0,19));const nb=tp(base,[0,5.2,.5]);const hp=fall>0?tp(base,sub(add(h.p,[0,0,19]),[0,0,0])):h.p;
 const mid=[(nb[0]+hp[0])/2,(nb[1]+hp[1])/2,(nb[2]+hp[2])/2];const d=sub(hp,nb),len=Math.hypot(...d);
 const ya=Math.atan2(d[0],d[2]),pi=-Math.atan2(d[1],Math.hypot(d[0],d[2]));box(M(T(...mid),RY(ya),RX(pi),S(.6,.6,len)),3,[1,1,1],.22);
 const Hm=M(T(...hp),RX(-.15+h.tilt));box(M(Hm,T(0,.35,-.9),RX(.35),S(1.8,.18,3.2)),3,[1.3,1.4,1.6],.4);box(M(Hm,T(0,-.05,.45),S(.62,.55,1.5)),3,[1.3,1.4,1.6],.4);
 const hiss=QHISS(t);box(M(Hm,T(0,-.34,.55),RX(hiss*.4),S(.5,.15,1.2)),3,[1,1,1],.26);box(M(Hm,T(0,-.2,1.15),S(.4,.06,.06)),19,[.7,.7,.7],.2);
 if(hiss>.3)box(M(Hm,T(0,-.2,1.2+hiss*.4),S(.14,.14,.3)),19,[.9,.9,.9],.4);}
const QHISS=t=>HISS;
function warriorPos(t,s){const tb=[[56,[6.2,-7.5]],[60,[2.7,-3.2]],[75.5,[2.6,-3.2]],[79,[5.2,-8.5]],[100.5,[5.2,-8.5]],[103.3,[2.0,-3.2]]];const p=pw(tb.map(([a,b])=>[a,b[0]]),t),q=pw(tb.map(([a,b])=>[a,b[1]]),t);
 const dead=s>0?sm((t-(103.5+s*1.1))/.5):sm((t-104.1)/.5);return[s*p,q,dead]}
function fireStream(t){const on=(t>63.6&&t<65.2)||(t>93&&t<98.2);if(!on||!MUZ)return;const o=tp(MUZ,[0,0,0]),f=nrm(sub(tp(MUZ,[0,0,1]),o));
 for(let i=0;i<14;i++){const d=(i+(t*20)%1)*.5;const w=.12+d*.12;const p=add(o,f.map(v=>v*d));bx(p[0],p[1]+d*d*.004,p[2],w,w,w,15,[1,1,1],1,RY(i+t*7));}}
function hive(){for(let z=-36;z<=14;z+=4)for(let x=-12;x<=12;x+=4)bx(x,-.05,z,4,.1,4,0);
 for(let z=-36;z<=14;z+=4){bx(-9,4,z,1,8,4,1);bx(9,4,z,1,8,4,1);bx(0,9.5,z,20,1,4,1,[.8,.85,.85]);}
 bx(0,4,-37,20,10,1,1);bx(0,4,15,20,10,1,1);
 for(let i=0;i<10;i++){const z=-34+i*5;bx(-7.6,3.5,z,1.2,7,.5,1,[.9,1,1],0,RZ(.2));bx(7.6,3.5,z,1.2,7,.5,1,[.9,1,1],0,RZ(-.2));}
}
// shots
function newEgg(TT){if(TT<40.6)return;const u=TT-40.6;let z,y,sc=1;if(u<1.4){const k=sm(u/1.4);z=-35.3;var ex=lerp(.3,1.3,k);y=1.0-.2*k;sc=.6+.4*k}else{const k=cl((u-1.4)/.35,0,1);z=-35.3;var ex=1.3;y=.8*(1-k*k)}
 box(M(T3(ex,y,z),S(sc,sc,sc),T3(0,.38,0),S(.52,.66,.52)),2,[1,1,1],.15);
 if(u>1.75&&u<3.5){const v=u-1.75;for(let i=0;i<10;i++){const a=H1(i+50)*6.28;bx(1.3+Math.cos(a)*v*.9,.05+Math.max(0,.5*Math.sin(Math.min(v*3,PI))*H1(i)),-35.3+Math.sin(a)*v*.9,.12,.1,.12,25,[1,1,1],.4)}}
 if(u>1.75)bx(1.3,.03,-35.3,1.4*Math.min(1,(u-1.75)*2),.05,1.4*Math.min(1,(u-1.75)*2),25,[1,1,1],.3);}
