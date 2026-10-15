/* OAC FieldOps 3 — evidence-first, no repeated payload forms. Public GitHub Pages; no network calls. */
'use strict';
const OAC3_VERSION = '3.0';
const OAC3_DEVICE_MENU = [
  {name:'recon/Network_Hunter',role:'PRIMARY',description:'Initial discovery and service enumeration; inside this same payload is an optional Run All action.',recommended:true},
  {name:'recon/advanced_nmap_scan',role:'FOLLOW-UP',description:'Run a targeted Nmap scan only when initial loot omits named hosts or open ports.'},
  {name:'recon/SMB_Spy',role:'OPTIONAL',description:'SMB-specific assessment, only when SMB is discovered and this test is authorized.'},
  {name:'util/simple_connection_test',role:'TROUBLESHOOTING',description:'Use if link, DHCP, default route, or connectivity fails.'},
  {name:'util/advanced_ping_test',role:'TROUBLESHOOTING',description:'Confirm reachability to a known authorized IP; ping failure does not mean a host is offline.'},
  {name:'recon/simple_client_info',role:'OPTIONAL',description:'Quick local addressing details on your device.'}
];
function oac3Init(p){foDefaults(p);if(!p.fieldops.v3)p.fieldops.v3={context:{},imports:[],deviceRuns:[],managementIp:p.fieldops.managementIp||'172.16.24.1'};return p.fieldops.v3}
const oac3Setting = (label,value)=>`<div class="oac3-setting"><span>${e(label)}</span><b>${e(value)}</b></div>`;
const oac3Key = (label,val)=>`<span class="oac3-tag"><b>${e(label)}</b> ${e(val)}</span>`;
function oac3Upload(){return `<section class="panel oac3-upload"><div class="section-kicker">THE ONLY REQUIRED RESULT ENTRY</div><h2 class="panel-title">Drop your Shark Jack loot here. FieldOps does the sorting.</h2><p class="panel-desc">Select one or several files: <code>network_hunter_*.txt</code>, Nmap <code>.txt</code> / <code>.xml</code>, and other scan logs. No need to type payload names, IP addresses, ports or findings manually.</p><form id="import-form" class="oac3-drop"><label class="oac3-drop-label" for="oac3-files"><span class="oac3-drop-icon">⇧</span><b>Choose logs to analyze automatically</b><span>Multiple files supported · each up to 2 MB · never uploaded to a server</span></label><input id="oac3-files" type="file" name="files" multiple accept=".txt,.xml,.nmap,.gnmap,.log,.csv" required><button type="submit" class="btn primary">Analyze loot → Build assessment</button></form><p class="tiny">Nmap XML gives the best service/version details. FieldOps hashes each file, deduplicates repeat imports and stores only parsed observations and limited redacted excerpts inside your encrypted vault.</p></section>`}
function oac3Scope(p){const valid=scopeSafety(p);if(valid)return `<details class="oac3-scoped"><summary>✓ Engagement scope saved once: <b>${e(p.scope)}</b> <span>Change scope / authorization ▾</span></summary>${foOldRecon(p).split('<section class="panel"><div class="panel-header"><div><div class="section-kicker">KALI FIRST STEPS')[0]}</details>`;
  const old=foOldRecon(p);const cut=old.indexOf('<section class="panel"><div class="panel-header"><div><div class="section-kicker">KALI FIRST STEPS');const scope=cut>=0?old.slice(0,cut):old;return `<div class="oac3-setup-note"><b>One-time setup</b><p>Enter the approved subnet and authorization once for this engagement. FieldOps will reuse it across all six phases—no repeated scope forms.</p></div>${scope}`}
