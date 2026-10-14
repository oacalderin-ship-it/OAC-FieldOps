# OAC FieldOps — Security model

**Design:** GitHub Pages/static, client-only, no dependencies, no server/API access.

## Protections implemented
- AES-256-GCM authenticated encryption for saved workspace and backups, key derived by PBKDF2-SHA256 (310,000 iterations) with a random salt.
- SHA-256 file hashing of locally imported evidence (the source file is not saved in the vault).
- Strict CSP: no inline JS, no external scripts, no external images, no network `connect-src`.
- Target-scoped copying of commands: only authorized IPv4 addresses within declared CIDR.
- No credentials, remote database, telemetry, trackers or cloud synchronization.

## Limits
- Users or malware controlling the unlocked browser can modify findings. This is **not tamper-proof custody, non-repudiation, or server-side authorization**.
- Any changes to the site's JS/CSS by a compromised GitHub maintainer can affect visitors. Protect GitHub account and branch.
- GitHub Pages is publicly accessible, including cases where the source repo is private.
- `username.github.io` repos share a browser origin. Encryption mitigates at-rest reading by unrelated same-origin pages, but dedicated domains are preferred for high-sensitivity work.
- Exported report HTML/Markdown/PDF is plaintext; treat it as confidential.
- Without original passphrase and a saved encrypted backup, a lost vault is not recoverable.
- This application cannot directly SSH, execute a Shark Jack payload, run Nmap/Kali, or grant authorization for testing.

For professional evidence integrity, use independently audited, access-controlled, signed, append-only evidence storage. Keep actual client materials and vault backups out of public GitHub repositories.
