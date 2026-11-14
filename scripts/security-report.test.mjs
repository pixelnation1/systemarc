import test from "node:test";
import assert from "node:assert/strict";
import { escapeCell, formatReport } from "./security-report.mjs";

test("escapes unsafe characters in Markdown tables", () => {
  assert.equal(escapeCell("hello|world\n<abc>"), "hello\\|world &lt;abc&gt;");
});

test("formats a redacted report without source snippets", () => {
  const output = formatReport({
    tool: "SystemArc Security Preflight",
    repository: "sample",
    generatedAt: "2026-11-13T00:00:00Z",
    inspectedFiles: 2,
    counts: { critical: 0, high: 1, review: 0 },
    findings: [{ severity: "high", rule: "tracked-env-file", path: ".env.local", line: 1, description: "Review env file" }],
    limits: ["No active testing."],
  });
  assert.match(output, /tracked-env-file/);
  assert.match(output, /No active testing/);
});

test("rejects arbitrary JSON objects", () => {
  assert.throws(() => formatReport({ findings: [] }), /Expected a SystemArc/);
});
