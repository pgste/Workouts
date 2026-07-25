// Plan data. Hand-authored for now; the shape below is what a markdown
// compiler built against PLAN-FORMAT.md should emit — one object per week,
// blocks ordered as they run.
//
// Lewis — Preseason master plan (Tue 28 Jul → Sun 6 Sep 2026), pointing at the
// 3x3 Finals on 3–6 Sep. The calendar is BLOCKS; a block gains its day-by-day
// content when a `week` object is attached. Until then it renders as
// "plan not written yet".

export const AMBER = '#f5a524';

export const ATHLETES = [
  { id: 'lewis', name: 'Lewis', sub: 'Preseason · 3x3 Finals 3–6 Sep' },
  { id: 'coach', name: 'Coach view', sub: 'Read any plan, no logging' },
];

// The evening non-negotiable, attached to every day. Left side first throughout.
export const DAILY = {
  name: 'Back Insurance',
  mins: '8 min · every evening',
  steps: ['Glute bridge', 'Couch stretch (L first)', 'Supine hamstring (L first)', '90/90', 'Dead bugs', "Child's pose"],
};

// Plan-level scaffolding for the Daily tab: the readiness log fields and the
// GREEN/AMBER/RED gate. Master-plan content, not tied to one training week.
export const WEEK = {
  readiness: ['Resting HR', 'Sleep (h)', 'Sleep 1–10', 'Soreness 1–10', 'Motivation 1–10', 'Bodyweight', 'Back', 'L hamstring'],
  gate: [
    { level: 'GREEN', fg: '#34d399', bg: 'rgba(52,211,153,.08)', bd: 'rgba(52,211,153,.28)', criteria: 'RHR within 5 of baseline · sleep 8h+ · motivation 7+ · back clear', action: 'Week 0 runs as written, 65–70%' },
    { level: 'AMBER', fg: AMBER, bg: 'rgba(245,165,36,.08)', bd: 'rgba(245,165,36,.28)', criteria: 'Any two markers off · back tight but not painful', action: 'Week 0 Day 1 at 55–60%, 4 training days that week only' },
    { level: 'RED', fg: '#ff5470', bg: 'rgba(255,84,112,.07)', bd: 'rgba(255,84,112,.26)', criteria: 'RHR +10 · broken sleep · back symptomatic · flat and unmotivated', action: 'Extend decompression 3 days. Tell me — we move the calendar, not the athlete' },
  ],
};

