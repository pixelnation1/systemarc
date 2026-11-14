import test from "node:test";
import assert from "node:assert/strict";
import { inspectText } from "./security-audit.mjs";

test("detects tracked .env files but not examples", () => {
  assert.equal(inspectText(".env.local", "SAFE=placeholder").some(f => f.rule === "tracked-env-file"), true);
  assert.equal(inspectText(".env.example", "SAFE=placeholder").some(f => f.rule === "tracked-env-file"), false);
});

test("does not return secret contents in findings", () => {
  const sample = "AKIA" + "A".repeat(16);
  const findings = inspectText("src/config.ts", "const maybe = '" + sample + "';");
  assert.equal(findings.some(f => f.rule === "aws-access-key"), true);
  assert.equal(JSON.stringify(findings).includes(sample), false);
});

test("flags potentially public secrets for human review", () => {
  const findings = inspectText("src/ui.ts", "process.env.NEXT_PUBLIC_PAYMENT_SECRET");
  assert.equal(findings[0].severity, "review");
});
