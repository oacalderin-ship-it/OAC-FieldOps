// Node.js-only smoke checks. No network, dependencies, or client data.
'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {webcrypto}=require('node:crypto');
const source=fs.readFileSync('app.js','utf8');
const html=fs.readFileSync('index.html','utf8');
assert.match(html,/script-src 'self'/);
assert.match(html,/connect-src 'none'/);
assert.doesNotMatch(source,/\beval\s*\(/);
assert.doesNotMatch(source,/\bfetch\s*\(/);
const map=new Map();
const storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};
const ctx={crypto:webcrypto,TextEncoder,TextDecoder,btoa,atob,localStorage:storage,console,Date,Math,JSON,Uint8Array,document:{querySelector:()=>null,addEventListener:()=>{},body:{insertAdjacentHTML:()=>{}}},window:{addEventListener:()=>{},scrollTo:()=>{}},setTimeout,URL,Blob};
vm.createContext(ctx);
vm.runInContext(source+`;globalThis.testAccess={createVault,unlock,lock,mergeHost,parseScan,isInScope,validScope,reportPlain,recommendationsFor,makeEngagement,getVault:()=>vault,current,persist};`,ctx);
(async()=>{
 const t=ctx.testAccess;
 assert.equal(t.validScope('10.10.20.0/24'),true);
 assert.equal(t.validScope('10.10.20.0/37'),false);
 assert.equal(t.isInScope('10.10.20.40','10.10.20.0/24'),true);
 assert.equal(t.isInScope('10.10.10.40','10.10.20.0/24'),false);
 await t.createVault('local-security-test-123456789');
 const p=t.current();p.authorized=true;
 const out=t.parseScan('Nmap scan report for CLIENT01 (10.10.20.55)\n22/tcp open ssh OpenSSH 9.3\n80/tcp open http Apache 2.4\n','sample.txt');
 assert.equal(out.length,1);assert.equal(out[0].ports.length,2);
 t.mergeHost(p,out[0].host,out[0].hostname,out[0].ports);
 assert.equal(p.assets[0].ports.length,2);
 assert.ok(t.recommendationsFor(p.assets[0]).some(x=>x.id==='http'));
 p.findings.push({id:'demo',title:'ENCRYPTION_SENTINEL_SECRET',host:'10.10.20.55',severity:'low',status:'suspected',evidence:'placeholder',at:new Date().toISOString()});
 await t.persist();
 assert.ok(!storage.getItem('oac.fieldops.v1').includes('ENCRYPTION_SENTINEL_SECRET'));
 t.lock();await t.unlock('local-security-test-123456789');
 assert.equal(t.current().findings[0].title,'ENCRYPTION_SENTINEL_SECRET');
 t.lock();let failed=false;try{await t.unlock('wrong-test-password-12345')}catch{failed=true}
 assert.equal(failed,true,'A wrong key must not decrypt the vault');
 console.log('PASS: scope, parsing, guidance, encryption, lock/unlock, rejection of wrong passphrase, baseline CSP');
})().catch(err=>{console.error(err);process.exitCode=1});
