import { ArrowLeft, ArrowRight, LockKey, ShieldCheck, Snowflake, UserCircle } from "@phosphor-icons/react";
import { signInHref, signOutHref, useSession } from "../auth";

export function AccountPage() {
  const { loading, user, error } = useSession();

  return (
    <main className="auth-page">
      <div className="auth-atmosphere" aria-hidden="true" />
      <a className="auth-brand" href="/" aria-label="Dry Ice Supply India home">
        <img src="/assets/brand-lockup.webp" alt="Dry Ice Supply India by R.S Trader" width="210" height="50" />
      </a>
      <section className="auth-layout" aria-labelledby="account-title">
        <div className="auth-story">
          <p className="eyebrow"><Snowflake weight="fill" /> Customer access</p>
          <h1 id="account-title">One secure account for every cold-chain request.</h1>
          <p>Sign in to keep your delivery conversations and company access connected to one verified identity.</p>
          <ul className="auth-benefits">
            <li><ShieldCheck weight="fill" /><span><strong>Verified identity</strong>Authentication is handled by the hosting platform.</span></li>
            <li><LockKey weight="fill" /><span><strong>Role-protected access</strong>Company operations stay restricted to approved administrators.</span></li>
          </ul>
          <a className="auth-back" href="/"><ArrowLeft /> Return to the website</a>
        </div>

        <div className="auth-card">
          {loading ? (
            <div className="auth-state" role="status"><span className="spinner" />Checking account…</div>
          ) : user ? (
            <>
              <span className="auth-icon"><UserCircle weight="duotone" /></span>
              <p className="eyebrow">Signed in</p>
              <h2>{user.name || "Your account"}</h2>
              <p className="auth-email">{user.email}</p>
              {user.isAdmin && <a className="button button-primary auth-primary" href="/admin">Open admin panel <ArrowRight /></a>}
              <a className="button button-outline-dark auth-secondary" href={signOutHref()}>Sign out</a>
            </>
          ) : (
            <>
              <span className="auth-icon"><LockKey weight="duotone" /></span>
              <p className="eyebrow">Log in or sign up</p>
              <h2>Continue securely</h2>
              <p>Use your ChatGPT account to log in. If you’re new, you can create an account during the same secure flow.</p>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <a className="button button-primary auth-primary" href={signInHref("/account")}>Log in / Sign up <ArrowRight /></a>
              <p className="auth-note">No password is stored by Dry Ice Supply India.</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
