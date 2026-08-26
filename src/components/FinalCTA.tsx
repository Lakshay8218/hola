import { Truck } from "@phosphor-icons/react";

interface FinalCTAProps {
  onQuote: () => void;
}

export function FinalCTA({ onQuote }: FinalCTAProps) {
  return (
    <section className="final-cta section-dark">
      <div className="mist-layer" aria-hidden="true" />
      <div className="container final-cta-inner reveal">
        <span className="cta-icon"><Truck weight="duotone" /></span>
        <h2>Need dry ice delivered?</h2>
        <p>Get a quick quote and we’ll take care of the rest.</p>
        <button className="button button-primary" onClick={onQuote}>Get Delivery Quote</button>
      </div>
    </section>
  );
}
