# Supported evidence formats

Recognition uses content, not the filename extension. Preferred input is Nmap `-oX` XML. Text output has fewer reliable fields; unknown formats are retained with an explanation rather than converted into invented findings.

| Format | Supported interpretation |
|---|---|
| Nmap XML | IPv4 hosts, hostname, MAC/vendor, OS hints, transport, port state, service/product/version, tunnel, script output, timestamp, recorded command, successful runstats marker |
| Nmap normal text / `.nmap` | Host blocks, TCP/UDP port rows, common NSE script blocks and Nmap completion marker |
| Nmap grepable / `.gnmap` | Host lines, slash-delimited port entries, completion marker |
| IPv4 host list | One literal IPv4 per line; candidates, not proven reachable hosts |
| Ping text | Common Linux/Windows target and percentage-loss summary; ICMP-only interpretation |
| Inventory CSV | Exact header below; unquoted fields only |
| Inventory JSON | `oac-observations-v1`; inventory only, never user-supplied vulnerability flags |
| Proof JSON | `oac-proof-v1`; exact observed host/port/investigation binding and actual transcript |
| HTML | Nmap normal text inside `pre` blocks; HTML never rendered as evidence |
| ZIP | Stored or deflated entries under the stated file/count/expansion limits |
| Authorization attachment | Any small document retained as original bytes; no signature validation |

PowerShell and Kali output are interpreted when they contain one of the supported structures. Arbitrary formatted tables, unsupported scanner HTML, proprietary report JSON and unrestricted console output are not generically understood. Use generated Nmap XML for the reliable path.

## CSV

```csv
ip,port,protocol,state,service,version
10.10.10.1,22,tcp,open,ssh,observed-banner
```

`version` is optional in the header. CSV quoting and embedded commas are not supported; use JSON for those strings.

## Inventory JSON

```json
{
  "format": "oac-observations-v1",
  "hosts": [{
    "ip": "10.10.10.1",
    "hostname": "fictional-lab",
    "ports": [{"port": 22, "protocol": "tcp", "state": "open", "service": "ssh", "version": "observed-banner"}]
  }]
}
```

## Bound proof JSON

Prefer the in-app form, which retains the raw transcript and fills the binding from inventory automatically. This example is fictional:

```json
{
  "format": "oac-proof-v1",
  "host": "10.10.10.1",
  "port": 21,
  "investigationId": "10.10.10.1:tcp:21:ftp",
  "stage": "attempt",
  "transcript": "< 230 Login successful.\n< 221 Goodbye."
}
```

Allowed stages are `attempt`, `identity`, and `cleanup`. A mismatched investigation is excluded from conclusions. Success is not accepted as an arbitrary JSON boolean; the interpreter checks known transcript markers. Unsupported proof remains inconclusive.

## Incomplete and conflicting evidence

A syntactically truncated XML file is retained as a parsing failure. A well-formed XML file without successful runstats is an incomplete scan, even if some ports are present. Valid completed XML is not invalidated because a companion text summary lacks its own completion marker.

Identical byte content is imported once per engagement. Repeat scans with different content remain separate evidence. Latest observations can change current outcomes; historical check records remain in the report. Conflicting positive/negative observations require review of location, timestamp and configuration changes rather than a fabricated certainty score.
