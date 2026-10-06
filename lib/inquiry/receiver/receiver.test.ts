import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { authorizeInquiryReceiver } from "./auth";
import { handleInquiryWebhook } from "./handle";
import { InquiryPersistenceError, type InquiryStore, type ProjectInquiryRow } from "./persist";
import { validateInquiryWebhook } from "./validate";

const secret = "test-secret";
const inquiryId = "11111111-1111-4111-8111-111111111111";

function payload(patch: Record<string, unknown> = {}) {
  return {
    event: "systemarc.project_inquiry.created",
    version: "1.0",
    inquiryId,
    submittedAt: "2026-10-06T15:00:00.000Z",
    contact: {
      name: "Ada Example",
      email: "ada@example.com",
      phone: "",
      preferredContact: "Email",
    },
    company: {
      name: "Example Operations",
      description: "Field service visits are scheduled from a spreadsheet.",
      type: "Other",
      size: "",
    },
    problem: {
      description: "Job status lives in a spreadsheet the office cannot see.",
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
      desiredOutcome: "The office can see each job without asking the field.",
      solutionAwareness: "No — I just know the problem",
      areas: [],
      timeline: "",
      budget: "",
    },
    metadata: {
      sourcePage: "/start-a-project",
      referrer: "",
    },
    ...patch,
  };
}

function memoryStore() {
  const rows = new Map<string, ProjectInquiryRow>();
  const store: InquiryStore = {
    async insert(row) {
      const existing = rows.get(row.external_inquiry_id);
      if (existing) return "duplicate";
      rows.set(row.external_inquiry_id, row);
      return "created";
    },
  };
  return { rows, store };
}

function request(
  body: unknown,
  headers: Record<string, string> = {
    authorization: `Bearer ${secret}`,
    "content-type": "application/json",
  },
) {
  return new Request("https://www.systemarchq.com/api/inquiries/webhook", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function read(response: Response) {
  return {
    status: response.status,
    body: (await response.json()) as Record<string, unknown>,
  };
}

describe("receiver authentication", () => {
  it("rejects a missing secret, a missing token, and a wrong token", () => {
    assert.equal(authorizeInquiryReceiver("Bearer test-secret", undefined), "unconfigured");
    assert.equal(authorizeInquiryReceiver(null, secret), "missing");
    assert.equal(authorizeInquiryReceiver("Basic test-secret", secret), "missing");
    assert.equal(authorizeInquiryReceiver("Bearer other-secret", secret), "mismatch");
    assert.equal(authorizeInquiryReceiver("Bearer test-secret", secret), "ok");
  });
});

describe("receiver validation", () => {
  it("accepts the version 1.0 payload and ignores no internal status", () => {
    const result = validateInquiryWebhook(payload());
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.payload.inquiryId, inquiryId);
      assert.equal(result.payload.project.solutionAwareness, "No — I just know the problem");
      assert.equal("status" in result.payload, false);
    }
  });

  it("rejects the wrong event, version, shape, and a caller-supplied status", () => {
    assert.equal(validateInquiryWebhook(payload({ event: "other" })).ok, false);
    assert.equal(validateInquiryWebhook(payload({ version: "2.0" })).ok, false);
    assert.equal(validateInquiryWebhook(payload({ inquiryId: "client-id" })).ok, false);
    assert.equal(validateInquiryWebhook(payload({ submittedAt: "tomorrow" })).ok, false);
    assert.equal(validateInquiryWebhook(payload({ contact: { name: "A" } })).ok, false);
    assert.equal(validateInquiryWebhook(payload({ status: "won" })).ok, false);
    assert.equal(validateInquiryWebhook(payload({ notes: "secret note" })).ok, false);
    const users = validateInquiryWebhook(
      payload({
        problem: {
          description: "Job status lives in a spreadsheet the office cannot see.",
          currentProcess: "",
          affectedUsers: ["Customers", "Customers"],
          frequency: "",
        },
      }),
    );
    assert.equal(users.ok, false);
  });
});

