import {hash,b64} from './crypto.js';
import {parseEvidence,PARSER_VERSION} from './parsers.js';
export async function importBytes(name,bytes,engagement,kind='scan',remaining=Infinity){
 if(bytes.length>8*1024*1024)throw Error('File exceeds the 8 MiB limit. Split scans by host.');
 const sha256=await hash(bytes);if(engagement.evidence.some(x=>x.sha256===sha256))return {duplicate:true,name};
 if(bytes.length>remaining)throw Error('Workspace evidence limit is 32 MiB across engagements. Back up this vault and start a separate workspace for more data.');
 if(engagement.evidence.reduce((s,x)=>s+x.size,0)+bytes.length>32*1024*1024)throw Error('Engagement evidence limit is 32 MiB. Export a backup and create another engagement.');
 const e={id:crypto.randomUUID(),name,size:bytes.length,sha256,importedAt:new Date().toISOString(),parserVersion:PARSER_VERSION,raw:b64(bytes),kind};
 if(kind==='transcript'){e.result={format:'Bound transcript source',hosts:[],notes:['Original transcript retained; see its bound proof record for interpretation.']};e.status='retained';}else if(kind==='authorization'){e.result={format:'Authorization attachment',hosts:[],notes:['Recorded attachment; signature validity is not verified.']};}else try{e.result=parseEvidence(new TextDecoder('utf-8',{fatal:true}).decode(bytes));e.status='parsed';}catch(err){e.error=err.message;e.status='unsupported';}
 engagement.evidence.push(e);return e;
}
