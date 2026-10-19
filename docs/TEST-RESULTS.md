# Executed test results — 2026-10-19

Release: 11.0.0-rc.1

## Actual execution

- **43 automated tests passed; 0 failed, 0 skipped.**
- **16 JavaScript and test files passed `node --check`.**
- All relative imports from application modules resolved to included files.
- The full TAP output is retained in `TEST-OUTPUT.tap`.
- A fictional HTML report was generated from fixtures and is included as `EXAMPLE-REPORT.html`. Its content generation was exercised, but its browser rendering and PDF pagination were not visually inspected.

Commands executed from the build workspace were equivalent to:

```bash
node --test --test-reporter=tap tests/*.test.mjs
node --check js/app.js
# node --check was also run individually for every other JS/test file.
```

## Coverage

| Scenario | Executed coverage | Limit |
|---|---|---|
| A — router DNS | Cloudflare-style fingerprint creates DNS task, no firmware/CVE finding | Synthetic input |
| B — router HTTP | lighttpd banner creates HTTP task, no automatic CVE | Synthetic input |
| C — TLS | Positive obsolete TLS, scoped negative, explicit errors and missing output | No live TLS server probe |
| D — RPC / Hyper-V | Separate RPC/RDP tasks, no exploit inference | Synthetic input |
| E — no vulnerability | No fabricated finding; report warns against general security claim | Report rendering uninspected |
| F — marker mismatch | Successful XML remains complete despite incomplete companion text | Engine-level |
| G — loot extraction | Windows command assertions; Bash syntax; mocked SSH/SCP transfer succeeds with a file and fails on empty result | No Windows runtime or real device |
| H — Nmap PATH | Full-path Windows fallback, call operator, exit-status checks | Source assertions only |
| I — incomplete scan | Well-formed incomplete evidence cannot confirm vulnerability; truncated XML retained with error | Engine-level |
| J — vulnerable lab | SMB1 and TLS configuration evidence produce scoped findings | Fictional lab evidence |
| K — controlled proof | Explicit failure, reported session, identity and closure distinct; FTP permission gate | Marker interpretation, not real exploit execution |
| L — isolation | Host/port separation, mismatched proof rejection, ambiguous SMB hostscript exclusion | Engine-level |
| M — recovery | Create, encrypt, serialize, decrypt, restore, wrong passphrase, tamper detection and unsupported version | IndexedDB and browser reload untested |
| N — empty assessment | No invented inventory; honest empty report | Engine-level |
| O — bulk import | 100 identical files deduplicated, original bytes retained, size limits | Browser large-batch performance unprofiled |

Additional executed checks cover scope boundaries and exclusions, malformed IP/CIDR and injection strings, invalid/expired dates, intensity restrictions, valid stored/deflated ZIP, unsafe paths, mismatched ZIP metadata, corrupt archives, escaping in generated reports, text/CSV/JSON/HTML/ping format recognition, invalid command ports/types, archive fallback command generation, and completed-task suppression.

The full engine journey test creates an encrypted workspace, records a lab scope, imports discovery/service/verification fixtures, generates a justified command, interprets bounded proof, produces a report, serializes an encrypted backup and restores the same evidence/conclusions.

## Defects found and corrected during this build

1. ZIP local filename metadata could disagree with the central directory. Rejected after adding consistency checks; regression now passes.
2. SMB host-level scripts could be attributed to a port without explicit provenance. Restricted to a recorded single matching port in the scan command; ambiguous evidence remains unpromoted.
3. Invalid start dates could bypass date comparisons. Added finite-date validation and regression coverage.

## Explicitly not executed

- `tests/e2e.browser.mjs`: provided, but not run.
- Browser visual/interaction checks, screenshots and PDF printing.
- Windows PowerShell AST parsing or command execution.
- Real Windows/Kali-to-Shark-Jack transfers and firmware menu/payload inspection.
- Real Nmap network scans or controlled exploitation.
- GitHub push, Pages deployment or hosted-site acceptance.
- Independent cryptographic/security audit, accessibility audit or large-vault load test.

No production-readiness claim follows from the passing engine tests. Complete `ACCEPTANCE.md` and address relevant functional limitations before promotion.
