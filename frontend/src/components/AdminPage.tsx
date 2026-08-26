import { ArrowLeft, ArrowRight, ChartLineUp, Clock, MapPin, Package, ShieldCheck, Snowflake, Truck, UsersThree } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { signInHref, signOutHref, useSession } from "../auth";

interface DashboardData {
  dataMode: "live" | "preview";
  generatedAt: string;
  metrics: Array<{ label: string; value: string; change: string; tone: string }>;
  orders: Array<{ id: string; customer: string; city: string; quantity: string; status: string; eta: string }>;
  inventory: Array<{ label: string; value: number; detail: string }>;
  coverage: Array<{ city: string; deliveries: number; status: string }>;
}

const devPreview: DashboardData = {
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

export function AdminPage() {
  const session = useSession();
  const localPreview = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "admin";
  const [data, setData] = useState<DashboardData | null>(localPreview ? devPreview : null);
  const [loading, setLoading] = useState(!localPreview);
  const [status, setStatus] = useState(0);

  const loadDashboard = useCallback(async (signal?: AbortSignal) => {
    if (localPreview) return;
    setLoading(true);
    try {
      const response = await fetch("/api/admin/overview", { headers: { Accept: "application/json" }, signal });
      setStatus(response.status);
      if (!response.ok) { setData(null); return; }
      setData(await response.json() as DashboardData);
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      setStatus(503);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [localPreview]);

  useEffect(() => {
    const controller = new AbortController();
    void loadDashboard(controller.signal);
    return () => controller.abort();
  }, [loadDashboard]);

  if ((session.loading || loading) && !localPreview) return <AdminState kind="loading" />;
  if (!localPreview && (status === 401 || !session.user)) return <AdminState kind="signin" />;
  if (!localPreview && (status === 403 || !session.user?.isAdmin)) return <AdminState kind="forbidden" />;
  if (!data) return <AdminState kind="error" onRetry={() => { void loadDashboard(); }} />;

  const displayName = session.user?.name || (localPreview ? "Admin preview" : "Administrator");
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/" aria-label="Dry Ice Supply India home"><img src="/assets/brand-lockup.webp" alt="Dry Ice Supply India" /></a>
        <nav aria-label="Admin navigation">
          <a className="is-active" href="#overview"><ChartLineUp /> Overview</a>
          <a href="#orders"><Package /> Orders</a>
          <a href="#inventory"><Snowflake /> Inventory</a>
          <a href="#delivery"><Truck /> Delivery network</a>
        </nav>
        <div className="admin-sidebar-foot"><ShieldCheck weight="fill" /><span>Protected workspace<strong>Server-verified access</strong></span></div>
      </aside>

      <main className="admin-main" id="overview">
        <header className="admin-topbar">
          <div><p className="eyebrow">Operations control</p><h1>Company overview</h1></div>
          <div className="admin-user"><span>{displayName.slice(0, 1).toUpperCase()}</span><div><strong>{displayName}</strong><small>{session.user?.email || "Local design preview"}</small></div>{!localPreview && <a href={signOutHref("/")}>Sign out</a>}</div>
        </header>

        {data.dataMode === "preview" && <div className="admin-banner" role="status"><Snowflake weight="fill" /><span><strong>Preview data</strong>Connect `COMPANY_DASHBOARD_JSON` to replace these sample operational figures.</span></div>}

        <section className="metric-grid" aria-label="Company metrics">
          {data.metrics.map((metric) => <article className={`metric-card tone-${metric.tone}`} key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.change}</small></article>)}
        </section>

        <section className="admin-grid">
          <article className="admin-panel admin-orders" id="orders">
            <div className="panel-heading"><div><p className="eyebrow">Live fulfilment</p><h2>Recent orders</h2></div><span><Clock /> Updated {new Date(data.generatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span></div>
            <div className="table-wrap">
              <table><thead><tr><th>Order</th><th>Customer</th><th>Destination</th><th>Quantity</th><th>Status</th><th>ETA</th></tr></thead><tbody>{data.orders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.customer}</td><td><MapPin />{order.city}</td><td>{order.quantity}</td><td><span className={`status-badge status-${order.status.toLowerCase().replace(" ", "-")}`}>{order.status}</span></td><td>{order.eta}</td></tr>)}</tbody></table>
            </div>
          </article>

          <article className="admin-panel" id="inventory">
            <div className="panel-heading"><div><p className="eyebrow">Cold stock</p><h2>Inventory readiness</h2></div><Snowflake /></div>
            <div className="inventory-list">{data.inventory.map((item) => <div key={item.label}><div><strong>{item.label}</strong><span>{item.detail}</span></div><b>{item.value}%</b><span className="progress-track"><i style={{ width: `${item.value}%` }} /></span></div>)}</div>
          </article>

          <article className="admin-panel" id="delivery">
            <div className="panel-heading"><div><p className="eyebrow">Today</p><h2>Delivery network</h2></div><Truck /></div>
            <div className="coverage-list">{data.coverage.map((item) => <div key={item.city}><span className="coverage-icon"><MapPin weight="fill" /></span><div><strong>{item.city}</strong><small>{item.deliveries} deliveries</small></div><span className={item.status.includes("delay") ? "is-delay" : ""}>{item.status}</span></div>)}</div>
          </article>
        </section>
      </main>
    </div>
  );
}

function AdminState({ kind, onRetry }: { kind: "loading" | "signin" | "forbidden" | "error"; onRetry?: () => void }) {
  const copy = {
    loading: ["Checking secure access", "Verifying your account and permissions."],
    signin: ["Admin sign-in required", "Sign in with an approved administrator account to continue."],
    forbidden: ["Access denied", "This account does not have permission to view company operations."],
    error: ["Dashboard unavailable", "The secure data service could not be reached. Try again."],
  }[kind];
  return <main className="admin-state"><a href="/" className="admin-state-brand"><img src="/assets/brand-lockup.webp" alt="Dry Ice Supply India" /></a><div className="admin-state-card">{kind === "loading" ? <span className="spinner" /> : kind === "forbidden" ? <ShieldCheck /> : <LockKeyIcon />}<p className="eyebrow">Protected workspace</p><h1>{copy[0]}</h1><p>{copy[1]}</p>{kind === "signin" && <a className="button button-primary" href={signInHref("/admin")}>Sign in securely <ArrowRight /></a>}{kind === "error" && <button className="button button-primary" onClick={onRetry}>Try again</button>}<a className="admin-state-home" href="/"><ArrowLeft /> Back to website</a></div></main>;
}

function LockKeyIcon() { return <span className="admin-lock"><UsersThree weight="duotone" /></span>; }
