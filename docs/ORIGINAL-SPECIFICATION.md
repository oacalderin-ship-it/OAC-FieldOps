# MASTER DEVELOPMENT PROMPT
# OAC FIELDOPS — THE ULTIMATE ETHICAL PENETRATION TESTING WORKBENCH

## YOUR ROLE

You are an elite senior full-stack application architect, cybersecurity engineer, experienced ethical penetration tester, penetration testing instructor, security researcher, UI/UX designer, and meticulous software QA engineer.

You are responsible for designing, building, testing, documenting, and delivering a **fully functional, production-quality cybersecurity assessment web application called OAC FieldOps**.

Think of this as a serious software engineering project, not a quick HTML mockup.

I want you to use your strongest reasoning capabilities, think through the complete workflow, anticipate edge cases, verify the actual functionality, and deliver the best version possible.

**Do not rush. Do not sacrifice quality to finish quickly.**

I have already spent considerable time building ten previous versions of this application with ChatGPT, and those versions repeatedly suffered from missing features, broken instructions, confusing workflow transitions, and analysis that required me to interpret technical results myself.

This is a **complete ground-up rebuild** informed by everything that worked and failed previously.

I want to finish development, deploy the application, and actually use it.

---

# 1. PROJECT IDENTITY AND OBJECTIVE

**Application:** OAC FieldOps

**GitHub repository:**  
https://github.com/oacalderin-ship-it/OAC-FieldOps

**Hosting:** GitHub Pages

**Branding:** OAC / FIELDOPS

**Primary users:** Beginning through intermediate ethical penetration testers, including myself.

**My equipment:**

- Hak5 Shark Jack Display with built-in payloads.
- Kali Linux, currently available from a persistent bootable USB.
- Windows 11 workstation with PowerShell.
- Nmap installed on Windows and Kali.
- A personal home network.
- A Hyper-V laboratory containing Windows and Linux virtual machines.
- Additional isolated, intentionally vulnerable machines for approved training.

I have experience in IT support, Microsoft 365, Windows administration, networking, and cybersecurity, along with CompTIA Security+, Network+, and CySA+ certifications.

However, **I am still learning practical penetration testing**, including Kali tools, command syntax, reading results, selecting follow-up tests, validating vulnerabilities, and understanding exploitation.

Design the application accordingly.

### The central objective

I want an application that acts like an **interactive, intelligent penetration testing instructor and evidence-driven decision engine**.

It should guide me through an authorized assessment, determine what to investigate next based on uploaded evidence, provide complete and appropriate commands, automatically interpret the resulting output, and produce a professional report.

My ideal experience is:

1. Enter simple engagement and authorization details.
2. Follow the displayed Shark Jack payload instructions in the correct order.
3. Export the resulting loot to my Windows or Kali computer using reliable, copyable commands.
4. Upload the loot to OAC FieldOps.
5. The application analyzes it and tells me exactly which tool to use next, where to use it, and why.
6. Run that command and upload its output.
7. The application analyzes the new evidence, updates the findings, and dynamically determines the next appropriate investigation.
8. Repeat through host discovery, service enumeration, vulnerability verification, and explicitly authorized controlled proof of impact.
9. Generate a polished, evidence-based final report automatically.

**I should primarily be executing guided commands and uploading outputs—not manually analyzing logs or writing findings.**

This is the single most important requirement.

---

# 2. CRITICAL PRODUCT DISTINCTION

OAC FieldOps is a separate project from my other GitHub repository, Pentest-Safebox.

**Do not confuse these repositories.**

Do not redesign Pentest-Safebox, overwrite it, or use its repository as the deployment target.

The only project being developed here is:

`oacalderin-ship-it/OAC-FieldOps`

Previous versions of OAC FieldOps had features worth retaining conceptually, including:

- Password-protected encrypted workspace.
- Authorization and consent.
- A clear phase-based workflow.
- Shark Jack payload instructions.
- Kali and Windows command examples.
- Evidence uploads.
- Findings and reporting.
- Dark charcoal and orange-accented styling.
- Reset and backup controls.

These requirements must remain in the new product.

Do not build a minimalist replacement that removes essential functionality simply to make the analysis dashboard more prominent.

---

# 3. DESIGN PHILOSOPHY — A TOOL FOR SOMEONE LEARNING

The entire application must be designed around one question:

**"If a beginning penetration tester has no idea what to do next, will this application tell them?"**

For every action, explain:

- WHAT the user is doing.
- WHY the action is necessary.
- WHICH tool to use.
- WHERE to run the command.
- HOW to execute it.
- WHAT output or evidence to expect.
- HOW to save the output.
- HOW to import the result.
- WHAT the result actually means.
- WHAT happens next if the test succeeds, fails, or is inconclusive.

Avoid explanations such as:

- "Investigate the service."
- "Verify the software build."
- "Assess the vulnerability."
- "Perform enumeration."
- "Document the finding."
- "What did you notice?"
- "Determine whether exploitation succeeded."

These instructions are insufficient unless accompanied by an actual guided procedure.

The application must do as much of the reasoning and evidence interpretation as technically possible.

### Beginner and advanced modes

Provide two presentation modes:

**Guided Mode (default):**

