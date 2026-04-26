# AI Job Search Assistant MVP

A production-ready MVP built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**.

## Features

- Modern, minimal SaaS-style UI
- Landing page (`/`)
- Login page (`/login`)
- Dashboard (`/dashboard`)
- Resume Upload (`/resume`)
- Job Matcher (`/matcher`)
- Job Tracker (`/jobs`)
- Reusable components:
  - `Sidebar`
  - `Navbar`
  - `Card`
- Mock data only (no external APIs)

## Project Structure

```bash
app/
  dashboard/page.tsx
  jobs/page.tsx
  login/page.tsx
  matcher/page.tsx
  resume/page.tsx
  layout.tsx
  page.tsx
components/
  card.tsx
  dashboard-layout.tsx
  navbar.tsx
  sidebar.tsx
data/
  mock-data.ts
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint code

## Notes

- This MVP intentionally uses local mock data only.
- No scraping, payments, or third-party API integrations are included.