function oac3RunAllNotice(){return `<div class="callout warn"><b>About Network_Hunter → Run All:</b> On your payload, this branches into HTTP enumeration, SMB enumeration, SSH reconnaissance, and FTP credential spraying. The last action can attempt logins and trigger lockouts. <b>Begin with the initial discovery scan.</b> Use Run All only when your scope specifically permits authentication testing and the target owner accepts that risk. If authentication testing is explicitly permitted, select Run All after the initial scan; it is a submenu action inside Network_Hunter, not a separate payload you need to log. FieldOps will analyze supported output from either path.</div>`}
function oac3Recon(p){const m=oac3Init(p),summary=oac3Summary(p);return `<div class="oac3-flowline">${oac3Key('NOW','Run Network_Hunter')}${oac3Key('THEN','Copy saved loot')}${oac3Key('FINALLY','Upload results')}</div>${oac3Scope(p)}${foPanel('Your Shark Jack: exact starting procedure','There is no need to record a payload run. Just follow these instructions and upload the result.',`
 <div class="oac3-primary"><span class="oac3-pill">START HERE · BUILT-IN PAYLOAD</span><h2>recon / Network_Hunter</h2><div class="oac3-path">Shark Jack Display → Payload Library → recon → <b>Network_Hunter</b></div></div>
 ${foStep('Plug into your authorized network',`Select <code>DHCP_CLIENT</code> if this payload asks for network mode on a LAN that already uses DHCP. Do not use DHCP_SERVER on an existing managed network.`,1)}
 ${foStep('Run its initial network scan',`Select the <b>initial discovery / network scan</b> option inside <code>Network_Hunter</code> first. This is the step intended to report live hosts and discovered services. You do not need to know the loot filename yet.`,2)}
 <div class="oac3-settings">${oac3Setting('Host timeout, if asked','Start with 100 seconds per host')}${oac3Setting('Max retries, if asked','2')}${oac3Setting('Scan type, if asked','Discovery / services (not -sL list-only)')}${oac3Setting('Target range','Only the CIDR saved above: '+(scopeSafety(p)?p.scope:'your authorized range'))}</div>
 <p class="tiny">These are suggested operator settings, not guaranteed menu fields or factory defaults. Only enter settings that your installed payload actually presents. Previously, a 30-second host timeout missed ports in this environment; 100 seconds is a more patient starting point.</p>
 ${foStep('Wait for completion; do not type the output into FieldOps',`Keep the Shark Jack loot on the device. Go to <b>Phase 02: Enumeration</b> to copy its files via SSH/SCP, or simply import them here once transferred.`,3)}
 ${oac3RunAllNotice()}
 <details class="oac3-details"><summary>Other names actually present in your Shark Jack menu (only when needed) ▾</summary><div class="oac3-menu">${OAC3_DEVICE_MENU.filter(x=>!x.recommended).map(x=>`<div><strong>${e(x.name)}</strong><span>${e(x.description)}</span></div>`).join('')}</div><p class="tiny">Your factory menu also has example/demo, LLDP, and utility payloads; this assessment does not require running them all.</p></details>
 <div class="actions-row"><button class="btn primary" data-phase="1">Show me the exact SSH/SCP transfer commands →</button></div>`,'SHARK JACK DISPLAY')}${oac3Upload()}${oac3ImportHighlights(p,summary)}<div class="oac3-after">${p.sources.length?'Your files have been analyzed. Open Enumeration to see exactly what FieldOps learned.':'No files imported yet. There is nothing you need to manually log here.'}</div>`;
}
function oac3Summary(p){const m=oac3Init(p),ctx=m.context;return {count:p.assets.filter(a=>isInScope(a.host,p.scope)).length,ports:p.assets.filter(a=>isInScope(a.host,p.scope)).reduce((n,a)=>n+a.ports.length,0),reported:ctx.liveHosts||null,files:p.sources.length,findings:p.findings.length};}
function oac3ImportHighlights(p,summary=oac3Summary(p)){const m=oac3Init(p),c=m.context;return foPanel('Automatic results: what we know so far','Everything below is derived from imported evidence, not entered by hand.',`<div class="oac3-statgrid"><div><b>${summary.files}</b><span>files processed</span></div><div><b>${summary.count}</b><span>identified in-scope IPs</span></div><div><b>${summary.ports}</b><span>observed open ports</span></div><div><b>${summary.reported??'—'}</b><span>Hunter live-host count</span></div></div>${c.network?`<div class="oac3-tags">${oac3Key('Observed subnet',c.network)}${oac3Key('Shark Jack IP',c.deviceIp||'not reported')}${oac3Key('Gateway',c.gateway||'not reported')}${oac3Key('DNS',c.dns||'not reported')}</div>`:''}${summary.reported>0&&summary.count===0?foStatus(`<b>Important:</b> Network Hunter reported ${summary.reported} live host(s), but your uploaded summary did not include their individual IPs. FieldOps cannot invent them. Phase 02 provides an exact in-scope Kali discovery command to fill this gap.`,'warn'):''}${c.spray?`<div class="oac3-spray"><b>Run All / All Spray observations</b><p>These are log observations, not evidence of successful access:</p>${Object.entries(c.spray).map(([svc,result])=>oac3Key(svc.toUpperCase(),result)).join('')}</div>`:''}${p.sources.length?`<div class="item-list">${p.sources.slice(0,6).map(s=>`<div class="item"><b>${e(s.name)}</b><div class="small">${e(s.count)} new ports · ${e(s.oac3Type||'Scan evidence')} · SHA-256 ${e(s.sha.slice(0,16))}…</div></div>`).join('')}</div>`:''}`,'PARSED EVIDENCE')}
function oac3Transfer(p){const m=oac3Init(p),ip=m.managementIp||p.fieldops.managementIp||'172.16.24.1';const os=ui.oac3OS||'kali';const linux=[
 ['01 Verify you are on your local terminal','ip -br addr','Run on Kali laptop. Confirm a local interface can access Shark Jack management.'],
 ['02 Confirm SSH is reachable',`ssh root@${ip}`,'This opens the remote shell; verify the host fingerprint.'],
 ['03 Inspect saved loot (inside SSH)','find /root/loot -type f -print','Use this at the root@shark prompt to discover real filenames.'],
 ['04 Exit Shark Jack shell','exit','Return to your Kali shell before using scp.'],
 ['05 Create a local collection folder','mkdir -p "$HOME/FieldOps-Loot"','This directory is on Kali, not the Shark Jack.'],
 ['06 Download ONLY Shark Jack loot',`scp -r root@${ip}:/root/loot "$HOME/FieldOps-Loot/"`,'Copies scan output to Kali; does not retrieve workstation files.'],
 ['07 Find your files','find "$HOME/FieldOps-Loot" -type f -print','Now select these files above for automatic parsing.']
 ];const windows=[
 ['01 Test SSH from PowerShell',`Test-NetConnection ${ip} -Port 22`,'Checks whether Shark Jack SSH is reachable.'],
 ['02 Enter the Shark Jack shell',`ssh root@${ip}`,'Confirm the device fingerprint when connecting.'],
 ['03 List saved loot (inside SSH)','find /root/loot -type f -print','Use inside root@shark prompt.'],
 ['04 Exit the remote shell','exit','SCP must be run locally.'],
 ['05 Create destination directory','New-Item -ItemType Directory -Force -Path "$HOME\\Documents\\FieldOps-Loot"','Runs in your local PowerShell.'],
 ['06 Copy Shark Jack loot',`scp -r root@${ip}:/root/loot "$HOME\\Documents\\FieldOps-Loot\\"`,'Copies saved Shark Jack evidence to your Documents folder.'],
 ['07 Display copied files','Get-ChildItem "$HOME\\Documents\\FieldOps-Loot" -File -Recurse | Select-Object FullName,Length','Find the files to upload into the app.']
 ];return foPanel('Copy Shark Jack loot to your laptop','Exact commands for Kali or Windows; copy one step at a time. No payload log entries required.',`
 <div class="oac3-transfer-top"><label class="field"><span>Computer used for retrieval</span><select id="oac3-os"><option value="kali" ${os==='kali'?'selected':''}>Kali / Linux</option><option value="windows" ${os==='windows'?'selected':''}>Windows PowerShell</option></select></label><form data-oac3="mgmt" class="field"><label>Verified Shark Jack management IP</label><div class="oac3-mgmt"><input type="text" name="ip" value="${e(ip)}" required><button class="btn small-btn" type="submit">Use IP</button></div></form></div>
 ${foStatus('Use the IP actually shown by your Shark Jack management interface. <code>172.16.24.1</code> is a common reference value, not a promise that your device is currently configured with it.')}
 ${(os==='windows'?windows:linux).map(([label,cmd,why])=>foCommand(label,cmd,why,null,p)).join('')}
 ${foStatus('If the directory is empty, the payload may not have written output. Check the selected payload and its actual save path. Do not assume every completed payload produced loot.','warn')}`,'SSH / SCP TRANSFER')}
