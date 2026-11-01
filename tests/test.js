const pp=require('/tmp/pp/node_modules/puppeteer-core');const fs=require('fs');
const [mode,out]=[process.argv[2],process.argv[3]];fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await pp.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()=='error')errs.push('CONSOLE '+m.text())});
if(mode=='phone')await p.setViewport({width:390,height:693,deviceScaleFactor:2,isMobile:true,hasTouch:true});else await p.setViewport({width:1280,height:800});
const url='file://'+__dirname+'/../index.html?manual=1&auto=1'+(mode=='phone'?'&touch=1':'');await p.goto(url);
const shot=async n=>{await p.screenshot({path:`${out}/${n}.png`});console.log('shot',n,JSON.stringify(await p.evaluate(()=>{const G=__game.G;return{ph:G.phase,cut:G.cut&&G.cut.name,i:G.cut&&G.cut.i,hp:Math.round(G.hp),sc:G.score,am:G.ammo,b:G.burned,k:G.killed,s:G.sacHits,pz:+G.pz.toFixed(2),ten:Math.round(G.tension)}})))};
await shot('00_title');await p.evaluate(()=>__game.start());
const step=async(n)=>p.evaluate(n=>__game.step(n,1/30),n);
const intro=[1.5,5,9,13,15.6,19,23,26.5];let tt=0;for(const [k,at] of intro.entries()){await step(Math.round((at-tt)*30));tt=at;await shot('01_intro_'+k)}
const until=async(cond,max,shots,pre)=>{let n=0;while(n<max){await step(15);n+=15;const c=await p.evaluate(cond);if(shots&&n%shots==0)await shot(pre+'_'+n);if(c)return n}return -1};
const ph=()=>p.evaluate(()=>__game.G.phase);
for(const [name,max] of [['standoff',2400],['torch',2400],['shoot',3600],['gren',2400],['escape',2400]]){
 const w=await until(`__game.G.phase=='${name}'`,900,0,'');console.log('reach',name,w);await step(45);await shot('02_'+name+'_a');
 const r=await until(`__game.G.phase!='${name}'`,max,150,'03_'+name);console.log('left',name,r,await ph());
 const cn=await p.evaluate(()=>__game.G.cut&&__game.G.cut.name);if(cn){await step(25);await shot('04_cut_'+cn)}}
await until(`__game.G.phase=='win'||__game.G.phase=='over'`,900,0,'');await step(10);await shot('05_end');
console.log('perf ms/frame',await p.evaluate(()=>{__game.G.phase='torch';return __game.perf(20)}));
console.log('ERRORS',errs.length,errs.slice(0,5).join('\n'));await b.close()})();