- Step-by-step explanations.
- One clearly identified next action.
- Copyable commands.
- Plain-English findings.
- Troubleshooting and examples.
- Automatically suggested progression.

**Advanced Mode:**

- More technical context.
- Full scan details.
- Additional supported testing choices.
- Raw XML/log inspection.
- Relevant protocol information.
- Expanded evidence and confidence information.

Both modes must use the same assessment data and analysis engine.

No dummy buttons, fake results, decorative progress indicators, or misleading claims of successful testing.

---

# 4. REQUIRED SEVEN-PHASE WORKFLOW

Implement these seven phases, in this order:

01 — Scope, Engagement & Authorization

02 — Shark Jack Setup, Payloads & Loot Collection

03 — Host Discovery & Network Reconnaissance

04 — Port & Service Enumeration

05 — Vulnerability Identification & Verification

06 — Authorized Exploitation, Impact & Post-Exploitation Verification

07 — Final Report, Remediation & Evidence Export

A persistent sidebar must display the phases, their actual evidence-based progress, and the user's current position.

Allow users to revisit earlier phases without losing evidence.

Do not confuse completion of a command with completion of an investigation.

Each phase must automatically explain its purpose and prerequisites.

---

# 5. PHASE 01 — AUTHORIZATION AND ENGAGEMENT

Make this extremely easy to complete.

I do not want to fill out a massive legal questionnaire before testing my own home network.

Provide a simple setup form with:

- Engagement name.
- Client or network owner.
- Assessor.
- Assessment type: personal lab, owned network, client engagement, or authorized training environment.
- Authorized IP addresses/CIDR ranges.
- Excluded assets and networks.
- Testing dates or permitted window.
- Written authorization/consent confirmation.
- Exploitation authorization: allowed or not allowed.
- Allowed testing intensity.
- Optional evidence retention period.
- Optional authorized contact and emergency stop details.

Allow an authorization document to be attached.

Distinguish between personally owned lab testing and testing performed for another organization.

Do not treat clicking a checkbox as proof of a legally enforceable signature. Record the consent details and evidence honestly.

Require explicit authorization for controlled exploitation.

Build a scope-checking system that validates target IPs against the recorded authorized scope before presenting commands.

**Do not assume that the ability to connect to a network constitutes authorization.**

The system should be suitable for owned networks, approved client engagements, and isolated training labs.

Home networks, office Wi-Fi, managed business networks, and Hyper-V NAT networks must not be assumed to have the same topology or permissions.

---

# 6. PHASE 02 — SHARK JACK DISPLAY MASTER WALKTHROUGH

This phase is absolutely essential.

Previous versions removed or oversimplified the Shark Jack instructions. Do not repeat that mistake.

The application must teach the user how to operate the Hak5 Shark Jack Display and collect reconnaissance evidence.

### A. Device orientation

Explain:

- What the Shark Jack Display does.
- How its network interface connects.
- DHCP client versus DHCP server.
- Arming/management versus execution modes.
- How to determine the currently configured management IP.
- How to inspect the connection.
- How to select payloads.
- Where results may be displayed versus saved.
- Where payload files and loot directories differ.
- Why a successfully completed payload does not guarantee that useful evidence was collected.

Never suggest enabling DHCP server mode on an ordinary production LAN.

Do not hardcode the device's management IP as universally correct.

The application should use the actual device IP supplied by the user.

### B. Required payload order

Provide guided instructions using this logical sequence:

**Payload 1: Simple Connection Test**

Purpose: Determine whether the device received an IP, gateway, and network connectivity.

Explain what each result means and what to do if connectivity fails.

**Payload 2: Advanced Ping Test**

Purpose: Check whether a particular approved device responds to ICMP.

Explain packet counts, latency, success, failure, and limitations.

**Payload 3: Host Discovery / Network Hunter**

Purpose: Identify responsive hosts on the authorized network.

Explain discovered IPs, discovery limitations, and saved host lists.

**Payload 4: Port Scan**

Purpose: Identify accessible ports on a selected authorized host.

Explain open, closed, filtered, and open|filtered results.

**Payload 5: Service/Version Detection**

Purpose: Identify service types, product banners, and possible software versions.

Explain the limits of service fingerprinting.

**Optional Payload 6: Focused additional enumeration**

Only when prior findings justify it and the scan falls within scope.

Payload names vary with firmware and installed payload libraries. The application must distinguish verified installed payloads from suggested functional categories.

For each payload, provide:

1. Purpose.
2. Required network mode.
3. Preflight checks.
4. Exact menu/action sequence where known.
5. Required target inputs.
6. How to start it.
7. How to know whether it completed.
8. What results should appear.
9. How to locate saved evidence.
10. What evidence is imported next.
11. Troubleshooting when no output appears.

Do not assume all default payloads save loot, or that Shark Jack Display firmware universally uses identical payload names.

### C. Device-specific terminal reference

Clearly differentiate:

**Windows PowerShell**

`PS C:\>`

**Kali Linux Terminal**

`kali@kali:~$`

**Shark Jack SSH shell**

`root@shark:~#`

Do not include prompts in copyable command blocks.

Do not blindly use programs that may be absent on the device.

In previous testing, `hostname` returned `-ash: hostname: not found`.

