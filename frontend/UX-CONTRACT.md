# UX contract

This product uses [DESIGN.md](./DESIGN.md) for visual decisions.

## Authentication and access

- Public routes: `/`, `/account`.
- Authentication is delegated to the hosting platform through `/signin-with-chatgpt` and `/signout-with-chatgpt`.
- Local development exposes a clearly labelled credential preview. Its fixed administrator credential and temporary sign-up sessions must never be enabled in production, and raw passwords are never persisted.
- `/api/session` is the canonical session owner.
- `/api/admin/*` performs the authoritative server-side role check against `ADMIN_USER_IDS` and `ADMIN_EMAILS`.
- The `/admin` client never embeds company data. Anonymous visitors see a sign-in action; authenticated non-admins receive an access-denied state.

## Shared behavior

- Header account labels reflect loading, signed-out and signed-in states without shifting the navigation.
- Forms use app-owned validation, stable error regions and password-manager-compatible controls.
- Status feedback is inline and announced through semantic live regions.
- Page navigation uses real links. Actions use native buttons.
- Reduced-motion mode removes ambient and pointer-driven motion.

## Admin data states

- Loading: stable dashboard shell with a labelled progress indicator.
- Success: overview, delivery, inventory and recent-order panels.
- Empty/configuration: a persistent preview-data banner explains that live operational data is not connected.
- Unauthorized: sign-in prompt (401) or access-denied page (403), with a route back home.
- Failure: inline retry action preserving the current route.