function oac3DiscoveryCommand(p){return scopeSafety(p)?`sudo nmap -sn -n --max-retries 2 --host-timeout 100s -oX "$HOME/FieldOps-Loot/host-discovery.xml" ${p.scope}`:'Save your approved scope first';}
function oac3ScanCandidates(p){return p.assets.filter(a=>isInScope(a.host,p.scope)).map(a=>{
 const ports=(a.ports||[]).map(x=>+x.port).filter(Number.isInteger);return {host:a.host,ports:ports.length? [...new Set(ports)].sort((x,y)=>x-y):[],name:a.hostname||''};
});}
function oac3MissingCard(p,h){const cmd=`sudo nmap -Pn -n -sT -sV --version-light --top-ports 100 --max-retries 2 --host-timeout 100s -oX "$HOME/FieldOps-Loot/service-${h.host}.xml" ${h.host}`;
return `<div class="oac3-next"><b>${e(h.host)} ${e(h.name)}</b><p>IP found but no listening TCP services are recorded yet. Run a small targeted service scan.</p>${foCommand('Kali → check common ports',cmd,'Top 100 TCP ports; outputs XML for automatic import.',h.host,p)}</div>`;}
function oac3KnownCard(p,h){const cmd=`sudo nmap -Pn -n -sV --version-light -p ${h.ports.join(',')} -oX "$HOME/FieldOps-Loot/versions-${h.host}.xml" ${h.host}`;
return `<div class="oac3-next"><b>${e(h.host)}</b><span class="oac3-mini">Open port(s): ${e(h.ports.join(', '))}</span><p>These ports were observed in your imported evidence. Collect missing version details when necessary.</p>${foCommand('Kali → fingerprint observed ports',cmd,'Confirm services; reimport XML to merge results.',h.host,p)}</div>`;}
function oac3Enumerate(p){const summary=oac3Summary(p),hosts=oac3ScanCandidates(p),bare=hosts.filter(h=>!h.ports.length),known=hosts.filter(h=>h.ports.length);let next='';
if(summary.reported>0&&!hosts.length)next+=`<div class="oac3-next"><b>Network Hunter reported ${summary.reported} hosts but did not give their IPs.</b><p>Run this one approved in-scope Kali discovery and reimport its XML. FieldOps will identify IP addresses without inventing them.</p>${foCommand('Kali → identify live IPs',oac3DiscoveryCommand(p),'Read-only host discovery; no password attempts.',null,p)}</div>`;
if(bare.length)next+='<h3>Known IPs · missing port inventory</h3>'+bare.map(h=>oac3MissingCard(p,h)).join('');
if(known.length)next+='<h3>Known open services · version check if needed</h3>'+known.map(h=>oac3KnownCard(p,h)).join('');
if(!p.sources.length)next+='<div class="empty">No loot imported. Run Network_Hunter in Phase 01, then bring over its output.</div>';
if(p.sources.length&&!hosts.length&&!summary.reported)next+=foStatus('This file contained no parseable host or service entries. Try an Nmap XML result; FieldOps will not fabricate assets.','warn');
next+='<div class="actions-row"><button class="btn primary" data-phase="2">Next → Targeted vulnerability checks</button></div>';
return `<div class="oac3-flowline">${oac3Key('01','Copy loot')}${oac3Key('02','Drop logs')}${oac3Key('03','Run only missing-data checks')}</div>`+
 `<details class="oac3-transfer-details" ${p.sources.length?'':'open'}><summary>Need to copy Shark Jack loot with SSH / SCP? Open exact steps ▾</summary>${oac3Transfer(p)}</details>`+oac3Upload()+oac3ImportHighlights(p,summary)+
 foPanel('What is missing? FieldOps chooses the next check','No repeated setup. Recommendations update automatically after every import.',next,'NEXT ACTION ENGINE')+
 foPanel('Asset inventory — imported, not typed','Automatically merged by host and open port.',assetsTable(p),'AUTOMATED INVENTORY');}
