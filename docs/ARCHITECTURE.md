# Architecture and evidence contract

## Workspace and encryption

Workspace schema 1 contains `engagements[]`. Each engagement records scope, exclusions, consent timestamp, proof permission, intensity, date window, evidence and copied-command history. The browser persistence adapter stores only an encryption envelope in IndexedDB database `oac-fieldops-v11`, store `vault`, key `current`.

The envelope contains a random 16-byte salt, PBKDF2-SHA256 iteration count 600000, random 12-byte IV, schema version and AES-GCM ciphertext. Authentication uses fixed additional data `OAC-FieldOps:1`. Every save uses a fresh IV. Unsupported encryption or workspace versions are rejected rather than silently migrated. Future migrations must decrypt, validate, transform and resave with a new schema explicitly.

Writes are serialized in the application. An IndexedDB transaction checks the previous ciphertext before ordinary saves to detect another tab’s changes. On a conflict, export the in-memory backup and reload instead of silently overwriting. Restore is an explicit replacement operation. JavaScript cannot promise physical zeroization of garbage-collected memory; locking releases application references and clears visible raw evidence/dialog contents.

## Evidence

Each evidence record includes UUID, original path/name, byte length, SHA-256, original base64 bytes, import time, parser version and result/error. Base64 lives inside the encrypted workspace. SHA-256 is deduplication and integrity provenance, not a timestamping/signature service. An imported file’s claimed scan time or transcript cannot be independently authenticated.

Parser output contains `hosts[]`, per-host `ports[]`, script output, scan completion and optional scan timestamp/command. A port is keyed by `(IPv4, transport, port number)` within one engagement. Script observations remain linked to file ID and endpoint. Host-level SMB scripts are only associated with a port when the Nmap command records a single matching `-p` target; ambiguous host-level evidence remains in the raw parsed record without being promoted to a per-port finding.

ZIP input is decoded in memory, never extracted to the filesystem. Central-directory entry count, declared size, path, compression method and expansion ratio are checked before decompression; actual output length and CRC32 are checked afterward. Local and central filenames must match. Limits: 8 MiB per evidence file; 32 MiB evidence per engagement and interactive workspace import; 200 files per batch/archive; 200:1 maximum expansion. Stored and deflate entries are supported; encrypted ZIP, ZIP64 and multi-disk archives are rejected. Unknown files remain retained with corrective guidance where they fit the size budget.

## Decision engine

The engine derives an inventory and task list from evidence on each render. Latest timestamped endpoint observations determine current port state; historical observations remain available. Imported timestamps are untrusted provenance, so older/future misleading source clocks are a known limitation. Observations older than 30 days trigger corroboration.

Tasks are generated only from approved scope or actual service evidence. For each service family, a rule supplies purpose, uncertainty, allowed NSE scripts, expected interpretation and intensity. Successfully returned required scripts resolve that rule’s task. Missing or failed scripts are never negative vulnerability results. Completed tasks are excluded from the recommended next action; explicit retesting is available after approved changes.

Conclusions distinguish observation, potential weakness, verified configuration, negative under tested conditions and inconclusive. No inferred CVE catalog, automatic exploitability model or confidence percentage exists. Technical severities are qualitative; business impact remains unknown unless separate evidence establishes it. A negative result for one script never becomes a claim of general security.

## Proof binding

Raw console logs may lack reliable target context. The proof import form records the observed investigation and evidence stage, keeps the original bytes, and creates a contextual JSON record. Pattern interpretation distinguishes explicit failure, reported session establishment, identity output and session closure. It does not infer privilege escalation from the existence of a session, and it does not equate session closure with complete host restoration.

Only a bounded anonymous FTP proof command is automatically generated in this release. It requires anonymous-access evidence, valid scope/window and explicit proof permission. Metasploit research is taught, but the application does not choose modules or manufacture exploit commands from fingerprints.

## UI and exports

The UI uses escaped text for all imported data. Raw HTML evidence is never executed. No eval or dynamic function execution is used. The static page declares a CSP that disallows remote connections and object embedding. Reports escape names, log content and other untrusted fields before generating HTML. Plaintext exports are deliberate user actions and contain private assessment information.

The report distinguishes copied/prepared commands from scanner-recorded execution commands. The copied-command history retains the latest 1,000 entries. HTML and Markdown are generated from the same evidence engine; Markdown is a compact textual report rather than the full visual HTML layout. Browser printing is the PDF path.
