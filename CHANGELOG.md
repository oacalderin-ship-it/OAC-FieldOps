# Changelog

## 11.0.0-rc.1 — 2026-10-19

Ground-up rebuild from the supplied master specification. No previous repository source or encrypted data format was reused.

- Added modular scope, cryptography, persistence, evidence, parsing, ZIP, rule, investigation, command and report subsystems.
- Added the seven-phase charcoal/orange OAC interface, engagement management, evidence desk, task views, proof binding and generated report.
- Added device walkthrough and separate Windows/Kali transfer command generation with exit/nonempty checks.
- Added fictional fixtures and automated regression tests covering scenarios A–O at engine level.
- Added a runnable, unexecuted browser acceptance suite and explicit deployment/recovery instructions.
- Fixed ZIP local/central filename disagreement discovered during regression testing.
- Tightened SMB hostscript attribution to avoid assigning ambiguous host-level evidence to a specific port.
- Added invalid-date rejection, endpoint input validation and stale-tab write conflict detection.

Release remains a candidate: browser acceptance, rendered PDF/layout inspection, live Windows execution and physical device validation are open. See docs/LIMITATIONS.md for implemented breadth and remaining gaps.