Commands must use compatible alternatives or detect availability.

---

# 7. SHARK JACK LOOT EXPORT — A MAJOR PRIORITY

This is one of the most problematic areas of previous builds.

It must be extremely reliable, beginner-friendly, and thoroughly tested.

The previous application generated commands that created an empty folder but failed to transfer any evidence.

Examples of real observed errors:

- `error: unexpected filename: .`
- `Permission denied, please try again`
- `hostname: not found`
- Empty destination folders after supposed transfers.
- Incorrect assumptions about source paths.
- Problems with PowerShell variable interpolation.
- Misleading success messages.

Actual Shark Jack loot has previously existed in:

`/root/loot/network_hunter/`

`/root/loot/nmap/`

`/root/loot/ping/`

`/root/loot/smb_discovery/`

Examples include:

- `discovery_*.xml`
- `discovery_summary_*.txt`
- `services_*.xml`
- `services_summary_*.txt`
- `latest-hosts.txt`
- `latest-subnet.txt`
- `scan-1.xml`
- `nmap_raw_*.xml`
- `smb_hosts_*.txt`

These are examples, not mandatory folders or filenames.

### Build a real transfer wizard

**Step 1:** Enter or confirm Shark Jack management IP.

**Step 2:** Select transfer computer:

- Windows 11 PowerShell.
- Kali Linux.

**Step 3:** Select destination:

- Reuse an existing folder.
- Create a new dated folder.
- Enter a custom absolute folder path.

Windows must support redirected Documents and OneDrive locations rather than assuming Documents is always under a conventional user-profile directory.

**Step 4:** Verify access to the device.

**Step 5:** Discover the actual loot directories and file names.

**Step 6:** Generate the correct transfer commands for the chosen platform.

**Step 7:** Verify the transfer exit status.

**Step 8:** List the actual transferred files and their sizes.

**Step 9:** Show where the transferred files are located.

**Step 10:** Explain how to upload them into FieldOps.

### Command requirements

Support OpenSSH/SCP behavior differences, including devices without SFTP support and appropriate legacy SCP usage.

Avoid the previous broken `/root/loot/.` source behavior on Windows OpenSSH.

For compatible devices, validate commands based on a source such as:

`root@DEVICE:/root/loot/*`

Handle correct quoting, escaped paths, variable interpolation, wildcard behavior, and filenames containing spaces.

Provide a fallback for transferring an individual known folder.

Where appropriate, provide a second independently tested transfer method, such as an archive-based transfer or a compatible graphical SCP client.

Never assume SCP worked solely because a destination directory exists.

Never overwrite raw evidence silently.

Preserve source filenames and directory relationships.

### Critical usability requirement

The application's default must be a short, copyable, complete command sequence that actually performs the task.

A novice should not need to manually assemble five variables or debug the shell syntax.

Provide an expandable technical explanation for users who want to learn more.

Test Windows and Kali instructions independently.

---

# 8. EVIDENCE IMPORT ENGINE

After the Shark Jack loot is transferred, the user should be able to import it with minimal effort.

### Required import capabilities

- Multiple-file upload.
- Drag and drop.
- Folder import where browser support permits.
- ZIP archive import.
- Shark Jack TXT logs.
- Nmap XML.
- Nmap `.nmap` text.
- Nmap `.gnmap`.
- PowerShell command output.
- Kali terminal logs.
- JSON.
- CSV.
- Supported HTML reports.
- Additional known tool outputs when parsers exist.

The system must identify the actual format from its contents, not merely its filename.

Support incomplete files, unexpected formats, repeated uploads, duplicate evidence, unsupported formats, and truncated scan output.

### Automatic extraction

Extract as available:

- Host IP.
- Hostname.
- MAC address and vendor.
- Operating system hints.
- Scan timestamps.
- Protocol.
- Port.
- Port state.
- Service.
- Service version.
- Nmap scripts and results.
- Relevant headers.
- TLS characteristics.
- SMB characteristics.
- Reachability.
- Observed security indicators.
- Tool errors.
- Scan completion status.
- Evidence provenance.

Calculate a SHA-256 hash for each evidence file.

Preserve the original file and associate derived observations with it.

Prevent incorrect cross-linking of evidence between unrelated hosts, ports, and investigations.

Mark duplicate and potentially stale evidence clearly.

### Absolutely no manual interpretation requirement

After uploading a log, **the application must produce its own interpretation**.

Do not show an empty field asking:

"What did you notice?"

Do not ask:

"Was a vulnerability found?"

Do not ask:

"Did exploitation work?"

when supported evidence can answer those questions.

Ask the user for confirmation only when information is genuinely missing, ambiguous, or impossible to determine automatically.

If parsing fails, state specifically why and suggest the next corrective action.

---

# 9. THE INTELLIGENT DECISION ENGINE — THE CORE PRODUCT

This is the most important software subsystem.

The application must operate using the following continuous process:

**EVIDENCE → ANALYSIS → EXPLANATION → NEXT TEST → COMMAND → RESULT IMPORT → REANALYSIS**

Build a structured, context-aware assessment engine rather than a collection of static command examples.

### Expected behavior

Suppose I import an Nmap XML showing:

`53/tcp open domain`

