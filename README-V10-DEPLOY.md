# OAC FieldOps v10.0 — GitHub Pages deployment

**Repository: `OAC-FieldOps` only.** This is **NOT** a change for your separate `Pentest-Safebox` repository.

## What v10 restores / adds

- Passphrase screen and an AES-256-GCM encrypted local assessment vault (PBKDF2-SHA256, 310,000 iterations); lock button, encrypted backup/restore, confirmation-protected reset.
- 01 scope + consent record, 02 ordered Shark Jack payload guide and PowerShell/Kali SSH/SCP loot transfer.
- 03 host verification from imported loot, 04 protocol-specific commands driven by services, 05 evidence-driven weakness validation, 06 operator-supplied proof/impact/cleanup log interpretation, 07 automatic report.
- Multiple `.xml`, `.nmap`, `.gnmap`, `.txt`, `.log`, `.html`, `.csv`, and supported `.zip` evidence uploads; imported files are hashed and linked to known host/port where possible.
- An optional v9 local-data import. Your old v9 data is not modified or deleted by this upgrade.

## Safest GitHub update (about 5 minutes)

1. Open your **OAC-FieldOps** repository. First click **Code → Download ZIP** to preserve a rollback copy of the live v9 repository. Also export your old v9 assessment backup before changing any files.
2. Download `OAC-FieldOps-v10-GitHub-Ready.zip` from the ChatGPT response, and extract it on your Windows computer.
3. On the GitHub **OAC-FieldOps** repository page, press the `.` key to open the VS Code-style web editor (github.dev). Alternatively, use **Add file → Upload files** in the repository's root directory.
4. Move the **seven web files** listed below from the extracted package into the **repository root** (beside your existing `engagement.html`):
   - `index.html` **replace existing**
   - `v9.css` **replace existing** (shared charcoal theme)
   - `fieldops-core.js` **add / replace**
   - `fieldops-v10-engine.js` **add**
   - `fieldops-v10.js` **add**
   - `fieldops-v10.css` **add**
   - `favicon.svg` **add / replace**
5. **Do not delete** `engagement.html` or any existing v9 or prior files. They can stay in the repository; v10's `index.html` does not load the old v9 scripts.
6. Click **Source Control** in github.dev, type commit message `Release OAC FieldOps v10 guided workflow`, choose **Commit & Push**. For Upload files, choose **Commit changes**.
7. Wait for GitHub Pages to publish (check **Actions** or **Settings → Pages**, main branch, root folder). Visit your existing **OAC-FieldOps** Pages site and hard refresh (`Ctrl + Shift + R`). Look for `ENGINE v10.0` and the passphrase screen.

**IMPORTANT:** Never upload scan logs, client documents, test results, credentials, or encrypted vault backups to your public GitHub repository. Keep the project as application source only.

## Your first run

1. Create the v10 encrypted vault. The v10 passphrase may be different from the old v8/v9 passphrase, and is **not recoverable**.
2. In **01 Scope & authorization**, enter the assessment name, system owner, exact IP/CIDR targets, the authorization/consent reference and confirm permission. For a client's network obtain real signed approval first; a checkbox is not legally sufficient.
3. In **02 Shark Jack & loot**, perform built-in payloads **in the order displayed**: Simple Connection Test → Advanced Ping Test → Host Discovery → Port Scan → Service Scan. The exact names vary by Shark Jack Display firmware/library. Avoid the old broken custom payloads; use what is actually available on your device.
4. Put the Shark Jack into its documented management/arming mode. Enter its **actual management IP** (the commonly cited `172.16.24.1` may not match your model). Choose **PowerShell** or **Kali Linux**. Copy and run **Transfer step 1** to confirm `/root/loot` filenames, then **Transfer step 2** to copy the files to your PC. The commands use `scp -O` for firmware that doesn't support SFTP.
5. In the drop area, select the original XML/text files. FieldOps will parse discovered hosts, IPs, ports, protocol fingerprints and supported NSE script output. It moves you toward the next relevant phase automatically.
6. **03** follow generated Nmap discovery/version-check commands, upload results. **04** follow protocol-specific Nmap commands for DNS/TLS/HTTP/SMB/RDP/SSH/etc., upload results. **05** review corroboration/research tasks for detected indicators, upload outputs. Never make up an outcome when a scan is inconclusive.
7. **06** if controlled proof was **separately approved** and an actual matched, authorized test was performed, choose the observed in-scope target and import its console log. The tool can identify some session/failure/impact/cleanup markers but will not pretend that a log independently proves impact.
8. **07** export the generated HTML report, or **Print → Save as PDF**. Save an **encrypted vault backup** as well; keep the original scanner files separately.

## Scanner output interpretation

- **Open port** = service reachable from the scanner's position, **not** vulnerability.
- **Version/product banner** = review candidate, **not** automatically a CVE.
- **Supported NSE findings** (e.g., SMBv1/signing settings or offered legacy TLS) = observed configuration indicators, still requiring context and verification.
- **SearchSploit/Metasploit `search` hits** = research references, **not** proof the target is affected. `info` and `show options` are for verifying module applicability.
- **Reported exploitation session** = operator-supplied log claims a session, **not** independent proof of target identity, impact, or cleanup.
- The app never runs Nmap, Metasploit, Shark Jack payloads, or active exploitation by itself. GitHub Pages is a static website. It supplies commands and interprets supported uploaded logs locally.

## Older v9 assessment

- v10 creates a **separate encrypted vault** at `oac.fieldops.v10.encrypted`; it does not erase v9's `oac.fieldops.v9` records or its stored raw files.
- Under **Evidence inbox → Import existing v9 assessment**, you can migrate supported same-browser records. Reconfirm scope and consent because earlier checkbox values are not reused as active authorization.
- If v9 raw evidence is unavailable in the browser or cannot be retained, **reimport the original files** for best coverage. Your original v9 data remains untouched.
- v10 local vault export is encrypted; don't confuse it with the older v9 parsed JSON export (which was not encrypted).
- This is browser-profile-local storage. A private/incognito tab or another PC will not share the same vault unless you restore an encrypted backup.

## Files and limitations

The package is fully static, has no third-party scripts or network API dependencies, and targets modern Chromium/Firefox on HTTPS. It stores small source-file extracts inside the encrypted vault subject to browser storage limits, so **retain your original loot independently**. ZIP import uses native browser decompression when available; if ZIP fails, extract on Windows/Kali and select individual XML/text files. No CVE feed, network execution agent, or generative model is included. Unsupported tools/outputs are retained as unverified evidence rather than automatically interpreted as vulnerabilities.

## Regression tests included

- `tests/v10-core.test.cjs` — `node tests/v10-core.test.cjs`
- `tests/browser-smoke.py` and `tests/workflow-regression.py` — browser interaction tests used during development with synthetic local browser storage/crypto stubs. **They are UI regression tests, not encryption/security audits.** A real deployed v10 site uses the browser's actual Web Crypto API.
- `tests/fixture-smb.xml` — entirely synthetic network data.
