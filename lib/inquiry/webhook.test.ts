import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, describe, it } from "node:test";
import type { ProjectInquiry } from "./model";
import {
  InquiryDeliveryError,
  deliverInquiryWebhook,
  inquiryWebhookEvent,
  inquiryWebhookUserAgent,
  inquiryWebhookVersion,
  logInquiryDeliveryFailure,
  selectInquiryDelivery,
} from "./webhook";

const servers: Server[] = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve) => {
          server.closeAllConnections?.();
          server.close(() => resolve());
        }),
    ),
  );
});

const inquiry = {
  id: "11111111-1111-4111-8111-111111111111",
  contact: {
    name: "Ada Example",
    email: "ada@example.com",
    phone: "",
    preferredContact: "Email",
  },
  company: {
    name: "Example Operations",
    description: "Field visits.",
    type: "Other",
    size: "",
  },
  problem: {
    description: "Status lives in a spreadsheet.",
    currentProcess: "",
    affectedUsers: [],
    frequency: "",
  },
  systems: {
    currentTools: "",
    manualDataMovement: "",
    keepExisting: "",
    systemsToKeep: "",
  },
  project: {
    desiredOutcome: "The office can see the job.",
    solutionAwareness: "No — I just know the problem",
    areas: [],
    timeline: "",
    budget: "",
  },
  metadata: {
    submittedAt: "2026-10-06T15:00:00.000Z",
    sourcePage: "/start-a-project",
    referrer: "",
  },
} as ProjectInquiry & { id: string };

function listen(
  handler: (request: import("node:http").IncomingMessage, response: import("node:http").ServerResponse) => void,
) {
  const server = createServer(handler);
  servers.push(server);
  return new Promise<URL>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address() as AddressInfo;
      resolve(new URL(`http://127.0.0.1:${address.port}/inquiry`));
    });
  });
}