The application should recognize a DNS service and explain its possible role.

It should recommend appropriate DNS verification based on the current evidence.

It should show the exact command, where to run it, why that command is relevant, and what new evidence it will produce.

After importing the verification results, it must determine whether a security concern was demonstrated, excluded, or remains inconclusive.

Then it should recommend a different test only when evidence justifies one.

It must do the equivalent for HTTP, HTTPS, SMB, RDP, SSH, RPC, and other supported protocols.

### Build a real decision graph

Use clear states such as:

- Not started.
- Awaiting evidence.
- Evidence received.
- Parsing failed.
- Test completed.
- Potential weakness.
- Needs corroboration.
- Confirmed vulnerability.
- Not vulnerable under tested conditions.
- Inconclusive.
- Not applicable.
- Blocked by scope or authorization.
- Controlled proof completed.
- Remediation pending.
- Closed.

Do not falsely equate a scan with a vulnerability or a service banner with successful exploitation.

Every recommendation must record **which evidence caused that recommendation**.

The decision engine must avoid endless repetitions of the same test.

When evidence is inconclusive, explain why and whether another test can reasonably resolve it.

If there is no warranted investigation remaining, allow the phase to conclude.

### Explain the logic

Each task should contain:

**What we found**

Plain-English interpretation of the evidence.

**Why it matters**

Potential exposure or security relevance.

**What we still don't know**

Clearly stated uncertainty.

**Recommended next tool**

For example Nmap, PowerShell, curl, or an appropriate Kali utility.

**Where to run it**

Windows, Kali, Shark Jack, or an explicitly identified isolated lab target.

**Exact command**

Fully generated from authorized, validated target details.

**What the command does**

Beginner-friendly explanation.

**What to upload afterward**

Specific file type and expected output filename.

**What the application will check next**

Concrete conditions derived from that output.

This must be a functioning engine—not explanatory UI text disconnected from application state.

---

# 10. PHASE 03 — HOST DISCOVERY

Use the imported Shark Jack evidence to establish a reliable host inventory.

If existing evidence is sufficient, **do not require redundant scans**.

If additional verification is necessary, generate the appropriate Windows or Kali commands.

Cover:

- Interface discovery.
- IP configuration.
- Gateway identification.
- Routing and reachability.
- Host discovery.
- ICMP limitations.
- ARP discovery when applicable.
- Selected host verification.
- TCP discovery where justified.
- DNS/hostname resolution.
- Detection of unreachable or filtered targets.
- Distinguishing the scanning machine from target devices.
- Reachability differences between home LAN, travel router and Hyper-V NAT.

Do not assume Kali can reach virtual machines on another subnet without a valid route.

Generate appropriate Nmap outputs using structured XML as a preferred evidence format.

Use commands that automatically save outputs to a clearly defined assessment folder.

At the end of the phase, show a useful inventory and determine which authorized hosts need service enumeration.

The user should never need to manually type discovered IP addresses already present in imported evidence.

---

# 11. PHASE 04 — PORT AND SERVICE ENUMERATION

This phase must be driven by Phase 03 findings.

For each host, automatically identify relevant open ports and create only appropriate follow-up investigations.

Implement specific protocol workflows for at least:

- DNS — TCP/UDP 53.
- HTTP/HTTPS — 80, 443, 8080, 8083, 8443 and nonstandard web ports.
- SMB — 139/445.
- Windows RPC — 135 and related identified services.
- RDP and Hyper-V remote management — including 3389/2179 when appropriate.
- SSH — 22.
- FTP — 21.
- SMTP — 25/587.
- Common database protocols.
- Unknown and nonstandard ports.
- TLS on nonstandard ports.

For supported services, suggest appropriate tools and verification checks.

Examples include:

- Nmap version and NSE checks.
- DNS query tools.
- `Resolve-DnsName`.
- `curl` or PowerShell HTTP requests.
- Nmap TLS cipher enumeration.
- SMB protocol/security-mode checks.
- Supported read-only SMB enumeration.
- Service-specific configuration verification.
- Local Windows process/listener inspection when assessing an owned Windows host.
- SearchSploit for research, when an identified product/version warrants it.

Do not simply tell the user to "run vulnerability scanning."

Specify which targeted investigation is justified by the evidence.

### Example from my home lab

One earlier report included:

`10.10.10.1:53 — Cloudflare public DNS fingerprint`

`10.10.10.1:8083 — lighttpd 1.4.39 fingerprint`

`10.10.10.1:8443 — TLS-related service`

`10.10.10.135:135 — Microsoft RPC`

`10.10.10.135:2179 — vmrdp?`

These should produce distinct follow-up decisions.

Importantly, an Nmap fingerprint of "Cloudflare public DNS" does not prove that Cloudflare software is installed directly on an ASUS router.

A version banner is not automatically a confirmed vulnerable software build.

A port 2179 service guess is not enough to prove an exploitable remote desktop vulnerability.

The application should recognize these limitations without requiring the user to identify them.

---

# 12. PHASE 05 — VULNERABILITY VERIFICATION

This phase turns reconnaissance observations into supported security conclusions.

It must not be a static list of hypothetical CVEs.

Build a verification system that considers:

