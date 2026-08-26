# Performance Report

## Production output

| Asset | Minified | Gzip |
| --- | ---: | ---: |
| Main React/UI JavaScript | 383.43 KB | 127.82 KB |
| Lazy desktop Three.js scene | 520.17 KB | 131.27 KB |
| CSS | 27.94 KB | 6.86 KB |
| Manrope variable font | 24.84 KB | WOFF2 compressed |

The runtime build excluding the social card is 0.94 MiB. The 1200 × 630 social preview adds 1.40 MB but is not fetched by the page during normal browsing.

## Improvement delivered

The hero scene moved from React Three Fiber's continuous canvas loop to a direct Three.js event-driven renderer. The lazy 3D chunk fell from 895.99 KB / 241.73 KB gzip to 520.17 KB / 131.27 KB gzip: a 42% minified and 46% gzip reduction.

The renderer now draws only on initial layout, resize, pointer movement and damped return. It stops when settled, pauses while the tab is hidden, unmounts offscreen, caps DPR at 1.5 and disposes geometry, materials, renderer and the WebGL context. Mobile, reduced-motion, low-memory and failed-WebGL environments retain the approved static hero image without downloading the 3D chunk.

## Motion budget

- Scroll effects use transform/clip-path and are scoped to one-shot reveals or bounded scrub ranges.
- Map pulses run twice on first entry instead of continuously.
- The ordering connector reveals once.
- Header scroll work is requestAnimationFrame-throttled.
- Reduced-motion mode disables GSAP motion, WebGL, smooth scrolling and ambient mist movement.

No Lighthouse or field Core Web Vitals values are claimed. Those require the final public origin and representative devices.
