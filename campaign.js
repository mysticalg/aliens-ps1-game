// ===== campaign.js — chapters 1-6 & 8 (chapter 7 = queen's lair in game.js). Original homage; paraphrased text only. =====
let CH=7,C=null;const LV={};
const CHN=['','DROP','HADLEY\'S HOPE','THE NEST','OPS SIEGE','MEDLAB','ESCAPE','QUEEN\'S LAIR','SULACO'];
const SAVEK='hive_unlock';let UNL=1;try{UNL=Math.max(1,+localStorage.getItem(SAVEK)||1)}catch(e){}if(Q.has('all'))UNL=8;
function unlock(n){if(n>UNL){UNL=n;try{localStorage.setItem(SAVEK,String(n))}catch(e){}}buildMenu()}
// ---------- extra textures (faces + surfaces) ----------
function tn(x,n,b,a){for(let y=0;y<n;y++)for(let i=0;i<n;i++){const v=(rnd()-.5)*a;x.fillStyle=`rgb(${b[0]+v},${b[1]+v},${b[2]+v})`;x.fillRect(i,y,1,1)}}
tile(26,(x,n)=>pface(x,n,{hair:'#2e2216',fringe:3,skin:[226,182,150],br:.5,jaw:1}),32);      // Hicks calm
tile(27,(x,n)=>pface(x,n,{hair:'#2e2216',fringe:3,skin:[226,182,150],br:2.2,jaw:1}),32);     // Hicks determined
tile(28,(x,n)=>pface(x,n,{hair:'#4a3020',fringe:3,skin:[234,192,162],wide:1,scream:1,br:-2}),32); // Hudson panic
tile(34,(x,n)=>pface(x,n,{hair:'#4a3020',fringe:3,skin:[234,192,162],open:1,br:1}),32);      // Hudson brag
tile(29,(x,n)=>pface(x,n,{hair:'#b02a1c',fringe:7,skin:[206,156,118],br:2.5}),32);           // Vasquez (bandana)
tile(30,(x,n)=>pface(x,n,{hair:'#16110c',fringe:2,skin:[128,88,62],br:1.5,jaw:1,open:1}),32); // Apone
tile(31,(x,n)=>pface(x,n,{hair:'#6a5038',fringe:5,skin:[234,196,172],glasses:1}),32);       // Gorman
tile(32,(x,n)=>pface(x,n,{hair:'#5a4030',fringe:5,skin:[230,188,162],br:-.5}),32);          // Burke
tile(33,(x,n)=>pface(x,n,{hair:'#d0c8b8',fringe:3,skin:[240,220,204],eye:'#56708a'}),32);   // Bishop
tile(41,(x,n)=>pface(x,n,{hair:'#7a6048',fringe:5,skin:[210,196,186],shut:1}),32);          // colonist
tile(35,(x,n)=>{tn(x,n,[104,108,104],12);x.fillStyle='#3a3e3a';for(let i=0;i<n;i+=4){x.fillRect(i,0,1,n);x.fillRect(0,i,n,1)}},16); // grate
tile(36,(x,n)=>{for(let y=0;y<n;y++)for(let i=0;i<n;i++){x.fillStyle=((i+y)>>2)%2?'#e0b020':'#202020';x.fillRect(i,y,1,1)}},16); // hazard
tile(37,(x,n)=>{tn(x,n,[58,62,66],16);x.strokeStyle='rgba(150,160,170,.5)';for(let k=0;k<5;k++){x.beginPath();x.moveTo(rnd()*n,0);x.bezierCurveTo(rnd()*n,n/3,rnd()*n,n*2/3,rnd()*n,n);x.stroke()}},32); // resin
tile(38,(x,n)=>{tn(x,n,[104,98,88],26);x.fillStyle='rgba(40,36,30,.5)';for(let k=0;k<6;k++)x.fillRect(rnd()*n,rnd()*n,3,2)},16); // rock ground
tile(39,(x,n)=>{tn(x,n,[132,138,134],10);x.fillStyle='#4a524e';x.fillRect(0,n-3,n,3);x.fillRect(0,0,n,1);x.fillStyle='#d8e4d0';x.fillRect(4,5,n-8,2)},32); // colony panel
tile(40,(x,n)=>{tn(x,n,[150,206,196],14);x.fillStyle='rgba(255,255,255,.6)';x.fillRect(3,2,2,n-4)},16); // tank glass
gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,at);
// ---------- models ----------
function marine(B,o,ph){const sw=o.walk?Math.sin(ph):0,ar=o.armor||[.86,.95,.8];
 [-1,1].forEach(s=>{const L=M(B,T(s*.13,.92,0),RX(s*sw*.5));box(M(L,T(0,-.45,0),S(.2,.9,.22)),16,ar);box(M(L,T(0,-.88,.06),S(.21,.1,.32)),21)});
 const Tor=M(B,T(0,.95,0));box(M(Tor,T(0,.36,0),S(.5,.64,.3)),16,ar);box(M(Tor,T(0,.42,.13),S(.44,.4,.08)),6,[.85,.9,.8]);
 [-1,1].forEach(s=>box(M(Tor,T(s*.3,.45,.12),RX(-1.2),S(.12,.42,.13)),4));
 const Gn=M(Tor,T(.06,.44,.45));if(o.gun=='smart'){box(M(Gn,S(.24,.24,.95)),6,[.72,.72,.66]);box(M(Tor,T(.32,.62,0),S(.08,.6,.08)),6)}else if(o.gun!='none'){box(M(Gn,S(.12,.18,.8)),6,[.75,.78,.7]);box(M(Gn,T(0,-.14,.05),S(.08,.12,.2)),6)}
 const Hh=M(Tor,T(0,.86,0),RY(o.yaw||0));head(Hh,o.face,o.hairT||5,'m');if(o.helm!==false)box(M(Hh,T(0,.17,-.02),S(.42,.16,.44)),16,ar)}
