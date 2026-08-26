---
version: alpha
colors:
  midnight: "#071521"
  deep-ocean: "#0b2433"
  signal-cyan: "#38d8ff"
  frost: "#a8f3ff"
  ice: "#f5fbfd"
  ink: "#0c1e27"
  muted-ink: "#52656e"
  line: "#d7e8ed"
typography:
  display:
    fontFamily: "Manrope, Inter, Arial, sans-serif"
    lineHeight: "1.02"
  body:
    fontFamily: "Manrope, Inter, Arial, sans-serif"
    lineHeight: "1.6"
  utility:
    fontFamily: "Manrope, Inter, Arial, sans-serif"
    lineHeight: "1.35"
rounded:
  control: "8px"
  card: "16px"
  panel: "24px"
spacing:
  compact: "8px"
  control: "12px"
  content: "24px"
  section: "72px"
components:
  button:
    minHeight: "44px"
  card:
    border: "1px solid #d7e8ed"
  focusRing:
    color: "#a8f3ff"
---

## Overview

Dry Ice Supply India should feel like a temperature-controlled logistics facility at first light: precise, calm, engineered and visibly cold. The public site is brand-led; account and admin routes are product-led. The signature is the hero dry-ice brick appearing to sit inside the page atmosphere rather than inside a rectangular image.

Avoid generic SaaS gradients, glass-card overload, playful illustration, excessive glow and decorative motion. Movement should suggest cold vapor, inspection lighting and physical depth.

## Colors

Midnight and deep ocean own operational surfaces. Signal cyan is reserved for primary actions, live status and focus. Frost is a quiet secondary highlight. Ice supports reading surfaces; ink and muted ink form the text hierarchy. Runtime ownership is `src/styles.css` root custom properties.

## Typography

Manrope is the established family. Display copy uses tight tracking and compact leading; body copy remains generous. Utility labels use uppercase sparingly for actual status, category or navigation information.

## Layout

Public pages use a wide 1240px frame with asymmetrical image-led compositions. Product routes use a stable sidebar and modular operational panels. Mobile layouts become single-column without hiding primary actions.

## Elevation & Depth

Depth comes from layered atmosphere, restrained borders and broad low-opacity shadows. The hero may use stronger compositing because it is the visual signature. Admin panels stay quieter for scan speed.

## Shapes

Controls use 8px corners, content cards 16px and large auth/hero panels 24px. Pills are reserved for status badges.

## Components

Buttons are 44px minimum with explicit hover, active, focus and disabled states. Auth fields reserve help/error space. Data cards never rely on color alone; status always includes text or an icon.

## Do's and Don'ts

- Do integrate photography with masks, atmosphere and lighting.
- Do keep cyan meaningful and sparse.
- Do respect reduced motion and visible focus.
- Don't expose company metrics before a server-side admin check.
- Don't use client-stored passwords or pretend demo values are live data.
