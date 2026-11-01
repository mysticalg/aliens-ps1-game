const PORT=innerHeight>innerWidth*1.05,W=PORT?216:320,H=PORT?384:240,g=document.getElementById('g'),gl=g.getContext('webgl2',{preserveDrawingBuffer:true,antialias:false,powerPreference:'high-performance'});;g.width=W;g.height=H;
const oc=document.getElementById('o'),ox=oc.getContext('2d');ox.imageSmoothingEnabled=false;
let sd=7;const rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
const H1=i=>{const s=Math.sin(i*12.9898+78.233)*43758.5453;return s-Math.floor(s)};
const at=document.createElement('canvas');at.width=at.height=512;const ac=at.getContext('2d');
function tile(i,fn,lo){const c=document.createElement('canvas');const n=lo||64;c.width=c.height=n;const x=c.getContext('2d');fn(x,n);
 ac.imageSmoothingEnabled=false;ac.drawImage(c,(i%8)*64,(i/8|0)*64,64,64);}
function noise(x,n,base,amt,blot){for(let y=0;y<n;y++)for(let i=0;i<n;i++){const v=(rnd()-.5)*amt;x.fillStyle=`rgb(${base[0]+v},${base[1]+v*1.1},${base[2]+v*.8})`;x.fillRect(i,y,1,1);}
 for(let k=0;k<(blot||0);k++){x.fillStyle=`rgba(0,0,0,${.12+rnd()*.2})`;x.fillRect(rnd()*n,rnd()*n,2+rnd()*n/5,2+rnd()*n/5);}}


tile(0,(x,n)=>{noise(x,n,[70,84,78],22,8);x.fillStyle='rgba(150,170,140,.35)';for(let k=0;k<6;k++)x.fillRect(rnd()*n,rnd()*n,6,1)},32);
tile(1,(x,n)=>{noise(x,n,[62,74,78],20,4);for(let i=0;i<n;i+=6){x.fillStyle='#2a3438';x.fillRect(0,i,n,2);x.fillStyle='#8a9ca0';x.fillRect(0,i+2,n,1)}x.fillStyle='rgba(30,40,40,.6)';for(let i=0;i<n;i+=11)x.fillRect(i,0,2,n)},32);
tile(2,(x,n)=>{noise(x,n,[120,112,70],18,0);x.fillStyle='#5a4a2a';for(let k=0;k<6;k++)x.fillRect(rnd()*n,0,1,n);x.fillStyle='#d0c890';x.fillRect(2,2,3,2)},16);
tile(3,(x,n)=>{noise(x,n,[44,52,66],14,0);x.fillStyle='#9aaac0';for(let k=0;k<6;k++)x.fillRect(rnd()*n,rnd()*n,2,1);x.fillStyle='#1a1e28';for(let i=0;i<n;i+=5)x.fillRect(0,i,n,1)},16);
tile(4,(x,n)=>noise(x,n,[220,176,150],10,0),16);
tile(5,(x,n)=>{noise(x,n,[86,56,36],16,0);x.fillStyle='#3a2414';for(let i=0;i<n;i+=3)x.fillRect(i,0,1,n)},16);
tile(6,(x,n)=>{noise(x,n,[90,92,86],14,2);x.fillStyle='#c8ccc0';x.fillRect(0,1,n,1)},16);
tile(7,(x,n)=>{x.fillStyle='#fff';x.fillRect(0,0,n,n)},8);
tile(8,(x,n)=>{noise(x,n,[176,168,110],20,0);x.fillStyle='#7a7040';for(let i=0;i<n;i+=4)x.fillRect(0,i,n,1)},16);
tile(9,(x,n)=>{noise(x,n,[150,150,140],12,0);x.fillStyle='#3a3a32';x.fillRect(0,4,n,2);x.fillRect(5,0,2,n)},16);
function pface(x,n,o){const s=o.skin||[214,168,138];for(let y=0;y<n;y++)for(let i=0;i<n;i++){const v=(rnd()-.5)*10;x.fillStyle=`rgb(${s[0]+v},${s[1]+v},${s[2]+v})`;x.fillRect(i,y,1,1)}
 x.fillStyle=o.hair;x.fillRect(0,0,n,o.fringe||4);x.fillRect(0,0,2,14);x.fillRect(n-2,0,2,14);
 x.fillStyle='rgba(60,30,20,.9)';x.fillRect(6,9+(o.br||0),8,2);x.fillRect(18,9-(o.br||0),8,2);
 if(o.shut){x.fillStyle='#5a3020';x.fillRect(7,15,6,1);x.fillRect(19,15,6,1);}else if(o.glasses){x.fillStyle='#0a0a0e';x.fillRect(4,12,11,6);x.fillRect(17,12,11,6);x.fillRect(14,13,4,2);x.fillStyle='#5a6a8a';x.fillRect(6,13,3,1);x.fillRect(19,13,3,1);}
 else{x.fillStyle='#f6f2e8';x.fillRect(7,13,6,o.wide?5:3);x.fillRect(19,13,6,o.wide?5:3);x.fillStyle=o.eye||'#3a2a1a';x.fillRect(9,13,3,3);x.fillRect(20,13,3,3);x.fillStyle='#000';x.fillRect(10,14,1,1);x.fillRect(21,14,1,1);}
 x.fillStyle='rgba(90,50,30,.45)';x.fillRect(15,14,2,7);x.fillRect(13,20,6,2);
 if(o.scream){x.fillStyle='#2a0806';x.fillRect(10,22,12,8);x.fillStyle='#eee';x.fillRect(11,22,10,1);x.fillRect(11,29,10,1);}else if(o.open){x.fillStyle='#3a0e0a';x.fillRect(11,23,10,5);x.fillStyle='#eee';x.fillRect(12,23,8,1);}else{x.fillStyle='#8a4a3a';x.fillRect(11,24,10,2);}
 x.fillStyle='rgba(120,70,50,.25)';x.fillRect(4,22,4,4);x.fillRect(24,22,4,4);if(o.jaw){x.fillStyle='rgba(60,40,30,.35)';x.fillRect(4,28,24,4)}}