function kid(B,o,ph){const sw=o.walk?Math.sin(ph*1.3):0;[-1,1].forEach(s=>{const L=M(B,T(s*.08,.55,0),RX(s*sw*.5));box(M(L,T(0,-.27,0),S(.11,.55,.12)),18)});
 const Tor=M(B,T(0,.55,0));box(M(Tor,T(0,.22,0),S(.3,.44,.2)),18);[-1,1].forEach(s=>box(M(Tor,T(s*.2,.25,0),RX(o.arms||0),S(.08,.36,.08)),4));
 head(M(Tor,T(0,.62,0),RY(o.yaw||0)),o.face||13,17,'k',.8)}
function hugger(B,ph,dead){if(dead)B=M(B,T(0,.25*dead,0),RZ(PI*Math.min(1,dead)));
 box(M(B,T(0,.14,0),S(.32,.12,.36)),18,[1,.92,.8],.1);for(const s of[-1,1])for(let k=0;k<4;k++)box(M(B,T(0,.12,.15-k*.1),RY(s*(.3+k*.25)),RZ(s*(.25+.3*Math.sin(ph*2+k))),T(s*.25,0,0),S(.34,.04,.05)),18,[1,.9,.75],.05);
 box(M(B,T(0,.12,-.2),RY(.5*Math.sin(ph*1.5)),T(0,0,-.3),S(.06,.06,.6)),18,[1,.9,.75])}
function apc(B,t,lt){box(M(B,T(0,1.15,0),S(2.8,1.5,6)),16,[.82,.88,.78]);box(M(B,T(0,2.15,-.4),S(2.3,.6,3.6)),16,[.76,.82,.72]);
 box(M(B,T(0,1.25,3.05),RX(-.5),S(2.6,1.1,.6)),6);box(M(B,T(0,2.62,-1),S(.9,.42,1.4)),6);box(M(B,T(0,2.62,.3),S(.16,.16,1.8)),6);
 for(const s of[-1,1])for(let k=0;k<4;k++)box(M(B,T(s*1.45,.55,-2.2+k*1.45),RX(t*3),S(.42,1.1,1.1)),21);
 if(lt)for(const s of[-1,1])box(M(B,T(s*.95,1.4,3.08),S(.42,.24,.1)),7,[1,1,.85],1)}
