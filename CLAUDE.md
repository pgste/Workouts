# CLAUDE.md — working memory for Court Strength

Phone-first workout tracker for the family, deployed on GitHub Pages at
https://pgste.github.io/Workouts/. Owner: Paul (GitHub `pgste`). This file is
the standing context any Claude session needs to continue the work.

## The people

- **Paul** (the user) — recovering from knee surgery + hamstring rehab, twice
  restarted after illness and a fall. Currently: Functional Reboot redo
  (movement-first: rings, crawls, flows, carries, get-ups; one static anchor
  per strength day; supersets run for time), then Hyrox Training. Hard rules:
  hamstring capped at RPE 7; the recovering leg/knee "sets the dose" — one
  clean set is a pass, never chase listed sets through a wobbling limb; gate
  on NEXT-MORNING soreness/swelling (hamstring AND knee); tempo RDL is
  medicine, kept light. Ring dips are practice (one set), stable dips carry
  the strength until 3×5 on rings is crisp.
- **Lewis** (son) — pro two-way basketball player (Gladiators Pro + Blues),
  in-season. Three lifts/week (Mon/Tue/Thu 18:30, HARD STOP 19:25, cut
  orders), loading by rep anchors (A/B/C/D weekly cycle), Olympic lifts
  governed by bar speed. Never to failure, left leg leads unilaterals, no
  GHD ever, back symptoms end the session. His dated calendar needs
  extending when the cycle runs out.
- **Coach view** — read-only third athlete id.

## Standing instructions from Paul

1. **"PR every time"** — after every pushed change, open a PR immediately
   without asking. Paul merges; verify the Deploy (and Publish plans, when
   plan.js changed) workflows go green after each merge.
2. Plan changes are driven conversationally ("shift my dates", "I missed
   Saturday") — edit `src/data/plan.js`, keep the record honest (what
   happened stays; what never happened comes out), never stack new work on
   merged history (restart the branch from origin/main).
3. Tone: supportive, honest, no lecturing. A missed or reduced session gets
   recorded truthfully and the plan bends to reality, not the reverse.

## Repo conventions

- Dev branch: `claude/github-workouts-setup-5nenzh`. After a PR merges,
  `git fetch origin main && git checkout -B <branch> origin/main`, then
  commit and `git push -u --force-with-lease`.
- `src/data/plan.js` is the single hand-authored content file:
  `PLANS[athleteId] → blocks → weeks → days → workouts → ex` tuples
  `[name, load, scheme, rest]`. **Exercise names key history lookups — keep
  them identical across weeks.** Day labels like `'Mon 2 Nov'` must parse via
  `planDate()` (undated labels return null and are skipped by today-links and
  the API). Day ids must be globally unique per athlete (logging is keyed on
  them) — reuse a builder with fresh week numbers rather than re-dating used
  ids.
- Verification before every push: `npm run build`, plus a node simulation
  over the changed plan (weekday of every label, `parseSets` on every
  scheme, no duplicate day ids, today-resolution). Real-Chromium
  click-throughs for app-code changes
  (`/opt/pw-browsers`, `--no-sandbox`).
- Deploys: `.github/workflows/deploy.yml` (push to main + nightly crons
  00:20/03:40 UTC that roll `today.json` over; GitHub cron runs hours late —
  that's why `today.json` embeds `upcoming`). `publish-plans.yml` pushes
  plans to Firestore when plan.js changes (no-ops politely until the
  `FIREBASE_SERVICE_ACCOUNT` secret exists).
- JSON API (built by `scripts/build-api.mjs` during `npm run build`):
  `api/plans.json`, `api/<athlete>/index.json`, `api/<athlete>/<date>.json`,
  and `api/<athlete>/today.json` (stable URL; carries the next 7 days in
  `upcoming` — consumers trust the entry matching their own date).
- Firebase (optional, offline-first): plans/progress sync behind
  `VITE_FIREBASE_*` Actions variables; `firebase/firestore.rules` is the
  security boundary; plan docs store JSON strings (Firestore forbids nested
  arrays). Console setup is still pending on Paul's side — see README.
- Deep links: hash routing (`#/paul/today`, `#/<athlete>/<block>/<week>/<day>`).
- Never put model identifiers in repo artifacts. Commit messages end with
  the attribution trailer the session provides.
