import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { handleInquiryWebhook } from "@/lib/inquiry/receiver/handle";
import { InquiryPersistenceError, type InquiryStore, type ProjectInquiryRow } from "@/lib/inquiry/receiver/persist";
import type { LeadStoredEvent } from "@/lib/inquiry/receiver/notify";
import { deliverProjectInquiryNotification, type TransactionalEmailTransport } from "@/lib/notifications/deliver";
import { buildInquiryNotification, inquirySubject } from "@/lib/notifications/message";
import { createResendTransport, safeFromIdentity, type ResendEmailPayload } from "@/lib/notifications/resend";

const secret = "test-secret";
const inquiryId = "11111111-1111-4111-8111-111111111111";

function event(patch: Partial<LeadStoredEvent> = {}): LeadStoredEvent {
  return {
    inquiryId,
    submittedAt: "2026-10-06T15:00:00.000Z",
    contact: {
      name: "Ada Example",
      email: "ada@example.com",
      phone: "555-0100",
      preferredContact: "Email",
    },
    company: {
      name: "Example Operations",
      description: "Field service visits are scheduled from a spreadsheet.",
      type: "Other",
      size: "2–10",
    },
    problem: {
      description: "Job status lives in a spreadsheet the office cannot see.",
      currentProcess: "The office calls the field.",
      affectedUsers: ["Employees"],
      frequency: "Daily",
    },
    systems: {
      currentTools: "Spreadsheets",
      manualDataMovement: "Yes",
      keepExisting: "No",
      systemsToKeep: "",
    },
    project: {
      desiredOutcome: "The office can see each job without asking the field.",
      solutionAwareness: "No — I just know the problem",
      areas: ["Custom Software"],
      timeline: "Exploring / No deadline",
      budget: "Not yet",
    },
    sourcePage: "/start-a-project",
    referrer: "https://www.systemarchq.com/services",
    ...patch,
  };
}

function productionEnv(transport: TransactionalEmailTransport | null, notificationEmail = "support@systemarchq.com") {
  return {
    nodeEnv: "production",
    notificationEmail,
    defaultEmail: "support@systemarchq.com",
    transport,
  };
}

function memoryStore() {
  const rows = new Map<string, ProjectInquiryRow>();
  const store: InquiryStore = {
    async insert(row) {
      if (rows.has(row.external_inquiry_id)) return "duplicate";
      rows.set(row.external_inquiry_id, row);
      return "created";
    },
  };
  return { rows, store };
}

function webhookBody(companyName = "Example Operations") {
  const sample = event();
  return {
    event: "systemarc.project_inquiry.created",
    version: "1.0",
    inquiryId,
    submittedAt: sample.submittedAt,
    contact: sample.contact,
    company: { ...sample.company, name: companyName },
    problem: sample.problem,
    systems: sample.systems,
    project: sample.project,
    metadata: { sourcePage: sample.sourcePage, referrer: sample.referrer },
  };
}