// Pre-week — Decompression. The first written week. Attached to the `preweek`
// block below; every other block stays empty until its week is written.
const PREWEEK = {
  id: 'preweek',
  title: 'Decompression Pre-week',
  dates: 'Tue 28 Jul – Sun 2 Aug 2026',
  purpose: 'Shed fatigue, hold tendon quality, reset the clock. Not a training week.',
  meta: [
    { label: 'Days to finals (3 Sep)', value: '37 → 32' },
    { label: 'Week 0 starts', value: 'Mon 3 Aug' },
    { label: 'First heavy lift', value: 'Mon 10 Aug' },
    { label: '3x3 Scotland', value: 'Sun 16 Aug' },
  ],
  rules: {
    do: ['Walk', 'Breathe', 'Mobilise', 'Low-load isometrics', 'Sleep'],
    dont: ['Plyometrics', 'Jumps', 'Sled', 'Change of direction', 'Barbell of any weight', 'Nordics', '5v5', 'Shooting to fatigue', 'GHD (ever)'],
    note: 'Three light sessions, three rest days. The rest days are programmed — they are not missed sessions.',
  },
  days: [
    {
      id: 'd1', label: 'Tue 28 Jul', title: 'Arrival', type: 'travel', out: 37,
      summary: 'No training. Lands 13:00. Jet lag is the only job today.',
      items: [
        ['Ankle pumps / calf circulation', '30 each foot, seated', 'On arrival'],
        ['Easy walk outdoors', '20–30 min, daylight, no phone', '15:00–17:00'],
        ['Nap', '20 min MAX, only before 15:00', '—'],
        ['Back Insurance', '8 min', '~20:30'],
        ['Screens / bright light off', '', '21:30'],
        ['Bed', 'UK time, no later', '22:30'],
      ],
      notes: ['5-hour eastward shift = phase advance. Morning daylight pulls the clock forward; long naps and evening light push it back. One disciplined day here saves three.'],
    },
    {
      id: 'd2', label: 'Wed 29 Jul', title: 'Restoration A', type: 'session', out: 36, dur: '~35 min', rpe: 5,
      summary: 'Morning: 10 min outdoors within 30 min of waking. Circadian anchor — every day this week.',
      ex: [
        ['Easy bike or brisk walk', 'Conversational, nose breathing', '1 × 20min', '—'],
        ['Spanish squat isometric', 'Bodyweight + band', '4 × 30s', '45s'],
        ['Tibialis raise', 'Bodyweight (monkey foot or wall)', '2 × 20', '45s'],
        ['Calf raise, 3s down', 'Bodyweight only', '2 × 12', '60s'],
        ['90/90 hip switches', 'Bodyweight', '2 × 8 each', '30s'],
        ['Dead bug, slow exhale', 'Bodyweight', '2 × 6 each', '45s'],
      ],
      cues: { 'Spanish squat isometric': 'Knees stacked over toes, shins vertical-ish. Hold the shake — this is the tendon dose.' },
      notes: ['Isometrics maintain tendon stiffness at near-zero systemic cost. This is the one quality we refuse to give back this week — the plyo ramp in Week 3 depends on it.'],
    },
    {
      id: 'd3', label: 'Thu 30 Jul', title: 'Full Rest', type: 'rest', out: 35,
      summary: 'Nothing. Walk if he wants to, morning light, Back Insurance in the evening.',
      items: [
        ['Morning light', '10 min outdoors within 30 min of waking', 'AM'],
        ['Optional easy walk', 'Only if he wants it', '—'],
        ['Back Insurance', '8 min', 'PM'],
      ],
      notes: ['No gym. No court. No "just a bit of shooting."'],
    },
    {
      id: 'd4', label: 'Fri 31 Jul', title: 'Restoration B', type: 'session', out: 34, dur: '~35 min', rpe: 6,
      summary: 'Blood flow, no CNS cost. He should be fresh the next morning — if he is sore, it was too much.',
      ex: [
        ['Spanish squat isometric', 'Bodyweight + band', '4 × 30s', '45s'],
        ['A1 Ring row, tall chest', 'Bodyweight, feet forward (easy angle)', '3 × 10', '30s'],
        ['A2 DB incline press', '12–14kg', '3 × 12', '60s'],
        ['B1 Cable face pull', 'Light', '3 × 15', '30s'],
        ['B2 DB curl', '8–10kg', '3 × 12', '45s'],
        ['Dead bug', 'Bodyweight', '2 × 8 each', '30s'],
        ['Side plank', 'Bodyweight', '2 × 25s each', '45s'],
      ],
      notes: ['Antagonistic pairing keeps it efficient and keeps the load light. Nothing here should feel like a set worth counting.'],
    },
    {
      id: 'd5', label: 'Sat 1 Aug', title: 'Restoration C', type: 'session', out: 33, dur: '~35 min',
      summary: 'Re-groove patterns at bodyweight. Left leg leads every unilateral movement.',
      ex: [
        ['Spanish squat isometric', 'Bodyweight + band', '3 × 30s', '45s'],
        ['ATG split squat', 'Bodyweight only', '2 × 8 each (L first)', '60s'],
        ['Standing knee drive above 90°', 'Band or cable, 5–7kg', '3 × 8 each', '45s'],
        ['Seated hip flexor lift (knee bent)', 'Bodyweight', '2 × 8 each', '45s'],
        ['Glute bridge march', 'Bodyweight', '2 × 10 each', '45s'],
        ['Single-leg RDL, slow', '8kg DB', '2 × 6 each (L first)', '60s'],
      ],
      optional: { title: 'Court work', limit: '15 min hard cap', body: 'Spot shooting, form only, stationary. No movement shooting, no game speed, no counting makes. Stop the second mechanics wobble — fatigued reps at this stage cost more than they give.' },
      notes: [
        'Hip flexor work belongs here, not in a heavy week — low load, fresh, full control. This is the root of the compensation pattern and a rest week is the cheapest time to attack it.',
        'No Nordics until Week 0. Hamstrings get length and control this week, not eccentric damage.',
      ],
    },
    {
      id: 'd6', label: 'Sun 2 Aug', title: 'Full Rest + Readiness Gate', type: 'rest', out: 32,
      summary: 'Back Insurance. Log the readiness numbers. Nothing else.',
      items: [
        ['Morning light', '10 min outdoors', 'AM'],
        ['Readiness log', 'All fields, before food', 'AM'],
        ['Back Insurance', '8 min', 'PM'],
      ],
      notes: ['This week is also the test. If he bounces back springy, he was functionally overreached and the timing was right. If he is still flat by Sunday, we have found that out before loading him at 90% — which is the whole point.'],
    },
  ],
};

// The calendar. One entry per block, ordered as they run. A block gains its
// day-by-day content when a `week` object is attached; until then it shows as
// "not written yet" and taps through to the empty-block screen.
export const BLOCKS = [
  { id: 'preweek', tag: 'Pre-week', title: 'Pre-week — Decompression', dates: 'Tue 28 Jul – Sun 2 Aug', purpose: 'Decompression, jet lag, tendon hold. Not a training week.', week: PREWEEK },
  { id: 'week0', tag: 'Week 0', title: 'Week 0 — Reintegration', dates: 'Mon 3 – Sun 9 Aug', purpose: 'Re-groove patterns at 65–70%. Nothing heavy, nothing fast.' },
  { id: 'week1', tag: 'Week 1', title: 'Week 1 — Max Strength (front-loaded)', dates: 'Mon 10 – Sun 16 Aug', purpose: 'Heavy Mon/Wed, unload Thu–Sat around 3x3 Scotland on Sun 16.' },
  { id: 'week2', tag: 'Week 2', title: 'Week 2 — Max Strength', dates: 'Mon 17 – Sun 23 Aug', purpose: 'The heaviest week of the year.' },
  { id: 'week3', tag: 'Week 3', title: 'Week 3 — Power Conversion', dates: 'Mon 24 – Sun 30 Aug', purpose: 'Load drops, intent goes to max. Convert strength to rate; plyo peaks.' },
  { id: 'week4', tag: 'Week 4', title: 'Week 4 — Speed & Peak / Taper', dates: 'Mon 31 Aug – Sun 6 Sep', purpose: 'Sharpen and arrive fresh. Finals 3–6 Sep.' },
];

export const COURT_TYPES = ['Practice', 'Game', 'Shootaround', 'Skills'];
export const RPE_WORDS = ['', 'Very easy', 'Easy', 'Light', 'Steady', 'Moderate', 'Solid', 'Hard', 'Very hard', 'Brutal', 'Everything'];

export const COUNTDOWN = 'Finals 3–6 Sep · 3x3 Scotland Sun 16 Aug';
export const GATE_HEADING = 'Gate — decision for Mon 3 Aug';
