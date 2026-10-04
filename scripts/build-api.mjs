// Generate a static JSON "API" into dist/api/ so assistants and scripts can
// pull the plan without scraping the app. Runs after vite build (see the
// build script in package.json), so every deploy refreshes it.
//
//   api/plans.json              every athlete's full plan
//   api/<athlete>/index.json    dated days: date, id, title, file
//   api/<athlete>/<date>.json   one day in full (workouts, notes, deep link)
//
// "Today" is just <athlete>/<YYYY-MM-DD>.json for today's date — static
// hosting can't redirect, and a baked today.json would go stale between
// deploys. Undated template days (weekday-only labels) are skipped.

import { mkdirSync, writeFileSync } from 'node:fs';
import { PLANS } from '../src/data/plan.js';
import { planDate, ymd } from '../src/lib/plan.js';

const out = new URL('../dist/api/', import.meta.url);
const generated = new Date().toISOString();
const site = 'https://pgste.github.io/Workouts/';

mkdirSync(out, { recursive: true });
writeFileSync(new URL('plans.json', out), JSON.stringify({ generated, plans: PLANS }, null, 2));

for (const [athleteId, plan] of Object.entries(PLANS)) {
  const dir = new URL(athleteId + '/', out);
  mkdirSync(dir, { recursive: true });
  const days = [];
  for (const b of plan.blocks) {
    for (const w of b.weeks || []) {
      for (const d of w.days || []) {
        const dt = planDate(d.label);
        if (!dt) continue;
        const date = ymd(dt);
        writeFileSync(new URL(date + '.json', dir), JSON.stringify({
          athlete: athleteId,
          date,
          generated,
          block: { id: b.id, title: b.title },
          week: { id: w.id, title: w.title, subtitle: w.subtitle },
          day: d,
          deepLink: site + '#/' + athleteId + '/' + b.id + '/' + w.id + '/' + d.id,
        }, null, 2));
        days.push({ date, id: d.id, title: d.title, type: d.type || 'session', file: 'api/' + athleteId + '/' + date + '.json' });
      }
    }
  }
  days.sort((a, b2) => a.date.localeCompare(b2.date));
  writeFileSync(new URL('index.json', dir), JSON.stringify({ athlete: athleteId, generated, days }, null, 2));
  console.log('api/' + athleteId + ': ' + days.length + ' dated days');
}
console.log('api generated.');
