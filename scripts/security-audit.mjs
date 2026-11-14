#!/usr/bin/env node
/**
 * SystemArc repository preflight: read-only, local, offline, and redacted.
 * This is NOT a penetration test, malware scanner, or certification.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 512_000;
const IGNORED = /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|node_modules)(\/|$)/;
const EXAMPLE_ENV = /(^|\/)\.env\.(example|sample|template)$/i;
const TRACKED_ENV = /(^|\/)\.env(?:\.[^/]*)?$/i;

export const patterns = [
  { id: "private-key-header", severity: "critical", description: "A private key block appears in tracked source.", test: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { id: "aws-access-key", severity: "high", description: "Possible AWS access-key identifier in tracked source; verify and rotate if real.", test: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/ },
  { id: "github-classic-token", severity: "critical", description: "Possible GitHub access token in tracked source; verify and rotate if real.", test: /\bghp_[A-Za-z0-9]{30,}\b/ },
  { id: "stripe-secret-key", severity: "critical", description: "Possible Stripe secret key in tracked source; verify and rotate if real.", test: /\bsk_live_[A-Za-z0-9]{16,}\b/ },
  { id: "public-secret-env", severity: "review", description: "Client-exposed environment variable name suggests a secret; verify intent.", test: /\bNEXT_PUBLIC_[A-Z0-9_]*(?:SECRET|PRIVATE|PASSWORD)[A-Z0-9_]*\b/ },
];

export function inspectText(file, content) {
  const findings = [];
  if (TRACKED_ENV.test(file) && !EXAMPLE_ENV.test(file) && basename(file) !== ".env") {
    findings.push({ rule: "tracked-env-file", severity: "high", path: file, line: 1, description: "Environment file is tracked in Git. Review contents and remove or rotate any credentials." });
  } else if (basename(file) === ".env") {
    findings.push({ rule: "tracked-env-file", severity: "high", path: file, line: 1, description: "Environment file is tracked in Git. Review contents and remove or rotate any credentials." });
  }
  const lines = content.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    for (const rule of patterns) {
      if (rule.test.test(lines[index])) {
        findings.push({ rule: rule.id, severity: rule.severity, path: file, line: index + 1, description: rule.description });
      }
    }
  }
  return findings;
}

export function auditRepository(root) {
  const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: root, maxBuffer: 8 * 1024 * 1024 })
    .toString("utf8").split("\0").filter(Boolean);
  const findings = [];
  let inspected = 0;
  for (const file of tracked) {
    if (IGNORED.test(file)) continue;
    const bytes = readFileSync(join(root, file));
    if (bytes.length > MAX_BYTES || bytes.includes(0)) continue;
    const content = bytes.toString("utf8");
    inspected++;
    findings.push(...inspectText(file, content));
  }
  const packageFile = join(root, "package.json");
  try {
    const pkg = JSON.parse(readFileSync(packageFile, "utf8"));
    for (const hook of ["preinstall", "install", "postinstall", "prepare"]) {
      if (pkg.scripts && Object.hasOwn(pkg.scripts, hook)) {
        findings.push({ rule: "lifecycle-script-review", severity: "review", path: "package.json", line: null, description: "Review the " + hook + " lifecycle script before trusting package installation." });
      }
    }
  } catch {
    findings.push({ rule: "package-json-unreadable", severity: "review", path: "package.json", line: null, description: "Could not parse package.json; review its scripts manually." });
  }
  return {
    tool: "SystemArc Security Preflight",
    version: 1,
    generatedAt: new Date().toISOString(),
    repository: basename(root),
    trackedFiles: tracked.length,
    inspectedFiles: inspected,
    counts: Object.fromEntries(["critical", "high", "review"].map(level => [level, findings.filter(f => f.severity === level).length])),
    findings,
    limits: [
      "Local tracked files only. Does not inspect Git history, cloud permissions, runtime behavior, or third-party dependencies.",
      "Pattern matches are leads for human verification, not proof of compromise.",
      "No secret values or source snippets are included in output.",
      "No network connections, remote scans, exploits, or remediation actions are performed.",
    ],
  };
}

export function runCli() {
  const report = auditRepository(process.cwd());
  if (process.argv.includes("--json")) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    process.stdout.write("SystemArc Security Preflight (offline / read-only)\n");
    process.stdout.write("Tracked files: " + report.trackedFiles + " | Inspected: " + report.inspectedFiles + "\n");
    process.stdout.write("Critical: " + report.counts.critical + " | High: " + report.counts.high + " | Review: " + report.counts.review + "\n");
    for (const finding of report.findings) {
      process.stdout.write("[" + finding.severity.toUpperCase() + "] " + finding.rule + " — " + finding.path + (finding.line ? ":" + finding.line : "") + "\n");
    }
    process.stdout.write("Results require human verification. No active testing occurred.\n");
  }
  if (report.counts.critical > 0) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runCli();
}
