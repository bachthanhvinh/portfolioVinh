# Progress — portfolio redesign (Lo-Fi + 3D scroll)

## Context
- Repo: `/home/vinh/Coding/LearnAI/testCodeProjectWithAI` — Next.js 16 App Router, next-intl (vi default / en), Tailwind v4, framer-motion. **Not a git repo.**
- Goal: make the portfolio more attractive/less monotonous, use real imagery, 3D motion driven by scroll/pointer, adopt a distinctive art direction.
- Art direction chosen: **Lo-Fi paper-zine** from `.kilo/skills/frontend-design/SKILL.md` (paper `#E8E0C0`, ink `#141414`, riso pink `#FF006E`, riso cyan `#00FFCC`; Times/Helvetica/Courier only; halftone, hard shadows, rotations). The earlier dark/glassmorphism plan in `plans/portfolio-nextjs.md` is stale — ignore it.
- User requires the short name **"Vinh"** only; the full name must not appear in UI/metadata.
- The user's attached image could not be read (model has no image input); design was implemented from the Lo-Fi skill instead.

## Commands
```bash
npm run dev      # dev server (port 3000)
npm run lint
npx tsc --noEmit # no typecheck script
npm run build
```
Order: lint -> tsc --noEmit -> build. No test suite.

## i18n
- Locales duplicated in 4 places: `middleware.ts`, `i18n/request.ts`, `i18n.ts`, `app/[locale]/layout.tsx`.
- `messages/vi.json` and `messages/en.json` must stay key-identical (currently **57 / 57** keys).
- `middleware.ts` still works; Next 16.4.2 only warns it is deprecated in favor of `proxy.ts`.

## Done
- `app/globals.css`: Lo-Fi tokens via `@theme`, utilities `.shadow-hard*`, `.halftone`, `.tape`, `.riso`, `.marquee-track`, `.caret`; `html`/`body` use `overflow-x: clip` (required for transformed sections).
- All sections restyled: `Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Education`, `Contact`, `Footer`, `Marquee`, `SectionHeading`, `Reveal`, `ScrollProgress`, `TerminalCard`, `CopyEmail`.
- New motion components:
  - `components/PhotoStack.tsx` — three layered paper prints in a CSS 3D scene; scroll parallax separates them, pointer tilt. Used in **About**.
  - `components/ParallaxImage.tsx` — image drifting inside its frame on scroll. Used by the **hero photo** and **contact photo**.
  - `components/TiltCard.tsx` — pointer tilt + scroll-linked Z depth (hero terminal, project cards).
- i18n edits: `hero.name = "Vinh"`, new `hero.tagline`, `footer.rights` reworded, `nav.sections` added (both locales).
- Placeholder contact values still present: `vinh@example.com`, `0123456789`, `github.com/bachthanhvinh` (needs real data).
- Images: `public/images/circuit.jpg`, `code-screen.jpg`, `code-green.jpg` (Unsplash); decorative, grayscale + halftone.

## Verification (last run)
- `npx tsc --noEmit` — clean.
- `npm run lint` — clean.
- `npm run build` — passes (`/vi`, `/en` prerendered).
- Headless Chrome probe at 390 / 768 / 1280: no horizontal overflow (`scrollWidth === clientWidth`), no console errors, About renders 3 prints, print transform changes on scroll (y 64 -> 3.69, z -170 -> -122.88).

## Pending / next
1. Replace placeholder contact data with real values; confirm skills list (repo evidence only: TS/JS, React/Next/Tailwind/Framer, Git/npm/ESLint/Vercel).
2. Optional: add `PhotoStack` to the hero, and 6° rotation to hero frame / terminal.
3. If design rules change again, update `AGENTS.md` (it currently documents the Lo-Fi system and the new motion components).
4. Optional cleanup: `about.imageAlt` key is now unused (kept for vi/en parity).
5. Ask the user to describe the attached reference image if a different direction is wanted.