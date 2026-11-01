const pp=require('/tmp/pp/node_modules/puppeteer-core');const fs=require('fs');
const [,,dev,chs,out]=process.argv;const phone=dev=='phone';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await pp.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']});
for(const n of chs.split(',').map(Number)){const pg=await b.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
 if(phone)await pg.emulate({viewport:{width:390,height:693,isMobile:true,hasTouch:true,deviceScaleFactor:2},userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) Mobile'});else await pg.setViewport({width:1280,height:800});
 await pg.goto('http://localhost:8765/?manual&auto&all'+(phone?'&touch':''));await pg.waitForFunction('window.__game&&window.__game.startCh',{timeout:20000});
 // ---- fire check
 await pg.evaluate(n=>{__game.startCh(n);__game.setAuto(false)},n);
 for(let k=0;k<80;k++){const m=await pg.evaluate(()=>{const C=__game.C;if(!C)return 'ch7';if(C.mode=='cut'){__game.skip();__game.step(2)}return C.mode});if(m!='cut')break}
 const f0=await pg.evaluate(()=>{const C=__game.C;return C?C.fireN:-1});let fm=0,fs_=0,ft=0;
 if(f0>=0){const r=await pg.evaluate(()=>{const b=document.getElementById('g').getBoundingClientRect();return[b.left+b.width/2,b.top+b.height/2]});
  if(!phone){await pg.mouse.move(r[0],r[1]);await pg.mouse.down();await pg.evaluate(()=>__game.step(6));await pg.mouse.up();fm=await pg.evaluate(()=>__game.C.fireN);
   await pg.keyboard.down('Space');await pg.evaluate(()=>__game.step(6));await pg.keyboard.up('Space');fs_=await pg.evaluate(()=>__game.C.fireN)-fm;fm-=f0}
  else{const c=await pg.target().createCDPSession();const bb=await pg.evaluate(()=>{const b=document.getElementById('bfire').getBoundingClientRect();return[b.left+b.width/2,b.top+b.height/2]});
   await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:bb[0],y:bb[1]}]});await pg.evaluate(()=>__game.step(6));await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});ft=await pg.evaluate(()=>__game.C.fireN)-f0}}
 // ---- autopilot run
 await pg.evaluate(n=>{__game.setAuto(true);__game.startCh(n)},n);let t=0,shot=0,lastMode='',res='timeout',lastCut=-1;const T0=Date.now();
 while(t<420){const s=await pg.evaluate(()=>{__game.step(15);const C=__game.C;if(!C){const G=__game.G;return{mode:G.phase,ci:-1,done:G.phase=='win'||G.phase=='over'}}return{mode:C.mode,ci:C.cut?C.cut.i:-1,st:C.stage,hp:C.p.hp|0,done:C.mode=='done',ov:document.getElementById('ovt').textContent}});t+=.5;
  if((s.mode=='cut'&&s.ci!=lastCut)||(s.mode!='cut'&&(t%20==0||s.mode!=lastMode))){await new Promise(r=>setTimeout(r,30));await pg.screenshot({path:`${out}/ch${n}_${String(shot++).padStart(2,'0')}_${s.mode}${s.st!=null?'_s'+s.st:''}.png`})}
  lastCut=s.ci;lastMode=s.mode;if(s.done){res=s.ov||s.mode;break}}
 await pg.screenshot({path:`${out}/ch${n}_end.png`});const fps=await pg.evaluate(()=>__game.perf?__game.perf(20):0);
 console.log(JSON.stringify({ch:n,dev,res,simT:t,errs,fire:{mouse:fm,space:fs_,touch:ft},hp:await pg.evaluate(()=>__game.C?__game.C.p.hp|0:__game.G.hp|0),msPerFrame:+fps.toFixed(1),wall:(Date.now()-T0)/1000}));await pg.close()}
await b.close()})();
