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

`OrbitFinale` places it after the race chapter with a working contact link and a motion toggle. The main orbit's satellites react to the active education/work/race chapter; the small orbital navigation dial tracks progress within the current chapter. Photos retain their original colours.
