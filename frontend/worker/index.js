export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const user = getUser(request, env);

    if (url.pathname === "/api/session") {
      return json(user ? { authenticated: true, user } : { authenticated: false });
    }

    if (url.pathname === "/api/admin/overview") {
      if (!user) return json({ error: "Authentication required" }, 401);
      if (!user.isAdmin) return json({ error: "Administrator access required" }, 403);
      return json(getDashboardData(env));
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

function getUser(request, env) {
  const id = request.headers.get("oai-authenticated-user-id")?.trim();
  const email = request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  if (!id || !email) return null;
  const encodedName = request.headers.get("oai-authenticated-user-full-name");
  const encoding = request.headers.get("oai-authenticated-user-full-name-encoding");
  let name = email.split("@")[0];
  if (encodedName && encoding === "percent-encoded-utf-8") {
    try { name = decodeURIComponent(encodedName); } catch { /* keep safe fallback */ }
  }
  const ids = splitAllowlist(env.ADMIN_USER_IDS);
  const emails = splitAllowlist(env.ADMIN_EMAILS).map((value) => value.toLowerCase());
  return { id, email, name, isAdmin: ids.includes(id) || emails.includes(email) };
}

function splitAllowlist(value) {
  return typeof value === "string" ? value.split(",").map((item) => item.trim()).filter(Boolean) : [];
}

function getDashboardData(env) {
  if (typeof env.COMPANY_DASHBOARD_JSON === "string") {
    try { return { ...JSON.parse(env.COMPANY_DASHBOARD_JSON), dataMode: "live", generatedAt: new Date().toISOString() }; } catch { /* use preview */ }
  }
  return {
    dataMode: "preview",
    generatedAt: new Date().toISOString(),
    metrics: [
      { label: "Orders today", value: "24", change: "+12% vs yesterday", tone: "cyan" },
      { label: "Dry ice dispatched", value: "1,860 kg", change: "82% of daily plan", tone: "blue" },
      { label: "On-time delivery", value: "96.4%", change: "+1.8% this month", tone: "green" },
      { label: "Active customers", value: "148", change: "11 ordering this week", tone: "violet" },
    ],
    orders: [
      { id: "RS-2048", customer: "Northstar Biologics", city: "Gurugram", quantity: "120 kg", status: "In transit", eta: "14:30" },
      { id: "RS-2047", customer: "Harbor Fresh Foods", city: "New Delhi", quantity: "80 kg", status: "Packed", eta: "16:15" },
      { id: "RS-2046", customer: "Apex Process Labs", city: "Noida", quantity: "240 kg", status: "Delivered", eta: "11:42" },
      { id: "RS-2045", customer: "MedRoute Logistics", city: "Faridabad", quantity: "60 kg", status: "Confirmed", eta: "Tomorrow" },
    ],
    inventory: [
      { label: "Bricks ready", value: 74, detail: "2,960 kg available" },
      { label: "Production capacity", value: 62, detail: "3,100 / 5,000 kg" },
      { label: "Insulated boxes", value: 86, detail: "172 units ready" },
    ],
    coverage: [
      { city: "Delhi NCR", deliveries: 12, status: "On schedule" },
      { city: "Gurugram", deliveries: 6, status: "On schedule" },
      { city: "Noida", deliveries: 4, status: "Minor delay" },
      { city: "Faridabad", deliveries: 2, status: "On schedule" },
    ],
  };
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" } });
}
