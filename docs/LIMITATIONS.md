# Release limitations and remaining acceptance gates

**This is v11.0.0-rc.1, not a claim that every item in the master specification is complete.** The application code and engine tests are delivered. The following limits remain material.

## Verification not performed here

- No supported browser-control tool was available in the managed build environment. The Sites workflow explicitly disallows substituting an improvised browser-control path in that environment. Consequently the delivered browser acceptance suite has **not been executed**, and desktop/mobile layout, IndexedDB interactions, copy buttons, dialog behavior, download behavior and PDF pagination have **not been visually or end-to-end verified**.
- Windows PowerShell was unavailable. Windows commands have source-level assertions, but no PowerShell parser/runtime test or real Windows OpenSSH transfer was run.
- No physical Shark Jack Display, firmware menu or real loot directory was accessible. Firmware-specific button sequences and payload save behavior remain unverified. The guide deliberately identifies functional categories, not a fabricated list of installed payloads.
- Kali transfer commands were syntax-checked and executed with mocked SSH/SCP success and empty-output scenarios. That is not a live device transfer test.
- Nmap protocol commands were generated and inspected; no real network was scanned, and none of the fixtures prove a real vulnerability.
- GitHub authentication/write access was not used. No repository was modified and no deployment occurred.

These are release gates in `ACCEPTANCE.md`, not completed tests. The nonnegotiable browser end-to-end and live transfer portions of the original specification remain open.

## Functional boundaries

- Scope enforcement currently supports literal IPv4 and IPv4 CIDR only. Hostnames and IPv6 are rejected rather than resolved without trustworthy authorization.
- There is no live CVE database, current vendor advisory matching, comprehensive web application scanner, authenticated configuration review or complete protocol/vulnerability taxonomy.
- Automatic positive configuration rules are intentionally narrow: obsolete TLS, legacy SMB1; optional SMB signing, anonymous FTP and legacy SSH algorithms produce contextual concerns. HTTP/DNS/RDP/database/RPC checks mostly establish inventory and verification context. They do not fabricate CVE applicability.
- PostgreSQL, Redis and other unrecognized database services use the unknown-service path. Dedicated database workflows cover MySQL and SQL Server.
- DNS recursion from outside the authorized network, public exposure and external attack feasibility are not established by internal evidence. DNS fingerprints do not prove software installation on the target router.
- Certificates are recorded; hostname/SNI validation, trust-chain evaluation and expiry-specific rules are not implemented.
- Metasploit module matching and exploit preparation are not automated. There is a lab research walkthrough, target-bound transcript analysis and a bounded FTP access proof workflow. Unknown exploit outputs stay inconclusive. This does not meet the full breadth of the requested automated exploitation instructor.
- Identity markers show reported identity, not independently authenticated privilege escalation. Session closure is not proof that snapshots were restored or all artifacts removed.
- No terminal execution or network scanning happens in the browser. Users run commands locally and import results.
- Generic arbitrary PowerShell tables, all Kali tool logs and all scanner HTML/JSON formats are not parsed. Supported schemas are listed in `FORMATS.md`; unsupported bytes are retained with an explicit limitation.
- The investigation graph supports awaiting evidence, completed, inconclusive, corroboration and scope/intensity blocking. It does not implement a separate durable analyst case-management lifecycle for every requested status such as remediation-pending/closed, nor a formal remediation assignment workflow.
- Latest evidence controls current conclusions; historical outcomes remain in the report. Conflicting evidence is not resolved by a statistical model. Untrusted clocks and mixed scanner vantage points can require operator context.
- Payload categories do not have an independent completion ledger; phase 02 shows imported-evidence status, not an asserted record that every hardware payload ran.
- Report HTML contains the detailed report. Markdown is a compact textual alternative. PDF uses browser Print / Save PDF; exact pagination is pending browser inspection.
- No v10 workspace migration is included. Keep the prior application and backup format until raw evidence has been safely reimported.

## Storage and recovery limits

- Encrypted storage is browser/profile/origin specific. Changing origin or browser profile requires backup/restore. Incognito/private browsing may discard it.
- Passphrase recovery is impossible. The app can only restore a backup with its original passphrase.
- Retention period is recorded but not automatically enforced. Delete/reset manually after backup according to the engagement’s retention agreement.
- ZIP: stored/deflate only, 200 entries, no encrypted or ZIP64 archives. Some browsers may lack `DecompressionStream('deflate-raw')`; extract locally and import a folder instead.
- Imports are capped at 8 MiB/file and 32 MiB raw evidence through the interactive workspace importer. Each save encrypts a whole workspace snapshot. Very large vaults and low-memory devices have not been profiled. Proof transcript import is separately capped at 2 MiB and adds a bound copy; keep headroom in large workspaces.
- Backup restore rejects unsupported formats and malformed core record structures. It is not a general-purpose repair tool for corrupt or maliciously crafted backups.
- Multiple tabs are discouraged. Ordinary saves detect changed stored ciphertext and refuse stale overwrites; this behavior still needs browser acceptance testing.
- Lock releases references and clears the rendered workspace. It does not promise secure physical erasure of browser memory.
- A malicious future website update or browser extension could access data while unlocked. Client-side encryption is not full website access control.

## Transfer limits

- Legacy SCP requires a client that supports `-O`, a device SCP server and valid credentials. Host-key verification is not disabled.
- The wildcard path omits hidden files. The archive method includes them, but requires device and local tar support and leaves a unique temporary archive on the device. Remove that temporary archive after verification if required by the retention agreement.
- Each transfer reuses the chosen base directory by creating a unique child directory. Flat merging directly into an existing evidence folder is intentionally not performed because it could overwrite raw files.
- File listings and exit status verify that output exists, not byte-for-byte source/destination integrity. For evidentiary chain of custody, add an independently verified device hash manifest; the app hashes the imported destination bytes.
- Archive fallback verifies the archive listing but asks you to extract it into a fresh directory yourself. It does not claim that an archive download automatically imported its contents.
