/* OAC FieldOps 2.0 guided assessment layer.
 * Extends the original encrypted browser-only workspace without changing its vault format.
 * No remote APIs; never executes on a target; imported evidence is user-supplied.
 */
'use strict';

const FO_PAYLOADS = [
 {id:'simple',name:'Simple Connection Test',confidence:'Observed on your device',risk:'Very low',purpose:'Verify Ethernet link, DHCP lease, gateway and internet reachability; not a port scan.',target:'Gateway or public reachability endpoint shown by payload',params:[['NETMODE','DHCP_CLIENT on an existing LAN with DHCP. Avoid DHCP_SERVER on a normal LAN.'],['Target','Use the gateway for local connectivity; an external IP only if authorized.'],['Timeout','If configurable: 5 seconds per reachability test; stop after about 20 seconds.']],expect:'Interface address, gateway, DNS, test outcome.',next:'If DHCP or route fails, troubleshoot before any discovery.',loot:'May not write a file; record on-device results.'},
 {id:'ping',name:'Advanced Ping Test',confidence:'Hak5 tutorial confirms name',risk:'Very low',purpose:'Test a known in-scope IP without assuming ping failure means device is offline.',target:'Single IPv4, e.g. 10.10.10.1 on an owned network',params:[['Host / target','Enter a single in-scope IP.'],['Count','4 probes if the payload presents a count option.'],['Per-probe timeout','2 seconds if a timeout field exists; start conservatively.'],['Overall wait','15 seconds is a sensible initial ceiling if offered.']],expect:'Target, successes, round-trip or time-outs.',next:'If ICMP fails, host may still be up; proceed with permitted service check.',loot:'Check the Payload Log; saving loot depends on payload implementation.'},
 {id:'hunter',name:'Network Hunter',confidence:'Name observed in your earlier loot filenames',risk:'Low–moderate',purpose:'Inventory devices and reachable services on the authorized wired segment.',target:'First a single in-scope host; expand only if engagement permits',params:[['Network mode','DHCP_CLIENT for a LAN with DHCP.'],['Target / CIDR','Use only your engagement CIDR; do not assume auto-detected networks are fully authorized.'],['Host timeout','60 seconds per host to start, if available.'],['Retries','1 retry if the payload exposes max-retries.'],['Overall runtime','2–5 minutes maximum for a small lab; check actual script.']],expect:'Observed hosts, addresses, ports or services; exact fields vary by installed version.',next:'Transfer any file and import it in Phase 02; absence of ports is not proof none exist.',loot:'A file named network_hunter_*.txt was previously observed; actual path must be checked.'},
 {id:'spray',name:'All Spray',confidence:'Name observed in your earlier loot filenames',risk:'Moderate / variable',purpose:'Broader discovery. Do not run before reading the installed script and confirming the selected network scope.',target:'Explicitly approved test subnet; begin with a single test host when possible',params:[['Network mode','DHCP_CLIENT only when joining a normal switched LAN.'],['Targets','Restrict to authorized IP/CIDR, never an inferred large subnet.'],['Host timeout','60 seconds as an initial cap if the installed script supports it.'],['Retries','1 maximum to start if configurable.'],['Runtime','Keep initial test brief and monitor device; the actual behavior is payload-dependent.']],expect:'Actual output differs by installed source; verify whether it is an address, port, or packet-capture payload.',next:'Import only non-sensitive scan output; first review the payload code for capture/exfiltration behavior.',loot:'A file named all_spray_*.txt was previously observed; confirm real path.'}
];
const FO_KNOWN = [
 {id:'ftp',ports:[21],key:'ftp-anon',name:'FTP anonymous-access check',tool:'Nmap ftp-anon',risk:'Low',why:'Tests whether the FTP server explicitly allows anonymous authentication.',expect:'An output line containing “Anonymous FTP login allowed” indicates a candidate access-control issue.',result:'ftp',cmd:(h,port)=>`nmap -Pn -n -p ${port} --script ftp-anon -oX oac-${h}-${port}-ftp.xml ${h}`},
 {id:'ssh',ports:[22],key:'ssh',name:'SSH version / host identity',tool:'Nmap, ssh-keyscan',risk:'Very low',why:'Determine version and public host identity before assessing patch status.',expect:'Version/banner only. No password attempts. A version string is not a confirmed CVE.',cmd:(h,port)=>`nmap -Pn -n -sV --version-light -p ${port} -oX oac-${h}-${port}-ssh.xml ${h}`},
 {id:'http',ports:[80,8080,8000,8008,8888],key:'http-methods',name:'HTTP methods / headers',tool:'Nmap HTTP scripts',risk:'Low',why:'Check exposed methods and selected response metadata.',expect:'PUT/DELETE reported as potentially risky is a hypothesis; verify actual access controls.',result:'http',cmd:(h,port)=>`nmap -Pn -n -p ${port} --script http-methods,http-headers,http-title -oX oac-${h}-${port}-http.xml ${h}`},
 {id:'tls',ports:[443,8443,9443],key:'ssl-enum-ciphers',name:'TLS protocol / cipher review',tool:'Nmap ssl-enum-ciphers',risk:'Low–moderate',why:'Identify supported legacy TLS protocols and obsolete ciphers; handshakes can be numerous.',expect:'TLSv1.0 / TLSv1.1 observations may justify a candidate finding after validation.',result:'tls',cmd:(h,port)=>`nmap -Pn -n -p ${port} --script ssl-enum-ciphers -oX oac-${h}-${port}-tls.xml ${h}`},
 {id:'smb',ports:[445],key:'smb2-security-mode',name:'SMB signing and dialects',tool:'Nmap SMB scripts',risk:'Low',why:'Learn the signing requirement and enabled SMB protocols, not share contents.',expect:'“Message signing enabled but not required” produces a candidate configuration finding.',result:'smb',cmd:(h,port)=>`nmap -Pn -n -p ${port} --script smb-protocols,smb2-security-mode -oX oac-${h}-${port}-smb.xml ${h}`},
 {id:'rdp',ports:[3389],key:'rdp-enum-encryption',name:'RDP security negotiation',tool:'Nmap RDP script',risk:'Low',why:'Discover the advertised RDP security layers without credential guessing.',expect:'Configuration evidence, not proof of unauthorized RDP access.',cmd:(h,port)=>`nmap -Pn -n -p ${port} --script rdp-enum-encryption -oX oac-${h}-${port}-rdp.xml ${h}`},
 {id:'ldap',ports:[389,636,3268,3269,88],key:'ldap',name:'Directory-service fingerprint',tool:'Nmap version detection',risk:'Low',why:'Identify an expected directory service and verify exposure before requesting a test account.',expect:'Exposed ports alone are normal on domain controllers and do not imply compromise.',cmd:(h,port)=>`nmap -Pn -n -sV --version-light -p ${port} -oX oac-${h}-${port}-ldap.xml ${h}`},
 {id:'dns',ports:[53],key:'dns',name:'DNS fingerprint',tool:'Nmap version detection',risk:'Low',why:'Confirm server role and service advertisement without zone transfers.',expect:'A DNS listener is not inherently a vulnerability.',cmd:(h,port)=>`nmap -Pn -n -sV -p ${port} -oX oac-${h}-${port}-dns.xml ${h}`},
 {id:'data',ports:[1433,1521,3306,5432,6379,27017],key:'data',name:'Database exposure baseline',tool:'Nmap version detection',risk:'Low',why:'Confirm the listener and ask whether this subnet should reach it; no authentication bypass.',expect:'Exposure finding only if validated against intended network rules.',cmd:(h,port)=>`nmap -Pn -n -sV --version-light -p ${port} -oX oac-${h}-${port}-db.xml ${h}`}
];
const FO_FINDING_META = {
 'ftp-anon':{title:'Anonymous FTP login appears permitted',severity:'medium',impact:'An unauthenticated user may access FTP resources exposed to this network; actual file permissions remain unverified.',remediation:'Disable anonymous FTP unless specifically required. Restrict access and review directory permissions.',verify:'Perform read-only directory listing with the approved test account; do not retrieve private files.',poc:(h,port)=>`curl --max-time 10 --user anonymous:anonymous "ftp://${h}:${port}/"`},
 'smb-signing':{title:'SMB signing not required',severity:'medium',impact:'Depending on network controls, an attacker may have additional opportunities to relay SMB authentication. No relay exploit has been demonstrated.',remediation:'Require SMB signing on appropriate systems and apply network protections. Confirm compatibility.',verify:'Confirm the same result against the exact affected host and review configured Windows SMB signing policy.',poc:(h,port)=>`nmap -Pn -n -p ${port} --script smb2-security-mode ${h}`},
 'legacy-tls':{title:'Legacy TLS protocol appears supported',severity:'medium',impact:'Legacy protocol support may permit weaker connections depending on negotiated settings and clients.',remediation:'Disable TLS 1.0/1.1 where feasible; enforce modern TLS and approved cipher policy.',verify:'Confirm negotiated protocols with the service owner or an approved TLS configuration scan.',poc:(h,port)=>`nmap -Pn -n -p ${port} --script ssl-enum-ciphers ${h}`},
 'http-methods':{title:'Potentially risky HTTP methods advertised',severity:'low',impact:'PUT or DELETE may permit changes if application authorization controls are weak; the HTTP OPTIONS result alone does not show that.',remediation:'Review and restrict methods to application requirements; enforce per-resource authorization.',verify:'Check authorized policy and application behavior; do not send state-changing test requests outside an isolated lab.',poc:(h,port)=>`curl --max-time 10 -i -X OPTIONS "http://${h}:${port}/"`},
 'http-headers':{title:'Security response headers appear absent',severity:'low',impact:'Missing defensive headers may increase certain web risks, depending on application context.',remediation:'Assess CSP, X-Content-Type-Options, frame policy and HTTPS-related headers for the application.',verify:'Inspect actual HTTP responses and confirm which headers apply to this application.',poc:(h,port)=>`curl --max-time 10 -I "http://${h}:${port}/"`},
 'nikto-header':{title:'Web header observation needs review',severity:'low',impact:'Nikto reported a potential missing protective header; confirm relevance on the actual app.',remediation:'Review web response header policy and implement applicable defensive headers.',verify:'Confirm with a direct header request and manual review.',poc:(h,port)=>`curl --max-time 10 -I "http://${h}:${port}/"`}
};
function foDefaults(p){if(!p.fieldops)p.fieldops={managementIp:'172.16.24.1',adapter:'eth0',notes:'',payloadSettings:{},importSummary:[],nextId:'',lastImport:''};if(!p.evidenceChecks)p.evidenceChecks=[];}
function foHelp(text){return `<div class="fo-help">${e(text)}</div>`;}
function foPanel(title,subtitle,body,kicker='GUIDED WORKFLOW'){return `<section class="panel fo-panel"><div class="panel-header"><div><div class="section-kicker">${e(kicker)}</div><h2 class="panel-title">${e(title)}</h2><p class="panel-desc">${e(subtitle)}</p></div></div>${body}</section>`;}
function foStep(title,body,number){return `<div class="fo-instruction"><span class="fo-stepnum">${e(String(number).padStart(2,'0'))}</span><div><b>${e(title)}</b><p>${body}</p></div></div>`;}
function foCommand(name,text,why,host,p){const ready=scopeSafety(p)&&(!host||isInScope(host,p.scope));return `<div class="cmd-card fo-command"><div class="cmd-top"><div><div class="cmd-title">${e(name)}</div><div class="cmd-note">${e(why)}</div></div><button type="button" class="btn small-btn ghost" data-fo-copy="${e(host||'LOCAL')}" data-fo-command="${e(text)}" ${ready?'':'disabled'}>Copy</button></div><pre class="command-text">${e(text)}</pre></div>`;}
function foStatus(message,kind='info'){return `<div class="callout ${kind}">${message}</div>`}
function foCard(title,sub,body){return `<div class="fo-card"><div class="fo-card-title">${e(title)}</div><p class="small">${e(sub)}</p>${body}</div>`;}
function foAsset(p){return p.assets.find(a=>a.id===ui.assetId)||p.assets[0]||null;}
function foChecks(a){return (a?.ports||[]).filter(s=>(!s.state||s.state==='open')&&s.protocol!=='udp').flatMap(s=>FO_KNOWN.filter(c=>c.ports.includes(Number(s.port))).map(c=>({...c,host:a.host,port:s.port,service:s.service,version:s.version||''})));}
function foAllChecks(p){return p.assets.filter(a=>isInScope(a.host,p.scope)).flatMap(foChecks);}
function foSourceLabel(p,id){const s=p.sources.find(x=>x.id===id);return s?`${s.name} · SHA-256 ${s.sha.slice(0,12)}…`:'Imported evidence';}
function foFindingFor(p,h,kind){return p.findings.find(f=>f.host===h&&f.autoKind===kind&&f.status!=='disproved')||null;}
function foQuery(p,a,check){return (p.evidenceChecks||[]).filter(x=>x.host===a.host&&x.port===check.port&&x.checkKey===check.key);}
function foContext(p,stepsOnly=false){foDefaults(p);const count=foAllChecks(p).length;return `<div class="fo-context"><div><span class="fo-k">ASSETS</span><b>${p.assets.length}</b></div><div><span class="fo-k">SERVICE CHECKS</span><b>${count}</b></div><div><span class="fo-k">EVIDENCE CHECKS</span><b>${p.evidenceChecks.length}</b></div><div><span class="fo-k">AUTO FINDINGS</span><b>${p.findings.filter(f=>f.autoKind).length}</b></div>${stepsOnly?'':`<div><span class="fo-k">CONTROLLED TESTS</span><b>${p.tests.length}</b></div>`}</div>`;}