const RS=[232,188,160];
tile(10,(x,n)=>pface(x,n,{hair:'#56381f',fringe:5,skin:RS,wide:1,open:1,br:-1.5}),32);
tile(11,(x,n)=>pface(x,n,{hair:'#56381f',fringe:5,skin:RS,br:1.5}),32);
tile(12,(x,n)=>pface(x,n,{hair:'#56381f',fringe:5,skin:RS,scream:1,br:2.5,wide:1}),32);
tile(13,(x,n)=>pface(x,n,{hair:'#e0c070',fringe:5,skin:[240,200,176],wide:1,open:1,br:-1.5,eye:'#4a7aa0'}),32);
tile(14,(x,n)=>pface(x,n,{hair:'#e0c070',fringe:5,skin:[240,200,176],shut:1,br:-1}),32);
tile(22,(x,n)=>pface(x,n,{hair:'#56381f',fringe:5,skin:RS,br:-.5}),32);
tile(15,(x,n)=>{for(let y=0;y<n;y++){const k=y/n;x.fillStyle=`rgb(255,${Math.round(225-140*k)},${Math.round(100-85*k)})`;x.fillRect(0,y,n,1)}for(let k=0;k<30;k++){x.fillStyle='rgba(255,250,200,.6)';x.fillRect(rnd()*n,rnd()*n*.5,2,3)}},32);
tile(16,(x,n)=>{noise(x,n,[100,104,84],14,0);x.fillStyle='#4a4e3a';x.fillRect(2,8,6,4)},16);
tile(17,(x,n)=>noise(x,n,[224,192,112],16,0),16);
tile(18,(x,n)=>{noise(x,n,[170,140,150],14,0)},16);
tile(19,(x,n)=>{noise(x,n,[190,196,200],18,0);x.fillStyle='#2a2a30';for(let i=0;i<n;i+=3)x.fillRect(i,0,1,n)},16);
tile(20,(x,n)=>noise(x,n,[150,170,170],20,0),16);
tile(21,(x,n)=>noise(x,n,[60,60,58],30,0),16);
tile(24,(x,n)=>{const g=x.createLinearGradient(0,0,0,n);g.addColorStop(0,'#e8e4c0');g.addColorStop(.5,'#c8c898');g.addColorStop(1,'#a8ac80');x.fillStyle=g;x.fillRect(0,0,n,n);
 x.strokeStyle='rgba(120,70,80,.7)';x.lineWidth=1;for(let k=0;k<7;k++){x.beginPath();let px=rnd()*n,py=0;x.moveTo(px,py);for(let s=0;s<6;s++){px+=(rnd()-.5)*8;py+=n/6;x.lineTo(px,py)}x.stroke()}
 x.fillStyle='rgba(255,255,240,.9)';for(let k=0;k<10;k++)x.fillRect(rnd()*n,rnd()*n,2,1);x.fillStyle='rgba(90,100,70,.5)';x.fillRect(0,0,n,2);x.fillRect(0,n-2,n,2)},32);
