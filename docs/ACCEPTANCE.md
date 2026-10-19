# Acceptance checklist before real assessments

Use a fictional or owned isolated lab. A checked item is only complete after actual execution and inspection. These gates have not been completed in the build environment.

## Browser and storage

- [ ] Run `node tests/e2e.browser.mjs` after installing Playwright/Chromium locally. Retain its result and inspect the generated desktop/mobile screenshots.
- [ ] Create a vault, confirm passphrase mismatch is rejected, create two engagements and verify switching does not mix their evidence.
- [ ] Reload, unlock, lock, attempt a wrong password and unlock again. Verify raw evidence is not visible while locked.
- [ ] Export an encrypted backup. Restore it in a separate browser profile and compare evidence file count and SHA-256 hashes.
- [ ] Attempt to restore a damaged backup; verify the existing workspace is preserved.
- [ ] Open two tabs, modify one, then save the stale one. Verify stale writes are blocked and the in-memory backup remains downloadable.
- [ ] Test a real quota/error condition without private data and verify a useful backup-first recovery message.
- [ ] Test reset only in the fictional profile; confirm that typing RESET is required.

## UI, import and report

- [ ] Import fixture files 01–06. Confirm two hosts, distinct endpoint tasks, an obsolete-TLS finding, anonymous-FTP concern and controlled FTP access observation.
- [ ] Import duplicate evidence and verify no extra independent evidence appears.
- [ ] Import the safe ZIP and the unsafe-path ZIP. The former imports; the latter rejects.
- [ ] Try drag/drop, file picker and folder picker where supported.
- [ ] Test keyboard navigation, contrast, 390-pixel mobile layout, long filenames and large XML previews.
- [ ] Copy commands and verify the clipboard contains no terminal prompt prefixes.
- [ ] Print the report to PDF. Inspect cover pagination, wrapped command blocks, repeated table headers, column widths and long hashes. Do not accept clipped content.
- [ ] Export HTML, Markdown and assessment JSON; verify content and raw-evidence preservation.

## Windows / Shark Jack Display

- [ ] Record actual device firmware, local OpenSSH version, known-host fingerprint and actual management IP.
- [ ] Confirm management/arming access on an isolated direct connection. Confirm DHCP client on the approved assessment LAN.
- [ ] Inspect installed payloads; record the actual names corresponding to the documented sequence and actual loot paths.
- [ ] Run the device’s connection, ping, discovery, port and version steps where installed. Note which payloads save files versus display-only results.
- [ ] On Windows 11 PowerShell, transfer from a known source to an existing empty base folder. Confirm the unique child folder, exit status and nonempty file listing.
- [ ] Repeat with OneDrive/redirected Documents and a path containing spaces. Check filenames and directory relationships.
- [ ] Use a wrong password once, then authenticate correctly. Confirm final success is distinguished from the earlier failed retry.
- [ ] Test a nonexistent source, empty source and interrupted transfer. No case should be reported as successful evidence collection merely because a folder exists.
- [ ] Test the tar fallback, inspect the archive listing, extract into a new directory and compare file counts. Remove the unique temporary device archive after verifying the retained copy.
- [ ] Import the actual transferred files and verify the inventory against their raw contents.

## Kali and protocol checks

- [ ] Repeat actual transfer tests from Kali, including an existing base directory and spaces in paths.
- [ ] Verify Nmap is available; test a Windows installation missing from PATH to confirm the full-path fallback.
- [ ] Run one scoped discovery, one service scan, and one relevant protocol check against your approved lab.
- [ ] Import complete and interrupted output. Positive configuration findings must require the positive markers; missing scripts must not become negative findings.
- [ ] Confirm low intensity blocks TLS cipher enumeration and expired/excluded scope blocks scan and proof commands.
- [ ] If using FTP proof, verify explicit permission, capture the actual verbose log, then import attempt and cleanup separately. Do not retrieve sensitive content.

Only after these pass, and after closing any functional gaps relevant to your engagements, should the release be promoted beyond candidate status.
