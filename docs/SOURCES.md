# Technical reference sources

Consulted on 2026-10-19. These references inform command/guidance design; they are not evidence that commands were executed on a device. The application does not fetch them automatically or transmit scan data to them.

- Official Hak5 Shark Jack Display payload repository: https://github.com/hak5/sharkjackdisplay-payloads
- Hak5 Shark Jack basics (legacy family documentation; not proof of Display-specific menu sequences): https://olddocs.hak5.org/shark-jack/getting-started/shark-jack-basics
- Nmap script reference: https://nmap.org/nsedoc/scripts/
- TLS cipher enumeration: https://nmap.org/nsedoc/scripts/ssl-enum-ciphers.html
- SMB2 signing negotiation: https://nmap.org/nsedoc/scripts/smb2-security-mode.html
- DNS recursion interpretation: https://nmap.org/nsedoc/scripts/dns-recursion.html
- RDP negotiation enumeration: https://nmap.org/nsedoc/scripts/rdp-enum-encryption.html

The TLS reference describes repeated handshakes to enumerate accepted ciphers, which is why the application requires standard intensity for that check. The DNS reference explains that recursion can be expected on internal resolvers; the engine therefore does not automatically label internal recursion a vulnerability. Hak5’s payload repository describes explicit NETMODE selection; installed payload behavior still needs device-side verification.