const foOldRecon = recon;
recon = function(p){foDefaults(p);
 const base=foOldRecon(p);
 const cut=base.indexOf('<section class="panel"><div class="panel-header"><div><div class="section-kicker">KALI FIRST STEPS');
 const scopeSection=cut>=0?base.slice(0,cut):'';
 const stored=p.fieldops.payloadSettings||{};
 const cards=FO_PAYLOADS.map((q,i)=>{const saved=stored[q.id]||{};const config=q.params.map(([label,value])=>`<div class="fo-setting"><span>${e(label)}</span><strong>${e(value)}</strong></div>`).join('');return `<details class="fo-payload" ${i===0?'open':''}><summary><div><span class="fo-order">${String(i+1).padStart(2,'0')}</span> <b>${e(q.name)}</b><span class="fo-chip">${e(q.risk)}</span></div><span class="tiny">Expand procedure ▾</span></summary><div class="fo-detail"><p>${e(q.purpose)}</p>${foStatus(`<b>Exact menu name:</b> ${e(q.name)} · ${e(q.confidence)}. <b>Settings below are operator starting suggestions, not verified firmware defaults.</b> Only enter fields your installed payload actually presents.`)}<div class="fo-setting-grid">${config}</div><div class="fo-payload-row"><div><b>Recommended target:</b> ${e(q.target)}</div><div><b>Write down:</b> ${e(q.expect)}</div><div><b>Loot expectation:</b> ${e(q.loot)}</div><div><b>Then:</b> ${e(q.next)}</div></div><form class="fo-payload-form" data-fo-form="payload" data-fo-id="${e(q.id)}"><div class="form-grid"><div class="field"><label>Actual value(s) entered on your Shark Jack</label><input name="settings" value="${e(saved.settings||'')}" placeholder="Target=10.10.10.1; timeout=2s; count=4"></div><div class="field"><label>Observed result</label><select name="result"><option>Saved loot</option><option>Success (no file)</option><option>No response</option><option>Failed</option><option>Unknown</option></select></div><div class="field full"><label>Actual loot filename / screen result</label><input name="notes" placeholder="e.g. network_hunter_2026-10-13...txt"></div></div><button class="btn small-btn primary" type="submit">Save payload run + settings</button></form></div></details>`}).join('');
 return scopeSection+foContext(p)+foPanel('The exact Shark Jack procedure','Four payloads identified from your own workflow; settings are specific suggested starting points and should be checked against the installed profile.',`
 ${foStep('Verify scope and NETMODE',`Only test networks you own or have written approval for. On a normal LAN with an existing DHCP server, use <code>DHCP_CLIENT</code>, not <code>DHCP_SERVER</code>.`,1)}
 ${foStep('Run the four payloads in order',`Start with connectivity and a known ping target; use discovery and broader scan only when the earlier stages succeed and the network range is approved.`,2)}
 ${foStep('Record the actual on-device options',`Timeout and field labels can change by installed script. Record the values you truly used in each card; never claim a suggested value was observed.`,3)}
 <div class="fo-payload-list">${cards}</div>
 <div class="actions-row"><a href="https://github.com/hak5/sharkjackdisplay-payloads" target="_blank" rel="noopener noreferrer" class="btn small-btn">Official Display payload library ↗</a><button class="btn small-btn" data-action="log-payload">+ Other installed payload</button></div>
 ${foStatus('<b>Not every payload saves loot.</b> Inspect the on-device payload log. “Completed” does not establish that a scan was successful. Do not use capture, credential collection, or off-network exfiltration payloads as part of a routine discovery assessment.','warn')}`,'DEVICE OPERATOR GUIDE')+
 foPanel('Kali first: confirm your network','Run these from the Kali terminal after connecting to the correct adapter.',[
 {name:'Kali adapter and IP',text:'ip -br address',why:'Find wlan0/eth0 and addresses.'},
 {name:'Current route',text:'ip route',why:'Confirm the default gateway.'},
 {name:'Authorized host discovery',text:`sudo nmap -sn -n --max-retries 1 --host-timeout 60s ${validScope(p.scope)?p.scope:'YOUR_APPROVED_SUBNET'}`,why:'Find responding hosts only in recorded scope.'}
 ].map(c=>foCommand(c.name,c.text,c.why,null,p)).join(''),'TERMINAL PRACTICE')+
 foPanel('Payload history','Entries you saved on your Shark Jack cards; these survive encrypted lock/unlock.',`<div class="item-list">${p.runs.map(r=>`<div class="item"><div class="item-name">${e(r.name)} <span class="fo-chip">${e(r.result)}</span></div><div class="small">${e(date(r.at))} · ${e(r.target||'Unspecified')} · ${e(r.notes||'No file noted')}</div></div>`).join('')||'<div class="empty">No runs logged yet.</div>'}</div><div class="actions-row"><button type="button" class="btn primary" data-phase="1">Next → Retrieve loot in Enumeration</button></div>`,'YOUR EVIDENCE TRAIL');
};

