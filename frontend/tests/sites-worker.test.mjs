import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("reports anonymous and authenticated sessions without caching identity", async () => {
  const anonymous = await worker.fetch(new Request("https://example.test/api/session"), {});
  assert.deepEqual(await anonymous.json(), { authenticated: false });
  assert.equal(anonymous.headers.get("cache-control"), "no-store");

  const authenticated = await worker.fetch(new Request("https://example.test/api/session", {
    headers: {
      "oai-authenticated-user-id": "user_123",
      "oai-authenticated-user-email": "admin@example.test",
      "oai-authenticated-user-full-name": "Asha%20Kapoor",
      "oai-authenticated-user-full-name-encoding": "percent-encoded-utf-8",
    },
  }), { ADMIN_EMAILS: "admin@example.test" });
  assert.deepEqual(await authenticated.json(), {
    authenticated: true,
    user: { id: "user_123", email: "admin@example.test", name: "Asha Kapoor", isAdmin: true },
  });
});

test("protects company details with server-side administrator checks", async () => {
  const anonymous = await worker.fetch(new Request("https://example.test/api/admin/overview"), {});
  assert.equal(anonymous.status, 401);

  const regular = await worker.fetch(new Request("https://example.test/api/admin/overview", {
    headers: {
      "oai-authenticated-user-id": "user_regular",
      "oai-authenticated-user-email": "staff@example.test",
    },
  }), { ADMIN_EMAILS: "admin@example.test" });
  assert.equal(regular.status, 403);

  const admin = await worker.fetch(new Request("https://example.test/api/admin/overview", {
    headers: {
      "oai-authenticated-user-id": "user_admin",
      "oai-authenticated-user-email": "admin@example.test",
    },
  }), { ADMIN_EMAILS: "admin@example.test" });
  assert.equal(admin.status, 200);
  const payload = await admin.json();
  assert.equal(payload.dataMode, "preview");
  assert.equal(Array.isArray(payload.metrics), true);
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});