tile(25,(x,n)=>{noise(x,n,[150,180,120],30,0);x.fillStyle='rgba(230,255,200,.8)';for(let k=0;k<8;k++)x.fillRect(rnd()*n,rnd()*n,2,2)},16);
tile(23,(x,n)=>{noise(x,n,[90,40,40],20,0);x.fillStyle='#d8c890';x.fillRect(0,0,n,2)},16);
const vs=`#version 300 es
in vec3 p;in vec2 u;in vec3 nm;in vec3 cl;in float e;
uniform mat4 VP;uniform vec3 cam;uniform vec3 LD;uniform vec2 FD;
out vec3 vu;out vec3 vl;out float vf;out float ve;
void main(){ve=e;vec4 c=VP*vec4(p,1.);
 vec2 nd=c.xy/c.w; nd=floor(nd*vec2(${W/4}.,${H/4}.)+.5)/vec2(${W/4}.,${H/4}.); if(c.w>0.05)c.xy=nd*c.w;
 gl_Position=c; vu=vec3(u*c.w,c.w);
 vec3 n=normalize(nm); vec3 L=normalize(LD);
 vec3 lit=vec3(.6,.58,.58)+vec3(.6,.56,.5)*max(dot(n,L),0.);
 vl=lit*cl; float dist=length(p-cam);
 vf=smoothstep(FD.x,FD.y,dist)*.7;}`;
const fs=`#version 300 es
precision highp float;in vec3 vu;in vec3 vl;in float vf;in float ve;uniform sampler2D T;uniform vec3 fc;out vec4 o;
float bay(vec2 q){ivec2 i=ivec2(mod(q,4.));int m[16]=int[16](0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5);return float(m[i.y*4+i.x])/16.;}
void main(){float tl=floor(ve/100.+.001);float em=ve-tl*100.;if(em>=2.){if(bay(gl_FragCoord.xy)>=em-2.)discard;em=0.;}
 vec2 o0=vec2(mod(tl,8.),floor(tl/8.))*.125;vec2 uv=clamp(vu.xy/vu.z,o0+.0015,o0+.1235);vec3 t=texture(T,uv).rgb;vec3 c=mix(t*vl,t*vl+t*.6,min(em,1.));
 c=mix(c,fc,clamp(vf,0.,1.)*(1.-min(em,1.)*.7));
 c+= (bay(gl_FragCoord.xy)-.5)/24.; c=floor(clamp(c,0.,1.)*31.+.5)/31.; o=vec4(c,1);}`;

