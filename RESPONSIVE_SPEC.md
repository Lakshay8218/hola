# Responsive Specification

## Reference

The 864px-wide supplied image is the strict visual reference. Wider layouts preserve the same proportions inside a maximum 1240px container. Narrow layouts preserve hierarchy and section order rather than scaling the desktop screenshot down.

## Breakpoints

- 1440+: 1240px content container; hero 42/58 split.
- 1024–1439: 92% content width; same split with reduced navigation gaps.
- 768–1023: compact navigation; hero 46/54; trust/product modules tighten.
- Below 768: mobile drawer; stacked hero; static/low-power hero visual.
- Below 480: 20px side padding; single-column controls and content.

## Required viewport behavior

| Viewport | Header | Hero | Section grids | 3D |
|---:|---|---|---|---|
| 1920/1600/1440 | Full navigation | 42/58 split | 4-column modules | Full restrained layer |
| 1280/1024 | Full/condensed nav | 44/56 split | 4 columns | Full, capped DPR |
| 768 | Drawer trigger allowed | 46/54 or stacked if cramped | 2 columns | Simplified |
| 430/390/375/360/320 | Mobile drawer | Copy then product visual | Single/2-column according to content | Static fallback by default |

## Mobile transformations

- Hero badge, headline, copy, CTA row, availability checker, then product visual.
- Headline remains three lines where possible; no word-level clipping.
- CTAs become two full-width rows below 390px.
- Trust strip becomes two columns, then one column below 360px.
- Product image sits between copy and features.
- Delivery text precedes map; legend remains visible.
- Applications become 2 × 2, then one column below 360px.
- Ordering becomes a vertical stepper with a continuous cyan line.
- About, safety and FAQ become separate stacked panels.
- Footer becomes stacked grouped columns; all links remain visible.

## Accessibility and layout stability

- No horizontal page overflow at any required width.
- Sticky header and mobile action UI cannot obscure focus.
- Images reserve aspect-ratio space.
- All interactive controls remain keyboard and touch accessible.
- `prefers-reduced-motion` removes parallax, mist drift and scroll-scrub behavior.

