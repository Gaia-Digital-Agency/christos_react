# Deployment Log (43 Steps)

This log summarizes the deployment flow used to launch the app on GCP VM.

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
20. Verify clean tree (no node_modules/.next from local).
21. Install dependencies on VM with pnpm.
22. Build app on VM.
23. Diagnose DB/auth env mismatch from build logs.
24. Inspect env + Payload config usage.
25. Attempt env replacement (failed expression).
26. Apply safe env updates via sed.
27. Update `.env.example` placeholders.
28. Rebuild app with corrected env.
29. Start app with PM2.
30. Add `/payloading` location in Nginx and reload.
31. Run initial health checks.
32. Diagnose PM2 command/env behavior.
33. Attempt PM2 port-specific restart.
34. Validate endpoint and logs.
35. Diagnose active Nginx server selection.
36. Re-check active config using grep.
37. Attempt direct Next binary start with PM2.
38. Verify end-to-end connectivity.
39. Investigate persistent 404 via logs.
40. Revert to known-good PM2 start command.
41. Align Nginx proxy target to live app port.
42. Confirm internal/external 200 responses.
43. Clean conflicting Nginx backup configs from enabled set.

## Final Runtime State

- App root on VM: `/var/www/payloading`
- Public URL: `http://34.124.244.233/payloading/`
- Admin URL: `http://34.124.244.233/payloading/admin`
- Process manager: PM2 (`payloading`)
- Reverse proxy: Nginx (`gda-s01`)
- Database: PostgreSQL local to VM