describe("receiver HTTP behavior", () => {
  it("stores one valid inquiry and returns a minimal receipt", async () => {
    const { rows, store } = memoryStore();
    const notified: string[] = [];
    const response = await handleInquiryWebhook(request(payload()), {
      secret,
      store,
      notify: async (event) => {
        notified.push(event.inquiryId);
      },
    });
    const result = await read(response);
    assert.equal(result.status, 201);
    assert.deepEqual(result.body, { received: true, inquiryId, duplicate: false });
    assert.deepEqual(notified, [inquiryId]);
    const row = rows.get(inquiryId);
    assert.ok(row);
    assert.equal(row.status, "new");
    assert.equal(row.keep_existing, "");
    assert.equal(row.systems_to_keep, "");
    assert.equal(row.contact_email, "ada@example.com");
    assert.equal(JSON.stringify(result.body).includes("ada@example.com"), false);
    assert.equal("authorization" in row.raw_payload, false);
    assert.equal(row.raw_payload.inquiryId, inquiryId);
  });

  it("returns success for a duplicate without replacing the original row", async () => {
    const { rows, store } = memoryStore();
    const notified: string[] = [];
    const deps = {
      secret,
      store,
      notify: async (event: { inquiryId: string }) => {
        notified.push(event.inquiryId);
      },
    };
    await handleInquiryWebhook(request(payload()), deps);
    const second = await handleInquiryWebhook(
      request(payload({ contact: { ...payload().contact, name: "Replacement Name" } })),
      deps,
    );
    const result = await read(second);
    assert.equal(result.status, 200);
    assert.deepEqual(result.body, { received: true, inquiryId, duplicate: true });
    assert.equal(rows.get(inquiryId)?.contact_name, "Ada Example");
    assert.deepEqual(notified, [inquiryId]);
  });

  it("fails closed for auth, content type, malformed JSON, and a database error", async () => {
    const { store } = memoryStore();
    const cases: Array<{ request: Request; status: number; error: string }> = [
      {
        request: request(payload(), { "content-type": "application/json" }),
        status: 401,
        error: "Unauthorized.",
      },
      {
        request: request(payload(), {
          authorization: "Bearer wrong",
          "content-type": "application/json",
        }),
        status: 401,
        error: "Unauthorized.",
      },
      {
        request: request(payload(), {
          authorization: `Bearer ${secret}`,
          "content-type": "text/plain",
        }),
        status: 415,
        error: "Unsupported media type.",
      },
      {
        request: request("{", {
          authorization: `Bearer ${secret}`,
          "content-type": "application/json",
        }),
        status: 400,
        error: "Invalid inquiry payload.",
      },
      {
        request: request(payload({ event: "other" })),
        status: 400,
        error: "Invalid inquiry payload.",
      },
      {
        request: request(payload({ version: "9" })),
        status: 400,
        error: "Invalid inquiry payload.",
      },
    ];

    for (const item of cases) {
      const result = await read(await handleInquiryWebhook(item.request, { secret, store }));
      assert.equal(result.status, item.status);
      assert.equal(result.body.error, item.error);
      assert.equal(JSON.stringify(result.body).includes("ada@example.com"), false);
    }

    const unconfigured = await read(
      await handleInquiryWebhook(request(payload()), { secret: "  ", store }),
    );
    assert.equal(unconfigured.status, 503);

    const lines: string[] = [];
    const original = console.error;
    console.error = (line?: unknown) => {
      lines.push(String(line));
    };
    let failed: { status: number; body: Record<string, unknown> };
    try {
      failed = await read(
        await handleInquiryWebhook(request(payload()), {
          secret,
          store: {
            async insert() {
              throw new Error("postgres password=sb_secret_example relation project_inquiries");
            },
          },
        }),
      );
    } finally {
      console.error = original;
    }
    assert.equal(failed.status, 503);
    assert.equal(failed.body.error, "Inquiry could not be stored.");
    assert.equal(JSON.stringify(failed.body).includes("sb_secret_example"), false);
    assert.equal(lines.join("\n").includes("sb_secret_example"), false);
    assert.equal(lines.join("\n").includes("ada@example.com"), false);
  });

  it("still confirms receipt when a notification handler fails after the row is stored", async () => {
    const { rows, store } = memoryStore();
    const response = await handleInquiryWebhook(request(payload()), {
      secret,
      store,
      notify: async () => {
        throw new Error("smtp down ada@example.com");
      },
    });
    const result = await read(response);
    assert.equal(result.status, 201);
    assert.equal(result.body.duplicate, false);
    assert.equal(rows.has(inquiryId), true);
    assert.equal(JSON.stringify(result.body).includes("ada@example.com"), false);
  });

  it("reports persistence failures without claiming the inquiry was stored", async () => {
    const response = await handleInquiryWebhook(request(payload()), {
      secret,
      store: {
        async insert() {
          throw new InquiryPersistenceError("persist_failed", { code: "08006" });
        },
      },
    });
    const result = await read(response);
    assert.equal(result.status, 503);
    assert.equal(result.body.received, undefined);
    assert.equal(JSON.stringify(result.body).includes("08006"), false);
  });
});
