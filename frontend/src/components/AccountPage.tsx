import { ArrowLeft, ArrowRight, Eye, EyeSlash, LockKey, ShieldCheck, Snowflake, UserCircle } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { signInHref, signOutHref, useSession } from "../auth";
import { signInDemo, signOutDemo, signUpDemo } from "../demoAuth";

export function AccountPage() {
  const { loading, user, error, refresh } = useSession();
  const localDemo = import.meta.env.DEV;

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
              {localDemo ? <button className="button button-outline-dark auth-secondary" onClick={() => { signOutDemo(); void refresh(); }}>Sign out</button> : <a className="button button-outline-dark auth-secondary" href={signOutHref()}>Sign out</a>}
            </>
          ) : localDemo ? (
            <CredentialForm onAuthenticated={() => { void refresh(); }} />
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

function CredentialForm({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const switchMode = (next: "login" | "signup") => {
    setMode(next);
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (!/^\S+@\S+\.\S+$/.test(email)) { setMessage("Enter a valid email address."); return; }
    if (password.length < 8) { setMessage("Password must contain at least 8 characters."); return; }

    if (mode === "login") {
      const user = signInDemo(email, password);
      if (!user) { setPassword(""); setMessage("Email or password is incorrect."); return; }
      onAuthenticated();
      window.location.assign(user.isAdmin ? "/admin" : "/account");
      return;
    }

    if (name.trim().length < 2) { setMessage("Enter your full name."); return; }
    if (password !== confirmPassword) { setMessage("Passwords do not match."); return; }
    const user = signUpDemo(name, email);
    if (!user) { setMessage("The local account could not be created."); return; }
    onAuthenticated();
  };



  return (
    <>
      <div className="auth-tabs" role="tablist" aria-label="Account access mode">
        <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => switchMode("login")}>Log in</button>
        <button type="button" role="tab" aria-selected={mode === "signup"} onClick={() => switchMode("signup")}>Sign up</button>
      </div>
      <p className="auth-demo-label"><LockKey weight="fill" /> Local credential preview</p>
      <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
      <form className="credential-form" noValidate onSubmit={submit}>
        {mode === "signup" && <label>Full name<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(message) && name.trim().length < 2} /></label>}
        <label>Email address<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(message) && !/^\S+@\S+\.\S+$/.test(email)} /></label>
        <label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(message) && password.length < 8} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeSlash /> : <Eye />}</button></span></label>
        {mode === "signup" && <label>Confirm password<input type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} aria-invalid={Boolean(message) && password !== confirmPassword} /></label>}
        <p className={`credential-message ${message ? "is-error" : ""}`} role="status">{message || (mode === "signup" ? "Use at least 8 characters. This preview does not retain your password." : "Enter your account credentials.")}</p>
        <button className="button button-primary auth-primary" type="submit">{mode === "login" ? "Log in" : "Create account"}<ArrowRight /></button>
      </form>

    </>
  );
}
