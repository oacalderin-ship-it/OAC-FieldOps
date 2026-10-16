/* OAC FieldOps 5.0 — the Shark Jack custom-payload runbook leads; transfer and parsing happen in Enumeration.
 * Additive UI layer: preserves existing encrypted vault, tests, finding correlation and report engine.
 * No external requests, no command execution, no credential-spray suggestions.
 */
'use strict';
const OAC5_VERSION = '5.0';
// Update only the descriptions, not the encrypted engagement structure or phase IDs.
PHASES[0].summary = 'Follow the exact OAC Shark Jack menus to collect host and service evidence. No manual payload logging.';
PHASES[1].summary = 'Copy the full Shark Jack loot tree once, import all files and folders, and let FieldOps assemble the inventory.';
function oac5Path(name){return `<code class="oac5-path">My Payloads → OAC → ${e(name)}</code>`;}
function oac5Item(num,name,tag,subtitle,steps,details,open=true){
 const lines=steps.map((s,i)=>`<div class="oac5-step"><span class="oac5-step-num">${i+1}</span><div>${s}</div></div>`).join('');
 return `<details class="oac5-payload" ${open?'open':''}><summary><span class="oac5-number">${e(num)}</span><span class="oac5-summarytext"><b>${e(name)}</b><small>${e(subtitle)}</small></span><span class="oac5-tag">${e(tag)}</span><span class="oac5-chevron">▾</span></summary><div class="oac5-body">${lines}${details?`<div class="oac5-evidencehint">${details}</div>`:''}</div></details>`;
}
function oac5Recon(p){
 const ok=scopeSafety(p), scope=ok?p.scope:'not saved yet';
 const ips=p.assets.filter(a=>isInScope(a.host,p.scope)).map(a=>a.host);
 const common=ips.slice(0,5), smb=p.assets.filter(a=>isInScope(a.host,p.scope)&&a.ports.some(x=>Number(x.port)===445)).map(a=>a.host);
 const ctx=oac3Init(p).context, knownGateway=ctx.gateway&&validIPv4(ctx.gateway)?ctx.gateway:null;
 return `<div class="oac5-band"><span><b>01 RECON</b> — Run the Shark Jack payloads</span><span>→</span><span><b>02 ENUM</b> — Transfer + import everything</span><span>→</span><span><b>03–06</b> — Investigate + report</span></div>
 ${oac3Scope(p)}
 ${foPanel('Your exact OAC Shark Jack runbook','Use the revised payloads in My Payloads → OAC. You do NOT have to type their names, file paths, host counts, or findings into FieldOps.',`
 <div class="oac5-notice"><b>Before starting:</b> Plug the Shark Jack into a LAN you own or are authorized to test. Use <code>DHCP_CLIENT</code> on an existing DHCP network. Confirm the saved engagement scope covers the complete connected LAN before running subnet-wide tools. <b>Never use DHCP_SERVER on an existing production LAN.</b></div>
 ${oac5Item('01','Simple Connection Test','BASELINE','Original Hak5 utility · connectivity only',[
 `Open <code>Downloaded → util → simple_connection_test</code>, then choose <b>Start</b>.`,
 `The built-in test obtains DHCP, checks the gateway, then tries internet IP, DNS/HTTP(S), and public-IP checks. These are its actual internal steps; there is no separate host-timeout menu.`,
 `If the gateway test fails, fix the cable/network settings first. <b>Internet failure alone doesn't prevent local authorized scanning.</b>`
 ],'This stock utility mainly shows results on-screen. It does <b>not</b> reliably write a loot file; you can continue without one.')}
 ${oac5Item('02','OAC_Advanced_Ping','GATEWAY','Revised OAC · automatically chooses the gateway',[
 `Open ${oac5Path('OAC_Advanced_Ping')} and select <b>Ping Gateway</b>.`,
 `The payload reads the current DHCP default gateway for you. <b>Do not enter an IP manually.</b> It sends <b>4 pings</b> by default, with a <b>2-second response wait</b> per probe.`,
 `If the gateway responds, continue. If not, check connection details; ICMP might be blocked. ${knownGateway?`Your earlier imported gateway was <code>${e(knownGateway)}</code>; check it's still current.`:'Your gateway can change between networks.'}`
 ],'Saved automatically to <code>/root/loot/ping/ping-*.txt</code>. “Ping Saved Target” is optional for checking a specific known device—not required for every host.')}
 ${oac5Item('03','OAC_Network_Hunter','MAIN DISCOVERY','Revised OAC · actual IP list + XML output',[
 `Open ${oac5Path('OAC_Network_Hunter')}. Choose <b>1 Discover Hosts</b>. Wait for the live-host count; do not unplug early.`,
 `Next choose <b>2 Scan Live Services</b>. It uses the host list from Step 1, scanning the <b>top 1,000 TCP ports</b> and performing light version detection. The script allows <b>300 seconds per host</b>; it may take several minutes.`,
 `Alternatively, on a fresh run choose <b>Discovery + Services</b> to do both in sequence. You do not need to run each separately <em>and</em> the combined option.`,
 `If it says <b>over 32 hosts</b>, the built-in enumeration deliberately stops; use Advanced Nmap on individual in-scope targets instead. If it says <b>FAILED_OR_INCOMPLETE</b>, collect the saved error log.`
 ],'Creates <code>/root/loot/network_hunter/discovery_*.txt/.xml</code>, <code>services_*.txt/.xml</code>, summaries, and <code>latest-hosts.txt</code>. These are the most useful FieldOps files.')}
 ${oac5Item('04','OAC_Advanced_Nmap','FOLLOW-UP','Revised OAC · targeted scan from the actual menus',[
 `Open ${oac5Path('OAC_Advanced_Nmap')} → <b>Options → Change Options</b>. Leave <b>NETMODE: DHCP_CLIENT</b>.`,
 `If Hunter omitted IPs, choose <b>Target → SUBNET</b>, then <b>Scan Type → Ping</b> (<code>-sn</code>). Do <b>not</b> select Passive (<code>-sL</code>); that only lists potential addresses.`,
 `Once you have an individual approved IP (from Hunter's screen or your imported asset inventory), choose <b>Target → IP address</b>, then <b>Scan Type → Port → Top-1000</b>.`,
 `To fingerprint an identified host, choose <b>Scan Type → Service → Fast</b> (light version scan). The <b>Port</b> and <b>Service</b> options are separate runs, so save results from both.`,
 `Under <b>Advanced</b>, the revised default is <b>Host Timeout: 300s</b> and <b>Max Retries: 3</b>. Verify via <b>Options → Show Options</b>—an old saved profile can override the defaults. Then choose <b>Start Scan</b>.`,
 `Need more coverage on <em>one</em> approved host? <b>Port → All</b> is slower; it should not be your first full-subnet scan. If it times out, collect its raw log and XML before retrying.`
 ],`Outputs <code>/root/loot/nmap/scan-*.txt</code> and <code>scan-*.xml</code>. ${common.length?`Already identified IPs in this engagement: <b>${e(common.join(', '))}</b>. Confirm they still belong to the authorized target.`:'You can select a specific host after discovery; do not guess an IP.'}`)}
 ${oac5Item('05','OAC_SMB_Spy','CONDITIONAL','Revised OAC · port 445 discovery across the directly connected subnet',[
 `Open ${oac5Path('OAC_SMB_Spy')} → <b>Start SMB Spy</b> <b>only if your whole connected subnet is approved for scanning</b> and SMB verification is relevant.`,
 `It first performs host discovery, then checks <code>445/tcp</code> across the current LAN. It saves the <b>actual open/filtered/closed states</b>.`,
 `If your earlier scan shows only <b>filtered</b> or <b>closed</b> TCP/445, this is optional rather than a guaranteed useful next action. It does not authenticate or enumerate file contents.`
 ],`Saves <code>/root/loot/smb_discovery/smb_hosts_*.txt</code>, <code>nmap_raw_*.txt</code>, and <code>nmap_raw_*.xml</code>. ${smb.length?`Imported evidence has TCP/445 reported open on ${e(smb.join(', '))}.`:'No in-scope host with confirmed open TCP/445 is recorded yet.'}`,false)}
 <div class="oac5-notice"><b>What we are <em>not</em> running:</b> The original downloaded Network Hunter's “Run All” included credential attempts. Your <b>revised OAC Network Hunter does not</b>; its menu contains only <b>Discover Hosts, Scan Live Services, Discovery + Services, Loot Folder, Quit</b>. LLDP tools can be used separately to learn about an owned managed switch when relevant; demos and credential-spray payloads are not part of this standard discovery sequence.</div>
 <div class="oac5-finish"><b>That's Phase 01 complete.</b> You don't need to enter results here. Leave the loot on the Shark Jack until you're ready to copy it, then open Phase 02. <button class="btn primary" data-phase="1">02 → Transfer + import loot</button></div>
 `,'PAYLOAD RUNBOOK')}`;
}
function oac5Transfer(p){const m=oac3Init(p), ctx=m.context;
 const ip=(m.managementIp&&m.managementIp!=='172.16.24.1'?m.managementIp:(p.fieldops.managementIp&&p.fieldops.managementIp!=='172.16.24.1'?p.fieldops.managementIp:(ctx.deviceIp&&validIPv4(ctx.deviceIp)?ctx.deviceIp:'172.16.24.1')));
 const os=ui.oac4OS||'windows';
 const list=os==='windows'?
 [ ['1 · List saved output files',`ssh root@${ip} "find /root/loot -type f -print"`,'Run in Windows PowerShell; this executes the find command remotely without leaving PowerShell.'],
 ['2 · Create one destination folder',`$dest = Join-Path $HOME 'Documents\\FieldOps-Loot'; New-Item -ItemType Directory -Force -Path $dest | Out-Null`,'Creates your Windows evidence folder; no need to manually combine folders.'],
 ['3 · Copy EVERYTHING under /root/loot',`scp -O -r root@${ip}:/root/loot $dest`,'Use -O for legacy SCP on the Shark Jack. This copies the whole loot tree and its subfolders, NOT workstation documents.'],
 ['4 · See all copied evidence',`Get-ChildItem -Path $dest -Recurse -File | Select-Object FullName,Length`,'In the upload box below choose Add folder, then select Documents\\FieldOps-Loot\\loot.'] ]:
 [ ['1 · List saved output files',`ssh root@${ip} 'find /root/loot -type f -print'`,'Run in your local Kali terminal.'],
 ['2 · Create one destination folder','mkdir -p "$HOME/Documents/FieldOps-Loot"','All Shark Jack payload outputs will go into this one folder.'],
 ['3 · Copy the complete loot tree',`scp -O -r root@${ip}:/root/loot "$HOME/Documents/FieldOps-Loot/"`,'Use -O if your Shark Jack cannot serve SFTP. The resulting directory includes every saved subfolder.'],
 ['4 · View all saved evidence','find "$HOME/Documents/FieldOps-Loot/loot" -type f -print','In the upload box below choose Add folder and select Documents/FieldOps-Loot/loot.'] ];
 return foPanel('Copy the WHOLE Shark Jack loot folder to your computer','Run these steps after your payloads finish. You only need one recursive SCP copy—no more downloading individual files from different folders.',`
 <div class="oac4-transferbar"><label>Your computer<select id="oac4-os"><option value="windows" ${os==='windows'?'selected':''}>Windows PowerShell</option><option value="kali" ${os==='kali'?'selected':''}>Kali / Linux</option></select></label><form data-oac3="mgmt"><label>Current Shark Jack SSH IP</label><input type="text" name="ip" value="${e(ip)}" required><button class="btn small-btn" type="submit">Save IP</button></form></div>
 <div class="oac5-notice"><b>Important:</b> The IP in these commands is the device's <em>current</em> SSH address. It can change after DHCP renewals. If the suggested address doesn't match what your device shows, edit it above and choose <b>Save IP</b> before copying. Commands are run on your laptop, <b>not</b> at <code>root@shark:~#</code>.</div>
 <div class="oac4-cmdlist">${list.map(([title,cmd,why])=>oac4Command(title,cmd,why,null,p)).join('')}</div>
 <details class="oac5-help"><summary>Why is SCP failing? ▾</summary><p>If SSH works but SCP fails with an SFTP-related error, keep the <code>-O</code> flag. If you're inside <code>root@shark:~#</code>, type <code>exit</code> and retry from Windows PowerShell/Kali. If the address isn't reachable, confirm Shark Jack management mode and IP.</p></details>
 `,'TRANSFER / WINDOWS OR KALI');
}
function oac5Enumeration(p){const s=oac4Stats(p); const any=p.sources.length>0;
 return `<div class="oac5-band"><span><b>01</b> Run OAC payloads</span><span>→</span><span><b>02</b> Transfer + import logs</span><span>→</span><span><b>03–06</b> Use identified findings</span></div>
 ${oac5Transfer(p)}
 ${oac4Upload().replace('ONE EVIDENCE INBOX · PHASE 01','ONE EVIDENCE INBOX · PHASE 02').replace('Import once. Add files from as many folders as you need.','Drop your entire Shark Jack loot folder here').replace('The app analyzes your files locally, connects host/port observations, and carries them into all six phases. Later scans go into this <em>same inbox</em>—not another form.','Choose <b>+ Add folder</b> and select the copied <code>loot</code> directory. Or add files and folders in several batches. FieldOps merges them by file hash; repeat imports are skipped. This is the <b>only</b> upload area for every phase.')}
 ${foPanel('What FieldOps learned from your files','As soon as you analyze the queue, IP addresses, listening ports, closed/filtered results and scan warnings appear here. No manual transcription required.',`${!any?'<div class="oac5-notice">No loot imported yet. Finish the four transfer commands above, select the copied <code>loot</code> folder, and click <b>Analyze queued loot</b>.</div>':''}${oac4EvidenceCard(p)}${assetsTable(p)}`,'AUTOMATIC INVENTORY')}
 ${foPanel('Exactly what to do next','If a scan finds no services, FieldOps distinguishes missing evidence, filtered ports, host-discovery failures, and a completed scan with no open listeners.',`${oac4NextSteps(p)}<div class="actions-row"><button class="btn primary" data-phase="2">03 → Vulnerability checks</button></div>`,'NEXT STEP ENGINE')}`;
}
function oac5Vulnerability(p){return oac3Vuln(p).replace(oac3Upload(),`<div class="oac4-reimport"><b>Finished a new scan?</b> <button class="btn small-btn" data-phase="1">02 → Import its results in the same evidence inbox</button><span>Findings and linked tests update after analysis.</span></div>`);}
// Reuse the mature parser while supporting new OAC Network Hunter summaries and plain IP lists.
const oac5PreviousScan=parseScan;
parseScan=function(text,filename){const prior=oac5PreviousScan(text,filename);const seen=new Set(prior.map(a=>a.host));const name=String(filename||'').split(/[\\/]/).pop().toLowerCase();
 const lines=String(text||'').replace(/\r/g,'').split('\n');
 if(/^latest-hosts\.txt$/.test(name)||/^discovery_summary_/.test(name)||/^services_summary_/.test(name)){
  let reading=false;
  for(const line of lines){
   if(/^Discovered IPs:\s*$/i.test(line)){reading=true;continue;}
   const solo=line.trim();
   if((reading||name==='latest-hosts.txt')&&validIPv4(solo)&&!seen.has(solo)){
    prior.push({host:solo,hostname:'',ports:[]});seen.add(solo);continue;}
   if(reading&&solo&&!validIPv4(solo))reading=false;
   const row=line.match(/^\s*((?:\d{1,3}\.){3}\d{1,3})\s*\|\s*(\d{1,5})\/(tcp|udp)\s*\|\s*(open|filtered|closed)\s*\|\s*(\S+)/i);
   if(row&&validIPv4(row[1])&&row[4]==='open'&&Number(row[2])>0&&Number(row[2])<=65535){
    let asset=prior.find(a=>a.host===row[1]);if(!asset){asset={host:row[1],hostname:'',ports:[]};prior.push(asset);seen.add(row[1]);}
    asset.ports.push({port:Number(row[2]),protocol:row[3],service:row[5],state:'open',source:filename});
   }
  }
 }
 return prior;
};
const oac5OldEvidence=oac4Evidence;
oac4Evidence=function(text,filename){const r=oac5OldEvidence(text,filename),t=String(text||'');
 if(/===\s*OAC Network Hunter: (?:Discovery|TCP Enumeration)\s*===/i.test(t)){
   r.type=/TCP Enumeration/i.test(t)?'OAC Hunter service summary':'OAC Hunter discovery summary';
   const c=t.match(/Live host records:\s*(\d+)/i);if(c)r.reported=Number(c[1]);
   const h=parseScan(t,filename);for(const a of h){if(!r.hosts.includes(a.host)){r.hosts.push(a.host);r.hostRows.push({ip:a.host,state:'up'});}
    for(const port of a.ports||[])r.ports.push({host:a.host,port:port.port,protocol:port.protocol,state:'open',service:port.service});}
 }
 if(/^latest-hosts\.txt$/i.test(String(filename||'').split(/[\\/]/).pop())){r.type='OAC Hunter host list';const h=parseScan(t,filename);for(const a of h){if(!r.hosts.includes(a.host)){r.hosts.push(a.host);r.hostRows.push({ip:a.host,state:'up'});}}}
 if(/Status:\s*FAILED_OR_INCOMPLETE|OAC_SCAN_EXIT_STATUS=([1-9]\d*)/i.test(t))r.warnings.push('Scan explicitly reported failure or a nonzero exit status. Do not treat missing services as evidence that ports are closed.');
 if(/Status:\s*PARTIAL_CHECK_FOR_TIMEOUTS|\bGiving up on host\b|\bhost timed out\b/i.test(t))r.warnings.push('Scan may be incomplete because of a host timeout; check raw output and consider retesting the one approved target.');
 return r;
};
recon=oac5Recon;enumeration=oac5Enumeration;vulnerability=oac5Vulnerability;
const oac5OldChecklist=checklist;
checklist=function(p){if(ui.phase===0)return '';return oac5OldChecklist(p);};
const oac5OldShell=shell;shell=function(p){return oac5OldShell(p).replace('OAC FIELDOPS / v4.0','OAC FIELDOPS / v5.0')};
stepAdvice=function(p){if(ui.phase===0)return `<section class="panel tight"><div class="section-kicker">YOUR NEXT ACTION</div><h3 class="subheading">Run the actual OAC payload menu on the Shark Jack; don't enter results manually.</h3><p class="small">Begin with connection testing, Ping Gateway and Network Hunter. Use Advanced Nmap for specific targets. Move to Phase 02 for transfer and parsing.</p></section>`;
 if(ui.phase===1)return `<section class="panel tight"><div class="section-kicker">YOUR NEXT ACTION</div><h3 class="subheading">Copy /root/loot once, import the whole folder, then follow the automatically generated next action.</h3><p class="small">New Kali results can be imported through this same inbox later. No duplicate upload forms.</p></section>`;
 return `<section class="panel tight"><div class="section-kicker">HOW IT CONNECTS</div><h3 class="subheading">Your later phases use the evidence already imported in Phase 02.</h3><p class="small">Vulnerability checks propose commands only for observed open ports. Exploitation results need human confirmation and permission.</p><button class="btn small-btn" data-phase="1">Open the evidence inbox →</button></section>`;
};
