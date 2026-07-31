import { PLANS, REAL_ATHLETES } from '../data/plan.js';
import { planDate, ymd } from './plan.js';

// Hash-based deep links — path routing would 404 on the Pages sub-path.
//   #/lewis                          → Lewis's blocks
//   #/lewis/court|daily|progress     → a tab
//   #/lewis/preseason                → weeks list
//   #/lewis/preseason/preweek        → the week's days
//   #/lewis/preseason/preweek/d4     → a day (shareable)
//   #/lewis/today                    → resolves to today's day, wherever it lives
//   #/coach/paul/...                 → coach view, reading Paul

const TABS = ['court', 'daily', 'progress'];

function findToday(planId) {
  const plan = PLANS[planId];
  if (!plan) return null;
  const today = ymd(new Date());
  for (const b of plan.blocks) {
    for (const w of b.weeks || []) {
      for (const d of w.days || []) {
        if (ymd(planDate(d.label)) === today) return { block: b.id, week: w.id, day: d.id };
      }
    }
  }
  return null;
}

/** Parse a location.hash into a nav patch, or null if it names nothing valid.
 *  Ids are checked against the plan so a stale link degrades to the nearest
 *  level that still exists rather than a junk screen. */
export function parseHash(hash) {
  const segs = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (!segs.length) return null;

  const athlete = segs.shift();
  if (athlete !== 'coach' && !PLANS[athlete]) return null;
  const patch = {
    athlete, coachView: null, tab: 'plan',
    block: null, week: null, day: null,
    session: false, overlay: null, complete: null,
  };
  if (athlete === 'coach' && segs.length && PLANS[segs[0]]) patch.coachView = segs.shift();
  if (!segs.length) return patch;

  const next = segs[0];
  if (TABS.includes(next)) { patch.tab = next; return patch; }

  const planId = athlete === 'coach' ? (patch.coachView || REAL_ATHLETES[0].id) : athlete;
  if (next === 'today') {
    Object.assign(patch, findToday(planId) || {});
    return patch;
  }

  const plan = PLANS[planId];
  const block = plan.blocks.find((b) => b.id === segs[0]);
  if (!block) return patch;
  patch.block = block.id; segs.shift();
  const week = segs.length ? (block.weeks || []).find((w) => w.id === segs[0]) : null;
  if (!week) return patch;
  patch.week = week.id; segs.shift();
  const day = segs.length ? (week.days || []).find((d) => d.id === segs[0]) : null;
  if (day) patch.day = day.id;
  return patch;
}

/** Format nav state back into a hash ('' when signed out — clears the hash). */
export function hashOf(s) {
  if (!s.athlete) return '';
  const parts = [s.athlete];
  if (s.athlete === 'coach' && s.coachView) parts.push(s.coachView);
  if (s.tab && s.tab !== 'plan') {
    parts.push(s.tab);
  } else {
    if (s.block) parts.push(s.block);
    if (s.week) parts.push(s.week);
    if (s.day) parts.push(s.day);
  }
  return '#/' + parts.map(encodeURIComponent).join('/');
}
