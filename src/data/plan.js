// Plan data. Hand-authored for now; the shape below is what a markdown
// compiler built against PLAN-FORMAT.md should emit — one object per week,
// blocks ordered as they run.
//
// Lewis — Preseason master plan (Tue 28 Jul → Sun 6 Sep 2026), pointing at the
// 3x3 Finals on 3–6 Sep. The calendar below is the whole block; individual weeks
// are written one at a time and attached as a `week` object on the matching block.
// Until a week is written its block renders as "plan not written yet".

export const AMBER = '#f5a524';

export const ATHLETES = [
  { id: 'lewis', name: 'Lewis', sub: 'Preseason · 3x3 Finals 3–6 Sep' },
];

// The evening non-negotiable, attached to every day. Left side first throughout.
export const DAILY = {
  name: 'Back Insurance',
  mins: '8 min · every evening',
  steps: ['Glute bridge', 'Couch stretch (L first)', 'Supine hamstring (L first)', '90/90', 'Dead bugs', "Child's pose"],
};

// Plan-level scaffolding used by the Daily tab: the readiness log fields and the
// GREEN/AMBER/RED gate. This is master-plan content, not a specific training week —
// the day-by-day weeks get attached to BLOCKS as they are written.
export const WEEK = {
  readiness: ['Resting HR', 'Sleep (h)', 'Sleep 1–10', 'Soreness 1–10', 'Motivation 1–10', 'Bodyweight', 'Back', 'L hamstring'],
  gate: [
    { level: 'GREEN', fg: '#34d399', bg: 'rgba(52,211,153,.08)', bd: 'rgba(52,211,153,.28)', criteria: 'RHR within 5 of baseline · sleep 8h+ · motivation 7+ · back clear', action: 'Week 0 runs as written, 65–70%' },
    { level: 'AMBER', fg: AMBER, bg: 'rgba(245,165,36,.08)', bd: 'rgba(245,165,36,.28)', criteria: 'Any two markers off · back tight but not painful', action: 'Week 0 Day 1 at 55–60%, four training days that week only' },
    { level: 'RED', fg: '#ff5470', bg: 'rgba(255,84,112,.07)', bd: 'rgba(255,84,112,.26)', criteria: 'RHR +10 · broken sleep · back symptomatic · flat and unmotivated', action: 'Extend decompression 3 days. We move the calendar, not the athlete' },
  ],
};

// The calendar. One entry per block, ordered as they run. A block gains its
// day-by-day content when a `week` object is attached; until then it shows as
// "not written yet" and taps through to the empty-block screen.
export const BLOCKS = [
  { id: 'preweek', tag: 'Pre-week', title: 'Pre-week — Decompression', dates: 'Tue 28 Jul – Sun 2 Aug', purpose: 'Decompression, jet lag, tendon hold. Not a training week.' },
  { id: 'week0', tag: 'Week 0', title: 'Week 0 — Reintegration', dates: 'Mon 3 – Sun 9 Aug', purpose: 'Re-groove patterns at 65–70%. Nothing heavy, nothing fast.' },
  { id: 'week1', tag: 'Week 1', title: 'Week 1 — Max Strength (front-loaded)', dates: 'Mon 10 – Sun 16 Aug', purpose: 'Heavy Mon/Wed, unload Thu–Sat around 3x3 Scotland on Sun 16.' },
  { id: 'week2', tag: 'Week 2', title: 'Week 2 — Max Strength', dates: 'Mon 17 – Sun 23 Aug', purpose: 'The heaviest week of the year.' },
  { id: 'week3', tag: 'Week 3', title: 'Week 3 — Power Conversion', dates: 'Mon 24 – Sun 30 Aug', purpose: 'Load drops, intent goes to max. Convert strength to rate; plyo peaks.' },
  { id: 'week4', tag: 'Week 4', title: 'Week 4 — Speed & Peak / Taper', dates: 'Mon 31 Aug – Sun 6 Sep', purpose: 'Sharpen and arrive fresh. Finals 3–6 Sep.' },
];

export const COURT_TYPES = ['Practice', 'Game', 'Shootaround', 'Skills'];
export const RPE_WORDS = ['', 'Very easy', 'Easy', 'Light', 'Steady', 'Moderate', 'Solid', 'Hard', 'Very hard', 'Brutal', 'Everything'];

export const COUNTDOWN = 'Finals 3–6 Sep · 3x3 Scotland Sun 16 Aug';
export const GATE_HEADING = 'Gate — readiness for Week 0 (Mon 3 Aug)';
