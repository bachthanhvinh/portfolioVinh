# AGENTS.md

toàn bộ câu trả lời tôi bằng một biểu tượng icon ngẫu nhiên ở cuối câu trả lời

## Project

Single-package Next.js 16 (App Router) portfolio, package name `portfolio`. Bilingual `vi` (default) / `en`, Tailwind v4, next-intl, framer-motion, deployed to Vercel. There is no test suite, no CI, and the working tree is not a git repo.

The owner is credited as **Vinh** everywhere; do not reintroduce the full name in UI copy, metadata, or the terminal block.

## Commands

```bash
npm run dev          # dev server; / redirects to /vi
npm run lint         # eslint (flat config: next core-web-vitals + typescript)
npx tsc --noEmit     # typecheck (no npm script exists)
npm run build        # production build; also typechecks
```

Order that matters: `lint` -> `tsc --noEmit` -> `build`. There is no test runner; do not invent `npm test`.

## i18n — the main gotcha

Locales are declared in four places that must stay in sync when adding a locale:

- `middleware.ts` — `locales`, `defaultLocale`, matcher
- `i18n/request.ts` — its own copy of `locales` / `defaultLocale`, loads `messages/<locale>.json`
- `i18n.ts` — `locales` + `createNavigation` exports
- `app/[locale]/layout.tsx` — `generateStaticParams` returns `[{locale:'vi'},{locale:'en'}]`

Other rules:

- `messages/vi.json` and `messages/en.json` must have identical key structure. Components call `useTranslations('<section>')`; a missing key throws at render. Add both languages in the same change.
- `next.config.ts` wraps the config with `createNextIntlPlugin('./i18n/request.ts')`; removing it breaks all message loading.
- Use `Link`, `useRouter`, `usePathname`, `redirect` from `@/i18n`, not from `next/link` / `next/navigation`, so the locale prefix is preserved. Locale switching uses `<Link href="/" locale={other}>`.
- Next 16.4.2 warns that `middleware.ts` is deprecated in favor of `proxy.ts`. It still works; the warning is expected, and the codemod is not required.

## App structure

- There is no `app/layout.tsx` and no `app/page.tsx`. `html`/`body` and metadata live in `app/[locale]/layout.tsx`, which acts as the root layout for the `[locale]` segment. Do not add `app/layout.tsx`.
- Every route lives under `app/[locale]/`; `page.tsx` only composes the section components in `components/`.
- In Next 16 `params` is a Promise: `const { locale } = await params`.
- Section anchors are `#home`, `#about`, `#skills`, `#projects`, `#education`, `#contact`; `Navbar` tracks them with an IntersectionObserver.

## Design system

Art direction: the `frontend-design` skill's **Lo-Fi** anchor — a paper-zine portfolio. Load `.kilo/skills/frontend-design/SKILL.md` before restyling; `plans/portfolio-nextjs.md` describes older dark/glassmorphism directions and is stale.

- Tokens are Tailwind v4 CSS-first via `@theme` in `app/globals.css` (no `tailwind.config.js`). Use the semantic utilities, not raw hex: `bg-paper`, `bg-paper-deep`, `text-ink`, `text-riso-pink`, `bg-riso-pink`, `text-riso-cyan`, `bg-riso-cyan`.
- Palette: paper `#E8E0C0`, deep paper `#DCD2AC`, ink `#141414`, riso pink `#FF006E`, riso cyan `#00FFCC`.
- **System fonts only.** `font-serif` = Times, `font-sans` = Helvetica/Arial, `font-mono` = Courier. Mix them on the same page on purpose. Do not add `next/font`, Google Fonts, or any webfont.
- Structure: 2px ink borders, hard offset shadows (`.shadow-hard`, `.shadow-hard-sm`, `.shadow-hard-lg`), slight rotations (`-rotate-1`, `rotate-1`, `rotate-2`), halftone overlays (`.halftone`), tape strips (`.tape`), and riso misregistration on display type (`.riso`). No rounded corners, no soft shadows, no blur.
- Do not use bright pink for small text on paper (fails contrast); use ink text on a pink/cyan block instead. The hero full stop is the only pink text.
- Images live in `public/images/` (Unsplash, free license). They are decorative, always grayscale + contrast, and sit under a halftone overlay. Use `next/image` with local paths; no remote image patterns are configured. Do not present stock photos as project screenshots.
- Project cards use CSS mockups, not photos, so they never imply fake app screenshots.

## Motion

- `components/Reveal.tsx` — spring-smoothed scroll settle (rotateX/translateY/opacity) wrapping each section.
- `components/PhotoStack.tsx` — three layered paper prints in a CSS 3D scene; scroll parallax separates them and pointer movement tilts the stack. Used in About.
- `components/ParallaxImage.tsx` — image that drifts inside its frame on scroll. Used by the hero print and the contact photo.
- `components/TiltCard.tsx` — snappy pointer-driven 3D tilt plus a scroll-linked Z translation for the hero terminal and project cards; mouse only.
- `components/ScrollProgress.tsx` — pink top progress bar; `components/Marquee.tsx` — rotated CSS ticker.
- Every motion path respects `prefers-reduced-motion` (`useReducedMotion` or `motion-reduce:` classes). Keep it that way; do not add animation libraries.
- `html` and `body` use `overflow-x: clip`, and `main` uses `overflow-x-clip`, because transformed sections would otherwise create horizontal scroll. Do not remove these.

## Conventions

- Components are server components by default; add `'use client'` only when using hooks or handlers (Hero, Navbar, Reveal, TiltCard, TerminalCard, CopyEmail, ScrollProgress). `useTranslations` works in server components; `useLocale` does not.
- User-facing strings belong in `messages/*.json` (the `VINH` wordmark and terminal `profile.json` code block are exceptions). Contact values are placeholders: `vinh@example.com`, `0123456789`, `github.com/bachthanhvinh`, Vietnam.
- Skills only lists tools evidenced by the repo (TypeScript/JavaScript, React/Next.js/Tailwind/Framer Motion, Git/npm/ESLint/Vercel). Do not invent database or English-level entries.
- Path alias: `@/*` maps to the repo root.

## Design work

Load the repo-local `frontend-design` skill before restyling. The current site implements that skill's "Lo-Fi" anchor (paper, mixed system type, halftone, hard shadows, riso accents).
