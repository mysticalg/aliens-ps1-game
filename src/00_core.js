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
