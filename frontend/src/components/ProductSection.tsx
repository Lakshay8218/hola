import { productFeatures } from "../data";

export function ProductSection() {
  return (
    <section id="product" className="section section-light product-section">
      <div className="container product-grid reveal">
        <div className="section-copy product-copy">
          <h2>One format.<br />Built for serious<br />cold-chain work.</h2>
          <span className="cyan-rule" aria-hidden="true" />
          <p>Our standard dry ice brick is engineered for maximum cooling efficiency, longer sublimation life, and easy handling.</p>
        </div>
        <div className="product-image-wrap tilt-surface">
          <img src="/assets/product-dimensions.webp" alt="Illustrative dry ice brick with 125 mm, 120 mm and 250 mm dimension callouts" width="355" height="220" />
        </div>
        <div className="product-features">
          {productFeatures.map(({ icon: Icon, title, body }) => (
            <article className="feature-item" key={title}>
              <span className="icon-ring"><Icon weight="duotone" /></span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
