// Run against an already running local server: node tests/website-regressions.cjs
const { chromium, webkit } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.REVIEW_URL || 'http://127.0.0.1:4317';
const output = path.resolve('docs/fix-evidence-2026-11-11');
fs.mkdirSync(output, {recursive:true});
const ids = [...fs.readFileSync('lib/data.ts','utf8').matchAll(/id: '([^']+)'/g)].map(m=>m[1]);
const results=[];
(async()=>{
 for(const [engine,width,height,motion] of [['chromium',1440,900,'no-preference'],['chromium',390,844,'reduce'],['chromium',320,568,'reduce'],['webkit',390,844,'reduce']]){
  const b=await({chromium,webkit}[engine]).launch({headless:true});
  const context=await b.newContext({viewport:{width,height},reducedMotion:motion});
  const p=await context.newPage();p.setDefaultTimeout(10000);
  const errors=[];p.on('pageerror',e=>errors.push(e.message));
  const name=`${engine}-${width}`;const r={name,checks:[]};
  try{
   await p.goto(base,{waitUntil:'networkidle'});
   await p.waitForTimeout(2000);
   await p.screenshot({path:path.join(output,`${name}-hero.png`)});
   assert.equal(await p.getByRole('link',{name:'Join the club',exact:true}).isVisible(),true);
   await p.getByRole('button',{name:'Grid view',exact:true}).click();
   await p.waitForTimeout(2000);
   const piece=p.getByRole('button',{name:/Dior Sports crewneck,/});
   await piece.focus();await p.keyboard.press('Enter');
   await p.locator('#piece-title').waitFor();
   assert.match(await p.locator('section[aria-labelledby="piece-title"]').innerText(),/How to wear it/);
   await p.waitForTimeout(7500);
   assert.equal(await p.locator('#piece-title').isVisible(),true);
   await p.screenshot({path:path.join(output,`${name}-piece.png`)});
   await p.getByRole('button',{name:'Back to clothing',exact:true}).click();
   assert.equal(await piece.evaluate(e=>document.activeElement===e),true);
   await p.getByRole('button',{name:'Ring view',exact:true}).click();
   await p.waitForTimeout(1800);await piece.focus();await p.keyboard.press('Enter');
   await p.locator('#piece-title').waitFor();
   await p.getByRole('button',{name:'Back to clothing',exact:true}).click();
   r.checks.push('persistent keyboard selection in grid and ring; focus returns');
   await p.goto(base+'/#events',{waitUntil:'networkidle'});await p.waitForTimeout(500);
   const stage=p.locator('#events > div').first();await stage.focus();await p.keyboard.press('End');await p.waitForTimeout(1500);
   await p.screenshot({path:path.join(output,`${name}-last-event.png`)});
   const title=p.locator('#events article').last();
   if(width<768){
    const fits=await title.evaluate(e=>{const parent=e.parentElement;return parent.scrollHeight<=parent.clientHeight+1});assert.ok(fits,'mobile event text must fit');
   }
   assert.notEqual(await stage.evaluate(e=>getComputedStyle(e).outlineStyle),'none');
   await p.keyboard.press('Enter');await p.locator('dialog[open]').waitFor();
   assert.ok(p.url().includes('event=diy-meet'));
   await p.goBack();await p.waitForTimeout(300);assert.equal(await p.locator('dialog').evaluate(e=>e.open),false);
   await p.goForward();await p.locator('dialog[open]').waitFor();
   await p.keyboard.press('Escape');await p.waitForTimeout(400);assert.equal(await p.locator('dialog').evaluate(e=>e.open),false);
   r.checks.push('event keyboard navigation, visible focus, Back/Forward, Escape');
   for(const id of ids){
    await p.goto(base+'/#event='+id,{waitUntil:'networkidle'});
    await p.locator('dialog[open] h3').waitFor();
    assert.ok((await p.locator('dialog h3').innerText()).length>0);
    if(id==='spring-swap')await p.screenshot({path:path.join(output,`${name}-sheet.png`)});
    await p.getByRole('button',{name:'Close event details',exact:true}).click();
    await p.waitForTimeout(150);assert.equal(await p.locator('dialog').evaluate(e=>e.open),false);
   }
   await p.goto(base+'/#event=does-not-exist',{waitUntil:'networkidle'});
   await p.getByRole('status').filter({hasText:'not in this archive'}).waitFor();
   assert.equal(await p.locator('dialog').evaluate(e=>e.open),false);
   r.checks.push('all 12 direct event URLs; close; unknown ID recovery');
   assert.deepEqual(errors,[]);r.checks.push('no page exceptions');r.pass=true;
  }catch(e){r.pass=false;r.error=e.message;await p.screenshot({path:path.join(output,`${name}-failure.png`)});}
  finally{await b.close();results.push(r);console.log(r);fs.writeFileSync(path.join(output,'regressions.json'),JSON.stringify(results,null,2));}
 }
 const b=await chromium.launch();
 for(const blocked of [true,false]){
  const c=await b.newContext({javaScriptEnabled:blocked});
  if(blocked)await c.route('**/_next/static/**/*.js',r=>r.abort());
  const p=await c.newPage();await p.goto(base,{waitUntil:'domcontentloaded'});await p.locator('#join').scrollIntoViewIfNeeded();
  const link=p.getByRole('link',{name:'Linktree',exact:false});assert.equal(await link.isVisible(),true);
  assert.equal(await link.evaluate(e=>getComputedStyle(e.parentElement).opacity),'1');
  await p.screenshot({path:path.join(output,blocked?'blocked-js.png':'no-js.png')});await c.close();
 }
 await b.close();
 if(results.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
