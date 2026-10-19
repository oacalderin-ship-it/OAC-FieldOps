# OAC FieldOps 11.0.0-rc.1

An encrypted, browser-local security assessment workbench for **oacalderin-ship-it/OAC-FieldOps**. This is a ground-up rebuild. It does not modify or deploy Pentest-Safebox.

**Release status: functional release candidate; not certified production-ready.** The engine test suite passes. Automated browser acceptance, rendered layout/PDF inspection, real Windows PowerShell execution and physical Shark Jack transfers have not been performed in the build environment. Review `docs/LIMITATIONS.md` and `docs/REQUIREMENTS.md` before replacing a working deployment.

## What is implemented

- Seven persistent workflow phases, guided/advanced views and Windows/Kali command selection.
- Multiple engagements, authorization record and attachment, IPv4 CIDR/exclusion checks and testing-window enforcement.
- AES-256-GCM encryption of locally persisted workspace data, PBKDF2-SHA256 with 600,000 iterations, fresh random nonces, lock/unlock, encrypted backup, verified restore and confirmed reset.
- Shark Jack orientation, six logical payload categories, management-IP input, read-only device inspection and a transfer wizard with unique collection folders.
- Windows Documents redirection support, legacy SCP, real exit-code/nonempty-file checks and tar archive fallback.
- File/folder/drop/ZIP evidence import; SHA-256 deduplication; original-byte retention; versioned parser provenance.
- Nmap XML, normal and grepable output, IP lists, ping logs, narrow inventory CSV/JSON and HTML with preformatted Nmap logs.
- Host/port inventory and focused DNS, HTTP, TLS, SMB, RDP/Hyper-V, SSH, FTP, SMTP, MySQL, SQL Server, RPC and unknown-service checks.
- Evidence-based configuration findings and negative/inconclusive outcomes. No CVE is inferred from a banner.
- Bounded authorized FTP access proof; contextual import and interpretation of access/session, identity and cleanup transcripts; a Metasploit lab research walkthrough.
- Automatic report with inventory, findings, remediation, unresolved checks, proof outcomes, timeline, copied-command history and evidence manifest.
- Standalone HTML, Markdown, plaintext assessment JSON, encrypted backup, evidence checklist and browser Print / Save PDF.
- Troubleshooting search, per-host timeline, severity/status search and original-file downloads.

## Start here

1. Read [deployment instructions](docs/DEPLOYMENT.md).
2. Open the deployed application over HTTPS, or serve this directory locally. Double-clicking `index.html` is not supported because ES modules and Web Crypto require a suitable web origin.
3. Create a unique passphrase of at least 14 characters. Store it separately from encrypted backups.
4. Create an engagement with actual authorized scope and dates.
5. Follow Phase 02 or import existing Nmap evidence.
6. Run the next command on the indicated computer, then import its output.
7. Review Phase 07 and export a backup after each session.

For a fictional walkthrough, create a separate engagement authorizing `10.10.10.0/24` during the current date, choose standard intensity and import fixtures 01–06 in order. These are synthetic test records, never evidence of a real assessment. Do not scan those addresses merely because they appear in a fixture.

## Architecture

No runtime dependencies, external fonts, CDN scripts, API keys, cloud database or remote analysis service. Static ES modules run directly on GitHub Pages.

| File | Responsibility |
|---|---|
| `js/app.js` | UI, navigation, command-copy history and interaction orchestration |
| `js/scope.js` | IPv4 parsing, CIDR range checks, exclusions and consent/window gating |
| `js/crypto.js`, `js/storage.js` | Encryption envelope and IndexedDB persistence |
| `js/evidence.js`, `js/zip.js` | Hashing, byte retention, import limits and bounded ZIP decoding |
| `js/xml.js`, `js/parsers.js` | Non-executing XML reader and format-specific parsing |
| `js/rules.js`, `js/engine.js` | Protocol rules, inventory, evidence association and decisions |
| `js/commands.js` | Validated platform-specific scan and transfer commands |
| `js/guides.js` | Device workflow and diagnostic knowledge base |
| `js/report.js` | Escaped report content and export generation |

## Verification

Node.js 22+ is sufficient for core tests; no npm install is needed:

```bash
npm test
npm run check
```

The included browser test is a separate acceptance gate. On a machine where you can install and run Chromium:

```bash
npm install --no-save playwright
npx playwright install chromium
node tests/e2e.browser.mjs
```

It launches a local test-only server, exercises the UI, saves screenshots and a fictional backup under ignored `test-artifacts/`, and closes its browser/server afterward. **Providing this suite is not a claim that it has passed.** See `docs/TEST-RESULTS.md` for what was actually executed.

## Data safety

Evidence is encrypted at rest in this browser’s IndexedDB, not uploaded. The page itself remains publicly accessible. While unlocked, data exists in JavaScript memory; encryption does not protect an unlocked browser from malicious extensions, compromised hosting or a compromised machine. There is no hardcoded master password and no passphrase recovery.

Never commit real evidence, reports, backups, authorization documents or credentials to the public repository. Plaintext JSON includes original evidence as base64, which is not encryption. Keep deployment source and private assessment data in different folders.
