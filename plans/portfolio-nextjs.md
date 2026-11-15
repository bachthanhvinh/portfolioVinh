# Personal Portfolio Website (Next.js)

## Goal
Build a bilingual (VI/EN) personal portfolio replacing a CV for Bạch Thành Vinh, deployed on Vercel, using Next.js App Router. Goal includes learning practical AI-assisted web development.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- next-intl for i18n (`[locale]` routing)
- Framer Motion for subtle animations
- lucide-react icons
- Deploy: Vercel

## Design Direction
Dark-first theme with gradient accent (blue/purple) and glassmorphism cards, clean typography (Inter). Eye-catching but professional.

## Sections (v1)
1. Hero: name, role, tagline, avatar, CTA (GitHub/Contact)
2. About: short bio + career objective
3. Skills: languages, frontend, database, tools, English
4. Projects: Trello Clone, Quiz App (features, stack, links)
5. Education: BIU 2022-2026, IT, GPA 3.25
6. Contact: email, phone, GitHub, location + mailto link

Out of scope v1: Blog, work experience timeline, CMS, auth.

## Content Source
CV data from `MyCV/FrontEnd-Developer.pdf` (extracted). Placeholder images for avatar/project thumbnails to be replaced by user.

## Structure
```
app/[locale]/layout.tsx
app/[locale]/page.tsx
components/{Hero,About,Skills,Projects,Education,Contact,Navbar,Footer}.tsx
messages/{vi,en}.json
i18n.ts, middleware.ts
public/images/*
```

## Implementation Steps
1. Scaffold Next.js with TS + Tailwind + ESLint.
2. Configure next-intl routing and middleware for `/vi`, `/en` (default locale).
3. Add Tailwind theme tokens (colors, fonts) and global styles.
4. Build layout: Navbar (locale switcher) + Footer.
5. Build sections using CV data.
6. Add Framer Motion entrance animations.
7. Add responsive breakpoints and accessibility (alt, focus, contrast).
8. Replace placeholders with real images.
9. Run lint/typecheck/build locally.
10. Deploy to Vercel.

## Validation
- `npm run lint`, `npm run typecheck` (or `tsc --noEmit`), `npm run build`
- Manual: locale switching, mobile responsive, links work, Lighthouse basic.

## Risks
- next-intl version/config mismatch with Next.js version; pin compatible versions.
- Image optimization on Vercel requires proper `next/image` usage.
- Bilingual content duplication; keep messages centralized.

## Open Questions
- Contact form backend (Formspree) vs mailto only (current plan: mailto + social links).
- Avatar/project screenshots to be provided by user.
