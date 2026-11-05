# Frogman Films — Deployment & Operations Guide

## 1. Local Development Setup

1. **Clone & Install Dependencies:**
   ```bash
   cd C:\Users\surface\.gemini\antigravity\scratch\frogman-films
   npm install
   ```

2. **Run PostgreSQL with Docker:**
   ```bash
   docker compose up -d
   ```

3. **Initialize Prisma Database & Run Seed Script:**
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

4. **Launch Next.js App:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to interact with Frogman's bedroom hero, film catalogue, folios, and shop.

---

## 2. Production Deployment (Vercel / Cloud Run / Node Server)

- Set environment variables as documented in `.env.example`.
- Run production build:
  ```bash
  npm run build
  npm start
  ```
- Configure CDN caching rules: never publicly cache authenticated cart, checkout, or admin endpoints.