function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);if(!gl.getShaderParameter(x,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(x);return x}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));
['p','u','nm','cl','e'].forEach((a,i)=>gl.bindAttribLocation(pr,i,a));gl.linkProgram(pr);gl.useProgram(pr);
const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,at);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
[[3,0],[2,3],[3,5],[3,8],[1,11]].forEach(([n,o],i)=>{gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,n,gl.FLOAT,false,48,o*4)});
const U=n=>gl.getUniformLocation(pr,n);
const I=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
function mul(a,b){const r=new Array(16);for(let c=0;c<4;c++)for(let w=0;w<4;w++){let s=0;for(let k=0;k<4;k++)s+=a[k*4+w]*b[c*4+k];r[c*4+w]=s}return r}
const T=(x,y,z)=>{const m=I();m[12]=x;m[13]=y;m[14]=z;return m},S=(x,y,z)=>[x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1];
const RX=a=>{const c=Math.cos(a),s=Math.sin(a);return[1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1]},RY=a=>{const c=Math.cos(a),s=Math.sin(a);return[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]},RZ=a=>{const c=Math.cos(a),s=Math.sin(a);return[c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1]};
const M=(...a)=>a.reduce(mul);
function persp(f,a,n,fa){const t=1/Math.tan(f/2);return[t/a,0,0,0,0,t,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0]}
const sub=(a,b)=>a.map((v,i)=>v-b[i]),nrm=a=>{const l=Math.hypot(...a);return a.map(v=>v/l)},crs=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
function look(e,c,up){const z=nrm(sub(e,c)),x=nrm(crs(up,z)),y=crs(z,x);return[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,e),-dot(y,e),-dot(z,e),1]}
const IDX6=[0,1,2,0,2,3];let VB=new Float32Array(1<<20),VN=0;function growVB(){const n=new Float32Array(VB.length*2);n.set(VB);VB=n}let V=[],CAM=[0,0,0],FAR=95;
const FACES=[[[1,0,0],[[.5,-.5,.5],[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5]]],[[-1,0,0],[[-.5,-.5,-.5],[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5]]],
[[0,1,0],[[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5],[-.5,.5,-.5]]],[[0,-1,0],[[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5],[-.5,-.5,.5]]],
[[0,0,1],[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]],[[0,0,-1],[[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5]]]];
function box(m,tl,col,em){col=col||[1,1,1];em=em||0;const cx=m[12],cy=m[13],cz=m[14];
 if(Math.hypot(cx-CAM[0],cy-CAM[1],cz-CAM[2])>FAR)return;
 FACES.forEach(([n,q],f)=>{const t=Array.isArray(tl)?tl[f]:tl;const u0=(t%8)*.125+.001,v0=(t/8|0)*.125+.001,d=.123;
  const uv=[[u0,v0+d],[u0+d,v0+d],[u0+d,v0],[u0,v0]];
  const nw=[m[0]*n[0]+m[4]*n[1]+m[8]*n[2],m[1]*n[0]+m[5]*n[1]+m[9]*n[2],m[2]*n[0]+m[6]*n[1]+m[10]*n[2]];
  const P=q.map(([x,y,z])=>[m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]]);
  const ee=em+100*t;for(const i of IDX6){if(VN+12>VB.length)growVB();const p=P[i],w=uv[i];VB[VN++]=p[0];VB[VN++]=p[1];VB[VN++]=p[2];VB[VN++]=w[0];VB[VN++]=w[1];VB[VN++]=nw[0];VB[VN++]=nw[1];VB[VN++]=nw[2];VB[VN++]=col[0];VB[VN++]=col[1];VB[VN++]=col[2];VB[VN++]=ee;}});}
const bx=(x,y,z,sx,sy,sz,t,c,e,R)=>box(R?M(T(x,y,z),R,S(sx,sy,sz)):M(T(x,y,z),S(sx,sy,sz)),t,c,e);
