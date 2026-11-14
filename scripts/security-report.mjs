#!/usr/bin/env node
/**
 * Offline formatter for the redacted SystemArc Security Preflight JSON report.
 * Does not scan systems or send data anywhere.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").slice(0, 1000);
}

export function formatReport(report) {
  if (!report || report.tool !== "SystemArc Security Preflight" || !Array.isArray(report.findings)) {
    throw new Error("Expected a SystemArc Security Preflight JSON report.");
  }
  if (report.findings.length > 20000) throw new Error("Too many findings to format safely.");
  const lines = [
    "# SystemArc — Internal Security Preflight",
    "",
    "**Status:** Preliminary automated review — human verification required.",
    "**Repository:** " + escapeCell(report.repository),
    "**Generated:** " + escapeCell(report.generatedAt),
    "",
    "## Overview",
    "",
    "- Files inspected: " + Number(report.inspectedFiles || 0),
    "- Critical leads: " + Number(report.counts?.critical || 0),
    "- High leads: " + Number(report.counts?.high || 0),
    "- Manual review items: " + Number(report.counts?.review || 0),
    "",
    "## Findings for verification",
    "",
    "| Severity | Rule | Location | What to review |",
    "| --- | --- | --- | --- |",
  ];
  if (report.findings.length === 0) {
    lines.push("| — | No pattern matches | — | This does not mean the repository is secure. |");
  }
  for (const item of report.findings) {
    const location = String(item.path || "?") + (Number.isInteger(item.line) && item.line > 0 ? ":" + item.line : "");
    lines.push("| " + escapeCell(item.severity) + " | " + escapeCell(item.rule) + " | " + escapeCell(location) + " | " + escapeCell(item.description) + " |");
  }
  lines.push(
    "",
    "## Human verification and remediation",
    "",
    "For each finding: confirm whether it is genuine, record business impact and affected owners, assign remediation, verify the fix, and document any remaining risk. Never copy usable credentials into the report.",
    "",
    "## Scope and limitations",
    "",
    ...((Array.isArray(report.limits) ? report.limits : []).map(value => "- " + escapeCell(value))),
    "",
    "This output is for internal review. It is not a penetration test, certification, or client-ready evidence of security.",
    ""
  );
  return lines.join("\n");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const source = process.argv[2];
  if (!source) {
    process.stderr.write("Usage: npm run security:report -- path/to/local-audit.json\n");
    process.exitCode = 2;
  } else {
    try {
      const text = readFileSync(source, { encoding: "utf8" });
      if (text.length > 4 * 1024 * 1024) throw new Error("Report file exceeds 4 MB limit.");
      process.stdout.write(formatReport(JSON.parse(text)));
    } catch (error) {
      process.stderr.write("Cannot format report: " + (error instanceof Error ? error.message : "unknown error") + "\n");
      process.exitCode = 1;
    }
  }
}
