import { Phone, X } from "@phosphor-icons/react";
import { FormEvent, lazy, Suspense, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene").then((module) => ({ default: module.HeroScene })));

interface HeroProps {
  onQuote: () => void;
}

export function Hero({ onQuote }: HeroProps) {
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [sceneVisible, setSceneVisible] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const capable = window.innerWidth >= 768
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      && (navigator.hardwareConcurrency ?? 4) >= 2
      && deviceMemory >= 4;
    if (!capable) return;

    let webglAvailable = false;
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2", { failIfMajorPerformanceCaveat: true })
        ?? probe.getContext("webgl", { failIfMajorPerformanceCaveat: true });
      webglAvailable = Boolean(context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglAvailable = false;
    }
    if (!webglAvailable) return;

    const timer = window.setTimeout(() => setSceneEnabled(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const element = visualRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setSceneVisible(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const submitAvailability = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setError(true);
      setMessage("Enter a valid six-digit Indian pincode.");
      return;
    }

    try {
      const response = await fetch(`/api/check-pincode/?pincode=${pincode}`);
      const data = await response.json();
      
      if (response.ok) {
        setError(!data.available);
        setMessage(data.message);
      } else {
        setError(true);
        setMessage(data.error || "Failed to check availability.");
      }
    } catch (err) {
      setError(true);
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="top" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Next-day delivery available on eligible North India routes</p>
          <span className="cyan-rule" aria-hidden="true" />
          <h1>Dry Ice Bricks.<br />Delivered Cold.<br />Delivered <span>Fast.</span></h1>
          <p className="hero-body">High-density dry ice bricks for reliable temperature control in transit, storage, and processing. Supplied by R.S Trader with next-day delivery on eligible routes.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={onQuote}>Get Delivery Quote</button>
            <a className="button button-outline" href="tel:+918950126206"><Phone weight="bold" /> Call +91 89501 26206</a>
          </div>
          <form className="availability-form" noValidate onSubmit={submitAvailability}>
            <label htmlFor="hero-pincode">Check availability at your location</label>
            <div className="availability-row">
              <div className="field-with-clear">
                <input
                  id="hero-pincode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={pincode}
                  aria-invalid={error}
                  aria-describedby="availability-status"
                  placeholder="Enter your pincode"
                  maxLength={6}
                  onChange={(event) => setPincode(event.target.value.replace(/\D/g, ""))}
                />
                {pincode && (
                  <button type="button" className="clear-field" aria-label="Clear pincode" onClick={() => { setPincode(""); setMessage(""); }}>
                    <X />
                  </button>
                )}
              </div>
              <button className="button button-primary availability-button" type="submit">Check Availability</button>
            </div>
            <p id="availability-status" className={`availability-status ${error ? "is-error" : ""}`} role="status">{message}</p>
          </form>
        </div>

        <div ref={visualRef} className="hero-visual" aria-label="Frosted dry ice brick with cold vapor">
          <img src="/assets/hero-dry-ice.webp" alt="Large dry ice brick on a cold surface with vapor" width="519" height="390" />
          {sceneEnabled && sceneVisible && <Suspense fallback={null}><HeroScene /></Suspense>}
        </div>
      </div>
    </section>
  );
}
