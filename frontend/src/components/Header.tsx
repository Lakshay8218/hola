import { List, Phone, UserCircle, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "../auth";

interface HeaderProps {
  onQuote: () => void;
}

const links = [
  ["Dry Ice Bricks", "#product"],
  ["Applications", "#applications"],
  ["Delivery", "#delivery"],
  ["Locations", "#locations"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Header({ onQuote }: HeaderProps) {
  const { loading: accountLoading, user } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 24);
      setScrollProgress(scrollable > 0 ? Math.min(1, scrollTop / scrollable) : 0);

      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id], main [data-scroll-section][id], footer[id]"));
      const current = sections.reduce((match, section) => (
        section.getBoundingClientRect().top <= 150 ? section.id : match
      ), "top");
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Dry Ice Supply India home">
          <img src="/assets/brand-lockup.webp" alt="Dry Ice Supply India by R.S Trader" width="210" height="50" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} aria-current={activeSection === href.slice(1) ? "location" : undefined}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="phone-link" href="tel:+918950126206"><Phone weight="bold" /> <span>Call +91 89501 26206</span></a>
          <a className="account-link" href={user?.isAdmin ? "/admin" : "/account"} aria-label={user ? `Open ${user.isAdmin ? "admin panel" : "account"}` : "Log in or sign up"}>
            <UserCircle weight="duotone" /><span>{accountLoading ? "Account" : user?.isAdmin ? "Admin" : user ? "Account" : "Log in / Sign up"}</span>
          </a>
          <button className="button button-primary header-quote" onClick={onQuote}>Get Delivery Quote</button>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <List />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav is-open" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="tel:+918950126206" onClick={() => setOpen(false)}>Call +91 89501 26206</a>
          <a href={user?.isAdmin ? "/admin" : "/account"} onClick={() => setOpen(false)}>{user?.isAdmin ? "Admin panel" : user ? "My account" : "Log in / Sign up"}</a>
          <button className="button button-primary" onClick={() => { setOpen(false); onQuote(); }}>Get Delivery Quote</button>
        </nav>
      )}
      <span className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
    </header>
  );
}
