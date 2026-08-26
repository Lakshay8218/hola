# Design QA

## Source and build

- Approved source: `references/reference-design.png`
- Source density: 864 × 1821 pixels, interpreted as the locked 864 px compact-desktop composition.
- Prototype: React 19 + TypeScript + Vite + GSAP + React Three Fiber.
- Final implementation capture: `reports/implementation-864-final.png`.
- Combined comparison input inspected: `reports/reference-vs-implementation-final.jpg`.
- Difference image inspected: `reports/visual-difference-final.png`.

## Visual regression history

1. Initial 1363 px render identified oversized section rhythm relative to the approved compact composition.
2. Added an 821–900 px compact-desktop band and locked measured section heights.
3. First 864 comparison reached the approved 1821 px total geometry but exposed a ghosted CTA text fragment inside the supplied mist crop.
4. Masked the crop centre, adjusted trust-strip border accounting and fixed the footer legal-row position.
5. Final 864 capture measured exactly 864 × 1821 with no horizontal overflow.
6. Final source and implementation were placed side-by-side and manually compared by section.

## Visual status

- Header/hero composition: passed.
- Section order and band heights: passed.
- Typography hierarchy and hero wrapping: passed.
- Image crop and placement: passed.
- Trust/application standalone icon drawings: closest library match; non-blocking minor difference because original vector assets were not supplied.
- CTA mist and footer: passed.
- Responsive captures at 1440, 1024, 768 and 390 px: passed.
- Mobile map load after eager-image fix: passed.

## Interaction and state matrix

- Desktop navigation and anchors: passed.
- Pincode invalid state: passed.
- Pincode eligible-North qualified state: passed.
- Quote modal open, initial focus and scroll lock: passed.
- Quote validation with six associated messages: passed.
- Quote complete local success state: passed.
- Focus wrap and Escape restoration: passed.
- FAQ disclosure: passed.
- Mobile menu open, visible links and Escape close: passed.
- Reduced-motion/static fallback: code and CSS path verified.
- Disabled WebGL: static hero remained visible; clean release tab emitted zero site warnings/errors.

## Accessibility and stability

- One H1: passed.
- Missing image alt text: 0.
- Unlabelled controls: 0.
- Duplicate IDs: 0.
- Empty links: 0.
- Unexpected horizontal overflow: false at every inspected frame.
- Final site console warnings/errors: 0.

## Release boundary

The frontend implementation passes. Public launch still requires the business owner to confirm the final domain, operational claims, form delivery endpoint, privacy/legal pages and share artwork listed in `BUILD_QA_REPORT.md`.

final result: passed
