# Yachtworx

> Boat & Yacht Management SaaS Platform — making yacht maintenance easy for owners and marine mechanics.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

## Features

- **Owner Dashboard** — Summary cards, maintenance alerts, service requests, and timeline
- **Boat Digital Twin** — Component tracking, service history, document vault, value chart
- **Service Marketplace** — Filterable provider cards with ratings, certifications & distance
- **Service Requests** — Status pipeline with real-time tracking
- **Document Vault** — Fleet-wide document management
- **Messaging** — Conversation list with unread indicators
- **Provider Portal** — Registration flow, profile management, service publishing

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js v4 |
| ORM | Prisma |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Deploy | Vercel / Render / Fly.io |

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/bharatsbhat20/yachtworx-v1.git
cd yachtworx-v1
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Push to GitHub (already done)
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in the Vercel dashboard
4. Switch `DATABASE_URL` to a PostgreSQL connection string (e.g. Supabase, Neon, Railway)

## Design System

- **Palette**: Navy · Ocean Blue · Teal · Gold
- **Typography**: Space Grotesk (headings) + DM Sans (body)
- **Buttons**: `hero`, `ocean`, `gold` variants

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/        # Owner-side pages
│   ├── (provider-dashboard)/ # Provider-side pages
│   ├── api/                # REST API routes
│   ├── auth/               # Login / Register
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Design system primitives
│   ├── landing/            # Landing page sections
│   ├── boat/               # Boat digital twin components
│   └── layout/             # Nav, Sidebar, Footer
├── lib/                    # Prisma client, auth config, utils
└── types/                  # TypeScript type extensions
prisma/
├── schema.prisma           # Database schema
└── seed.ts                 # Demo seed data
```

## License

MIT
