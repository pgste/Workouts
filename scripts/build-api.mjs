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
        if (date === todayYmd) todayDoc = doc;
        days.push({ date, id: d.id, title: d.title, type: d.type || 'session', file: 'api/' + athleteId + '/' + date + '.json' });
      }
    }
  }
  days.sort((a, b2) => a.date.localeCompare(b2.date));
  writeFileSync(new URL('index.json', dir), JSON.stringify({ athlete: athleteId, generated, days }, null, 2));
  writeFileSync(new URL('today.json', dir), JSON.stringify(todayDoc || {
    athlete: athleteId,
    date: todayYmd,
    generated,
    day: null,
    message: 'No dated session today. See index.json for the calendar.',
  }, null, 2));
  console.log('api/' + athleteId + ': ' + days.length + ' dated days · today=' + (todayDoc ? todayDoc.day.id : 'none'));
}
console.log('api generated.');
