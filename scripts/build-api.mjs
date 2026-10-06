// Generate a static JSON "API" into dist/api/ so assistants and scripts can
// pull the plan without scraping the app. Runs after vite build (see the
// build script in package.json), so every deploy refreshes it.
//
//   api/plans.json              every athlete's full plan
//   api/<athlete>/index.json    dated days: date, id, title, file
//   api/<athlete>/<date>.json   one day in full (workouts, notes, deep link)
//   api/<athlete>/today.json    the build-date's day — a nightly scheduled
//                               deploy (see deploy.yml) rolls it over, so the
//                               URL is stable and always current to the day.
//
// Undated template days (weekday-only labels) are skipped. "Today" is
// computed in Europe/London, the athletes' timezone.

import { mkdirSync, writeFileSync } from 'node:fs';
import { PLANS } from '../src/data/plan.js';
import { planDate, ymd } from '../src/lib/plan.js';

const out = new URL('../dist/api/', import.meta.url);
const generated = new Date().toISOString();
const site = 'https://pgste.github.io/Workouts/';

// en-CA gives YYYY-MM-DD; the athletes live in the UK.
const todayYmd = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());

mkdirSync(out, { recursive: true });
writeFileSync(new URL('plans.json', out), JSON.stringify({ generated, plans: PLANS }, null, 2));

for (const [athleteId, plan] of Object.entries(PLANS)) {
  const dir = new URL(athleteId + '/', out);
  mkdirSync(dir, { recursive: true });
  const days = [];
  const allDocs = [];
  let todayDoc = null;
  for (const b of plan.blocks) {
    for (const w of b.weeks || []) {
      for (const d of w.days || []) {
        const dt = planDate(d.label);
        if (!dt) continue;
        const date = ymd(dt);
        const doc = {
          athlete: athleteId,
          date,
          generated,
          block: { id: b.id, title: b.title },
          week: { id: w.id, title: w.title, subtitle: w.subtitle },
          day: d,
          deepLink: site + '#/' + athleteId + '/' + b.id + '/' + w.id + '/' + d.id,
        };
        writeFileSync(new URL(date + '.json', dir), JSON.stringify(doc, null, 2));
        allDocs.push(doc);
        if (date === todayYmd) todayDoc = doc;
        days.push({ date, id: d.id, title: d.title, type: d.type || 'session', file: 'api/' + athleteId + '/' + date + '.json' });
      }
    }
  }
  days.sort((a, b2) => a.date.localeCompare(b2.date));
  writeFileSync(new URL('index.json', dir), JSON.stringify({ athlete: athleteId, generated, days }, null, 2));
  // GitHub runs cron schedules best-effort — the nightly rebuild can land
  // hours late. today.json therefore also inlines the next 7 dated days, so
  // a stale file still CONTAINS the right day: consumers should trust the
  // entry in `upcoming` matching their own date over the top-level `day`.
  const upcoming = allDocs
    .filter((doc) => doc.date >= todayYmd)
    .sort((a, b2) => a.date.localeCompare(b2.date))
    .slice(0, 7);
  writeFileSync(new URL('today.json', dir), JSON.stringify({
    ...(todayDoc || {
      athlete: athleteId,
      date: todayYmd,
      generated,
      day: null,
      message: 'No dated session on the build date. Use the `upcoming` entry matching your date.',
    }),
    note: 'If `date` is behind your actual date, use the matching entry in `upcoming` — the nightly rebuild can run late.',
    upcoming,
  }, null, 2));
  console.log('api/' + athleteId + ': ' + days.length + ' dated days · today=' + (todayDoc ? todayDoc.day.id : 'none') + ' · upcoming=' + upcoming.length);
}
console.log('api generated.');
