import { CheckCircle, X } from "@phosphor-icons/react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

interface QuoteErrors {
  name?: string;
  phone?: string;
  pincode?: string;
  quantity?: string;
  date?: string;
  consent?: string;
}

export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, input, select, textarea, [href]");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(null);
      setErrors({});
      setCopyStatus("");
    }
  }, [open]);

  if (!open) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: QuoteErrors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your full name.";
    if (!/^\d{10}$/.test(String(data.get("phone") ?? ""))) next.phone = "Enter a valid 10-digit mobile number.";
    if (!/^\d{6}$/.test(String(data.get("pincode") ?? ""))) next.pincode = "Enter a valid six-digit pincode.";
    if (!(Number(data.get("quantity")) > 0)) next.quantity = "Enter the required quantity in kilograms.";
    const requestedDate = String(data.get("date") ?? "");
    if (!requestedDate) next.date = "Choose the required delivery date.";
    else if (requestedDate < minimumDate) next.date = "Choose today or a future delivery date.";
    if (data.get("consent") !== "yes") next.consent = "Confirm that we may contact you about this requirement.";
    setErrors(next);
    if (Object.keys(next).length) {
      window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    const requirement = [
      "Dry ice delivery requirement",
      `Name: ${String(data.get("name"))}`,
      `Mobile: ${String(data.get("phone"))}`,
      `Pincode: ${String(data.get("pincode"))}`,
      `Quantity: ${String(data.get("quantity"))} kg`,
      `Required date: ${String(data.get("date"))}`,
      `Application: ${String(data.get("application") || "Not specified")}`,
    ].join("\n");
    setSubmitted(requirement);
  };

  const copyRequirement = async () => {
    if (!submitted) return;
    try {
      await navigator.clipboard.writeText(submitted);
      setCopyStatus("Request copied.");
    } catch {
      setCopyStatus("Copy was blocked. Send by SMS or call sales instead.");
    }
  };

  const today = new Date();
  const minimumDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <button ref={closeRef} className="modal-close" type="button" aria-label="Close quotation form" onClick={onClose}><X /></button>
        {submitted ? (
          <div className="quote-success" role="status">
            <CheckCircle weight="duotone" />
            <p className="eyebrow">Requirement prepared</p>
            <h2 id="quote-title">Your request is ready to send.</h2>
            <p>Send it to R.S Trader by SMS or copy the details before calling. Availability, price, packing and delivery TAT are confirmed by the sales team.</p>
            <div className="modal-actions">
              <a className="button button-primary" href={`sms:+918950126206?body=${encodeURIComponent(submitted)}`}>Send by SMS</a>
              <button className="button button-outline-dark" type="button" onClick={copyRequirement}>Copy request</button>
              <button className="button button-outline-dark" onClick={onClose}>Close</button>
            </div>
            <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
          </div>
        ) : (
          <>
            <p className="eyebrow">Get delivery quote</p>
            <h2 id="quote-title">Tell us where and when.</h2>
            <p className="modal-intro">Share the essentials. Availability, price, packing and TAT are confirmed after review.</p>
            <form className="quote-form" noValidate onSubmit={submit}>
              <div className="form-grid">
                <label>Full name<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby="name-error" /><span id="name-error" className="field-error">{errors.name}</span></label>
                <label>Mobile number<input name="phone" inputMode="tel" autoComplete="tel" maxLength={10} aria-invalid={Boolean(errors.phone)} aria-describedby="phone-error" /><span id="phone-error" className="field-error">{errors.phone}</span></label>
                <label>Pincode<input name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} aria-invalid={Boolean(errors.pincode)} aria-describedby="pincode-error" /><span id="pincode-error" className="field-error">{errors.pincode}</span></label>
                <label>Quantity (kg)<input name="quantity" type="number" min="1" inputMode="decimal" aria-invalid={Boolean(errors.quantity)} aria-describedby="quantity-error" /><span id="quantity-error" className="field-error">{errors.quantity}</span></label>
                <label>Required date<input name="date" type="date" min={minimumDate} aria-invalid={Boolean(errors.date)} aria-describedby="date-error" /><span id="date-error" className="field-error">{errors.date}</span></label>
                <label>Application<select name="application" defaultValue=""><option value="" disabled>Select application</option><option>Pharma & Healthcare</option><option>Food & Frozen</option><option>Laboratories</option><option>Events & Effects</option><option>Industrial Cooling</option><option>Other</option></select></label>
              </div>
              <label className="consent"><input name="consent" value="yes" type="checkbox" aria-invalid={Boolean(errors.consent)} aria-describedby="consent-error" /> <span>I agree to be contacted about this requirement.</span></label>
              <span id="consent-error" className="field-error consent-error">{errors.consent}</span>
              <button className="button button-primary modal-submit" type="submit">Prepare Request</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
