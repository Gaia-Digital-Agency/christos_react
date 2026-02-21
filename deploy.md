# Deployment Log

This documents the deployment flow used to launch the Payload CMS + Next.js app on GCP VM.

## Deploy Steps (local → GCP VM)

1. SSH into VM and inspect target folder.
2. Verify `/var/www/payloading` existence.
3. Attempt initial sync from local workspace.
4. Fix folder ownership to deploy user.
5. Re-sync project after permission fix.
6. Validate transferred files.
7. Detect app runtime from `package.json`.
8. Inventory `/var/www` and Nginx active sites.
9. Inspect active Nginx config + occupied ports.
10. Check Node/pnpm/PM2/Postgres client availability.
11. Confirm PostgreSQL server service state.
12. Install PostgreSQL server packages.
13. Create DB/user and write credentials to `.env`.
14. Inspect `.gitignore` and deploy artifacts strategy.
15. Update `.gitignore` for deploy/runtime artifacts.
16. Run source-only sync attempt.
17. Verify deploy folder contents.
18. Remove heavy runtime/build folders on VM.
19. Re-sync only required source files.
20. Verify clean tree (no `node_modules`/`.next` from local).
21. Install dependencies on VM with pnpm.
22. Build app on VM (`pnpm build`).
23. Diagnose DB/auth env mismatch from build logs.
24. Inspect env + Payload config usage.
25. Apply safe env updates via sed.
26. Update `.env.example` placeholders.
27. Rebuild app with corrected env.
28. Start app with PM2 (`pm2 start pnpm --name payloading -- start`).
29. Add `/payloading` location block in Nginx (`gda-s01`) and reload.
30. Run initial health checks.
31. Diagnose PM2 command/env behavior.
32. Validate endpoint and logs.
33. Diagnose active Nginx server selection.
34. Re-check active config using `sudo nginx -T` (this shows the effective loaded config — not just the file on disk).
35. Revert to known-good PM2 start command (`pnpm start`).
36. Align Nginx proxy target to live app port (`3002`).
37. Confirm internal/external 200 responses.
38. Clean conflicting Nginx backup configs from enabled set.
39. Verify `/payloading/admin` loads Payload CMS admin UI.
40. Fix admin route: ensure `src/app/admin/[[...segments]]/page.tsx` and `layout.tsx` use `@payloadcms/next/views` and `@payloadcms/next/layouts`.
41. Confirm `payload.config.ts` has correct `admin.importMap.baseDir` pointing to `path.resolve(dirname)`.

## Key Config Notes

### App Port
- App runs on port `3002` (set via `PORT=3002` in `.env`).
- Nginx proxies `/payloading` → `http://127.0.0.1:3002`.

### Nginx
- Site file: `/etc/nginx/sites-available/gda-s01`
- **Always verify the effective running config with `sudo nginx -T`, not just by reading the file** — the file on disk may be stale/out of sync with what nginx has loaded.
- Reload after any change: `sudo nginx -s reload` or `sudo systemctl reload nginx`.
- The payloading location block (effective):
  ```nginx
  location /payloading {
      proxy_pass http://127.0.0.1:3002;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_cache_bypass $http_upgrade;
      proxy_read_timeout 300s;
      proxy_connect_timeout 75s;
  }
  ```

### Admin UI (`/payloading/admin`)
- Served via Next.js catch-all route: `src/app/admin/[[...segments]]/`
- `page.tsx` uses `RootPage` from `@payloadcms/next/views`
- `layout.tsx` uses `RootLayout` + `handleServerFunctions` from `@payloadcms/next/layouts`
- `payload.config.ts` sets `admin.importMap.baseDir` to `path.resolve(dirname)`
- Warning `getFromImportMap: PayloadComponent not found` is non-fatal at runtime — admin still loads.

### PM2
- App name: `payloading`
- Start command: `pm2 start pnpm --name payloading -- start` (cwd: `/var/www/payloading`)
- Or via ecosystem file. Restart: `pm2 restart payloading --update-env`

## Re-deploy Runbook

```bash
cd /var/www/payloading
pnpm install --frozen-lockfile
pnpm build
pm2 restart payloading --update-env
pm2 status
```

## Final Runtime State

- App root on VM: `/var/www/payloading`
- App port: `3002`
- Public URL: `http://34.124.244.233/payloading/`
- Admin URL: `http://34.124.244.233/payloading/admin`
- Process manager: PM2 (`payloading`)
- Reverse proxy: Nginx (`gda-s01`) → port `3002`
- Database: PostgreSQL local to VM (`payloading_db`)
