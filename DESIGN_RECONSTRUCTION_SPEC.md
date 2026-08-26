# Dry Ice Supply India — Design Reconstruction Specification

## Source of truth

- Visual reference: `upload/01-ChatGPT-Image-Aug-25-2026-03_40_41-PM.png`
- Source pixels: 864 × 1821, sRGB PNG.
- Reference state: desktop homepage, closed navigation, no hover/focus state, full-page capture.
- Business/content source: `Dry_Ice_Supply_India_Production_Design_Brief_v2.txt`.
- Fidelity rule: the image controls composition, proportions, surface treatment, section order and first-frame appearance. The business brief controls claims and factual corrections.

## Canvas and grid

- Reference width: 864px.
- Full-page reference height: 1821px.
- Main content left/right inset: approximately 50px at the reference width.
- Desktop content width: approximately 764px in the reference; map/product imagery may bleed beyond text columns.
- Header: approximately 72px tall.
- Hero uses a 42/58 split: copy left, product image right.
- Navigation is a compact single row with a right-aligned quote button.
- White sections use a cool `#f5fbfd` surface; dark sections use `#071521` / `#0b2433`.

## Section sequence and measured reference bands

| Section | Approximate Y range | Approximate height | Structure |
|---|---:|---:|---|
| Header + hero | 0–468 | 468px | Dark, split hero, product right |
| Trust strip | 468–542 | 74px | Four equal horizontal proof items |
| Product | 542–796 | 254px | Copy left, annotated brick center, features right |
| Delivery map | 796–1064 | 268px | Copy/legend left, India map right |
| Applications | 1064–1242 | 178px | Center heading, four equal modules |
| Ordering | 1242–1363 | 121px | Dark band, four numbered steps |
| About / safety / FAQ | 1363–1561 | 198px | Three equal light columns |
| Final CTA | 1561–1684 | 123px | Dark mist band, centered CTA |
| Footer | 1684–1821 | 137px | Four-column dark footer |

## Typography

- Visual match: Manrope-like geometric sans; use Manrope from Google Fonts.
- Hero H1 at reference: approximately 41px, 700–800, line-height approximately 1.03.
- Section H2 at reference: approximately 28px, 700–800, line-height approximately 1.03–1.1.
- Major centered heading: approximately 22px.
- Body: approximately 12–14px at reference capture; implementation minimum 14px where necessary for accessibility without changing hierarchy.
- Utility labels: 9–11px uppercase or semibold.
- Cyan emphasis appears only on “Fast.” and active accent rules/controls.

## Palette

- Navy 950: `#071521`.
- Navy 900: `#0b2433`.
- Cyan 500: `#38d8ff`.
- Cyan 300: `#a8f3ff`.
- Ice surface: `#f5fbfd`.
- White: `#ffffff`.
- Ink: `#0c1e27`.
- Muted ink: `#52656e`.
- Light border: `#d7e8ed`.
- Dark border: `rgba(168,243,255,.2)`.

## Geometry and surfaces

- Button radius: approximately 4–6px in the selected design, not pill-shaped.
- Light-panel cards: very low elevation, 10–14px radius.
- Dark bands: square section edges with thin cyan/white dividers.
- Hero and footer use realistic CO2 mist and wet/frozen texture; no generic gradients or decorative blobs.
- Iconography: thin technical outline icons with cyan accents; use Phosphor icons at regular weight.

## Section reconstruction notes

### Header

- RS monogram in a cyan square.
- Wordmark and legal line immediately right of the monogram.
- Compact navigation centered.
- Phone action precedes cyan quote CTA.
- Sticky behavior may activate after scroll without changing initial geometry.

### Hero

- Left text begins roughly 50px from the viewport edge and 96px from the top.
- Delivery badge sits above a short cyan rule.
- Headline remains three lines; “Fast.” is cyan.
- Copy is compact and no wider than approximately 285px.
- Two CTAs sit on one row, then a pincode label and compact input/button row.
- The hero brick is the visual signature and occupies most of the right half.

### Trust strip

- Four items, equal widths, separated by vertical hairlines.
- Icon left, short heading and two-line support copy right.

### Product

- White background with a subtle cool vignette.
- Left heading is three lines, underlined by a short cyan rule.
- Center product image includes dimension callouts from the visual source; content is treated as illustrative pending verification.
- Three feature statements align vertically at right.

### Delivery

- Dark navy background.
- Left heading is two lines with a short cyan rule.
- Legend appears below body copy.
- Map occupies approximately 55% of the width and remains decorative/illustrative; a text fallback remains available.

### Applications

- Centered heading.
- Four modules with thin vertical dividers.
- Blue outline icons; no cards.

### Ordering

- Centered heading and four equal steps.
- Cyan numbered circles, fine dividers and concise copy.

### About / Safety / FAQ

- One low-elevation, three-column light panel.
- Safety uses checkmarks; FAQ uses accordions.
- Columns become stacked sections on mobile.

### Final CTA and footer

- CTA is centered over a dark CO2-mist band.
- Footer retains the RS lockup and four columns.
- Legal row sits at the bottom with policies on the right.

## Asset audit

| Asset | Source/plan | Status |
|---|---|---|
| Selected full-page reference | User attachment | USE EXACTLY for QA |
| RS monogram | Recreated as styled text + border because it is a simple lettermark visible in reference | MATCHABLE |
| Hero dry-ice scene | Exact crop from supplied reference; live WebGL highlight layered above | USE EXACTLY |
| Product brick with dimension callouts | Exact crop from supplied reference | USE EXACTLY |
| India map | Exact crop from supplied reference | USE EXACTLY |
| Mist texture | Cropped/reused from supplied reference | USE EXACTLY |
| UI icons | Phosphor icon library | CLOSEST MATCH |
| Real business logo artwork | Not supplied separately | ASSET_REQUIRED for future brand lock |
| Verified facility/product photos | Not supplied | ASSET_REQUIRED for factual production content |

## Known content correction boundary

The selected generated image contains claims such as purity, delivery wording and illustrative product dimensions. The implementation preserves their visual location but uses qualified text from the approved production brief where a factual claim would otherwise be unsafe or unverified.