const foOldEnumeration=enumeration;
enumeration = function(p){foDefaults(p);const ip=p.fieldops.managementIp||'172.16.24.1';const a=foAsset(p);const saved=foAllChecks(p);const linux=[
 {name:'1. Confirm your local interface',text:'ip -br address',why:'Identify the Ethernet adapter connected to the Shark Jack management port.'},
 {name:'2. Check the device management address',text:`ping -c 2 -W 2 ${ip}`,why:'A ping failure does not prove SSH is unavailable; check arming-mode configuration.'},
 {name:'3. Connect to the Shark Jack',text:`ssh root@${ip}`,why:'Run in Kali Terminal; confirm the management IP from the device, accept only the expected host key.'},
 {name:'4. Inspect filenames on the device',text:`ssh root@${ip} 'find /root/loot -maxdepth 4 -type f -print'`,why:'Run from your Kali terminal, not inside an already open SSH session.'},
 {name:'5. Create your local evidence directory',text:'mkdir -p "$HOME/FieldOps-Loot"',why:'Stores copied data in your home directory on Kali.'},
 {name:'6. Copy the entire loot folder',text:`scp -r root@${ip}:/root/loot "$HOME/FieldOps-Loot/"`,why:'From a local Kali terminal, download only the Shark Jack scan outputs you are authorized to retain.'},
 {name:'7. Confirm copied results',text:'find "$HOME/FieldOps-Loot" -maxdepth 5 -type f -print',why:'Shows exact filenames ready to import here.'}];
 const win=[
 {name:'1. Check interface address',text:'ipconfig',why:'In PowerShell, find the Ethernet adapter attached to the Shark Jack.'},
 {name:'2. Test management connectivity',text:`Test-NetConnection ${ip} -Port 22`,why:'Check whether SSH is reachable from Windows.'},
 {name:'3. Inspect the Shark Jack loot directory',text:`ssh root@${ip} "find /root/loot -maxdepth 4 -type f -print"`,why:'Run from PowerShell on Windows; the remote path is on the Shark Jack.'},
 {name:'4. Make a Windows evidence directory',text:'New-Item -ItemType Directory -Force -Path "$HOME\\Documents\\FieldOps-Loot"',why:'Creates your local destination if missing.'},
 {name:'5. Transfer the loot directory',text:`scp -r root@${ip}:/root/loot "$HOME\\Documents\\FieldOps-Loot\\"`,why:'Run from your local PowerShell, not from the SSH session.'},
 {name:'6. Check transferred files',text:'Get-ChildItem -Recurse "$HOME\\Documents\\FieldOps-Loot" -File | Select-Object FullName,Length',why:'View downloaded evidence filenames and sizes.'}
 ];
 const os=ui.foOS||'kali';
 const back=foPanel('Retrieve Shark Jack results over SSH / SCP','Exact copy-and-paste commands for Kali or Windows. “Loot” means saved Shark Jack output—not arbitrary endpoint files.',`
 <form data-fo-form="management" class="form-grid"><div class="field"><label>Shark Jack management IPv4 (verify on device)</label><input required name="ip" value="${e(ip)}" placeholder="172.16.24.1"></div><div class="field"><label>Host OS for transfer steps</label><select id="fo-os"><option value="kali" ${os==='kali'?'selected':''}>Kali / Linux</option><option value="windows" ${os==='windows'?'selected':''}>Windows PowerShell</option></select></div><div class="field full"><button class="btn small-btn" type="submit">Save management IP</button></div></form>
 ${foStep('Set device to Arming / management mode',`Connect to your laptop using the management interface and make sure the local network adapter can reach the device. <b>172.16.24.1 is a common Shark Jack address, not a guarantee for your Display configuration.</b>`,1)}
 ${foStep('Run the steps in a local terminal',`An SSH session runs commands <em>on the Shark Jack</em>; an <code>scp</code> command downloads to <em>your local machine</em>. If you are at a <code>root@shark:</code> prompt, type <code>exit</code> before SCP.`,2)}
 <div class="fo-transfer-list">${(os==='kali'?linux:win).map(x=>foCommand(x.name,x.text,x.why,null,p)).join('')}</div>
 ${foStatus('If <code>find</code> reports no files: the payload may not save output. Capture its on-device result or generate an authorized Nmap XML scan in Kali instead. Before importing, remove credentials, tokens, user data and packet payloads.','warn')}`,'EVIDENCE TRANSFER')+
 foPanel('Bring the outputs back and parse automatically','Import XML or plain-text scan output. FieldOps identifies hosts, ports and selected NSE evidence and carries the result forward.',`
 <div class="form-grid"><form id="import-form" class="field full"><label>Choose result files</label><input name="files" type="file" accept=".xml,.txt,.log,.nmap,.gnmap,.csv" multiple required><button type="submit" class="btn primary fo-upload">Import files and analyze →</button></form>
 <form data-fo-form="paste" class="field full"><label>Or paste copied terminal output</label><textarea name="output" minlength="8" maxlength="500000" required placeholder="Nmap scan report for 10.10.20.10...&#10;PORT   STATE SERVICE...&#10;445/tcp open microsoft-ds"></textarea><button type="submit" class="btn small-btn">Parse pasted output</button></form></div>
 <div class="notice">Best format: <code>nmap -sV -oX result.xml 10.10.20.10</code>. For vulnerability checks, keep <code>-oX</code>; NSE script output is parsed to create suspected findings only when it contains a relevant observed result.</div>`,'AUTOMATED INGESTION')+
 foPanel('Evidence and discovered inventory','Every import is SHA-256 hashed. Existing files are deduplicated. No raw file contents are stored in the encrypted workspace.',`
 ${foContext(p)}${assetsTable(p)}<div class="actions-row"><button class="btn small-btn" data-action="add-port">+ Add service manually</button><button class="btn primary" data-phase="2">Next → Vulnerability Assessment (${saved.length} checks)</button></div><div class="item-list">${p.sources.slice(0,12).map(s=>`<div class="item"><div class="item-name">${e(s.name)}</div><div class="tiny">${e(date(s.at))} · ${e(s.count)} observed ports · SHA-256 ${e(s.sha)}</div></div>`).join('')||'<div class="empty">No files imported.</div>'}</div>`,'OBSERVED EVIDENCE');
 return back;
};

