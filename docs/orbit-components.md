# Orbit components

The existing app already uses TypeScript, Tailwind CSS 4 and the `@/*` import alias. No project reinitialisation is needed.

- Reusable UI: `components/ui/`, configured in `components.json`.
- Page-specific compositions: `app/components/` (preserved).
- Shared styles: `app/globals.css`; photography and work layouts remain in their existing CSS files.
- Shared class utility: `lib/utils.ts`, using `clsx` and `tailwind-merge`.

Keeping reusable components separate avoids coupling their renderer lifecycle to page copy. Future shadcn components can be added with `npx shadcn@latest add <component>`; review the generated dependencies and styles before accepting them. Do not run an initializer over this existing site. See https://ui.shadcn.com/docs/installation/manual.

## Black-hole integration

The supplied snippet included a canvas host but not `optimized-black-hole-utils/renderer`. The renderer here is an original Three.js shader interpretation, not the missing original implementation or a scientific simulation. The supplied standalone demo is at `components/ui/demo.tsx` and is not a public route.

`Example` accepts optional `paused: boolean`; it requires no context provider, textures, stock imagery or icon library. The host loads the renderer near the viewport. The renderer caps pixel ratio at 1.35 and animation at 30 frames per second, pauses offscreen/when the tab is hidden, respects reduced motion and disposes GPU resources on unmount. Without WebGL, a static gradient fallback remains and all navigation still works. Touch scrolling is not captured.

The animated demo is retained as standalone code only; it is no longer imported by the portfolio. `OrbitFinale` now uses a lazy-loaded static image with a working contact link, without an animation loop or motion controls. The main orbit uses thin double-sided flat rings with amethyst (#a77ac4), champagne (#d8b469) and olive (#a5ad65) accents, not reflective tubes. Saturation is intentionally visible against the neutral stage; the core is matte purple (#654477). Its satellites still react to education/work/race chapters, and the small navigation dial tracks chapter progress. The opening white mask is disabled at every viewport size. Mobile layouts omit the central decorative text. Below 380 pixels, decorative labels show only their metrics to keep them separate from the main reading area.

## Static finale asset — 7 September 2026

Mode: original text-to-image generation using the built-in image generator. Decorative artwork, not an observational image or scientific simulation. Web delivery: `public/photos/black-hole-static-960.webp` and `public/photos/black-hole-static-1920.webp`. No personal photographs were generated or retouched; those only received responsive resizing and WebP encoding.

Final prompt:

> Create a refined cinematic static website footer background, landscape 16:9. A scientifically inspired black hole with its enormous perfectly dark event horizon on the right half, luminous thin silver-white gravitational lensing ring and intricate wispy accretion disk bending across the lower-right frame, countless delicate filaments and layered turbulent dust details, subtle sparse pinprick stars, deep charcoal black. The left 40 percent is nearly black calm negative space for white website heading, with only a very faint dust haze. Pure monochrome, sophisticated photographic astronomical visualization, very high detail, restrained luminance, no blue or cyan, no metallic tubes, no colored neon, no text, no labels, no UI, no mouse cursor, no watermark. Edge to edge composition.

The new Frankfurt pairing uses the clean photograph as the lead and preserves the original Strava overlay in the smaller activity-record photograph. The displayed personal best remains the certificate-backed 1:19:50; GPS-recorded distance/time in the overlay are not treated as official race results.
