const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** "Wed 29 Jul" -> a Date in the plan's year. */
export function planDate(label, year = 2026) {
  const m = label.match(/(\d{1,2})\s+([A-Za-z]{3})/);
  if (!m) return new Date();
  return new Date(year, MONTHS.indexOf(m[2].toLowerCase()), parseInt(m[1], 10), 12);
}

export function ymd(d) {
  return d.toISOString().slice(0, 10);
}

export function daysAgo(n) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

/** "4 × 30s" -> 4. The sets count drives how many loggable rows appear. */
export function parseSets(scheme) {
  const m = String(scheme).match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 1;
}

/** "4 × 30s" -> "30s" */
export function parseReps(scheme) {
  const p = String(scheme).split('×')[1];
  return p ? p.trim() : '';
}

/** "A1 Ring row" -> { pair: 'A1', name: 'Ring row' } */
export function parsePair(name) {
  const m = name.match(/^([AB]\d)\s+(.*)$/);
  return m ? { pair: m[1], name: m[2] } : { pair: '', name };
}

export function restSecs(r) {
  const s = String(r).match(/(\d+)\s*s/);
  if (s) return parseInt(s[1], 10);
  const min = String(r).match(/(\d+)\s*min/);
  return min ? parseInt(min[1], 10) * 60 : 0;
}

function mkExercise(e, cues, idx) {
  const p = parsePair(e[0]);
  return { name: p.name, pair: p.pair, load: e[1], scheme: e[2], rest: e[3], cue: cues[e[0]] || cues[p.name] || '', idx };
}

/** A day's workouts, each with its exercises carrying a flat, day-wide index. */
export function workoutsOf(day) {
  let idx = 0;
  return (day.workouts || []).map((w) => ({
    id: w.id,
    title: w.title,
    summary: w.summary,
    exercises: (w.ex || []).map((e) => mkExercise(e, w.cues || {}, idx++)),
  }));
}

/** Flat, ordered exercise list for a day — same order as workoutsOf's indices.
 *  Drives the Session's prev/next and completion counts. */
export function exercisesOf(day) {
  const out = [];
  (day.workouts || []).forEach((w) => {
    (w.ex || []).forEach((e) => out.push(mkExercise(e, w.cues || {}, out.length)));
  });
  return out;
}

export function countDoneSets(sets) {
  return Object.keys(sets || {}).reduce((a, k) => a + (sets[k] || []).filter((s) => s && s.done).length, 0);
}