function dropship(B){box(B&&M(B,S(3.4,1.8,9)),6,[.72,.76,.74]);box(M(B,T(0,.4,5),RX(.35),S(2.4,1.2,2.4)),6,[.62,.66,.62]);box(M(B,T(0,.92,5.4),S(1.6,.3,1)),20,[.6,.8,.9],.4);
 for(const s of[-1,1]){box(M(B,T(s*3.2,.2,-1),S(3.2,.25,3.6)),6);box(M(B,T(s*2.4,-.2,-3),S(1.1,1.1,3)),6,[.6,.6,.6]);box(M(B,T(s*2.4,-.2,-4.6),S(.8,.8,.2)),15,[1,1,1],1)}
 box(M(B,T(0,1.6,-3.6),RX(-.5),S(.25,2,1.8)),6)}
function loader(B,o,ph){const sw=o.walk?Math.sin(ph):0;
 for(const s of[-1,1]){const L=M(B,T(s*.75,1.3,0),RX(s*sw*.3));box(M(L,T(0,-.65,0),S(.38,1.3,.42)),36);box(M(L,T(0,-1.25,.15),S(.62,.16,.95)),21)}
 const F=M(B,T(0,1.3,0));box(M(F,T(0,.3,-.3),S(1.8,.5,.5)),36);box(M(F,T(0,1.25,-.5),S(.22,2.3,.22)),21);for(const s of[-1,1])box(M(F,T(s*.9,1.25,-.35),S(.18,2.3,.18)),36);box(M(F,T(0,2.4,-.35),S(2,.2,.42)),36);
 box(M(F,T(0,.95,-.15),S(.46,.6,.26)),9);const Hh=M(F,T(0,1.5,-.12));head(Hh,o.rf||12,5,'r');box(M(Hh,T(0,-.05,-.1),S(.42,.42,.24)),5);
 for(const s of[-1,1]){const pn=(o.punch&&o.punch[s<0?0:1])||0;const A=M(F,T(s*1.2,1.0,.1+pn*.9));box(M(A,T(0,0,.5),S(.32,.32,1.3)),36);box(M(A,T(0,.18,1.25),S(.12,.32,.5)),21);box(M(A,T(0,-.18,1.25),S(.12,.32,.5)),21)}}
function queenB(B,o,ph){const cr=o.crouch||0,lu=o.lunge||0;const Bc=M(B,T(0,-cr*.8,0));
 for(const s of[-1,1]){box(M(Bc,T(s*.75,1.4,-.5),RZ(s*.15),RX(-.2),S(.32,2.8,.32)),3,[1,1,1],.1);box(M(Bc,T(s*.9,.15,-.2),S(.5,.3,.9)),3)}
 const Tor=M(Bc,T(0,2.7,-.5),RX(.55+cr*.35-lu*.25));box(M(Tor,T(0,.8,0),S(1.5,1.9,1)),3,[1,1,1],.22);box(M(Tor,T(0,.6,.45),S(.9,1.2,.3)),19,[.8,.8,.85],.15);
 for(const s of[-1,1]){box(M(Tor,T(s*.85,1.3,.5),RX(-1.1+.25*Math.sin(ph+s)),T(0,-.6,0),S(.18,1.3,.18)),3,[1,1,1],.1);box(M(Tor,T(s*.45,.7,.6),RX(-1.4),T(0,-.3,0),S(.1,.7,.1)),3)}
 const Hd=M(Tor,T(0,1.8,.4+lu*1.3),RX(-1.25+lu*.2));box(M(Hd,T(0,1,-.1),S(1.1,2.4,.7)),3,[1,1,1],.25);box(M(Hd,T(0,.15,.25),S(.55,.8,.45)),3,[1,1,1],.2);box(M(Hd,T(0,-.25,.35),S(.34,.2,.3)),19,[1,1,1],.3);
 for(let k=0;k<7;k++)box(M(B,T(0,.9+k*.06,-1.7-k*.85),RY(.35*Math.sin(ph*.8+k*.6)),S(.32-k*.03,.32-k*.03,.95)),3,[1,1,1],.1)}
