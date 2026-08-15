# ORBIT-I — Company Website & Admin Platform

Full-stack site for ORBIT-I (Private) Limited: public marketing pages, a SuperAdmin CMS/CRM, and a client portal.

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Express (Node.js)
- **Database:** MySQL
- **Deploy:** Vercel (static frontend + serverless API function)

## Local Development

**Prerequisites:** Node.js, access to a MySQL database (local or hosted, e.g. Hostinger)

1. Install dependencies:
   `npm install` (or `bun install`)
2. Copy `.env.example` to `.env` and fill in your MySQL connection details (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) and `GEMINI_API_KEY` if you want the AI chat/estimator features working.
3. Run the app:
   `npm run dev`

On first run against an empty database, the server automatically creates the required tables and seeds them with starter content.

## Deployment

Deployment is configured for Vercel — see `vercel.json` and `api/index.ts`. Set the same environment variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `GEMINI_API_KEY`) in the Vercel project settings.
