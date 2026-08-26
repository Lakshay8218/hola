# 3D Interaction Specification

## Signature interaction: Cold-surface geometry

The screenshot remains the first-frame visual truth. A transparent WebGL layer adds restrained live geometry over the hero product region only.

| Property | Specification |
|---|---|
| Purpose | Make the hero brick feel physical without redesigning the composition |
| Affected element | Hero dry-ice brick visual |
| Initial state | Static source crop fully visible; geometry aligned and visually quiet |
| Pointer behavior | Maximum ±2.5° rotation with damped return; slight cyan rim response |
| Scroll behavior | Up to 18px Z/vertical separation over hero exit; no pinning or scroll hijack |
| Camera | Perspective, approximately 36° FOV, fixed composition |
| Lighting | Soft key, low fill, restrained cyan rim |
| Material | High roughness frosted physical material; low transmission; no metallic sheen |
| Render loop | Demand/visibility-aware; paused offscreen and when tab is hidden |
| DPR | 1–1.5 mobile/low power, maximum 2 capable desktop |
| Mobile | Static crop by default; no pointer response; optional one-time low-cost reveal |
| Reduced motion | Static crop only; all continuous WebGL/mist motion disabled |
| Fallback | Exact source crop shown when WebGL/JS is unavailable |

## Supporting motion

- Header: 220ms background/height transition after leaving hero.
- Buttons: 180ms translateY(-1px), cyan glow restraint, no scale bounce.
- Trust/application items: 240ms shallow Z-lift and icon color response.
- Sections: 520–680ms clipped translate reveal with different direction by hierarchy; not blanket opacity-only fades.
- Map: location markers receive a staggered one-time pulse when the section enters view; map itself does not rotate.
- Ordering connector: progress line reveals left-to-right on desktop and top-to-bottom on mobile.
- FAQ: 260ms height/opacity transition with focus-safe behavior.
- Mist: slow 10–18px horizontal drift via CSS transform; paused offscreen.

## Cleanup and performance

- Dispose WebGL geometry/materials/textures on unmount.
- Remove pointer, resize, visibility and intersection listeners.
- Revert GSAP contexts and kill ScrollTrigger instances on unmount.
- Avoid allocations in `useFrame`; hoist vectors/material parameters.
- No bloom, depth of field, real-time reflections, particles or shadow maps.