function oac3AllChecks(p){const checks=foAllChecks(p);const known=new Set(checks.map(x=>`${x.host}/${x.port}`));
 for(const a of p.assets.filter(a=>isInScope(a.host,p.scope))){for(const service of a.ports||[]){const port=Number(service.port);if(!Number.isInteger(port)||port<1||port>65535||known.has(`${a.host}/${port}`))continue;
 const protocol=service.protocol==='udp'?'udp':'tcp';checks.push({host:a.host,port,service:service.service||'unknown',version:service.version||'',key:'generic-'+protocol,name:'Unknown / other '+protocol.toUpperCase()+' service',tool:'Nmap version detection',why:'No specialized rule matches this port. Identify the actual application and version before checking vendor advisories.',expect:'A service/version result is a starting lead, not a confirmed security flaw.',cmd:(h,n)=>protocol==='udp'?`sudo nmap -sU -Pn -n -sV --version-light -p ${n} --max-retries 2 -oX "oac-${h}-${n}-udp.xml" ${h}`:`sudo nmap -Pn -n -sV --version-all -p ${n} -oX "oac-${h}-${n}-service.xml" ${h}`});known.add(`${a.host}/${port}`)}}return checks;}
function oac3Vuln(p){const summary=oac3Summary(p),checks=oac3AllChecks(p);return `${oac3ImportHighlights(p,summary)}${foPanel('Kali vulnerability investigation from actual ports','FieldOps builds a queue ONLY from observed in-scope services. No open port is itself proof of a vulnerability.',`${!checks.length?foStatus('No service-specific tasks yet. Go to Enumeration and import a scan with individual host IPs and open ports. A Network Hunter summary saying “3 hosts” cannot identify vulnerabilities by itself.','warn'):`<div class="oac3-checks">${checks.map(c=>{const evidence=p.evidenceChecks.filter(x=>x.host===c.host&&x.port===c.port&&(x.checkKey===c.key||x.checkKey===c.result));const finding=p.findings.find(x=>x.host===c.host&&x.autoPort===c.port&&x.autoKind);return `<div class="oac3-check"><div class="oac3-check-heading"><b>${e(c.host)}:${e(c.port)} — ${e(c.name)}</b><span>${e(c.tool)}</span></div><p>${e(c.why)}</p>${foCommand('Run in Kali, then import the XML below',c.cmd(c.host,c.port),c.expect,c.host,p)}<p class="tiny">${e(c.expect)}</p><div class="oac3-mini">${e(evidence.length?evidence.length+' linked script observation(s)':'Awaiting matching import')}${finding?' · Candidate finding: '+e(finding.status):''}</div></div>`}).join('')}</div>`}`,'AUTOMATED INVESTIGATION QUEUE')}${oac3Upload()}${foPanel('Candidate findings carried into Phase 04','A script can create a suspected finding. Only actual confirmation can upgrade it to validated.',`${p.findings.map(f=>`<div class="fo-finding"><div class="fo-finding-title"><b>${e(f.title)}</b> <span class="tag ${f.status==='validated'?'green':'yellow'}">${e(f.status)}</span></div><div class="tiny">${e(f.host)}:${e(f.autoPort||'')} · ${e(f.sourceLabel||'source recorded')}</div><div class="fo-evidence">${e(f.evidence||'Evidence not supplied')}</div><button class="btn small-btn" type="button" data-fo-review="${e(f.id)}">Review / validate finding</button></div>`).join('')||'<div class="empty">No suspected vulnerabilities observed from the imported evidence yet. That does not establish that the network is vulnerability-free.</div>'}<div class="actions-row"><button class="btn primary" data-phase="3">Continue → Controlled proof / exploitation</button></div>`,'EVIDENCE → FINDING')}`}
function oac3Research(p){return `<div class="oac3-hint">From this point, approved proof, post-test cleanup and reporting are linked to the actual findings above. FieldOps will not label a vulnerability exploited just because a scanner identified a service.</div>`;}
const oac3PreviousImport=importFiles;
// Preserve the original vetted Nmap/NSE parsers, supplementing the text summary parser with source metadata.
function oac3ReadHunter(text){const lines=String(text||'').replace(/\r/g,'');const value=(pattern)=>lines.match(pattern)?.[1]?.trim()||'';let summary={};if(/===\s*Network Hunter/i.test(lines)||/Live hosts discovered:\s*\d+/i.test(lines)){
 summary.type='Network_Hunter';summary.liveHosts=Number(value(/Live hosts discovered:\s*(\d+)/i))||0;summary.deviceIp=value(/(?:^|\n)My IP:\s*([^\n]+)/i);summary.gateway=value(/(?:^|\n)Gateway:\s*([^\n]+)/i);summary.dns=value(/(?:^|\n)DNS:\s*([^\n]+)/i);summary.network=value(/(?:^|\n)Network:\s*([^\n]+)/i);}
 else if(/===\s*All Credential Spray/i.test(lines)||/FTP Targets:\s*/i.test(lines)&&/SMB Targets:\s*/i.test(lines)){
 summary.type='All_Spray';summary.spray={ftp:value(/FTP Targets:\s*([^\n]+)/i),ssh:value(/SSH Targets:\s*([^\n]+)/i),smb:value(/SMB Targets:\s*([^\n]+)/i)};}
 else if(/<nmaprun\b|Nmap scan report for|^Host:\s*\d{1,3}\./mi.test(lines))summary.type='Nmap output';else summary.type='Other scan/loot';return summary;}