- Service identity.
- Version confidence.
- Configuration weaknesses.
- Security protocol settings.
- Exposure.
- Access restrictions.
- Applicable vendor advisories.
- Known vulnerability prerequisites.
- Supporting evidence.
- Contradictory results.
- Detection-tool limitations.

Research tools may include SearchSploit, trusted vendor advisories, Nmap NSE, and appropriate vulnerability scanners.

Optional external vulnerability intelligence may be integrated, but only through legitimate documented sources.

Never fabricate CVE IDs, version applicability, CVSS scores, or exploitation results.

If current vulnerability intelligence is unavailable, say so and keep the status unverified.

### Vulnerability classification

Separate:

1. Service observed.
2. Potential security concern.
3. Suspected vulnerability.
4. Verified vulnerable configuration.
5. Confirmed vulnerability.
6. Exploitation demonstrated.
7. Inconclusive or not established.

For each identified candidate, automatically show:

- Finding title.
- Host/port.
- Supporting evidence.
- Why the candidate exists.
- What must be true for the weakness to apply.
- Exact verification procedure.
- Expected positive indicators.
- Expected negative indicators.
- Confidence.
- Potential impact.
- Recommended remediation.

Do not demand that the user personally decide whether a security issue was found if the imported evidence supports a conclusion.

### Severity

Assign severity only when supported by the evidence and relevant environment context.

Distinguish observed technical severity from unknown business impact.

No made-up critical vulnerabilities merely because a service is old or unfamiliar.

---

# 13. PHASE 06 — CONTROLLED EXPLOITATION AND IMPACT

This phase is essential for learning practical ethical penetration testing, but it must follow authorization and evidence requirements.

Do not automatically launch exploits or recommend indiscriminate attacks.

The application should identify whether sufficient evidence exists to justify a specific controlled proof attempt and whether that attempt is permitted by the engagement.

### Required features

For each confirmed or strongly supported weakness:

- Explain the vulnerability in plain English.
- Explain what successful exploitation would mean.
- Identify applicable research and testing tools.
- Explain any prerequisites.
- Show a bounded procedure appropriate to the authorized lab or engagement.
- Identify the relevant tool interface and command location.
- Explain how to save proof output.
- Request only the evidence needed to confirm impact.
- Analyze the imported proof output.
- Classify success, failure, inconclusive status, and limitations.
- Record cleanup or restoration results.

Support Metasploit-based training where appropriate, with special emphasis on intentionally vulnerable isolated laboratory machines.

Clearly distinguish the Kali shell from the Metasploit console.

Do not produce random Metasploit commands unrelated to the detected target and vulnerability.

An authorized lab exercise should teach the sequence from verifying the vulnerable service, researching an applicable module, inspecting its requirements, performing a bounded test, to documenting the result.

### Post-exploitation proof

Where authorized, focus on minimal, non-destructive demonstrations such as confirming the identity or privileges of a legitimately obtained test session.

Do not default to credential dumping, sensitive file collection, persistence, evasion, lateral movement, bulk exfiltration, or destructive testing.

The objective is to prove the agreed security impact with the least invasive action necessary.

### Interpretation

If a provided log shows no successful session, do not report successful exploitation.

If a session was established but privileges were not verified, distinguish those separate facts.

If cleanup wasn't evidenced, say so.

**The user should upload the actual proof and cleanup logs; the application should write the technical interpretation and report entry.**

---

# 14. PHASE 07 — AUTOMATED PROFESSIONAL REPORT

The final report must be one of the best parts of this application.

I previously completed an assessment and received a report that contained:

"Executive summary not yet completed."

"No validated or suspected findings recorded."

"Recommendations are still blank."

This happened even though the tool had imported numerous scan files.

That is unacceptable.

A report must automatically summarize the known assessment data.

### Required sections

1. Branded cover page.
2. Engagement overview.
3. Client/owner details.
4. Scope and authorization record.
5. Assessment methodology.
6. Executive summary.
7. Assets discovered.
8. Services discovered.
9. Vulnerability findings.
10. Potential concerns requiring verification.
11. Confirmed security issues.
12. Controlled exploitation attempts and outcomes.
13. Post-exploitation impact verification.
14. Cleanup and restoration status.
15. Risk/severity summary.
16. Remediation recommendations.
17. Limitations.
18. Testing timeline.
19. Commands and tools used.
20. Evidence manifest with SHA-256 hashes.
21. Appendix containing relevant technical details.

Include professional tables, evidence links, clear severity distinctions, and technically accurate descriptions.

Generate the executive summary automatically from confirmed evidence.

If no vulnerabilities were confirmed, explain that fact properly; don't leave the report blank and don't claim the system is secure.

If tests remain incomplete, identify which ones and why.

### Exports

Provide:

- PDF, with a working print/PDF workflow.
- Standalone HTML.
- Markdown.
- JSON assessment export.
- Encrypted workspace backup.

The PDF must have proper pagination, readable tables, and clean report styling.

Never claim exploitation succeeded without evidence.

---

# 15. SECURITY, PASSWORD SCREEN AND DATA PROTECTION

The original OAC FieldOps had a password-protected local workspace.

This must return in the new application.

### Required

