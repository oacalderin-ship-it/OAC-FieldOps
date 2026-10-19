// Browser acceptance suite — provided, NOT executed in the build environment.
// Run locally after: npm install --no-save playwright && npx playwright install chromium
import {chromium} from 'playwright';
import {createServer} from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('..',import.meta.url));
const server=createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!path.startsWith(root))throw Error();const b=await readFile(path);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml'})[extname(path)]||'application/octet-stream');res.end(b);}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
let browser;try{
 browser=await chromium.launch();const context=await browser.newContext({acceptDownloads:true});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}`);
 await page.locator('#pass').fill('browser-acceptance-passphrase');await page.locator('#confirm-pass').fill('browser-acceptance-passphrase');await page.locator('#vault-form button').click();await page.locator('[name="name"]').fill('Browser acceptance lab');await page.locator('[name="owner"]').fill('Fictional owner');await page.locator('[name="assessor"]').fill('Fictional assessor');await page.locator('[name="scope"]').fill('10.10.10.0/24');await page.locator('[name="intensity"]').selectOption('standard');await page.locator('[name="consent"]').check();await page.locator('[name="exploitation"]').check();await page.locator('#engagement-form button[type=submit]').click();await page.locator('#transfer-form').waitFor();
 await page.locator('#transfer-form [name=ip]').fill('10.10.10.1');await page.locator('#transfer-form [name=destination]').fill('C:\\Existing Evidence');await page.locator('#transfer-form button').click();assert.match(await page.locator('#transfer-result').innerText(),/scp.exe -O/);
 await page.locator('#files').setInputFiles(['01-discovery.txt','02-router-services.xml','03-tls-weak.xml','04-windows-services.xml','05-ftp-anonymous.xml','06-proof.json'].map(n=>resolve(root,'fixtures',n)));await page.getByText('6 files retained;', {exact:false}).waitFor();
 await page.locator('[data-phase="4"]').click();await page.getByRole('heading',{name:'Obsolete TLS protocol or cipher accepted'}).waitFor();await page.locator('[data-phase="5"]').click();await page.getByText('Controlled access demonstrated',{exact:true}).waitFor();
 await page.locator('[data-phase="6"]').click();const htmlDownload=page.waitForEvent('download');await page.locator('[data-action="html"]').click();assert.match((await htmlDownload).suggestedFilename(),/\.html$/);
 const backupDownload=page.waitForEvent('download');await page.locator('[data-action="backup"]').click();const backup=await backupDownload;await mkdir(resolve(root,'test-artifacts'),{recursive:true});const backupPath=resolve(root,'test-artifacts','test-backup.json');await backup.saveAs(backupPath);
 await page.screenshot({path:resolve(root,'test-artifacts','report-desktop.png'),fullPage:true});await page.reload();await page.locator('#pass').fill('browser-acceptance-passphrase');await page.locator('#vault-form button').click();await page.locator('[data-phase="6"]').click();assert.match(await page.locator('.report-preview').innerText(),/2 assets/);
 await page.locator('[data-action="lock"]').click();await page.locator('#pass').fill('wrong-passphrase-long');await page.locator('#vault-form button').click();await page.locator('.error').waitFor();await page.locator('#restore').setInputFiles(backupPath);await page.locator('#restore-form [name=password]').fill('browser-acceptance-passphrase');await page.locator('#restore-form input[type=checkbox]').check();await page.locator('#restore-form button').click();await page.locator('#engagement-form').waitFor();
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:resolve(root,'test-artifacts','scope-mobile.png'),fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);assert.deepEqual(errors,[]);console.log('Browser acceptance passed. Screenshots and a fictional backup are in test-artifacts/.');
}finally{await browser?.close();server.close();}
