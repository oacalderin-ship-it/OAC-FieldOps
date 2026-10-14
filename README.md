# OAC FieldOps — Shark Jack Display + Kali Guided Pentest Companion

A no-dependency, GitHub-Pages-ready pentest field notebook. Six guided phases, conditional next-step recommendations based on discovered ports, Nmap XML/text imports, editable findings, exploit approval tracking, post-test review, and exportable client reports. Built in dark charcoal with orange OAC styling.

## Publish to GitHub Pages (beginner steps)

1. Create a NEW GitHub repository: `OAC-FieldOps`. A public repository works with GitHub Free.
2. Upload `index.html`, `styles.css`, `app.js`, `oac-icon.svg`, `.nojekyll`, `.gitignore`, `README.md`, `SECURITY.md`, `sample-lab-scan.xml` and the `.github/workflows` + `tests` folders **into the repository root**, then commit.
3. Go to your repository **Settings → Pages → Build and deployment → Deploy from a branch**. Choose `main` and `/(root)`, then **Save**.
4. Open the website URL displayed in Pages settings once GitHub publishes it; normally `https://YOUR-USERNAME.github.io/OAC-FieldOps/`.
5. Choose a unique long passphrase (the app enforces a 10-character minimum; 16+ random characters is better). **Immediately export an encrypted backup**.
6. Phase 01: replace the default practice-lab CIDR `10.10.20.0/24` with YOUR actual permitted network; record written permission and scope.
7. Log built-in Shark Jack Display connection/reachability/discovery payloads, and transfer any real loot to your laptop via its supported management interface.
8. Phase 02: import actual Nmap XML (`-oX`) or plain text (`-oN`) scan output, or use `sample-lab-scan.xml` as an *invented training demo* (NOT real evidence).
9. Phase 03: choose a discovered host. The application explains next tools and lets you copy narrowly scoped Kali commands.
10. Phases 04–06: document approved tests and cleanup; edit findings; save summary; print/save PDF or download a standalone HTML/Markdown report.

## What the app does NOT do

GitHub Pages cannot execute local shell commands, SSH to your Shark Jack, run Kali tools, auto-exploit targets, guarantee legal authorization or provide tamper-proof evidentiary custody. It is an **interactive guide and encrypted notebook**, not a scanner or a backend-enabled pentest platform. Never upload client loot, client reports, secrets or vault backups to a public GitHub repository.

## Tools and imports

`sample-lab-scan.xml` is a fictional example for checking the import workflow. Nmap's XML format is recommended for actual findings:

```bash
ip -br addr
ip route
sudo nmap -sn -n 10.10.20.0/24                    # Replace with YOUR authorized network
sudo nmap -sV --version-light -oX baseline.xml 10.10.20.10  # Replace with YOUR authorized host
less baseline.xml
```

Use the **Shark Jack Display** payload repository (not the incompatible original-model library) when adding vetted payloads: https://github.com/hak5/sharkjackdisplay-payloads . On your Shark Jack, a “completed” message does not prove it wrote any loot; check the file location with `pwd`, `ls -lah`, `find /root/loot -type f` when connected by SSH. Store source evidence separately and securely.

## Main features

- 6 phases, 24 checkpoint tasks; progress and dynamic next-action cards
- Multiple assessments, configurable scope and rules of engagement
- Connection/Ping/Discovery/Nmap Shark Jack payload guide and run log
- Nmap XML (`-oX`), standard output (`-oN`), grepable (`-oG`) and TXT parser
- Deduplication of hosts/ports and file SHA-256 manifest
- Out-of-scope detection; copyable commands gated by user authorization and exact IPv4/CIDR check
- Conditional port mappings for web, TLS, SSH, SMB, RDP, DNS, Active Directory, databases, SNMP
- Finding severity, suspected/validated/disproved status, proof and remediation
- Explicit exploitation approval, controlled test journal, impact and cleanup notes
- Professional print-to-PDF and HTML/Markdown report exports
- AES-256-GCM encrypted local vault, encrypted JSON backup/restore, no cloud data transmission

## Security & privacy

LocalStorage data and exported JSON backups contain *authenticated ciphertext*, not plaintext. A passphrase-derived encryption key stays in memory while the vault is unlocked. Encryption uses AES-256-GCM and PBKDF2-SHA256 with a random salt and 310,000 derivation rounds. There is **no password recovery**. Clearing site data without a backup will lose your records. Reports intentionally exported as HTML/Markdown/PDF are **plaintext**.

You cannot make a public GitHub Pages app fully tamper-proof: source can be copied, and anyone controlling your unlocked browser or repository can alter data/code. Defend your canonical GitHub repository with passkeys/2FA, restricted collaborators, and branch protection/rulesets with PR reviews where your plan allows it. A bundled GitHub Actions workflow runs syntax checks and basic security/regression tests on pushes and pull requests; optionally require `check-fieldops` as a status check. GitHub Pages sites are publicly visible. Use a dedicated domain for stronger origin separation if processing confidential client engagements. For legally binding proof or immutable logs, use reviewed server-side evidence custody and signatures.

The CSP prevents third-party scripts and outgoing API requests. The app makes **no** outside network calls. Its recommendations are hypotheses only: verify vendor advisories and application configuration; an open port does not automatically mean a vulnerability.

See `SECURITY.md` for details. Use only on systems you own or are explicitly authorized to assess.