- Initial passphrase creation.
- Password confirmation.
- Unlock screen on subsequent visits.
- Lock workspace button.
- AES-GCM encryption for locally persisted assessment data.
- Strong passphrase-based key derivation.
- Proper random salts and nonces.
- Protected backup and restore.
- Password error handling.
- Reset with confirmation.
- Support multiple engagement records.
- Reliable browser refresh and session persistence.
- Explicit instructions about backup recovery.

Never put a hardcoded master password into publicly hosted JavaScript.

Be transparent that client-side encryption is different from server-side authentication. A public GitHub Pages site is publicly accessible even when locally stored engagement data is passphrase encrypted.

Do not misrepresent a JavaScript password page as full website access control.

Store raw evidence and analysis securely and consider storage quotas for large logs.

Never publish assessment evidence, encrypted backups, client material, or credentials to the public GitHub repository.

All core functions must operate without transmitting private scan data to a remote service.

If offering optional AI-assisted analysis, design a secure, explicitly opt-in integration rather than embedding API keys in GitHub Pages source.

A non-AI local rules engine must remain useful and fully functional on its own.

---

# 16. CORE UI/UX REQUIREMENTS

Design a premium cybersecurity workstation interface.

### Visual style

- Dark charcoal/near-black background.
- Orange accent color.
- Professional OAC monogram.
- Subtle borders.
- Dense but readable dashboard.
- Crisp typography.
- Clear cards and progress indicators.
- Consistent button styles.
- Good contrast.
- Desktop-first design with usable mobile responsiveness.

Do not build a generic Bootstrap-looking admin panel.

Do not waste space with huge empty cards or excessive decorative graphics.

### Required navigation

Persistent sidebar for phases 01–07.

Top controls for:

- Current engagement.
- Import evidence.
- Export encrypted backup.
- Lock.
- Reset.
- Help/instructions.

### Main investigation screen

Each investigation should look approximately like:

**Finding:** TCP 8443 open — TLS service requires validation

**Meaning:** A service is responding on this port, but secure protocol settings have not yet been verified.

**Tool:** Nmap

**Run on:** Windows PowerShell

**Action:** Copy command

[Full generated command]

**Expected evidence:** XML file

**Next:** Upload resulting XML

[Import file]

**Analysis:** Automatically generated after import.

**Decision:** Appropriate follow-up based on actual evidence.

### Quality of life

- Copy command button.
- Visible copy confirmation.
- Expand/collapse technical explanations.
- Choose Windows or Kali for supported tasks.
- Automatic command parameter filling.
- Downloadable evidence checklist.
- Per-host investigation timeline.
- Searchable findings.
- Filterable severity/status.
- Clear evidence upload progress.
- Data backup reminder.
- Useful error messages.
- No buttons that do nothing.
- No fake scanning animations that imply the browser has network access.

---

# 17. COMMAND GENERATION ENGINE

Develop a centralized command generator, not scattered hardcoded snippets.

Commands must be dynamically built from validated assessment context.

### Important requirements

- Platform-specific syntax.
- Proper IP and hostname handling.
- Correct quoting and escaping.
- Correct Windows PowerShell interpolation.
- Correct Linux shell paths.
- Absolute versus relative path validation.
- Folder creation.
- Existing destination support.
- Filename collision handling.
- Correct output extensions.
- Evidence naming convention.
- Exit-code handling.
- Meaningful errors.
- Compatibility checks.
- No out-of-scope targets.

For Windows Nmap, account for actual installation paths such as:

`C:\Program Files (x86)\Nmap\nmap.exe`

The application should explain how to detect whether `nmap.exe` is on PATH or must be invoked through its complete path.

Generate Nmap XML outputs suitable for subsequent import.

Do not silently ignore scan failures.

Never classify an empty output directory as successful evidence collection.

---

# 18. TROUBLESHOOTING ENGINE

A beginner-friendly tool must explain errors, not merely display them.

Implement diagnostic guidance for:

- No Shark Jack IP.
- Wrong network mode.
- Invalid default gateway.
- Missing Ethernet link.
- Unreachable management IP.
- SSH authentication failure.
- SSH authentication retry followed by success.
- Unsupported device command.
- Missing `/root/loot` path.
- Payload completed without saving evidence.
- SCP/SFTP protocol incompatibility.
- Windows SCP `unexpected filename: .`.
- Empty destination.
- Incorrect folder path.
- OneDrive/redirected Documents.
- Existing folder.
- File access denied.
- Nmap not installed or missing from PATH.
- Nmap permission errors.
- No route to host.
- ICMP filtering.
- Port filtered.
- UDP inconclusive.
- Missing XML.
- Unsupported log.
- Corrupt upload.
- Duplicate evidence.
- Scan interruption.
- Browser storage errors.
- GitHub Pages caching/deployment problems.

For each error, show:

1. What the error means.
2. Most likely causes.
3. The next diagnostic command.
4. Expected result.
5. The correction.
6. How to verify the correction.

Use an error knowledge base with tested patterns.

Do not provide a vague "try again" message when a known correction exists.

---

# 19. TEST DATA AND REGRESSION SCENARIOS

Create automated tests covering real-world scenarios inspired by my earlier assessments.

### Scenario A — ASUS router DNS

`10.10.10.1:53/tcp`

