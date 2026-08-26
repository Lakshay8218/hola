import type { SessionUser } from "./auth";

const SESSION_KEY = "dry-ice-demo-session";
const SESSION_EVENT = "dry-ice-demo-session-change";

export const DEMO_ADMIN_EMAIL = "admin@dryice.local";
export const DEMO_ADMIN_PASSWORD = "Admin@123";

export function getDemoUser(): SessionUser | null {
  if (!import.meta.env.DEV) return null;
  try {
    const stored = window.sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) as SessionUser : null;
  } catch {
    return null;
  }
}

export function signInDemo(email: string, password: string): SessionUser | null {
  if (!import.meta.env.DEV || email.trim().toLowerCase() !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) return null;
  return persistDemoUser({ id: "demo_admin", email: DEMO_ADMIN_EMAIL, name: "Demo Administrator", isAdmin: true });
}

export function signUpDemo(name: string, email: string): SessionUser | null {
  if (!import.meta.env.DEV) return null;
  return persistDemoUser({ id: `demo_${Date.now()}`, email: email.trim().toLowerCase(), name: name.trim(), isAdmin: false });
}

export function signOutDemo() {
  if (!import.meta.env.DEV) return;
  try { window.sessionStorage.removeItem(SESSION_KEY); } catch { /* storage may be unavailable */ }
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function onDemoSessionChange(listener: () => void) {
  window.addEventListener(SESSION_EVENT, listener);
  return () => window.removeEventListener(SESSION_EVENT, listener);
}

function persistDemoUser(user: SessionUser) {
  try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch { return null; }
  window.dispatchEvent(new Event(SESSION_EVENT));
  return user;
}
