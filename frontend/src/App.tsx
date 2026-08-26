import { useCallback, useEffect, useState } from "react";
import { ApplicationsSection } from "./components/ApplicationsSection";
import { DeliverySection } from "./components/DeliverySection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InfoPanel } from "./components/InfoPanel";
import { OrderSteps } from "./components/OrderSteps";
import { ProductSection } from "./components/ProductSection";
import { QuoteModal } from "./components/QuoteModal";
import { TrustStrip } from "./components/TrustStrip";
import { useMotion } from "./useMotion";
import { AccountPage } from "./components/AccountPage";
import { AdminPage } from "./components/AdminPage";

export function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  useEffect(() => {
    document.title = path === "/admin"
      ? "Admin operations | Dry Ice Supply India"
      : path === "/account"
        ? "Account access | Dry Ice Supply India"
        : "Dry Ice Supply India | R.S Trader";
  }, [path]);
  if (path === "/account") return <AccountPage />;
  if (path === "/admin") return <AdminPage />;
  return <HomePage />;
}

function HomePage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);
  useMotion();

  return (
    <>
      <div className="site-shell" inert={quoteOpen ? true : undefined} aria-hidden={quoteOpen ? true : undefined}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header onQuote={openQuote} />
        <main id="main-content">
          <Hero onQuote={openQuote} />
          <TrustStrip />
          <ProductSection />
          <DeliverySection />
          <ApplicationsSection />
          <OrderSteps />
          <InfoPanel />
          <FinalCTA onQuote={openQuote} />
        </main>
        <Footer />
      </div>
      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </>
  );
}