function sentryM(x,z,ya,fl){const B=M(T(x,0,z),RY(ya));for(let k=0;k<3;k++)box(M(B,RY(k*2.1),T(0,.42,.22),RX(.45),S(.06,.9,.06)),6);box(M(B,T(0,.95,0),S(.36,.32,.62)),6,[.82,.86,.78]);box(M(B,T(0,.95,.45),S(.1,.1,.5)),21);if(fl)box(M(B,T(0,.95,.75),S(.15,.15,.15)),7,[1,.85,.45],1)}
// ---------- map / navigation ----------
const CS=2,SOLID='#FWKtcgD';
function setMap(rows){const w=Math.max(...rows.map(r=>r.length));C.map=rows.map(r=>r.padEnd(w,' '));C.mw=w;C.mh=rows.length;C.mk={};C.open={};
 C.map.forEach((r,j)=>[...r].forEach((ch,i)=>{if(!'# .'.includes(ch))(C.mk[ch]=C.mk[ch]||[]).push([i*CS,j*CS])}))}
const mk=(ch,i)=>C.mk[ch][i||0];
const cellAt=(x,z)=>{const i=Math.round(x/CS),j=Math.round(z/CS);return(C.map[j]||'')[i]||' '};
function solid(x,z){if(!C.map)return false;const i=Math.round(x/CS),j=Math.round(z/CS),c=(C.map[j]||'')[i]||' ';return(c==' '||SOLID.includes(c))&&!C.open[i+','+j]}
const solidR=(x,z,r)=>solid(x-r,z-r)||solid(x+r,z-r)||solid(x-r,z+r)||solid(x+r,z+r);
function moveE(e,dx,dz,r){if(!solidR(e.x+dx,e.z,r))e.x+=dx;if(!solidR(e.x,e.z+dz,r))e.z+=dz}
function bfs(tx,tz){const w=C.mw,h=C.mh,D=new Int16Array(w*h).fill(-1);const ti=Math.round(tx/CS),tj=Math.round(tz/CS);if(ti<0||tj<0||ti>=w||tj>=h)return D;const q=[ti+tj*w];D[q[0]]=0;
 for(let k=0;k<q.length;k++){const c=q[k],i=c%w,j=c/w|0;for(const[di,dj]of[[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+di,nj=j+dj;if(ni<0||nj<0||ni>=w||nj>=h)continue;const n=ni+nj*w;if(D[n]>=0||solid(ni*CS,nj*CS))continue;D[n]=D[c]+1;q.push(n)}}return D}
function stepTo(D,x,z){const w=C.mw,i=Math.round(x/CS),j=Math.round(z/CS);const d0=D[i+j*w];let best=null,bd=d0<0?1e9:d0;for(const[di,dj]of[[1,0],[-1,0],[0,1],[0,-1]]){const ni=i+di,nj=j+dj;if(ni<0||nj<0||ni>=C.mw||nj>=C.mh)continue;const d=D[ni+nj*w];if(d>=0&&d<bd){bd=d;best=[ni*CS,nj*CS]}}return best}
const sameCell=(x0,z0,x1,z1)=>Math.round(x0/CS)==Math.round(x1/CS)&&Math.round(z0/CS)==Math.round(z1/CS);
function pathDir(D,e,tx,tz){let nx=tx,nz=tz;if(C.map&&!sameCell(e.x,e.z,tx,tz)){const s=stepTo(D,e.x,e.z);if(s){nx=s[0];nz=s[1];
  // centre in corridor: if far off the line to next cell, steer to cell centre first
 }}const dx=nx-e.x,dz=nz-e.z,l=Math.hypot(dx,dz);return l<.05?[0,0,0]:[dx/l,dz/l,l]}
function navIn(tx,tz){const key=Math.round(tx/CS)+','+Math.round(tz/CS);if(C.aK!=key){C.aK=key;C.aD=bfs(tx,tz)}const d=pathDir(C.aD,C.p,tx,tz);return{mx:d[0],mz:d[1],l:d[2]}}
function los(x0,z0,x1,z1){const l=Math.hypot(x1-x0,z1-z0);for(let k=.5;k<l-.3;k+=.4){if(solid(x0+(x1-x0)*k/l,z0+(z1-z0)*k/l))return false}return true}
const dist=(a,b)=>Math.hypot(a.x-(b.x!=null?b.x:b[0]),a.z-(b.z!=null?b.z:b[1]));
function build(fn){VN=0;FAR=1e9;CAM=[0,0,0];fn();upload(VS,true)}
function nearOpen(i,j){for(let dj=-1;dj<=1;dj++)for(let di=-1;di<=1;di++){const c=(C.map[j+dj]||'')[i+di];if(c&&c!='#'&&c!=' '&&!SOLID.includes(c))return true}return false}
function buildMap(o){const wh=o.wh||2.2;C.map.forEach((r,j)=>[...r].forEach((ch,i)=>{const x=i*CS,z=j*CS;
 if(ch==' ')return;if(ch=='#'||ch=='F'||ch=='W'||ch=='K'){if(!nearOpen(i,j))return;bx(x,wh/2,z,CS,wh,CS,o.wall,o.wc);if(o.strip&&(i*7+j*3)%5==0)bx(x,wh-.25,z,CS*1.02,.12,CS*1.02,7,o.strip,.7);return}
 bx(x,-.05,z,CS,.1,CS,ch=='L'?36:o.floor,o.fc);if(ch=='t'){bx(x,.42,z,1.7,.84,1.1,6,[.85,.9,.88]);bx(x,.9,z,1.5,.12,.9,20,[.9,.95,.95])}
 if(ch=='g'){bx(x,.5,z,CS,1,.3,6);bx(x,1.5,z,CS,1.4,.1,40,[1,1,1],.35)}
 if(ch=='c'){bx(x,1.1,z,1.2,2.2,1.2,37,[1,1,1],.05);bx(x,1.6,z+.62,.37,.4,.02,41,[1,1,1],.4)}}))}
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
// ===== CH4 OPS SIEGE =====
const MAP4=["#########S#########",
"#########.#########",
"#########.#########",
"#########.#########",
"#########A#########",
"#########.#########",
"#######.....#######",
"#S...B..t.t..W...S#",
"#######.....#######",
"#######..P..#######",
"#######.....#######",
"###################"];
LV[4]={init(){C.fc=[.07,.09,.1];C.fd=[13,34];C.mus='standoff';setMap(MAP4);C.pk='hicks';C.pf=27;C.weaps=['rifle'];C.fireMsg='FIRE allowed';C.trk=true;
 const[wx,wz]=mk('W');C.wk=(wx/2)+','+(wz/2);C.open[C.wk]=1;
 build(()=>{buildMap({wall:39,floor:35,strip:[.9,1,.85]});for(const k of'AB'){const[x,z]=mk(k);bx(x,.03,z,1.6,.04,1.6,36)}});
 const[px,pz]=mk('P');Object.assign(C.p,{x:px,z:pz,ya:PI});C.allies=[{x:px-1,z:pz+.8,face:28,gun:'rifle',ph:0,ya:PI},{x:px+1,z:pz+.8,face:29,gun:'smart',helm:false,ph:0,ya:PI},{x:px,z:pz+1.4,rip:1,face:11,gun:'rifle',ph:0,ya:PI}];
 C.sen=[];const g=k=>{const[x,z]=mk(k);return{x,z}};
 cut([{d:3.2,sub:'Back in the colony operations block. The dropship is gone. Rescue is weeks away.',actors:1,draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[px+3,2.4,pz+3],c:[px,1,pz-3],fov:.95})},
  {d:2.6,sub:'Hudson loses it: game over, man.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(px-1,pz+.8,PI,1.81)},
  {d:2.8,sub:'Ripley cuts him off. They have sixteen hours. Seal the place up.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(px,pz+1.4,PI,1.82)},
  {d:2.6,sub:'Hicks sets the plan: sentry guns in the corridors, weld the rest.',draw:drawP,cam:()=>CU(px,pz,PI,1.81)}],()=>{play();this.stage(0)})},
 stage(n){C.stage=n;const g=k=>{const[x,z]=mk(k);return{x,z}};
  if(n==0){const a=g('A');C.act={x:a.x,z:a.z,r:1.4,dur:2,label:'PLACE SENTRY A',snd:900,done:()=>{C.sen.push({x:a.x,z:a.z,ya:PI,am:500,id:'A'});SFX.click();this.stage(1)}};C.obj='Set up sentry gun A in the north corridor';say('Walk onto the yellow pad and hold FIRE',4)}
  if(n==1){const b=g('B');C.act={x:b.x,z:b.z,r:1.4,dur:2,label:'PLACE SENTRY B',snd:900,done:()=>{C.sen.push({x:b.x,z:b.z,ya:-PI/2,am:500,id:'B'});SFX.click();this.stage(2)}};C.obj='Set up sentry gun B in the west corridor'}
  if(n==2){const w=g('W');C.act={x:w.x-1.6,z:w.z,r:1.4,dur:3,label:'WELDING DOOR',snd:3400,done:()=>{delete C.open[C.wk];C.D=null;this.stage(3)}};C.obj='Weld the east door shut'}
  if(n==3){C.act=null;C.siege=0;C.mus='torch';C.obj='SIEGE: hold the ops room. Sentries fire on their own';say('Here they come! Watch the sentry counters.',4)}
  if(n==4){C.mus='shoot';C.br=0;C.brK=C.kills;C.obj='They\'re in the ceiling! Kill 10';say('Movement right on top of us... THE CEILING!',4)}},
 step(dt){const p=C.p;if(C.sen.length)C.scoreTxt=C.sen.map(s=>`SENTRY ${s.id} ${String(Math.max(0,s.am|0)).padStart(3,'0')}`).join('  ');
  C.sen.forEach(s=>{if(s.am<=0)return;let t=null,bd=11;alive().forEach(e=>{if(e.y>.3)return;const d=dist(s,e);if(d<bd&&los(s.x,s.z,e.x,e.z)){bd=d;t=e}});s.fl=0;
   if(t){s.ya=Math.atan2(t.x-s.x,t.z-s.z);if(C.t-(s.fT||0)>.07){s.fT=C.t;s.am--;s.fl=1;dmgE(t,.36);if(((C.t*14)|0)%2)noise(.04,.07,2200,.8);if(s.am%5==0)C.fx.push({k:'tr',a:[s.x,.95,s.z],b:[t.x,1,t.z],t:C.t})}}});
  if(C.stage==3){C.siege+=dt;C.sT=(C.sT||0)-dt;const low=C.sen.every(s=>s.am<40);C.bar=()=>['SIEGE',C.siege/70,'#e0a030'];
   if(C.sT<=0&&!low&&C.siege<66){C.sT=.75;const k=((C.siege*4)|0)%2;const S=C.mk.S;const s=k?S[0]:S[1];spawn('alien',s[0],s[1],{sp:2.9})}
   if((low||C.siege>=70)&&alive().length==0){C.bar=null;say(low?'Sentries nearly dry... and they pulled back.':'They pulled back.',3);this.stage(4)}}
  if(C.stage==4){C.br+=dt;C.bar=()=>['CEILING BREACH',(C.kills-C.brK)/10,'#e0a030'];C.sT=(C.sT||0)-dt;const sp=C.kills-C.brK+alive().length;
   if(C.sT<=0&&sp<10&&alive().length<4){C.sT=1.6;const cells=[[14,12],[18,12],[22,12],[14,16],[22,16],[18,20],[14,20],[22,20]];const c=cells[(rnd()*8)|0];spawn('alien',c[0],c[1],{y:2.4});SFX.hiss()}
   if(C.kills-C.brK>=10){C.stage=5;C.bar=null;cut([{d:3,sub:'The last one drops. Silence, except for the alarms.',draw:()=>{drawP();C.allies.forEach(drawAlly)},cam:()=>({e:[p.x+3,3,p.z+4],c:[p.x,1,p.z],fov:.95})},
    {d:2.8,sub:'Ripley realises Newt is nowhere in the room.',draw:()=>C.allies.forEach(drawAlly),cam:()=>CU(C.allies[2].x,C.allies[2].z,C.allies[2].ya,1.82)}],winCh)}}},
 draw(){C.sen&&C.sen.forEach(s=>sentryM(s.x,s.z,s.ya,s.fl&&((C.t*20)|0)%2));
  const[wx,wz]=mk('W');if(C.open[C.wk])bx(wx,2,wz,.3,.3,2,21);else bx(wx,1.1,wz,.4,2.2,2,36,[1,.95,.85],.15);
  if(C.stage==4)for(const[x,z]of[[14,12],[18,12],[22,12],[14,16],[22,16],[18,20],[14,20],[22,20]])bx(x,2.25,z,1.2,.05,1.2,21)}};
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
