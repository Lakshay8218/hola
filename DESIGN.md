---
version: alpha
name: Dry Ice Supply India
colors:
  primary: "#071521"
  navy950: "#071521"
  navy900: "#0b2433"
  cyan500: "#38d8ff"
  cyan300: "#a8f3ff"
  ice50: "#f5fbfd"
  white: "#ffffff"
  ink900: "#0c1e27"
  ink600: "#52656e"
  borderLight: "#d7e8ed"
typography:
  display:
    fontFamily: "Manrope, Inter, Arial, sans-serif"
    fontSize: "82px"
    fontWeight: 700
    lineHeight: "1.02"
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Manrope, Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.65"
rounded:
  control: "6px"
  card: "14px"
  panel: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "104px"
components:
  button:
    backgroundColor: "{colors.cyan500}"
    textColor: "{colors.navy950}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "48px"
  container:
    width: "1240px"
    padding: "{spacing.xl}"
  darkBand:
    backgroundColor: "{colors.navy900}"
    textColor: "{colors.white}"
  darkLink:
    textColor: "{colors.cyan300}"
  lightSection:
    backgroundColor: "{colors.ice50}"
    textColor: "{colors.ink900}"
  mutedText:
    textColor: "{colors.ink600}"
  hairline:
    backgroundColor: "{colors.borderLight}"
---

## Overview

The public site is a brand-led B2B cold-chain surface reconstructed from the approved 864 × 1821 desktop design. It should feel like a precise frozen-material study: deep navy, frosted white, cyan operational signals, hard-working typography and only one memorable live-geometry moment around the hero dry-ice brick. It must never resemble a generic neon technology or SaaS template.

## Colors

Dark navy carries the hero, delivery, ordering and footer bands. Cyan is restricted to operational signals, primary actions and restrained rim light. Light sections are cold white rather than warm cream. Purple, orange and decorative multicolour gradients are prohibited.

## Typography

Manrope owns display, body and utility roles to match the selected reference. Hierarchy comes from weight, scale and line wrapping rather than decorative type pairing. The hero remains a three-line statement and “Fast.” alone receives cyan emphasis.

## Layout

The reference sequence and proportions are locked. A 1240px desktop container follows the same 42/58 hero split and full-width dark/light band rhythm. Responsive adaptation stacks existing elements without reordering the narrative.

## Elevation & Depth

Depth belongs to the hero brick and small hover responses. Static content is mostly flat with hairline dividers. Light information panels may use a very soft cool shadow; nested glass cards and broad bloom are prohibited.

The hero WebGL renderer is event-driven: it renders only while pointer damping settles, then goes idle. Scroll separation is applied as a bounded layer transform, and the static approved crop remains visible beneath it. Navigation progress and section-active states are thin cyan operational signals, not decorative chrome.

## Shapes

Controls use a compact 6px radius. Cards and larger panels use 14–18px only where the reference shows containment. Pills are reserved for status labels, not primary actions.

## Components

Buttons, fields, icon modules, accordions and modal states use shared CSS tokens. Every interactive control has hover, focus-visible, active and disabled/busy states. The quote modal is a hidden functional state and must inherit the same navy/cyan/ice language.

The quotation utility intentionally uses platform-native Date and Select/Listbox controls. Their browser-owned popup geometry and locale are accepted because these controls are absent from the locked public composition and are used only inside the responsive functional modal.

## Do's and Don'ts

- Do preserve the selected image as the first-frame visual truth.
- Do use supplied reference crops for hero, product and map imagery.
- Do keep all claims qualified and operationally honest.
- Do pause motion offscreen and honor reduced motion.
- Do use one-time entry motion for map markers and the ordering connector instead of continuous loops.
- Do keep quote actions honest: prepare a request for an explicit SMS/copy handoff unless a verified backend destination exists.
- Don't introduce stock imagery, fake proof, particles, holograms or scroll hijacking.
- Don't turn every section into a card or every interaction into a fade.
