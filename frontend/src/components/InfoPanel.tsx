import { CaretDown, Check, ShieldCheck } from "@phosphor-icons/react";
import { faqs } from "../data";

export function InfoPanel() {
  return (
    <section id="about" className="section info-section">
      <div className="container info-panel reveal">
        <article className="info-column about-column">
          <h2>R.S Trader</h2>
          <p>R.S Trader is a trusted supplier of dry ice in India, committed to quality, safety, and dependable service. We work with verified partners and a strong logistics network to keep your cold chain moving.</p>
          <p className="quality-line"><ShieldCheck weight="duotone" /> Quality. Reliability. Responsibility.</p>
        </article>
        <article className="info-column safety-column">
          <h2>Handle dry ice with care.</h2>
          <ul>
            <li><Check />Use insulated gloves or tongs.</li>
            <li><Check />Do not touch with bare hands.</li>
            <li><Check />Store in well-ventilated areas.</li>
            <li><Check />Keep away from sealed containers.</li>
            <li><Check />Use in accordance with safety guidelines.</li>
          </ul>
        </article>
        <article className="info-column faq-column">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<CaretDown aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <a className="text-link" href="tel:+918950126206">Ask a question →</a>
        </article>
      </div>
    </section>
  );
}
