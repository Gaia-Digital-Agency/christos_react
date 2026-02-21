# Christos Payload Playground

This project is a Next.js + Payload CMS playground app running on GCP VM.

## Live URLs

- Public app: `http://34.124.244.233/payloading/`
- Payload admin: `http://34.124.244.233/payloading/admin`

## What This App Is

- A Payload CMS playground for content modeling and UI experimentation.
- Next.js App Router frontend with Payload integrated in the same codebase.
- PostgreSQL-backed CMS/app runtime hosted on the same VM.

## Stack

- Next.js 16
- React 19
- Payload CMS 3
- PostgreSQL 16 (local VM)
- Nginx reverse proxy
- PM2 process manager

## Routing Notes

The app is served under the `/payloading` path via Nginx rewrite/proxy.

- Browser path `/payloading/*`
- Backend Next.js app path `/*`

## Environment

Main runtime env file:

- `/var/www/payloading/.env`

Template env file:

- `/var/www/payloading/.env.example`

Key variables include:

- `DATABASE_URL`
- `POSTGRES_URL`
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`
- `NEXT_PUBLIC_SERVER_URL`

## Runbook (VM)

```bash
cd /var/www/payloading
pnpm install --frozen-lockfile
pnpm build
pm2 restart payloading --update-env
pm2 status
```

## Process + Proxy

- PM2 app name: `payloading`
- Nginx site file: `/etc/nginx/sites-available/gda-s01`
- Nginx enabled file: `/etc/nginx/sites-enabled/gda-s01`

## Git Source of Truth

Per deployment decision, `/var/www/payloading/` is treated as source of truth for this app.