const foOldVulnerability=vulnerability;
vulnerability = function(p){foDefaults(p);const a=foAsset(p);const checks=foAllChecks(p);const focus=a||null;
 const tasks=checks.map(c=>{const evidence=(p.evidenceChecks||[]).filter(x=>x.host===c.host&&x.port===c.port&&x.checkKey===c.key);
 const f=p.findings.find(x=>x.host===c.host&&x.autoPort===c.port&&x.autoKind);
 return `<div class="fo-check"><div class="fo-check-header"><div><b>${e(c.host)}:${e(c.port)} · ${e(c.name)}</b><div class="small">${e(c.service||'Unknown service')}${c.version?' · '+e(c.version):''} · ${e(c.tool)}</div></div><span class="fo-chip">${e(c.risk)}</span></div><p class="small">${e(c.why)}</p>${foCommand('Run in Kali → save as XML',c.cmd(c.host,c.port),c.expect,c.host,p)}<p class="tiny">${e(c.expect)}</p><div class="fo-check-outcome">${evidence.length?`<span class="fo-good">✓ ${evidence.length} matching script observation(s) imported</span>`:'<span class="fo-pending">○ Awaiting targeted output</span>'}${f?`<span class="fo-chip">Finding: ${e(f.status)} · ${e(f.title)}</span>`:''}</div></div>`}).join('');
 const findings=p.findings.filter(f=>!ui.filter||ui.filter==='all'||f.status===ui.filter);
 return foContext(p)+foPanel('Auto-generated vulnerability investigation queue','Generated from imported ports and services. Each command targets only the actual observed host and port; import the XML to link the results.',`
 ${checks.length?`<div class="fo-check-list">${tasks}</div>`:foStatus('No in-scope open services found yet. Import a Shark Jack or Nmap scan in Phase 02. An open port is a starting point, not a vulnerability.')}
 <div class="actions-row"><button class="btn primary" data-phase="1">← Import Nmap check output</button><button class="btn small-btn" data-phase="3">Next → Controlled validation / exploitation</button></div>`,'SERVICE-TO-TOOL ENGINE')+
 foPanel('Evidence-driven findings (automatically carried forward)','Imported Nmap script observations can create suspected findings. You review and promote or dismiss them; FieldOps never declares compromise based on a banner.',`
 ${findings.length?findings.map(f=>`<div class="fo-finding"><div class="fo-finding-title"><b>${e(f.title)}</b> <span class="tag ${f.status==='validated'?'green':f.status==='disproved'?'muted':'yellow'}">${e(f.status)}</span></div><div class="small">${e(f.host)}${f.autoPort?':'+e(f.autoPort):''} · ${e(f.severity||'unrated')} · ${f.autoKind?'Auto-detected candidate':'Practitioner entry'}</div><div class="fo-evidence">${e(f.evidence||'No evidence entered')}</div><div class="tiny">${e(f.sourceLabel||'Evidence source must be reviewed')}</div><div class="actions-row"><button type="button" class="btn small-btn" data-fo-review="${e(f.id)}">Review / validate</button><button type="button" class="btn small-btn" data-fo-exploit="${e(f.id)}">Carry into Exploitation →</button></div></div>`).join(''):'<div class="empty">No suspected vulnerabilities yet. Import check output, not just open-port results; clean scans may create no findings.</div>'}
 <details class="fo-expand"><summary>+ Manually record a finding not covered by the parser</summary><form id="finding-form" class="form-grid" style="margin-top:15px"><div class="field"><label>Finding title</label><input name="title" required maxlength="130" placeholder="Describe the actual observed weakness"></div><div class="field"><label>Target IP</label><input name="host" required value="${e(focus?.host||'')}"></div><div class="field"><label>Severity</label><select name="severity"><option value="info">Informational</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select></div><div class="field"><label>State</label><select name="status"><option value="suspected">Suspected</option><option value="validated">Validated</option><option value="disproved">Disproved</option></select></div><div class="field full"><label>Actual evidence</label><textarea name="evidence" required></textarea></div><div class="field full"><label>Impact</label><textarea name="impact"></textarea></div><div class="field full"><label>Remediation</label><textarea name="remediation"></textarea></div><button class="btn primary" type="submit">Save manual finding</button></form></details>`,'REVIEW QUEUE')+
 foPanel('How to interpret the output','Keep this decision rule in mind as you move from Kali scanners to risk.',`
 <div class="flow-cards"><div class="flow-card"><div class="n">OBSERVED</div><div class="t">445/tcp open</div><div class="d">This proves an SMB listener responded. It is not a weakness by itself.</div></div><div class="flow-card"><div class="n">SUSPECTED</div><div class="t">Signing not required</div><div class="d">An imported NSE script suggests a configuration weakness.</div></div><div class="flow-card"><div class="n">VALIDATED</div><div class="t">Verified against policy</div><div class="d">Assessor confirms applicability and records direct evidence.</div></div></div>
 ${foStatus('Nmap XML parsing recognizes selected SMB signing, FTP anonymous login, legacy TLS, and HTTP method/header indicators. Unknown scanner outputs are retained only as hash metadata until you review them. Vulnerability scanners can produce false positives.','warn')}`,'INTERPRETING RISK');
};

