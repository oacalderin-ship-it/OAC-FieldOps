import {allowed} from './scope.js';
import {RULES,protocolFor,evaluateScript} from './rules.js';
export function analyze(e){const assets=new Map(),findings=[],tasks=[],checks=[],proofs=[],issues=[];
 for(const file of e.evidence){if(file.error){issues.push({evidence:file.id,message:file.error});continue;}const r=file.result;if(!r)continue;
 for(const h of r.hosts||[]){let a=assets.get(h.ip);if(!a){a={...h,ports:[],observations:[],evidence:[],inScope:allowed(h.ip,e)};assets.set(h.ip,a);}a.evidence.push(file.id);a.observations.push({file:file.id,at:r.timestamp||file.importedAt,complete:r.complete,host:h});if(h.state==='up')a.state='up';a.hostname=h.hostname||a.hostname;
 for(const p of h.ports){const key=`${p.protocol}:${p.port}`;let port=a.ports.find(x=>x.key===key);if(!port){port={...p,key,observations:[]};a.ports.push(port);}port.observations.push({file:file.id,at:r.timestamp||file.importedAt,complete:!!r.complete,port:p,hostScripts:h.scripts||[],command:r.command||''});}
 }
 }
 for(const a of assets.values()){
 a.ports.forEach(p=>{p.observations.sort((x,y)=>Date.parse(x.at)-Date.parse(y.at));const latest=p.observations.at(-1).port;Object.assign(p,latest);});
 if(!a.ports.length&&a.state!=='down')tasks.push({id:`${a.ip}:enumerate`,host:a.ip,phase:4,type:'enumerate',title:'Enumerate reachable services',state:a.inScope?'Awaiting evidence':'Blocked by scope or authorization',why:'Host evidence exists but no port inventory is available.',evidence:a.evidence,expected:'Nmap XML with service observations'});
 for(const p of a.ports){if(!['open','open|filtered'].includes(p.state))continue;const type=protocolFor(p),rule=RULES[type],id=`${a.ip}:${p.protocol}:${p.port}:${type}`;const results=[];
 for(const o of p.observations){const relevant=[...o.port.scripts,...(type==='smb'&&new RegExp('(?:^|\\s)-p\\s*'+p.port+'(?:\\s|$)').test(o.command)?o.hostScripts:[])].filter(s=>rule.scripts.includes(s.id));for(const s of relevant){const verdict=evaluateScript(s,o.complete);const c={...verdict,host:a.ip,port:p.port,protocol:p.protocol,script:s.id,evidence:o.file,at:o.at,output:s.output,investigationId:id};checks.push(c);results.push(c);}}
 const latestByScript=rule.scripts.map(s=>results.filter(x=>x.script===s).at(-1)).filter(Boolean);let done=rule.scripts.length>0&&latestByScript.length===rule.scripts.length&&latestByScript.every(x=>x.state!=='Inconclusive');
 if(rule.scripts.length===0)done=p.observations.some(o=>o.complete&&/\s-sV(?:\s|$)/.test(o.command));
 const inconclusive=results.some(x=>x.state==='Inconclusive')&&!done;
 let state=done?'Test completed':inconclusive?'Inconclusive':'Awaiting evidence';
 const currentFindings=latestByScript.filter(x=>x.title);for(const f of currentFindings){const prior=results.filter(x=>x.script===f.script&&x.evidence!==f.evidence);const conflict=prior.some(x=>x.state==='Not vulnerable under tested conditions');findings.push({...f,id:id+':'+f.script,confidence:conflict?'Conflicting observations':'Scanner-supported',businessImpact:'Not established',contradictory:conflict});}
 const stale=p.observations.every(o=>Date.now()-Date.parse(o.at)>30*86400000);if(stale)state='Needs corroboration';
 if(!a.inScope)state='Blocked by scope or authorization';if(rule.intensity==='standard'&&e.intensity==='low'&&!done)state='Blocked by testing intensity';
 tasks.push({id,host:a.ip,port:p.port,protocol:p.protocol,phase:5,type,title:rule.title,state,why:rule.why,unknown:rule.unknown,next:rule.next,evidence:p.observations.map(x=>x.file),expected:'Nmap XML',results:latestByScript,stale});
 }
 }
 for(const f of e.evidence.filter(x=>x.result?.proof)){const p=f.result.proof,task=tasks.find(t=>t.id===p.investigationId&&t.host===p.host&&t.port===p.port);if(!task){issues.push({evidence:f.id,message:'Proof binding does not match an observed host/port investigation.'});continue;}const t=p.transcript;let outcome='Inconclusive',meaning='No supported positive or explicit negative marker was found.';
 if(p.stage==='attempt'){if(/(?:Meterpreter|Command shell) session \d+ opened/i.test(t)){outcome='Session established';meaning='Session creation is reported; identity, privileges and cleanup remain unverified.';}else if(/Anonymous FTP login allowed.*230|^< 230[ -]/m.test(t)){outcome='Controlled access demonstrated';meaning='Anonymous FTP authentication succeeded. File contents and write access were not tested.';}else if(/no session was created|Exploit failed|^< 530|Login denied/i.test(t)){outcome='Attempt failed';meaning='The log explicitly reports no session or an authentication rejection.';}}
 if(p.stage==='identity'&&/^uid=\d+\([^\n]+\).*gid=\d+/m.test(t)){outcome='Identity observed';meaning='Unix identity is present in the bound transcript. This alone does not prove how access was obtained.';}
 if(p.stage==='identity'&&/^[A-Za-z0-9_.-]+\\[A-Za-z0-9_.$-]+\s*$/m.test(t)){outcome='Identity observed';meaning='Windows identity is present. Privilege escalation is not established.';}
 if(p.stage==='cleanup'&&/session \d+ (?:closed|terminated)|^221[ -]|^< 221[ -]/im.test(t)){outcome='Session closure observed';meaning='Connection closure is evidenced; host restoration and artifact removal are not independently verified.';}
 proofs.push({...p,evidence:f.id,outcome,meaning,authorized:!!e.exploitation&&allowed(p.host,e)});
 }
 const list=[...assets.values()];return {assets:list,tasks,findings,checks,proofs,issues,next:tasks.find(t=>['Awaiting evidence','Inconclusive','Needs corroboration'].includes(t.state)),phases:[e.consent?'Recorded':'Not started',e.evidence.length?'Evidence imported':'Awaiting collection',list.length?`${list.length} assets`:'Awaiting evidence',list.some(x=>x.ports.length)?`${list.reduce((n,a)=>n+a.ports.length,0)} ports`:'Awaiting evidence',tasks.length?`${tasks.filter(t=>t.state==='Test completed').length}/${tasks.length} checks complete`:'Awaiting services',proofs.length?`${proofs.length} proof records`:e.exploitation?'No proof recorded':'Not authorized',e.evidence.length?'Report available':'Empty assessment']};
}
