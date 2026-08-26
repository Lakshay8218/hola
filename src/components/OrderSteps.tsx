import { orderSteps } from "../data";

export function OrderSteps() {
  return (
    <section className="order-section section-dark">
      <div className="container reveal">
        <h2 className="center-heading">How to order in 4 simple steps</h2>
        <ol className="order-grid">
          {orderSteps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">{index + 1}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
