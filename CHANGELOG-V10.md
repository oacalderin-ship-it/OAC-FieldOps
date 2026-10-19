# OAC FieldOps 10.0 changelog

### Returned guided features
- Restored vault creation, unlock, lock, encrypted local backups, password-protected data, reset confirmation.
- Added simplified Phase 01 ownership/scope/consent screen and clear approval gate.
- Added detailed Phase 02 ordered built-in Shark Jack payload guide, management-mode explanation, PowerShell and Kali SSH/SCP commands and file upload.
- Reintroduced context-specific PowerShell and Kali command blocks for Phases 03–05 (Windows Nmap explicit install path fallback).

### Analysis improvements
- Imported Shark Jack text/Nmap/XML/HTML summaries are turned into typed asset, service and evidence records.
- Phase 03 asks for version verification only when required by actual loot; Phase 04 selects NSE checks by detected service; Phase 05 creates verification and research leads for supported indicators.
- Retained automatic interpretation of SMBv1, SMB signing not required, legacy TLS, management-interface exposure review, banner/patch-status candidates.
- Source-to-host and source-to-port linkage when a valid IP/port can be recovered from Nmap records or file naming.
- Exploit research and supplemental TLS/HTTP logs are treated as unverified context, not proof of a CVE.
- Phase 06 accepts actual operator-supplied proof logs only with separate authorization; session, failure, cleanup and limited impact markers are labelled conservatively.
- Phase 07 creates a populated executive summary, inventory, evidence-linked findings, remediation, proof limitations, and SHA-256 manifest.

### Data safety
- New local AES-GCM encrypted v10 vault; old unencrypted v9 workspace unchanged unless the user separately deletes it.
- No public network requests, telemetry, vulnerable package dependencies, auto-exploit routines, hidden CVE claims, or changes to the separate Pentest-Safebox repository.

### Known limits
- Browser cannot operate the Shark Jack, Kali/Windows shells, or execute Metasploit directly.
- The application is deterministic/rule-based, not a live CVE feed or unrestricted language model.
- Source previews are capped by browser storage limits; preserve original logs outside the app.
