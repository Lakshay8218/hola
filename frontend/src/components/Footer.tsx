import { Phone } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/brand-lockup.webp" alt="Dry Ice Supply India by R.S Trader" width="210" height="50" />
          <p>High-quality dry ice bricks.<br />Delivered cold. Delivered fast.</p>
          <a href="tel:+918950126206"><Phone weight="bold" /> Call +91 89501 26206</a>
        </div>
        <nav aria-label="Quick links"><h2>Quick Links</h2><a href="#product">Dry Ice Bricks</a><a href="#applications">Applications</a><a href="#delivery">Delivery</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <nav aria-label="Supply links"><h2>What We Do</h2><a href="#product">Dry Ice Supply</a><a href="#delivery">North India Routes</a><a href="#delivery">Pan-India Reach</a><a href="#top">Bulk Requirements</a></nav>
        <div><h2>Get in Touch</h2><p>R.S Trader<br />Serving India with reliable<br />dry ice supply solutions.</p><a href="tel:+918950126206"><Phone weight="bold" /> Call +91 89501 26206</a></div>
      </div>
      <div className="container legal-row"><span>© {new Date().getFullYear()} R.S Trader. All rights reserved.</span><span><a href="tel:+918950126206">Privacy &amp; terms available on request</a></span></div>
    </footer>
  );
}