const oac3PreviousParseScan=parseScan;
parseScan=function(text,filename){if(/(?:\bnmap[^\r\n]*\s-sL(?=\s|$)|<scaninfo\b[^>]*\btype="list")/i.test(text))return [];
 const records=oac3PreviousParseScan(text,filename),known=new Set(records.map(x=>x.host));
 // Network Hunter uses several optional host-list styles across versions. Accept only unambiguous IP rows.
 const extra=[];for(const line of String(text).split(/\r?\n/)){
  let m=line.match(/^\s*(?:Host|IP|Target|Live host)\s*[:=]\s*((?:\d{1,3}\.){3}\d{1,3})(?:\s|$)/i);
  if(!m)m=line.match(/^\s*((?:\d{1,3}\.){3}\d{1,3})\s+(?:alive|online|up|reachable)\b/i);
  if(m&&validIPv4(m[1])&&!known.has(m[1])){extra.push({host:m[1],hostname:'',ports:[]});known.add(m[1]);}
  const combo=line.match(/^\s*((?:\d{1,3}\.){3}\d{1,3}):([0-9]{1,5})\s+([A-Za-z][\w.-]*)\s*(?:open|OPEN)?/);
  if(combo&&validIPv4(combo[1])){const target=records.concat(extra).find(x=>x.host===combo[1]);if(target){target.ports.push({port:Number(combo[2]),protocol:'tcp',service:combo[3],state:'open',source:filename})}else{extra.push({host:combo[1],hostname:'',ports:[{port:Number(combo[2]),protocol:'tcp',service:combo[3],state:'open',source:filename}]});known.add(combo[1]);}}
 }
 return records.concat(extra);
};
importFiles=async function(p,files){oac3Init(p);const before=new Set(p.sources.map(x=>x.sha));const metadata=[];
 for(const file of files){if(file.size>2*1024*1024)throw Error(file.name+' exceeds the 2 MB parser limit.');const buf=await file.arrayBuffer();const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',buf))].map(x=>x.toString(16).padStart(2,'0')).join('');if(before.has(hash))continue;metadata.push({name:file.name,sha:hash,info:oac3ReadHunter(dec.decode(buf))});}
 await oac3PreviousImport(p,files);
 const m=oac3Init(p);for(const item of metadata){const source=p.sources.find(s=>s.sha===item.sha);if(!source)continue;source.oac3Type=item.info.type;if(m.imports.some(x=>x.sha===item.sha))continue;m.imports.unshift({at:time(),sha:item.sha,name:item.name,type:item.info.type});if(item.info.type==='Network_Hunter'){
  for(const key of ['liveHosts','deviceIp','gateway','dns','network'])if(item.info[key]!==undefined&&item.info[key]!==''&&item.info[key]!==null)m.context[key]=item.info[key];
 }
 if(item.info.type==='All_Spray')m.context.spray=item.info.spray;
 }
 m.imports=m.imports.slice(0,100);if(ui.phase===0&&metadata.length)ui.phase=1;
 log(p,'Automatically classified '+metadata.length+' new loot file(s) and refreshed discovery context');await persist();render();message('Loot analyzed — '+p.assets.length+' unique IP(s), '+allPorts(p)+' open service(s), '+p.findings.length+' finding candidate(s).');
};
// Replace v2 collection of forms with one-pass guides. Keep existing secure vault, approved scope, and linked proof/report system.
recon=oac3Recon;enumeration=oac3Enumerate;vulnerability=oac3Vuln;
const oac3OldExploit=exploitation;exploitation=function(p){return oac3Research(p)+oac3OldExploit(p)};
// Scope form and upload are handled by app.js. Our two controls are handled at the capture phase.
document.addEventListener('submit',async ev=>{const form=ev.target;if(!(form instanceof HTMLFormElement)||form.dataset.oac3!=='mgmt')return;ev.preventDefault();ev.stopImmediatePropagation();try{const p=current();if(!p)return;const ip=String(new FormData(form).get('ip')||'').trim();if(!validIPv4(ip))throw Error('Enter a valid Shark Jack management IPv4 address');oac3Init(p).managementIp=ip;p.fieldops.managementIp=ip;await commit('Updated Shark Jack SSH address');}catch(err){fail(err)}},true);
document.addEventListener('change',ev=>{if(ev.target?.id==='oac3-os'){ev.stopImmediatePropagation();ui.oac3OS=ev.target.value;render()}},true);
// Compact, evidence-derived stage progress: no redundant 24-checkbox data-entry exercise.
function oac3StageItems(p){const hunter=p.sources.some(s=>s.oac3Type==='Network_Hunter');const scripted=(p.evidenceChecks||[]).length;
 const inScope=p.assets.filter(a=>isInScope(a.host,p.scope));const open=inScope.reduce((n,a)=>n+a.ports.length,0);
 const validated=p.findings.filter(f=>f.status==='validated').length;
 const logged=p.tests.length;
 const completedCleanup=logged&&p.tests.every(t=>String(t.cleanup||'').trim().length>0);
 return [
  [['Approved scope saved',scopeSafety(p)],['Network Hunter result imported',hunter],['Loot transferred and analyzed',p.sources.length>0]],
  [['Individual host IPs identified',inScope.length>0],['Open ports and services identified',open>0],['Service fingerprints imported',inScope.some(a=>a.ports.some(s=>!!s.version))]],
  [['Service-specific investigations generated',oac3AllChecks(p).length>0],['Targeted scanner output imported',scripted>0],['Potential findings reviewed',p.findings.length>0]],
  [['Finding validated for a proof plan',validated>0],['Explicit exploitation approval saved',p.exploitApproved],['Controlled test outcome recorded',logged>0]],
  [['Test impact documented',logged>0||!!p.postNotes],['Cleanup documented',!!completedCleanup],['Post-test limitations recorded',!!p.postNotes]],
  [['Report has inventory and evidence',p.sources.length>0],['Summary written',!!p.summary],['Remediation narrative reviewed',!!p.recommendations]]
 ][ui.phase]||[];
}
checklist=function(p){const items=oac3StageItems(p),yes=items.filter(x=>x[1]).length;return `<section class="panel oac3-progress"><div class="panel-header"><div><div class="section-kicker">AUTOMATIC PROGRESS</div><h2 class="panel-title">What FieldOps can already prove</h2><p class="panel-desc">These indicators are derived from saved logs and records. You don't have to tick boxes manually.</p></div><span class="tag muted">${yes}/${items.length}</span></div><div class="oac3-progress-list">${items.map(([label,on])=>`<div><span class="${on?'oac3-yes':'oac3-no'}">${on?'✓':'○'}</span> ${e(label)}</div>`).join('')}</div><p class="tiny">Incomplete indicators mean the information is not recorded; they are not a verdict that the target is vulnerable or secure.</p></section>`;}
stepAdvice=function(p){const summary=oac3Summary(p),phase=ui.phase;const suggestions=[
 'Run recon/Network_Hunter initial network scan; then import saved loot. No payload data entry needed.',
 summary.count===0&&summary.reported>0?'Network Hunter reported hosts but did not list IPs. Run the generated Kali host-discovery command.':summary.ports===0?'Find the named IPs and run the generated service check.':'Individual hosts and ports are identified. Continue to the targeted Kali checks.',
 'Run only the generated commands for observed services; reimport their XML outputs for correlated findings.',
 'Choose an evidence-backed, validated finding. If explicitly approved, perform minimal proof and record the observed result.',
 'Review demonstrated access, cleanup and limitations. Do not collect unrelated data.',
 'Review the auto-populated inventory and findings, complete the report narrative, and export.'
 ];return `<div class="panel tight"><div class="section-kicker">NEXT BEST ACTION</div><h3 class="subheading" style="margin:8px 0">${e(suggestions[phase])}</h3><p class="small">${phase===0?'Start with Network_Hunter — Run All is optional and contains credential checks.':'Each imported scan updates the relevant later phases automatically.'}</p>${phase<5?`<button type="button" class="btn small-btn primary" data-phase="${phase+1}">Go to next phase →</button>`:''}</div>`;}
const oac3OldShell=shell;shell=function(p){const html=oac3OldShell(p);return html.replace('OAC FIELDOPS / v1.0','OAC FIELDOPS / v3.0');};