async function readBody(request: import("node:http").IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

describe("webhook delivery", () => {
  it("posts the versioned payload and accepts only 2xx", async () => {
    let calls = 0;
    const url = await listen(async (request, response) => {
      calls += 1;
      const body = JSON.parse(await readBody(request));
      assert.equal(request.method, "POST");
      assert.equal(request.headers["content-type"], "application/json");
      assert.equal(request.headers["user-agent"], inquiryWebhookUserAgent);
      assert.equal(request.headers.authorization, undefined);
      assert.equal(body.event, inquiryWebhookEvent);
      assert.equal(body.version, inquiryWebhookVersion);
      assert.equal(body.inquiryId, inquiry.id);
      assert.equal(body.submittedAt, inquiry.metadata.submittedAt);
      assert.equal(body.contact.email, inquiry.contact.email);
      assert.equal(body.systems.keepExisting, "");
      assert.equal(body.metadata.sourcePage, "/start-a-project");
      assert.equal("id" in body, false);
      response.writeHead(204);
      response.end();
    });

    await deliverInquiryWebhook(url, inquiry);
    assert.equal(calls, 1);
  });

  it("sends a bearer token only when a secret is configured", async () => {
    const seen: Array<string | undefined> = [];
    const url = await listen((request, response) => {
      seen.push(request.headers.authorization);
      response.writeHead(200);
      response.end();
    });

    await deliverInquiryWebhook(url, inquiry, { secret: "shared-token" });
    await deliverInquiryWebhook(url, inquiry, { secret: "   " });
    assert.deepEqual(seen, ["Bearer shared-token", undefined]);
  });

  it("fails on 400 and 500 without retrying", async () => {
    for (const status of [400, 500]) {
      let calls = 0;
      const url = await listen((_request, response) => {
        calls += 1;
        response.writeHead(status);
        response.end("no");
      });

      await assert.rejects(
        () => deliverInquiryWebhook(url, inquiry),
        (error: unknown) => {
          assert.ok(error instanceof InquiryDeliveryError);
          assert.equal(error.category, "rejected");
          assert.equal(error.status, status);
          assert.equal(error.message.includes(String(status)), false);
          return true;
        },
      );
      assert.equal(calls, 1);
    }
  });

  it("does not treat a redirect as success", async () => {
    let calls = 0;
    const url = await listen((_request, response) => {
      calls += 1;
      response.writeHead(302, { location: "https://example.invalid/elsewhere" });
      response.end();
    });

    await assert.rejects(
      () => deliverInquiryWebhook(url, inquiry),
      (error: unknown) =>
        error instanceof InquiryDeliveryError && error.category === "rejected" && error.status === 302,
    );
    assert.equal(calls, 1);
  });

  it("fails when the receiver is not listening", async () => {
    const url = await listen((_request, response) => {
      response.end();
    });
    const server = servers.pop();
    assert.ok(server);
    await new Promise<void>((resolve) => server.close(() => resolve()));

    await assert.rejects(
      () => deliverInquiryWebhook(url, inquiry, { timeoutMs: 1000 }),
      (error: unknown) => error instanceof InquiryDeliveryError && error.category === "network",
    );
  });

  it("fails when the receiver does not answer in time", { timeout: 5_000 }, async () => {
    const url = await listen(() => {
      // Leave the socket open until the client aborts.
    });

    await assert.rejects(
      () => deliverInquiryWebhook(url, inquiry, { timeoutMs: 50 }),
      (error: unknown) => error instanceof InquiryDeliveryError && error.category === "timeout",
    );
  });

  it("selects a destination without falling back to the log in production", () => {
    assert.deepEqual(
      selectInquiryDelivery({ nodeEnv: "production", webhookUrl: "", logSink: "true" }),
      { kind: "unavailable", reason: "missing" },
    );
    assert.equal(
      selectInquiryDelivery({
        nodeEnv: "production",
        webhookUrl: "http://127.0.0.1/hook",
        logSink: undefined,
      }).kind,
      "unavailable",
    );
    assert.equal(
      selectInquiryDelivery({
        nodeEnv: "production",
        webhookUrl: "not a url",
        logSink: undefined,
      }).kind,
      "unavailable",
    );
    assert.equal(
      selectInquiryDelivery({
        nodeEnv: "development",
        webhookUrl: "http://127.0.0.1/hook",
        logSink: "true",
      }).kind,
      "unavailable",
    );
    const selected = selectInquiryDelivery({
      nodeEnv: "production",
      webhookUrl: "https://hooks.example.com/inquiry",
      logSink: undefined,
    });
    assert.equal(selected.kind, "webhook");
    if (selected.kind === "webhook") {
      assert.equal(selected.url.href, "https://hooks.example.com/inquiry");
    }
    assert.deepEqual(
      selectInquiryDelivery({ nodeEnv: "development", webhookUrl: "  ", logSink: undefined }),
      { kind: "log" },
    );
  });

  it("logs a failure category without the secret or the inquiry", () => {
    const lines: string[] = [];
    const original = console.error;
    console.error = (line?: unknown) => {
      lines.push(String(line));
    };
    try {
      const leaked = new InquiryDeliveryError("rejected", 502);
      leaked.message = "Bearer shared-token ada@example.com https://hooks.example.com";
      logInquiryDeliveryFailure(inquiry.id, leaked);
    } finally {
      console.error = original;
    }

    assert.equal(lines.length, 1);
    const logged = JSON.parse(lines[0] ?? "{}") as Record<string, unknown>;
    assert.equal(logged.inquiryId, inquiry.id);
    assert.equal(logged.category, "rejected");
    assert.equal(logged.status, 502);
    assert.equal(JSON.stringify(logged).includes("shared-token"), false);
    assert.equal(JSON.stringify(logged).includes("ada@example.com"), false);
    assert.equal(JSON.stringify(logged).includes("hooks.example.com"), false);
  });
});