function foSelectedFinding(p){return p.findings.find(f=>f.id===ui.foFinding)||p.findings.find(f=>f.status==='validated')||p.findings.find(f=>f.status==='suspected')||null;}
function foMethod(f){if(!f)return null;return FO_FINDING_META[f.autoKind]||null;}
const foOldExploitation=exploitation;
exploitation = function(p){foDefaults(p);const f=foSelectedFinding(p), meta=foMethod(f);const ready=f&&isInScope(f.host,p.scope)&&p.exploitApproved&&f.status==='validated';const port=f?.autoPort|| (p.assets.find(a=>a.host===f?.host)?.ports?.[0]?.port)||'PORT';
 const preceding=p.findings.map(x=>`<option value="${e(x.id)}" ${x.id===f?.id?'selected':''}>${e(x.title)} · ${e(x.host)} · ${e(x.status)}</option>`).join('');
 return foContext(p)+foPanel('Findings from vulnerability assessment','Choose an imported or validated weakness. The walkthrough below changes based on which finding is selected.',`
 ${p.findings.length?`<div class="field"><label>Finding to investigate</label><select id="fo-finding-select"><option value="">Select a finding…</option>${preceding}</select></div>`:'<div class="empty">No findings yet. Run and import service-specific checks in Phase 03. A discovered port alone must not become an exploit.</div>'}
 ${f?`<div class="fo-finding"><div class="fo-finding-title"><b>${e(f.title)}</b> <span class="tag ${f.status==='validated'?'green':'yellow'}">${e(f.status)}</span></div><div class="small">${e(f.host)}:${e(port)} · ${e(f.severity)} · ${e(f.autoKind||'Manual assessment')}</div><div class="fo-evidence">${e(f.evidence||'No evidence recorded')}</div><div class="tiny">${e(f.sourceLabel||'Review evidence integrity and scope')}</div></div>`:''}
 ${!f?'':f.status!=='validated'?foStatus('<b>Not yet validated.</b> Return to Vulnerability Assessment to verify the finding and mark its correct status. A scanner suggestion alone does not justify exploitation.','warn'):!p.exploitApproved?foStatus('<b>Authorization missing:</b> Explicit exploitation approval has not been recorded. You can review the plan, but test commands are withheld until it is approved.','warn'):foStatus('<b>Controlled testing gate passed:</b> Verify the stated objective, asset, evidence, rollback and stop conditions before any test.','ok')}`,'LINKED FINDING')+
 foPanel('Safe controlled proof — customized to your result','A decision aid for authorized lab validation, not automated exploit execution.',`
 ${f?`<div class="fo-instruction"><span class="fo-stepnum">01</span><div><b>What we know</b><p>${e(f.title)} was recorded for ${e(f.host)}. Evidence status: ${e(f.status)}. ${e(meta?.impact||'Confirm the affected product, version, prerequisites, and vendor guidance.')}</p></div></div>
 ${foStep('What to verify first',e(meta?.verify||'Find the matching vendor advisory or lab walkthrough and verify the exact affected version and preconditions. Do not assume an Nmap version string is enough.'),2)}
 ${foStep('Define your stop condition',`Stop once the minimum approved result is visible. Do not collect credentials, browse personal records, establish persistence or perform lateral movement during this guided test.`,3)}
 ${meta?foCommand('Minimal read-only validation / proof',meta.poc(f.host,port),`For approved labs only. ${meta.verify}`,f.host,{...p,authorized:ready}):foStatus('No generic copy-and-run exploit exists for this finding. Research a verified advisory and plan the minimal proof on a disposable lab snapshot. Do not blindly run public exploit code.','warn')}
 ${foStep('Record observed outcome and cleanup',`Select the exact linked finding below and record what actually happened. This flows automatically into Phase 05 and the report.`,4)}
 ${foStatus('SMB signing, weak TLS, or missing web headers may be configuration findings with <b>no appropriate exploit demonstration</b> in your assessment. A validated configuration issue can be reported without gaining access.','warn')}`:'<div class="empty">Choose a finding first.</div>'}`,'CONTROLLED TEST PLAYBOOK')+
 foPanel('Authorization and test record','The existing test log stays part of your encrypted engagement. A confirmed proof requires approval and an in-scope target.',`
 <form id="approval-form" style="margin-bottom:18px"><label class="check-row"><input type="checkbox" name="exploitApproved" ${p.exploitApproved?'checked':''}> <span>Written permission specifically authorizes controlled exploitation of selected assets and methods.</span></label><button class="btn small-btn" type="submit">Save approval status</button></form>
 <form id="test-form" class="form-grid"><div class="field full"><label>Linked finding</label><select name="findingId"><option value="">No linked finding</option>${p.findings.filter(x=>x.status==='validated').map(x=>`<option value="${e(x.id)}" ${x.id===f?.id?'selected':''}>${e(x.title)} · ${e(x.host)}</option>`).join('')}</select></div><div class="field"><label>Test host</label><input name="host" required value="${e(f?.host||'')}"></div><div class="field"><label>Observed outcome</label><select name="result"><option>Not attempted</option><option>Blocked — no authorization</option><option>Inconclusive</option><option>Not vulnerable</option><option>Proof confirmed</option></select></div><div class="field full"><label>Objective</label><input name="objective" value="${e(f?'Check: '+f.title:'')}" required></div><div class="field full"><label>Method, approved boundaries and stop condition</label><textarea name="method">${e(meta?.verify||'')}</textarea></div><div class="field full"><label>Actual sanitized proof / why it failed</label><textarea name="evidence"></textarea></div><div class="field full"><label>Cleanup performed</label><textarea name="cleanup" placeholder="No changes made / sessions closed / test artifacts removed"></textarea></div><button type="submit" class="btn primary">Save linked test record →</button></form>
 <div class="item-list" style="margin-top:15px">${p.tests.map(t=>`<div class="item"><div class="item-name">${e(t.objective)} <span class="fo-chip">${e(t.result)}</span></div><p class="small">${e(t.host)} · ${e(t.evidence||t.method||'No evidence')}</p></div>`).join('')||'<div class="empty">No test records yet.</div>'}</div><div class="actions-row"><button class="btn primary" data-phase="4">Next → Post-exploitation / Cleanup</button></div>`,'APPROVAL & EVIDENCE');
};
const foOldPost=postExploit;
postExploit = function(p){foDefaults(p);const items=p.tests.map(t=>{const f=p.findings.find(x=>x.id===t.findingId);return `<div class="fo-finding"><div class="fo-finding-title"><b>${e(f?.title||t.objective)}</b> <span class="fo-chip">${e(t.result)}</span></div><div class="small">${e(t.host)} · ${e(date(t.at))}</div><div class="fo-evidence">${e(t.evidence||'Proof not recorded')}${t.cleanup?' · Cleanup: '+e(t.cleanup):''}</div></div>`}).join('');
 return foContext(p)+foPanel('Automatic post-exploitation handoff','Each controlled test from Phase 04 appears below with its linked finding, actual proof and cleanup status.',`
 ${items||'<div class="empty">No proof records. If exploitation was skipped, document that and proceed directly to reporting.</div>'}
 ${foStatus('Only assess the access your permitted test actually demonstrated. No automated persistence, credential harvesting, data dumping or pivoting is built into FieldOps.','warn')}`,'FINDING → OUTCOME')+
 foOldPost(p)+foPanel('Closure and reporting handoff','Exploitation may be skipped; accurate limitations are more useful than invented proof.',`<div class="actions-row"><button class="btn primary" data-phase="5">Next → Generate report</button></div>`,'NEXT PHASE');
};
const foOldReport=report;
report = function(p){foDefaults(p);const confirmed=p.findings.filter(f=>f.status==='validated').length;const suspected=p.findings.filter(f=>f.status==='suspected').length;const denied=p.findings.filter(f=>f.status==='disproved').length;const sample=`Assessment of ${p.scope} identified ${p.assets.length} host(s) and ${allPorts(p)} open service(s). ${confirmed} finding(s) validated, ${suspected} require verification, and ${denied} were disproved. ${p.tests.length} controlled test record(s). Only observed and verified results are reported as proven.`;
 return foContext(p)+foPanel('Report narrative based on real evidence','Use this factual starter summary. Final severity and business impact still require an assessor’s judgment.',`<div class="fo-evidence">${e(sample)}</div><div class="actions-row"><button type="button" class="btn small-btn" data-fo-summary="${e(sample)}">Use summary draft in report form</button></div>${foStatus('Findings marked “suspected” remain unconfirmed. Importing scan output never establishes exploitation. Verify all severity claims before presenting a report.','warn')}`,'AUTO-ASSEMBLED CONTEXT')+foOldReport(p);
};