Nmap reports a Cloudflare public DNS fingerprint.

Expected: DNS inventory, useful safe verification, and honest interpretation. No false firmware/CVE conclusion.

### Scenario B — Router HTTP

`10.10.10.1:8083/tcp`

A lighttpd service fingerprint is observed.

Expected: Contextual HTTP/service checks and version-confidence assessment, without declaring a vulnerability from the banner alone.

### Scenario C — TLS

`10.10.10.1:8443/tcp`

Expected: Appropriate TLS validation and explanation of unsupported, weak, strong, failed, or inconclusive results.

### Scenario D — Windows RPC/Hyper-V

`10.10.10.135:135/tcp`

`10.10.10.135:2179/tcp`

Expected: Windows/Hyper-V-aware next steps and correct treatment of uncertain fingerprints.

### Scenario E — Successful scan, no vulnerability

Expected: Honest completion without fabricated findings.

### Scenario F — Evidence present but scan markers differ

A valid completed XML scan should not be incorrectly marked unfinished simply because a companion text file lacks an expected completion string.

### Scenario G — Shark Jack loot extraction

Source files exist in `/root/loot`.

An existing Windows destination is empty.

Expected: Correct transfer command, exit-status verification, actual file listing, and accurate success/failure reporting.

### Scenario H — Windows Nmap missing from PATH

Expected: Full-path fallback and clear installation/PATH guidance.

### Scenario I — Incomplete scan

Expected: State remains inconclusive or incomplete, with explanation.

### Scenario J — Confirmed vulnerable lab configuration

Expected: Evidence-linked vulnerability identification and appropriate next test.

### Scenario K — Controlled exploitation evidence

Expected: Success only when adequate proof supports it.

### Scenario L — Cross-host evidence isolation

Evidence from one host or port must not be incorrectly attached to another.

### Scenario M — Browser reload, lock/unlock and backup

Expected: No accidental data loss or inaccessible encrypted state.

### Scenario N — Empty assessment

Expected: Honest empty-state guidance, not fabricated inventory.

### Scenario O — Large bulk import

Expected: Deduplication, parsing feedback, usable performance, and correct associations.

**Do not declare the application finished until these scenarios have been implemented and meaningfully tested.**

---

# 20. ENGINEERING ARCHITECTURE

Choose a maintainable architecture suitable for GitHub Pages.

Favor reliable HTML, CSS, and JavaScript with clear module separation, or a lightweight well-justified framework that can be deployed as static assets.

The architecture should separate:

- UI and navigation.
- Engagement and authorization state.
- Encrypted storage.
- Evidence import.
- Format parsers.
- Asset inventory.
- Command generation.
- Decision engine.
- Protocol investigation rules.
- Findings and severity.
- Proof/impact verification.
- Report generation.
- Export/backup.
- Testing fixtures.

Avoid a single enormous JavaScript file that mixes everything.

Prevent cross-site scripting from imported log text or filenames. Treat all imported evidence as untrusted input.

Perform format validation, file-size limits, safe ZIP handling, scope validation, and output escaping.

Store evidence provenance and parser versions so conclusions are explainable.

Avoid unsafe dynamic code execution.

Use a transparent, versioned evidence schema and support future migrations.

Provide actual working code—not pseudocode, placeholder implementations, or buttons wired to alerts.

---

# 21. WHAT THE APP CAN AND CANNOT AUTOMATE

This is a critical engineering requirement.

GitHub Pages cannot independently execute local PowerShell, Kali utilities, Shark Jack payloads, or Metasploit commands.

Do not pretend it can.

The application should automate:

- Preparing commands.
- Selecting the next test.
- Explaining tools.
- Parsing logs.
- Correlating evidence.
- Identifying supported vulnerability indicators.
- Updating assessment states.
- Recommending reasonable follow-ups.
- Drafting findings.
- Producing reports.

The user executes tests locally and imports their output.

If you believe a trusted optional local companion application would substantially improve the workflow, you may design it as a separate optional component with clear permission boundaries.

However, the GitHub Pages web application must remain fully usable without installing a local agent or operating a server.

Do not make paid services, API subscriptions, cloud databases, or a proprietary AI API prerequisites for basic functionality.

For analysis beyond deterministic rules, explain the realistic limitations and provide graceful fallback behavior.

---

# 22. OUTPUT AND DELIVERY REQUIREMENTS

Do not stop at planning or describing the architecture.

**Actually build the entire application.**

Deliver:

1. Complete GitHub-ready source code.
2. All required CSS, JavaScript, HTML, and assets.
3. A downloadable ZIP of the complete project.
4. A README describing the features.
5. A beginner-friendly setup and deployment guide.
6. A test suite.
7. Representative fictional test logs.
8. A test-results summary identifying what was actually executed.
9. A limitations document.
10. A clear changelog.
11. Screenshots or previews, if the execution environment supports them.

Do not deliver an incomplete prototype and call it production-ready.

Do not claim tests passed unless they were actually run.

If a dependency, browser feature, or tool cannot be tested in your environment, say so.

### GitHub deployment instructions

Write beginner-friendly numbered instructions for my exact repository:

https://github.com/oacalderin-ship-it/OAC-FieldOps

