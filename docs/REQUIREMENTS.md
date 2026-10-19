# Requirements coverage and release decision

The supplied master prompt is retained as `docs/ORIGINAL-SPECIFICATION.md`. This matrix describes actual implementation, not an assertion of full completion.

| Requirement group | Implemented behavior | Status / remaining work |
|---|---|---|
| Separate OAC FieldOps project | Complete new static source; exact OAC-FieldOps deployment guide | Implemented; no repositories changed |
| Seven phases and beginner guidance | Sidebar, purpose/prerequisites, Windows/Kali commands, next task, revisiting without evidence deletion | Implemented; UI acceptance unrun |
| Encrypted password workspace | Creation, confirmation, unlock, lock, AES-GCM, PBKDF2, IndexedDB, backup, restore, reset | Crypto tests pass; browser persistence/UX unrun |
| Multiple engagements | Independent records and per-engagement evidence | Implemented; UI acceptance unrun |
| Simple authorization and scope | Owner, assessor, type, scopes/exclusions, dates, consent, proof permission, intensity, optional retention/contact, document attachment | IPv4 tested; hostname/IPv6 unsupported |
| Shark Jack orientation and payload sequence | Management IP, DHCP modes, terminal separation, six logical categories, results/save troubleshooting | Implemented guidance; exact firmware menus unverified |
| Reliable Windows loot copy | Actual Documents path, absolute custom base, unique child folder, legacy SCP, status/listing checks, tar fallback | Static assertions only; Windows execution/device validation open |
| Reliable Kali loot copy | Quoted paths, unique folder, exit/nonempty checks, tar fallback | Bash syntax and mocked execution pass; device validation open |
| Uploads and preservation | Multiple files, folder picker, drop, bounded ZIP, raw bytes, hashes, duplicate skip | Engine import tests pass; browser file controls unrun |
| Format breadth | Nmap XML/text/grepable, hosts, ping, defined CSV/JSON, Nmap-in-pre HTML, bound proof | Narrow implemented parsers; arbitrary logs unsupported |
| Inventory/provenance | Host/transport/port linkage, scan metadata, script output, original hash/file links, host timeline | Regression-tested; ambiguous SMB hostscript not assigned |
| Evidence-driven discovery | Imported hosts avoid mandatory repeat discovery; authorized range fallback | Engine tested |
| Service-specific checks | DNS, HTTP/TLS, SMB, RDP/Hyper-V, SSH, FTP, SMTP, MySQL/SQL Server, RPC, unknown | Implemented; live tool compatibility unverified |
| Vulnerability reasoning | Narrow positive/negative rules, scoped conclusions, partial/failed output, stale evidence flag | Regression-tested; no comprehensive CVE/vendor intelligence |
| No repeated completed checks | Completed required script sets excluded from recommended next action | Engine tested; explicit retest remains available |
| Full requested state machine | Derived task/outcome states | Partial; durable remediation/closure case workflow absent |
| Controlled proof | Permission gate, anonymous FTP procedure, bound attempt/identity/cleanup analysis, Metasploit teaching | Partial; no automatic Metasploit module selection or broad exploit procedures |
| Automatic report | Summary, scope, assets/services, findings, concerns, outcomes, risk, remediation, limitations, timeline, commands, hashes | Generated-content tests pass |
| Exports | HTML, Markdown, assessment JSON, encrypted backup, checklist, original bytes, browser print | Generation tested; actual browser download/print unrun |
| Premium visual UI | Charcoal/orange, OAC mark, desktop/sidebar, responsive CSS, accessible labels/focus states | Implemented source; rendering/screenshot inspection unavailable |
| Troubleshooting | Pattern knowledge base with cause, diagnostic command, correction and expected output | Implemented; device-specific guidance unverified |
| Security | No private outbound requests, scope gating, quoting, escaping, ZIP limits, no eval, encrypted raw evidence | Targeted regression tests; independent security review not performed |
| Scenario A–O | Meaningful engine tests across requested scenarios | Executed except real browser/device aspects of G/H/M/O |
| Main end-to-end browser test | Runnable Playwright acceptance suite | Provided but not executed; release gate remains open |
| Documentation and GitHub package | README, architecture/schema, formats, deployment, limits, acceptance, changelog, fixtures, tests, results | Delivered |
| Production-quality definition of done | Requires all mandatory behaviors and acceptance gates | **Not fully met; release candidate only** |

## Dependency/conflict decisions

1. GitHub Pages is static: command preparation and local evidence analysis are implemented; browser-triggered local scanning is not claimed.
2. “Automatically interpret everything” conflicts with unknown log formats and lack of authenticated context: supported structures are interpreted, unknown files retained with corrective guidance.
3. “Exact payload menu steps” conflicts with unspecified firmware and installed libraries: functional sequence is supplied without fabricating menu names.
4. “Confirm vulnerabilities from version banners” would be unreliable: banners create verification tasks; positive findings require supported evidence.
5. “Full production readiness” requires browser and real-tool testing unavailable here: the package is labeled a release candidate and open gates are explicit.
