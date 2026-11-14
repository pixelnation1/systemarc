# SystemArc Cybersecurity — phase 1

This is the initial service and internal tooling foundation. It is not a public security-scanning service or an authorization to test external systems.

## What is implemented

- Public cybersecurity overview at /cybersecurity, integrated with the homepage, main navigation, services hub, About and Process pages, and footer.
- Focused personal/business security inquiry form that reuses the existing server-side project inquiry delivery and tags security requests. Never send passwords or secret values through this form.
- The existing project inquiry flow has a cybersecurity scenario and assessment / hardening options. Never request passwords, API keys, access tokens, customer exports, or incident evidence through the inquiry form.
- A read-only local repository preflight tool with redacted findings. Run npm run security:audit for a human summary or npm run security:audit -- --json for machine-readable JSON. Use npm run test:security to test the preflight rules.
- A local-only report formatter: npm run security:audit -- --json > local-audit.json followed by npm run security:report -- local-audit.json. Keep generated assessment files out of version control.
- An assessment workflow, sample reporting template, and written testing authorization template in this directory.

## Workflow: service request to delivery

1. Confirm that SystemArc can deliver the requested service responsibly. Do not present penetration testing, digital forensics, continuous monitoring, or 24/7 response as operational until the team, procedures, and coverage are in place.
2. Conduct discovery without collecting credentials.
3. Inventory the legal owner of each system and obtain written permission and rules of engagement before any testing. Third-party infrastructure requires authorization from the appropriate owner/provider.
4. Set scope, dates, methods, no-go systems, stop conditions, emergency contact, backups, data handling, retention, deliverables, and price.
5. Prefer non-invasive review first. If active testing is contracted, test only approved targets during the agreed window, using the least disruptive method.
6. Keep client findings out of public GitHub issues and unprotected tickets. Protect evidence and avoid collecting more than is necessary.
7. Deliver a report with severity, evidence references, business impact, remediation, owner, and follow-up status; never include usable credentials.
8. Validate remediation and obtain approval for any retest.

## Planned next tools

- Private client assessment workspace with real authentication, role-based access control, tenant isolation, audit logs, and defined retention.
- Finding import from approved scanners (Nmap XML / vulnerability scanner exports) with verification before publication.
- Remediation tracker and signed client reports.
- Network and application assessments in an isolated lab, then carefully scoped customer engagements.

Do not expose scans, findings, credentials, client names or network inventories on public pages. Do not deploy an unauthenticated dashboard. This repository's preflight does not touch production infrastructure or scan the internet.

## Limitations

The preflight is a lightweight pattern-based review of locally Git-tracked files, not an SAST substitute or security certification. It skips large/binary files and lockfiles; it does not review dependencies, commit history, cloud permissions, configuration drift, or deployed services. Investigate leads manually and use dedicated tools as the operation matures.
