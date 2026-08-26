import { trustItems } from "../data";

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Supply highlights">
      <div className="container trust-grid">
        {trustItems.map(({ icon: Icon, title, body }) => (
          <article className="trust-item" key={title}>
            <Icon weight="duotone" aria-hidden="true" />
            <div><h2>{title}</h2><p>{body}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