describe("inquiry notification message", () => {
  it("addresses only the internal mailbox and replies to the prospect", () => {
    const message = buildInquiryNotification(event(), "support@systemarchq.com");
    assert.equal(message.to, "support@systemarchq.com");
    assert.equal(message.subject, "New SystemArc Project Inquiry — Example Operations");
    assert.equal(message.replyTo, "ada@example.com");
    assert.equal(message.text.includes("Reply to Prospect"), true);
    assert.equal(message.text.includes("mailto:ada@example.com"), true);
    assert.equal(message.html.includes('href="mailto:ada@example.com"'), true);
    assert.equal(message.html.includes("support@systemarchq.com"), false);
    assert.equal("cc" in message, false);
    assert.equal("bcc" in message, false);
    assert.equal(message.text.includes("555-0100"), true);
    assert.equal(message.text.includes("https://www.systemarchq.com/services"), true);
    assert.equal(message.text.includes("System details"), false);
    for (const heading of ["CONTACT", "COMPANY", "THE PROBLEM", "CURRENT SYSTEMS", "THE PROJECT", "SOURCE"]) {
      assert.equal(message.text.includes(heading), true);
      assert.equal(message.html.includes(heading), true);
    }
  });

  it("uses the fallback subject when the company name cannot be placed in a header", () => {
    assert.equal(inquirySubject(""), "New SystemArc Project Inquiry");
    assert.equal(inquirySubject(" \r\n\t "), "New SystemArc Project Inquiry");
    const subject = inquirySubject("Acme\r\nBcc: evil@example.com");
    assert.equal(subject.includes("\n"), false);
    assert.equal(subject.includes("\r"), false);
    assert.equal(subject, "New SystemArc Project Inquiry — Acme Bcc: evil@example.com");
  });

  it("escapes prospect content in HTML and omits an unsafe reply link", () => {
    const message = buildInquiryNotification(
      event({
        contact: {
          name: `<script>alert("x")</script>`,
          email: "ada@example.com\nBcc:evil@example.com",
          phone: "",
          preferredContact: "Email",
        },
        company: {
          name: `Acme & Co`,
          description: `<img src=x onerror="alert(1)">`,
          type: "Other",
          size: "",
        },
        referrer: "",
      }),
      "support@systemarchq.com",
    );
    assert.equal(message.html.includes("<script"), false);
    assert.equal(message.html.includes("<img"), false);
    assert.equal(message.html.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"), true);
    assert.equal(message.html.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"), true);
    assert.equal(message.html.includes("Acme &amp; Co"), true);
    assert.equal(message.replyTo, undefined);
    assert.equal("replyTo" in message, false);
    assert.equal(message.html.includes("mailto:"), false);
    assert.equal(message.text.includes("Phone:"), false);
    assert.equal(message.text.includes("Referrer:"), false);
    assert.equal(message.text.includes("<script>alert(\"x\")</script>"), true);
  });
});

describe("inquiry notification delivery", () => {
  it("sends after a new stored inquiry and does not send a duplicate or a failed insert", async () => {
    const sent: string[] = [];
    const transport: TransactionalEmailTransport = {
      name: "test",
      async send(message) {
        sent.push(message.subject);
        return { providerMessageId: "test-message" };
      },
    };
    const { rows, store } = memoryStore();
    const notify = async (notice: LeadStoredEvent) => {
      await deliverProjectInquiryNotification(notice, productionEnv(transport));
    };
    const request = (body: unknown) =>
      new Request("https://www.systemarchq.com/api/inquiries/webhook", {
        method: "POST",
        headers: {
          authorization: `Bearer ${secret}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

    const created = await handleInquiryWebhook(request(webhookBody()), { secret, store, notify });
    assert.equal(created.status, 201);
    assert.deepEqual(sent, ["New SystemArc Project Inquiry — Example Operations"]);
    assert.equal(rows.has(inquiryId), true);

    const duplicate = await handleInquiryWebhook(request(webhookBody("Replacement Co")), {
      secret,
      store,
      notify,
    });
    assert.equal(duplicate.status, 200);
    assert.equal(sent.length, 1);

    const failed = await handleInquiryWebhook(request(webhookBody()), {
      secret,
      store: {
        async insert() {
          throw new InquiryPersistenceError("persist_failed");
        },
      },
      notify,
    });
    assert.equal(failed.status, 503);
    assert.equal(sent.length, 1);
    assert.equal(rows.has(inquiryId), true);
  });

  it("keeps a successful result when the provider throws and does not log the provider error", async () => {
    const lines: string[] = [];
    const original = console.error;
    console.error = (line?: unknown) => {
      lines.push(String(line));
    };
    let result: { status: string };
    try {
      result = await deliverProjectInquiryNotification(event(), productionEnv({
        name: "test",
        async send() {
          throw new Error("provider down api_key=secret ada@example.com");
        },
      }));
    } finally {
      console.error = original;
    }
    assert.equal(result.status, "failed");
    assert.equal(lines.some((line) => line.includes("project_inquiry_notification_failed")), true);
    assert.equal(lines.some((line) => line.includes(inquiryId)), true);
    assert.equal(lines.join("\n").includes("api_key"), false);
    assert.equal(lines.join("\n").includes("ada@example.com"), false);
    assert.equal(lines.join("\n").includes("Example Operations"), false);
  });

  it("does not send or report success when production has no provider", async () => {
    const lines: string[] = [];
    const original = console.error;
    console.error = (line?: unknown) => {
      lines.push(String(line));
    };
    let result: { status: string };
    try {
      result = await deliverProjectInquiryNotification(event(), productionEnv(null));
    } finally {
      console.error = original;
    }
    assert.equal(result.status, "not_configured");
    assert.equal(lines.join("\n").includes("project_inquiry_notification_sent"), false);
    assert.equal(lines.join("\n").includes("project_inquiry_notification_not_configured"), true);
    assert.equal(lines.join("\n").includes("ada@example.com"), false);
  });

  it("does not send during development even when a transport is present", async () => {
    let called = false;
    const lines: string[] = [];
    const original = console.info;
    console.info = (line?: unknown) => {
      lines.push(String(line));
    };
    let result: { status: string };
    try {
      result = await deliverProjectInquiryNotification(event(), {
        nodeEnv: "development",
        notificationEmail: "support@systemarchq.com",
        defaultEmail: "support@systemarchq.com",
        transport: {
          name: "test",
          async send() {
            called = true;
            return { providerMessageId: "test-message" };
          },
        },
      });
    } finally {
      console.info = original;
    }
    assert.equal(called, false);
    assert.equal(result.status, "skipped");
    assert.equal(lines.join("\n").includes("project_inquiry_notification_skipped"), true);
    assert.equal(lines.join("\n").includes("ada@example.com"), false);
  });

  it("refuses a destination that is not one mailbox", async () => {
    let called = false;
    const result = await deliverProjectInquiryNotification(
      event(),
      productionEnv(
        {
          name: "test",
          async send() {
            called = true;
            return { providerMessageId: "test-message" };
          },
        },
        "support@systemarchq.com, other@example.com",
      ),
    );
    assert.equal(called, false);
    assert.equal(result.status, "not_configured");
  });
});

const resendFrom = "SystemArc <notifications@systemarchq.com>";
const resendTo = "support@systemarchq.com";

function resendTransport(send: (payload: ResendEmailPayload) => Promise<{ id?: string | null }>) {
  return createResendTransport({ apiKey: "test-key", from: resendFrom, send });
}

describe("Resend inquiry notification", () => {
  it("sends one accepted message for a new inquiry and does not send a duplicate or a failed insert", async () => {
    const sent: ResendEmailPayload[] = [];
    const transport = resendTransport(async (payload) => {
      sent.push(payload);
      return { id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794" };
    });
    assert.ok(transport);
    const { rows, store } = memoryStore();
    const notify = async (notice: LeadStoredEvent) => {
      await deliverProjectInquiryNotification(notice, productionEnv(transport));
    };
    const request = (body: unknown) =>
      new Request("https://www.systemarchq.com/api/inquiries/webhook", {
        method: "POST",
        headers: {
          authorization: `Bearer ${secret}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

    const created = await handleInquiryWebhook(request(webhookBody()), { secret, store, notify });
    assert.equal(created.status, 201);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].from, resendFrom);
    assert.equal(sent[0].to, resendTo);
    assert.equal(sent[0].replyTo, "ada@example.com");
    assert.equal(sent[0].subject, "New SystemArc Project Inquiry — Example Operations");
    assert.equal("cc" in sent[0], false);
    assert.equal("bcc" in sent[0], false);
    assert.equal(rows.has(inquiryId), true);

    const duplicate = await handleInquiryWebhook(request(webhookBody("Replacement Co")), {
      secret,
      store,
      notify,
    });
    assert.equal(duplicate.status, 200);
    assert.equal(sent.length, 1);

    const failed = await handleInquiryWebhook(request(webhookBody()), {
      secret,
      store: {
        async insert() {
          throw new InquiryPersistenceError("persist_failed");
        },
      },
      notify,
    });
    assert.equal(failed.status, 503);
    assert.equal(sent.length, 1);
  });

  it("keeps the stored inquiry when Resend does not accept the message", async () => {
    const lines: string[] = [];
    const original = console.error;
    console.error = (line?: unknown) => {
      lines.push(String(line));
    };
    const transport = resendTransport(async () => {
      throw new Error("provider down api_key=secret ada@example.com");
    });
    const { rows, store } = memoryStore();
    const notify = async (notice: LeadStoredEvent) => {
      await deliverProjectInquiryNotification(notice, productionEnv(transport));
    };
    let created: Response;
    try {
      created = await handleInquiryWebhook(
        new Request("https://www.systemarchq.com/api/inquiries/webhook", {
          method: "POST",
          headers: {
            authorization: `Bearer ${secret}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(webhookBody()),
        }),
        { secret, store, notify },
      );
    } finally {
      console.error = original;
    }
    assert.equal(created.status, 201);
    assert.equal(rows.has(inquiryId), true);
    assert.equal(lines.some((line) => line.includes("project_inquiry_notification_failed")), true);
    assert.equal(lines.some((line) => line.includes(inquiryId)), true);
    assert.equal(lines.join("\n").includes("api_key"), false);
    assert.equal(lines.join("\n").includes("ada@example.com"), false);
    assert.equal(lines.join("\n").includes("project_inquiry_notification_sent"), false);
  });

  it("reports sent only after Resend returns an id, and logs that id", async () => {
    const lines: string[] = [];
    const original = console.info;
    console.info = (line?: unknown) => {
      lines.push(String(line));
    };
    const providerMessageId = "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794";
    let result: { status: string };
    try {
      result = await deliverProjectInquiryNotification(
        event(),
        productionEnv(
          resendTransport(async () => {
            return { id: providerMessageId };
          }),
        ),
      );
    } finally {
      console.info = original;
    }
    assert.equal(result.status, "sent");
    assert.equal(lines.some((line) => line.includes(providerMessageId)), true);
    assert.equal(lines.join("\n").includes(inquiryId), true);
    assert.equal(lines.join("\n").includes("Example Operations"), false);
    assert.equal(lines.join("\n").includes("ada@example.com"), false);
  });

  it("does not report success when Resend returns no id", async () => {
    const lines: string[] = [];
    const original = console.error;
    console.error = (line?: unknown) => {
      lines.push(String(line));
    };
    let result: { status: string };
    try {
      result = await deliverProjectInquiryNotification(
        event(),
        productionEnv(
          resendTransport(async () => {
            return { id: "" };
          }),
        ),
      );
    } finally {
      console.error = original;
    }
    assert.equal(result.status, "failed");
    assert.equal(lines.join("\n").includes("project_inquiry_notification_sent"), false);
  });

  it("does not log an unsafe provider message id", async () => {
    const lines: string[] = [];
    const original = console.info;
    console.info = (line?: unknown) => {
      lines.push(String(line));
    };
    let result: { status: string };
    try {
      result = await deliverProjectInquiryNotification(
        event(),
        productionEnv(
          resendTransport(async () => {
            return { id: "ok\nsecret" };
          }),
        ),
      );
    } finally {
      console.info = original;
    }
    assert.equal(result.status, "sent");
    assert.equal(lines.join("\n").includes("secret"), false);
    assert.equal(lines.join("\n").includes("project_inquiry_notification_sent"), true);
  });

  it("stays unconfigured when the Resend key, sender, or destination is missing", async () => {
    let called = false;
    const send = async () => {
      called = true;
      return { id: "should-not-send" };
    };
    assert.equal(createResendTransport({ apiKey: undefined, from: resendFrom, send }), null);
    assert.equal(createResendTransport({ apiKey: "   ", from: resendFrom, send }), null);
    assert.equal(createResendTransport({ apiKey: "test-key", from: undefined, send }), null);
    assert.equal(createResendTransport({ apiKey: "test-key", from: "SystemArc <bad\r\n@example.com>", send }), null);
    assert.equal(safeFromIdentity("Prospect <ada@example.com\nBcc:evil@example.com>"), "");

    const missingKey = await deliverProjectInquiryNotification(event(), productionEnv(null));
    assert.equal(missingKey.status, "not_configured");

    const missingDestination = await deliverProjectInquiryNotification(event(), {
      nodeEnv: "production",
      notificationEmail: undefined,
      defaultEmail: "",
      transport: resendTransport(send),
    });
    assert.equal(missingDestination.status, "not_configured");
    assert.equal(called, false);
  });

  it("sets Reply-To only for a valid prospect mailbox and escapes the message", async () => {
    const sent: ResendEmailPayload[] = [];
    const transport = resendTransport(async (payload) => {
      sent.push(payload);
      return { id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794" };
    });
    await deliverProjectInquiryNotification(
      event({
        contact: {
          name: `<script>alert("x")</script>`,
          email: "ada@example.com",
          phone: "",
          preferredContact: "Email",
        },
        company: {
          name: "Acme\r\nBcc: evil@example.com",
          description: `<img src=x onerror="alert(1)">`,
          type: "Other",
          size: "",
        },
      }),
      productionEnv(transport),
    );
    assert.equal(sent.length, 1);
    assert.equal(sent[0].from, resendFrom);
    assert.equal(sent[0].replyTo, "ada@example.com");
    assert.equal(sent[0].subject.includes("\n"), false);
    assert.equal(sent[0].subject.includes("\r"), false);
    assert.equal(sent[0].subject, "New SystemArc Project Inquiry — Acme Bcc: evil@example.com");
    assert.equal(sent[0].html.includes("<script"), false);
    assert.equal(sent[0].html.includes("<img"), false);
    assert.equal(sent[0].html.includes("&lt;script&gt;"), true);

    sent.length = 0;
    await deliverProjectInquiryNotification(
      event({
        contact: {
          name: "Ada Example",
          email: "ada@example.com\nBcc:evil@example.com",
          phone: "",
          preferredContact: "Email",
        },
      }),
      productionEnv(transport),
    );
    assert.equal(sent.length, 1);
    assert.equal(sent[0].replyTo, undefined);
    assert.equal(sent[0].from, resendFrom);
  });
});
