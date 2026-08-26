import { useCallback, useEffect, useState } from "react";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface SessionState {
  loading: boolean;
  user: SessionUser | null;
  error: string;
}

export function useSession() {
  const [state, setState] = useState<SessionState>({ loading: true, user: null, error: "" });

  const refresh = useCallback(async (signal?: AbortSignal) => {
    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const response = await fetch("/api/session", { headers: { Accept: "application/json" }, signal });
      if (!response.ok) throw new Error("Session service unavailable");
      const payload = await response.json() as { authenticated: boolean; user?: SessionUser };
      setState({ loading: false, user: payload.authenticated ? payload.user ?? null : null, error: "" });
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      setState({ loading: false, user: null, error: "Account status is temporarily unavailable." });
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void refresh(controller.signal);
    return () => { controller.abort(); };
  }, [refresh]);
  
  return { ...state, refresh };
}