Explain:

- How to back up the current repository.
- How to download/extract the new project.
- Which files go into the repository root.
- Whether obsolete files should be removed.
- How to commit changes.
- How to verify GitHub Pages deployment.
- How to handle browser cache issues.
- How to perform first-time setup.
- How to preserve private evidence outside the public repo.
- How to roll back safely if the new version has problems.

Do not change my separate Pentest-Safebox repository.

Do not assume you have write access to GitHub unless a suitable connected integration actually provides it.

---

# 23. REQUIRED REAL USER JOURNEY

After building the application, simulate this full end-to-end workflow:

**User opens OAC FieldOps.**

The encrypted vault screen appears.

User creates or unlocks the workspace.

User creates a personal authorized laboratory engagement.

User enters an approved network scope.

User opens Phase 02.

The application teaches the Shark Jack payload order.

User runs Simple Connection Test.

User runs Advanced Ping Test.

User runs Host Discovery.

User runs an appropriate Port Scan.

User runs available Service Discovery.

User copies the saved loot to an existing Windows folder.

The transfer succeeds and its outputs are verified.

User imports the resulting Shark Jack files.

The application automatically builds the host inventory.

The application generates Phase 03 tasks.

User executes the next recommended command.

User imports the resulting output.

The application interprets it and moves to Phase 04.

The application identifies the actual services and generates service-specific instructions.

User imports Phase 04 evidence.

The application decides which vulnerabilities are plausible and what verification is justified.

User executes the Phase 05 checks and imports their results.

The application classifies confirmed, suspected, negative, and inconclusive results.

When suitable evidence and permission exist, it offers a bounded Phase 06 controlled proof workflow.

User imports actual test outputs.

The application distinguishes exploitation attempts, successes, failures, impact verification, and cleanup.

Finally, the user opens Phase 07.

The professional report is already substantially completed, accurately describing the findings and any outstanding limitations.

The user exports the finished report.

**At no point should the user be required to manually decipher scanner output to keep the process moving.**

That is the experience I am paying attention to above all else.

---

# 24. DEFINITION OF DONE — NONNEGOTIABLE

The application is not finished unless:

- The password-protected encrypted workspace works.
- Authorization and scope handling work.
- The Shark Jack walkthrough is complete.
- The payload instructions make logical sense.
- Windows and Kali loot export instructions are accurate.
- Existing destination folders are supported.
- Copy commands validate success.
- Shark Jack and Nmap evidence import works.
- Logs are automatically interpreted.
- Asset inventories are generated.
- Phase 03 decisions are evidence-driven.
- Phase 04 decisions are service-specific.
- Phase 05 distinguishes real vulnerabilities from guesses.
- Phase 06 accurately handles authorized proof and impact.
- The report writes its own supported findings and summaries.
- All important actions and commands include explanations.
- Error handling is genuinely useful.
- Reset, lock, backup, and restore work.
- Reloading does not destroy data.
- The repository is deployable on GitHub Pages.
- No fake or placeholder features remain.
- The main end-to-end workflow passes automated browser testing.
- The downloadable ZIP contains every required application file.

If any item is incomplete, explicitly identify it and continue working rather than declaring the product finished.

---

# 25. HOW I WANT YOU TO APPROACH THE BUILD

Follow a disciplined engineering process.

**First:** Convert this specification into a complete set of requirements and identify dependencies or conflicts.

**Second:** Design the evidence schema, protocol rules, investigation state machine, and command-generation architecture before spending most of your effort on styling.

**Third:** Build the functioning engines and write automated tests.

**Fourth:** Build the polished user interface around the verified engines.

**Fifth:** Integrate the Shark Jack walkthrough, transfer wizard, and phase navigation.

**Sixth:** Test parsing, state transitions, backup/recovery, and reporting with synthetic and representative evidence.

**Seventh:** Run browser-based end-to-end tests, fix discovered problems, and inspect the rendered interface.

**Eighth:** Deliver the complete, tested GitHub-ready project and documentation.

Make reasonable engineering decisions independently. Ask me a question only when something essential genuinely prevents progress.

Avoid unnecessary clarification loops.

Prioritize correctness, clarity, completeness, security, and usability over quick delivery.

## FINAL PRINCIPLE

I am trying to become genuinely proficient at ethical penetration testing.

I want OAC FieldOps to function as my **interactive field instructor, intelligent assessment engine, evidence manager, and report writer**.

It should teach me how to use Shark Jack, Nmap, Kali, PowerShell, and relevant security tools in the correct context.

It should progressively teach me how experienced penetration testers move from host discovery to service enumeration, vulnerability verification, controlled proof of impact, and professional reporting.

**I WANT TO RUN THE COMMANDS AND IMPORT THE OUTPUTS. I WANT OAC FIELDOPS TO DO THE MAJORITY OF THE INTERPRETATION, REASONING, WORKFLOW SELECTION, FINDINGS GENERATION, AND DOCUMENTATION.**

Every screen, feature, command, parser, and recommendation must support that objective.

Build this as the version that finally makes OAC FieldOps genuinely useful, reliable, and ready for real authorized practice.

**Begin by planning the architecture and immediately proceed into implementation and testing. Do not stop after delivering a proposal.**
