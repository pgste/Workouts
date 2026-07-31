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
Firebase sync layer sits behind it. Settings → Export still copies a base64
snapshot to the clipboard and Import merges one back in — the manual fallback
for moving data between phones.

## Syncing with Firebase

The app is offline-first: localStorage (plus Firestore's own offline cache) is
always the write-through layer, and without Firebase configured the app runs
local-only exactly as before. With it, progress syncs live across devices and
plan content is served from Firestore — so plan updates reach phones without an
app redeploy. Firebase also lines up the later Gemini work (Firebase AI Logic
calls Gemini from the client without exposing a key).

Firestore layout: `profiles/{uid}` (auth user → athlete + role) ·
`plans/{athleteId}` (the plan document) ·
`athletes/{athleteId}/dayRecords|courtEntries|readiness/...` (one doc per
record). [`firebase/firestore.rules`](firebase/firestore.rules) is the security
boundary — the web config shipped in the static site is public by design.

One-time setup:

1. **Create a project** at [console.firebase.google.com](https://console.firebase.google.com)
   (Spark free tier is fine; skip Analytics).
2. **Create the database** — Build → Firestore Database → Create (production
   mode, pick a nearby region).
3. **Publish the rules** — Firestore → Rules tab → replace with
   [`firebase/firestore.rules`](firebase/firestore.rules) → Publish.
4. **Enable sign-in** — Build → Authentication → Sign-in method → enable
   **Google** (and optionally Email link). Under Settings → Authorized domains
   add `pgste.github.io`.
5. **Register the web app** — Project settings → Your apps → Web (`</>`), no
   hosting needed. Copy the config values into GitHub repo → Settings →
   Secrets and variables → Actions → *Variables*:
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`,
   `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`.
6. **Map each person after their first sign-in** — Authentication → Users
   (copy their UID), then Firestore → `profiles` collection → Add document
   with the UID as document id:

   ```
   profiles/<uid>  { athleteId: "paul",  role: "athlete" }
   profiles/<uid>  { athleteId: "lewis", role: "athlete" }
   profiles/<uid>  { athleteId: "coach", role: "coach" }
   ```

   Until mapped, a signed-in user can't read or write any progress docs.
7. **For the publish-plans workflow (phase C)** — Project settings → Service
   accounts → Generate new private key; paste the JSON into a GitHub Actions
   *Secret* named `FIREBASE_SERVICE_ACCOUNT` (never shipped to the client).

For local dev, put the four `VITE_FIREBASE_*` values in `.env.local`
(gitignored).

## Design source

This app was mocked up in [Claude Design](https://claude.ai/design) and handed
off as a bundle. The originals are kept for reference:

- `project/Court Strength.dc.html` — the prototype every screen is ported from
- `project/PLAN-FORMAT.md` — the markdown contract for generated plans
- `chats/` — the conversation the design came out of