function foDetection(scriptId,output){const id=(scriptId||'').toLowerCase(),v=(output||'').toLowerCase();
 if(id==='ftp-anon'&&/anonymous ftp login allowed|anonymous login allowed/.test(v))return 'ftp-anon';
 if(id==='smb2-security-mode'&&/(message signing enabled but not required|signing.*not required|message signing.*disabled)/.test(v))return 'smb-signing';
 if(id==='ssl-enum-ciphers'&&((/(tlsv1\.0|tlsv1\.1|sslv3)\s*:/i.test(v))||(/(tlsv1\.0|tlsv1\.1|sslv3)\s+supported/i.test(v)&&!/(not|unsupported)\s+(tlsv1\.0|tlsv1\.1|sslv3)/i.test(v))))return 'legacy-tls';
 if(id==='http-methods'&&/potentially risky methods:[^\n]*(put|delete|trace)/i.test(v))return 'http-methods';
 if(id==='http-security-headers'&&/(missing|not set|not present).{0,70}(content-security-policy|x-frame-options|x-content-type-options)/i.test(v))return 'http-headers';
 return null;
}
function foRedact(s){return String(s||'').replace(/(authorization:\s*(?:basic|bearer)\s+)[^\s]+/gi,'$1[REDACTED]').replace(/((?:api[_-]?key|token|password|secret)["'=:\s]+)[^\s"']+/gi,'$1[REDACTED]').slice(0,900)}
function foParseNSE(text,name){const out=[];const push=(host,port,script,raw)=>{if(!validIPv4(host)||!Number.isInteger(+port)||+port<1||+port>65535)return;out.push({host,port:+port,checkKey:script,output:foRedact(raw),kind:foDetection(script,raw),filename:name})};
 const isXml=/^\s*(<\?xml|<nmaprun[\s>])/i.test(text);
 if(isXml){const x=new DOMParser().parseFromString(text,'application/xml');if(x.querySelector('parsererror'))return out;
  for(const h of x.querySelectorAll('nmaprun > host')){const ip=[...h.querySelectorAll(':scope > address')].find(y=>y.getAttribute('addrtype')==='ipv4')?.getAttribute('addr');if(!validIPv4(ip||''))continue;
   for(const port of h.querySelectorAll(':scope > ports > port')){const num=+port.getAttribute('portid');for(const s of port.querySelectorAll(':scope > script'))push(ip,num,s.getAttribute('id')||'',s.getAttribute('output')||s.textContent||'')}
   for(const script of h.querySelectorAll(':scope > hostscript > script')){const sid=script.getAttribute('id')||'';if(sid.startsWith('smb')&&h.querySelector('port[portid="445"]'))push(ip,445,sid,script.getAttribute('output')||script.textContent||'');}
  }
  return out;
 }
 let host='',port=0,script='',buf=[];
 const flush=()=>{if(host&&port&&script)push(host,port,script,buf.join('\n'));script='';buf=[]};
 for(const raw of text.split(/\r?\n/)){
  let m=raw.match(/^Nmap scan report for\s+(?:(.*?)\s+\()?((?:\d{1,3}\.){3}\d{1,3})\)?\s*$/i);
  if(m){flush();host=m[2];port=0;continue}
  m=raw.match(/^\s*(\d{1,5})\/(?:tcp|udp)\s+(?:open|filtered)\s+/i);
  if(m){flush();port=+m[1];continue}
  m=raw.match(/^\s*\|[_ ]?([a-z][\w-]+):\s*(.*)$/i);
  if(m){flush();script=m[1];buf.push(m[2]||'');continue}
  if(script&&/^\s*\|/.test(raw)){buf.push(raw.replace(/^\s*\|[_ ]?/,''));continue}
  if(script&&!/^\s*\|/.test(raw)&&raw.trim()){flush()}
 }
 flush();
 return out;
}
const foBaseImportFiles=importFiles;
importFiles=async function(p,files){foDefaults(p);const start=new Set(p.sources.map(s=>s.sha));const gathered=[];
 for(const file of files){if(file.size>2*1024*1024)throw Error(file.name+' exceeds the 2MB parser limit.');const buf=await file.arrayBuffer();const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',buf))).map(x=>x.toString(16).padStart(2,'0')).join('');if(start.has(hash))continue;gathered.push({name:file.name,sha:hash,checks:foParseNSE(dec.decode(buf),file.name)})}
 await foBaseImportFiles(p,files);
 let observations=0,candidates=0;
 for(const file of gathered){const src=p.sources.find(s=>s.sha===file.sha);if(!src)continue;
  for(const check of file.checks){if(!isInScope(check.host,p.scope))continue;
   if(p.evidenceChecks.some(x=>x.host===check.host&&x.port===check.port&&x.checkKey===check.checkKey&&x.sha===file.sha))continue;
   p.evidenceChecks.unshift({id:id(),host:check.host,port:check.port,checkKey:check.checkKey,output:check.output.slice(0,500),kind:check.kind,sourceId:src.id,sha:file.sha,at:time()});observations++;
   if(check.kind){const meta=FO_FINDING_META[check.kind];if(!meta)continue;
    const existing=p.findings.find(f=>f.host===check.host&&f.autoPort===check.port&&f.autoKind===check.kind);
    if(!existing){p.findings.unshift({id:id(),at:time(),title:meta.title,host:check.host,autoPort:check.port,autoKind:check.kind,severity:meta.severity,status:'suspected',evidence:`${check.checkKey}: ${check.output.slice(0,420)}`,sourceLabel:`${src.name} / SHA-256 ${file.sha}`,impact:meta.impact,remediation:meta.remediation});candidates++}
    else if(existing.status==='suspected'){existing.evidence=existing.evidence||`${check.checkKey}: ${check.output.slice(0,420)}`}
   }
  }
 }
 p.evidenceChecks=p.evidenceChecks.slice(0,1200);
 p.fieldops.lastImport=time();log(p,`Linked ${observations} scripted check(s); ${candidates} new suspected finding(s)`);await persist();render();message(`${observations} scripted observations; ${candidates} suspected findings created. Review in Phase 03.`);
};

// Capture these new forms before the original v1 handler. All results are stored in the same AES-GCM vault.
document.addEventListener('submit',async ev=>{const f=ev.target;if(!(f instanceof HTMLFormElement)||!f.dataset.foForm)return;
 ev.preventDefault();ev.stopImmediatePropagation();if(ui.busy)return;ui.busy=true;
 try{const p=current();if(!p)throw Error('Unlock your workspace first.');foDefaults(p);const d=Object.fromEntries(new FormData(f));
  if(f.dataset.foForm==='management') {const ip=String(d.ip||'').trim();if(!validIPv4(ip))throw Error('Enter a valid management IPv4 address.');p.fieldops.managementIp=ip;await commit('Updated verified management IP');}
  else if(f.dataset.foForm==='payload'){const q=FO_PAYLOADS.find(x=>x.id===f.dataset.foId);if(!q)throw Error('Unknown payload.');const settings=String(d.settings||'').trim().slice(0,350);const result=String(d.result||'Unknown');const notes=String(d.notes||'').slice(0,400);p.fieldops.payloadSettings[q.id]={settings};p.runs.unshift({id:id(),name:q.name,target:settings,result,notes,at:time()});await commit(`Logged ${q.name} with actual settings`)}
  else if(f.dataset.foForm==='paste'){const text=String(d.output||'').trim();if(text.length<8)throw Error('Paste at least eight characters of output.');const file=new File([text],`terminal-${today()}-${Date.now()}.txt`,{type:'text/plain'});await importFiles(p,[file]);}
 }catch(err){fail(err)}finally{ui.busy=false}
},true);

document.addEventListener('change',ev=>{const node=ev.target;if(node?.id==='fo-os'){ev.stopImmediatePropagation();ui.foOS=node.value;render();}
 else if(node?.id==='fo-finding-select'){ev.stopImmediatePropagation();ui.foFinding=node.value;render();}
},true);

document.addEventListener('click',async ev=>{const b=ev.target.closest?.('[data-fo-copy],[data-fo-review],[data-fo-exploit],[data-fo-summary]');if(!b)return;
 ev.preventDefault();ev.stopImmediatePropagation();const p=current();if(!p)return;
 try{
  if(b.dataset.foCopy!==undefined){const host=b.dataset.foCopy;if(!scopeSafety(p))throw Error('Save your approved scope first.');if(host!=='LOCAL'&&!isInScope(host,p.scope))throw Error('Target is outside approved scope.');if(ui.phase===3&&!p.exploitApproved)throw Error('Save explicit exploitation approval before copying this proof command.');const f=foSelectedFinding(p);if(ui.phase===3&&(!f||f.status!=='validated'||f.host!==host))throw Error('Select a validated matching finding.');await copy(b.dataset.foCommand||'');}
  else if(b.dataset.foReview){ui.editId=b.dataset.foReview;ui.modal='finding';render();}
  else if(b.dataset.foExploit){ui.foFinding=b.dataset.foExploit;ui.phase=3;render();window.scrollTo(0,0)}
  else if(b.dataset.foSummary){const field=document.querySelector('textarea[name="summary"]');if(field){field.value=b.dataset.foSummary;field.focus();field.scrollIntoView({behavior:'smooth',block:'center'});}}
 }catch(err){fail(err)}
},true);

// Prevent lab proof records from being recorded as confirmed without a validated,
// specifically linked in-scope finding and approval. Other outcomes remain documentable.
document.addEventListener('submit',ev=>{
 const form=ev.target;
 if(!(form instanceof HTMLFormElement)||form.id!=='test-form')return;
 const result=form.elements.namedItem('result')?.value;
 if(result!=='Proof confirmed')return;
 const p=current(),findingId=form.elements.namedItem('findingId')?.value;
 const f=p?.findings.find(x=>x.id===findingId);
 const host=form.elements.namedItem('host')?.value?.trim();
 if(!p?.exploitApproved||!scopeSafety(p)||!f||f.status!=='validated'||f.host!==host||!isInScope(host,p.scope)){
   ev.preventDefault();ev.stopImmediatePropagation();
   fail(Error('Confirmed proof needs approval and a matching validated in-scope finding. Use Not attempted / Inconclusive when appropriate.'));
 }
},true);
