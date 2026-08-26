import { applications } from "../data";

export function ApplicationsSection() {
  return (
    <section id="applications" className="section section-light applications-section">
      <div className="container reveal">
        <h2 className="center-heading">Dry ice for critical, time-sensitive work.</h2>
        <div className="applications-grid">
          {applications.map(({ icon: Icon, title, body }) => (
            <article className="application-item" key={title}>
              <Icon weight="duotone" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
