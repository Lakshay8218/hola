export function DeliverySection() {
  return (
    <section id="delivery" className="section section-dark delivery-section">
      <div className="container delivery-grid reveal">
        <div className="section-copy delivery-copy">
          <h2>Fast in the North.<br />Connected across India.</h2>
          <span className="cyan-rule" aria-hidden="true" />
          <p>We deliver next-day on eligible routes in North India and work with verified partners to serve more locations across the country.</p>
          <ul className="map-legend" aria-label="Delivery map legend">
            <li><span className="marker marker-office" />Physical Office</li>
            <li><span className="marker marker-partner" />Verified Partner</li>
            <li><span className="marker marker-city" />Serviceable City</li>
            <li><span className="marker marker-request" />On-request Destination</li>
          </ul>
        </div>
        <div id="locations" className="map-wrap" data-scroll-section>
          <img src="/assets/india-network-map.webp" alt="Illustrative India delivery network map" width="500" height="250" />
          <span className="map-pulse pulse-one" aria-hidden="true" />
          <span className="map-pulse pulse-two" aria-hidden="true" />
        </div>
      </div>
      <details className="container map-text-fallback">
        <summary>View delivery information without the map</summary>
        <p>Physical offices: New Delhi corporate office and Sonipat registered office. All other destinations require service and TAT confirmation before order acceptance.</p>
      </details>
    </section>
  );
}
