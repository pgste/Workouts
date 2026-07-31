# Court Strength

Phone-first basketball strength and load tracker. Dark, electric blue, no login —
pick your name, work through the block, log the sets. Everything is stored in the
browser on the device it was logged on.

- **Plan** — training blocks → week → day → set-by-set session with auto rest timer
- **Court** — type / minutes / RPE, rolled into a 14-day load chart
- **Daily** — readiness log and the green/amber/red gate
- **Progress** — streak, 8-week heatmap, history, export snapshot for the coach

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run preview  # serve the built site
```

Node 20.19+ or 22.12+.

## Deploying

The build is a plain static site with a relative base, so it works from any
sub-path. Both hosts are wired up:

| Host | Config | Notes |
|---|---|---|
| GitHub Pages | `.github/workflows/deploy.yml` | Builds on push to `main`. Enable Pages → Source: **GitHub Actions**. |
| GitLab Pages | `.gitlab-ci.yml` | Builds on the default branch, publishes `dist/` as `public/`. |

## Layout

```
src/
  data/plan.js       plan content — blocks, weeks, days, exercises, gate
  lib/plan.js        parsing helpers (sets/reps/supersets/rest) and dates
  lib/load.js        court load series for the 14-day chart
  lib/storage.js     localStorage + snapshot codes
  state/store.jsx    single reducer + actions, shared via context
  screens/           one file per screen
  styles.css         all styling
```

### Plan data

`src/data/plan.js` is hand-authored. Hierarchy: `PLANS[athleteId] → blocks →
weeks → days → workouts → exercises`. A week with no `days` renders as "plan
not written yet" rather than a dead tap, so future weeks can be listed before
they exist. Every screen is deep-linkable (`#/paul/hyrox/hx_w1/hx1_mon`,
`#/lewis/today`).

Exercise names key the history lookups, so keep them identical across weeks.

### Storage

Everything lives under `cs.progress.v3` (plus `cs.progress.v3.who` for the
remembered athlete). Writes go through one `saveProgress()` call, so the
Supabase sync layer sits behind it. Settings → Export still copies a base64
snapshot to the clipboard and Import merges one back in — the manual fallback
for moving data between phones.

## Syncing with Supabase

The app is offline-first: localStorage is always the write-through cache, and
without Supabase configured the app runs local-only exactly as before. With it,
progress syncs across devices (magic-link sign-in) and plan content is fetched
from the database — so plan updates reach phones without an app redeploy.

One-time setup:

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is fine).
2. **Run the migration** — Dashboard → SQL → paste
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) → Run.
3. **Enable email auth** — Authentication → Providers → Email (magic link on).
   Under URL Configuration set the Site URL to
   `https://pgste.github.io/Workouts/` and add it to the redirect allowlist.
4. **Wire the build** — GitHub repo → Settings → Secrets and variables →
   Actions:
   - *Variables*: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
     (Project Settings → API in Supabase; the anon key is public by design —
     row-level security is the boundary).
   - *Secrets*: `SUPABASE_SERVICE_ROLE_KEY` — used only by the publish-plans
     workflow, never shipped to the client.
5. **Map each person after their first sign-in** — Dashboard → SQL:

   ```sql
   -- find the user ids
   select u.id, u.email, p.athlete_id, p.role
   from auth.users u join public.profiles p on p.user_id = u.id;

   -- then map them (athlete_id: 'paul' | 'lewis' | 'coach')
   update public.profiles set athlete_id = 'paul',  role = 'athlete' where user_id = '<uuid>';
   update public.profiles set athlete_id = 'coach', role = 'coach'   where user_id = '<uuid>';
   ```

   Until mapped, a signed-in user can't read or write any rows.

For local dev, put the two `VITE_` values in `.env.local` (gitignored).

## Design source

This app was mocked up in [Claude Design](https://claude.ai/design) and handed
off as a bundle. The originals are kept for reference:

- `project/Court Strength.dc.html` — the prototype every screen is ported from
- `project/PLAN-FORMAT.md` — the markdown contract for generated plans
- `chats/` — the conversation the design came out of
