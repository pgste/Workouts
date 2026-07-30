// Plan data. Hand-authored for now; the shape below is what a markdown
// compiler built against PLAN-FORMAT.md should emit.
//
// Plans are per-athlete: PLANS[athleteId] holds that athlete's blocks, daily
// routine, readiness fields, gate and countdown. The store selects the active
// plan from the chosen athlete (Coach view reads whichever athlete it points
// at). ATHLETES / AMBER / COURT_TYPES / RPE_WORDS stay global.

export const AMBER = '#f5a524';

export const ATHLETES = [
  { id: 'lewis', name: 'Lewis', sub: 'Preseason · 3x3 Finals 3–6 Sep' },
  { id: 'paul', name: 'Paul', sub: 'Hamstring rehab · return to Hyrox' },
  { id: 'coach', name: 'Coach view', sub: 'Read any plan, no logging' },
];

// Athletes with a real plan (i.e. not the coach role) — used by the coach picker.
export const REAL_ATHLETES = ATHLETES.filter((a) => a.id !== 'coach');

export const COURT_TYPES = ['Practice', 'Game', 'Shootaround', 'Skills'];
export const RPE_WORDS = ['', 'Very easy', 'Easy', 'Light', 'Steady', 'Moderate', 'Solid', 'Hard', 'Very hard', 'Brutal', 'Everything'];

// Gate colours, shared by every plan's GREEN/AMBER/RED cards.
const GREEN_C = { fg: '#34d399', bg: 'rgba(52,211,153,.08)', bd: 'rgba(52,211,153,.28)' };
const AMBER_C = { fg: AMBER, bg: 'rgba(245,165,36,.08)', bd: 'rgba(245,165,36,.28)' };
const RED_C = { fg: '#ff5470', bg: 'rgba(255,84,112,.07)', bd: 'rgba(255,84,112,.26)' };
const gate = (c, level, criteria, action) => ({ level, ...c, criteria, action });

// ─────────────────────────────────────────────────────────────────────────────
// LEWIS — Preseason master plan (Tue 28 Jul → Sun 6 Sep 2026), 3x3 Finals 3–6 Sep.
// ─────────────────────────────────────────────────────────────────────────────

const LEWIS_DAILY = {
  name: 'Back Insurance',
  mins: '8 min · every evening',
  steps: ['Glute bridge', 'Couch stretch (L first)', 'Supine hamstring (L first)', '90/90', 'Dead bugs', "Child's pose"],
};

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

const LEWIS_PLAN = {
  countdown: 'Finals 3–6 Sep · 3x3 Scotland Sun 16 Aug',
  gateHeading: 'Gate — decision for Mon 3 Aug',
  daily: LEWIS_DAILY,
  readiness: ['Resting HR', 'Sleep (h)', 'Sleep 1–10', 'Soreness 1–10', 'Motivation 1–10', 'Bodyweight', 'Back', 'L hamstring'],
  gate: [
    gate(GREEN_C, 'GREEN', 'RHR within 5 of baseline · sleep 8h+ · motivation 7+ · back clear', 'Week 0 runs as written, 65–70%'),
    gate(AMBER_C, 'AMBER', 'Any two markers off · back tight but not painful', 'Week 0 Day 1 at 55–60%, 4 training days that week only'),
    gate(RED_C, 'RED', 'RHR +10 · broken sleep · back symptomatic · flat and unmotivated', 'Extend decompression 3 days. Tell me — we move the calendar, not the athlete'),
  ],
  blocks: [
    { id: 'preweek', tag: 'Pre-week', title: 'Pre-week — Decompression', dates: 'Tue 28 Jul – Sun 2 Aug', purpose: 'Decompression, jet lag, tendon hold. Not a training week.', week: PREWEEK },
    { id: 'week0', tag: 'Week 0', title: 'Week 0 — Reintegration', dates: 'Mon 3 – Sun 9 Aug', purpose: 'Re-groove patterns at 65–70%. Nothing heavy, nothing fast.' },
    { id: 'week1', tag: 'Week 1', title: 'Week 1 — Max Strength (front-loaded)', dates: 'Mon 10 – Sun 16 Aug', purpose: 'Heavy Mon/Wed, unload Thu–Sat around 3x3 Scotland on Sun 16.' },
    { id: 'week2', tag: 'Week 2', title: 'Week 2 — Max Strength', dates: 'Mon 17 – Sun 23 Aug', purpose: 'The heaviest week of the year.' },
    { id: 'week3', tag: 'Week 3', title: 'Week 3 — Power Conversion', dates: 'Mon 24 – Sun 30 Aug', purpose: 'Load drops, intent goes to max. Convert strength to rate; plyo peaks.' },
    { id: 'week4', tag: 'Week 4', title: 'Week 4 — Speed & Peak / Taper', dates: 'Mon 31 Aug – Sun 6 Sep', purpose: 'Sharpen and arrive fresh. Finals 3–6 Sep.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAUL — Return Plan v3, post surgeon clearance. Distal medial hamstring
// insertion (semimembranosus). Phase-based rehab back to running and Hyrox.
// Gating metric throughout: swelling / soreness the NEXT MORNING.
// ─────────────────────────────────────────────────────────────────────────────

const PAUL_DAILY = {
  name: 'Iso + stretch',
  mins: 'AM iso · PM stretch',
  steps: ['AM — iso 5 × 40s @ 30–45° (effort per week)', 'PM — standing ham stretch 3 × 20–30s each'],
};

// The rule that got broken last time — repeated as a note on every session.
const PAUL_STOP_RULE = 'If something feels off mid-session, the session ends. Do not move to another machine to test it.';

// Week 1 — Rebuild the base. Includes the ramp-in weekend (Fri–Sun) that leads
// into Week 1 proper on Monday 3 Aug.
const PAUL_WK1 = {
  id: 'wk1',
  title: 'Week 1 — Rebuild the base',
  dates: 'Ramp-in Fri 31 Jul · Week 1 from Mon 3 Aug',
  purpose: 'Ramp-in weekend, then rebuild the base: volume without hinge or impact. Quad-dominant, hamstring-quiet.',
  meta: [
    { label: 'Isometrics', value: '70% effort' },
    { label: 'Theme', value: 'Volume, no hinge/impact' },
    { label: 'Ramp-in', value: 'Fri–Sun 31 Jul' },
    { label: 'Gate to Wk2', value: 'Pain-free flexion' },
  ],
  rules: {
    do: ['Machine cardio', 'Backward sled', 'Goblet & split squats', 'Wall balls', "Farmer's carries", 'Full upper body'],
    dont: ['Running', 'Loaded hinging', 'Forward sled', 'Burpees', 'Nordics / GHD', 'Jumps / plyos'],
    note: 'Gate to Week 2: resisted flexion pain-free, and light stretch producing no next-morning soreness.',
  },
  days: [
    {
      id: 'p1_fri', label: 'Fri 31 Jul', title: 'Ramp-in — Stretching only', type: 'rest',
      summary: 'Ramp-in weekend begins. Isometrics @ 60%, mild stretch, walk as desired. No training.',
      items: [
        ['AM isometrics', '5 × 40s @ 60% effort', 'AM'],
        ['PM stretch', '3 × 20s each side, mild', 'PM'],
        ['Walking', 'As desired', '—'],
      ],
      notes: ['No training today — isometrics and stretching only.'],
    },
    {
      id: 'p1_sat', label: 'Sat 1 Aug', title: 'Basic reintroduction', type: 'session', dur: '~40 min',
      summary: 'Isometrics @ 60%. Easy machine reintroduction. Set the bike seat for 25–35° knee bend at full extension.',
      ex: [
        ['Treadmill', 'Easy walk, upright', '1 × 12min', '—'],
        ['Static bike', 'Easy, 90rpm, seat 25–35° knee bend', '1 × 10min', '—'],
        ['Backward sled drag', 'Very light', '4 × 20m', '60s'],
        ['Pull-ups', 'Bodyweight', '3 × 6', '90s'],
        ['DB overhead press', 'Moderate', '3 × 8', '90s'],
        ['Face pulls', 'Light', '2 × 15', '45s'],
      ],
      notes: [PAUL_STOP_RULE],
    },
    {
      id: 'p1_sun', label: 'Sun 2 Aug', title: 'A bit more', type: 'session', dur: '~55 min',
      summary: 'Isometrics @ 65%. A little more volume — all machine and light strength.',
      ex: [
        ['Ski erg', 'Steady, tall, arms + lats', '1 × 12min', '—'],
        ['Treadmill', 'Steady walk', '1 × 15min', '—'],
        ['Backward sled drag', 'Light', '6 × 20m', '60s'],
        ['Goblet squat', 'Light', '3 × 10', '90s'],
        ['Split squat', 'Bodyweight–light', '3 × 8 each', '90s'],
        ['Calf raise', '', '3 × 12', '60s'],
        ['DB row', 'Moderate', '3 × 10', '60s'],
        ['Lateral raise', 'Light', '3 × 15', '45s'],
      ],
      notes: ["Gate to Week 1: no next-morning soreness Monday. If sore → repeat Saturday's session and delay 2 days."],
    },
    {
      id: 'p1_mon', label: 'Mon 3 Aug', title: 'Lower rehab + Push', type: 'session',
      summary: 'Cardio 40 min: treadmill walk 20 min steady · bike 20 min easy 90rpm.',
      ex: [
        ['Backward sled drag', 'Light', '8 × 20m', '60s'],
        ['Goblet squat', 'Moderate', '4 × 10', '90s'],
        ['Split squat', '', '3 × 8 each', '90s'],
        ['Calf raise', '', '3 × 15', '60s'],
        ['Incline DB press', '', '4 × 8', '90s'],
        ['DB overhead press', '', '3 × 10', '90s'],
        ['Lateral raise', '', '3 × 15', '45s'],
        ['Dips or close-grip press', '', '3 × 8', '90s'],
      ],
    },
    {
      id: 'p1_tue', label: 'Tue 4 Aug', title: 'Threshold (machine only)', type: 'session',
      summary: 'Cardio: ski erg 5 × 4 min @ RPE 7 (90s rest) · bike 15 min easy.',
      ex: [
        ['Ski erg intervals', 'RPE 7', '5 × 4min', '90s'],
        ['Wall balls', 'Squat pattern is clear', '4 × 15', '—'],
        ["Farmer's carry", 'Heavy', '4 × 40m', '—'],
        ['Hanging knee raise', '', '3 × 12', '—'],
        ['Pallof press', '', '3 × 12 each', '—'],
      ],
      notes: [PAUL_STOP_RULE],
    },
    {
      id: 'p1_wed', label: 'Wed 5 Aug', title: 'Pull', type: 'session',
      summary: 'Cardio 40 min: rower — arms + short slide only, 20 min · treadmill walk 20 min.',
      ex: [
        ['Pull-ups', '', '4 × 6', '90s'],
        ['Lat pulldown', '', '3 × 10', '90s'],
        ['DB row', '', '4 × 10', '60s'],
        ['Face pulls', '', '3 × 15', '45s'],
        ['Rear delt fly', '', '3 × 15', '45s'],
        ['Bicep curl', '', '3 × 12', '45s'],
      ],
    },
    {
      id: 'p1_thu', label: 'Thu 6 Aug', title: 'VO2 max (machines only)', type: 'session', rpe: 9,
      summary: 'Norwegian 4 × 4: 4 min @ RPE 9 / 3 min recovery — alternate bike and ski erg. Warm-up 10 min treadmill walk, cool-down 10 min bike.',
      ex: [
        ['Norwegian 4×4 (bike / ski erg)', 'RPE 9', '4 × 4min', '3min'],
      ],
      notes: ['The hardest session of the week. Machines only — no running.'],
    },
    {
      id: 'p1_fri2', label: 'Fri 7 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching only. Walk.',
      items: [
        ['Isometrics + stretch', 'As the daily routine', '—'],
        ['Walk', 'Easy', '—'],
      ],
    },
    {
      id: 'p1_sat2', label: 'Sat 8 Aug', title: 'Sled + Strength', type: 'session',
      summary: 'Cardio 40 min: treadmill walk 20 min · bike 20 min.',
      ex: [
        ['Backward sled drag', 'Moderate', '10 × 20m', '60s'],
        ['Box step-ups', "Step, don't jump", '3 × 10 each', '90s'],
        ['Leg extension or wall sit', '', '3 × 30s', '60s'],
        ['Calf raise', '', '4 × 12', '60s'],
        ['Pull-ups', '', '3 × 8', '90s'],
        ['DB press', '', '3 × 10', '90s'],
        ['Lateral raise', '', '3 × 15', '45s'],
      ],
    },
    {
      id: 'p1_sun2', label: 'Sun 9 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: '90 min continuous, moderate, RPE 6–7. Bike-based and protected — no running, no burpees. Repeat the circuit × 4.',
      ex: [
        ['Bike 1km → 10 wall balls', 'RPE 6–7', '4 rounds', '—'],
        ['Ski erg 500m → backward sled drag 40m', 'RPE 6–7', '4 rounds', '—'],
        ['Treadmill walk 5 min → 20 farmer carry steps', 'RPE 6–7', '4 rounds', '—'],
      ],
      notes: ['Gate to Week 2: resisted flexion pain-free + light stretch producing no next-morning soreness.'],
    },
  ],
};

// Week 2 — Load through range. Introduces the tempo RDL.
const PAUL_WK2 = {
  id: 'wk2',
  title: 'Week 2 — Load through range',
  dates: 'Mon 10 – Sun 16 Aug',
  purpose: 'Introduce the tempo RDL — the key rebuild exercise. Forward sled returns.',
  meta: [
    { label: 'Isometrics', value: '80% effort' },
    { label: 'Key lift', value: 'Tempo RDL (4s ecc)' },
    { label: 'Runs', value: 'Not yet' },
    { label: 'Gate to Wk3', value: 'RDL comfortable light' },
  ],
  rules: {
    do: ['Tempo RDL (4s ecc)', 'Forward sled push', 'Full-slide rowing', 'Incline walking', 'Wall balls', 'Carries'],
    dont: ['Running', 'Heavy hinge', 'Jumping burpees', 'Nordics / GHD', 'Speed work'],
    note: 'Gate to Week 3: tempo RDL comfortable at light load, no next-morning response.',
  },
  days: [
    {
      id: 'p2_mon', label: 'Mon 10 Aug', title: 'Lower + Push', type: 'session',
      summary: 'Cardio 40 min: treadmill walk 20 · bike 20.',
      ex: [
        ['Tempo RDL', 'Very light (empty bar / 20kg), 4s eccentric', '3 × 8', '2min'],
        ['Backward sled drag', 'Moderate', '8 × 20m', '60s'],
        ['Goblet squat', '', '4 × 12', '90s'],
        ['Split squat', '', '3 × 10 each', '90s'],
        ['Incline DB press', '', '4 × 8', '90s'],
        ['DB overhead press', '', '3 × 10', '90s'],
        ['Lateral raise', '', '3 × 15', '45s'],
      ],
      cues: { 'Tempo RDL': 'The main event. 4-second lower, feel the hamstring lengthen under control. Very light — range and control, not load.' },
      notes: ['Tempo RDL is the key rebuild exercise — slow eccentric load is what rebuilds insertion tolerance.'],
    },
    {
      id: 'p2_tue', label: 'Tue 11 Aug', title: 'Threshold (machine)', type: 'session',
      summary: 'Ski erg 5 × 4 min @ RPE 7–8 · rower full slide, moderate, 15 min.',
      ex: [
        ['Ski erg intervals', 'RPE 7–8', '5 × 4min', '90s'],
        ['Rower', 'Full slide, moderate', '1 × 15min', '—'],
        ['Wall balls', '', '5 × 15', '—'],
        ["Farmer's carry", '', '4 × 50m', '—'],
        ['Hanging leg raise', '', '3 × 12', '—'],
      ],
      notes: [PAUL_STOP_RULE],
    },
    {
      id: 'p2_wed', label: 'Wed 12 Aug', title: 'Pull', type: 'session',
      summary: 'Cardio 40 min: rower full slide 20 min moderate · treadmill walk 20 min.',
      ex: [
        ['Pull-ups', '', '4 × 7', '90s'],
        ['Lat pulldown', '', '3 × 10', '90s'],
        ['DB row', '', '4 × 10', '60s'],
        ['Back extension', 'Bodyweight, short range', '3 × 10', '60s'],
        ['Face pulls', '', '3 × 15', '45s'],
        ['Rear delt fly', '', '3 × 15', '45s'],
      ],
    },
    {
      id: 'p2_thu', label: 'Thu 13 Aug', title: 'VO2 max (machines)', type: 'session', rpe: 10,
      summary: '30/30 shuttle: 30s @ RPE 9–10 / 30s easy × 12, rest 3 min, repeat × 2 blocks. Alternate bike, ski erg, rower.',
      ex: [
        ['30/30 intervals (bike / ski / rower)', 'RPE 9–10', '2 × 12', '3min'],
      ],
      notes: ['Machines only. Do not run this.'],
    },
    {
      id: 'p2_fri', label: 'Fri 14 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching. Incline walk 10 min @ 5–6% if the shin is quiet.',
      items: [
        ['Isometrics + stretch', 'As the daily routine', '—'],
        ['Incline walk', '10 min @ 5–6%, only if shin quiet', '—'],
      ],
    },
    {
      id: 'p2_sat', label: 'Sat 15 Aug', title: 'Sled + Strength', type: 'session',
      summary: 'Cardio 40 min: incline walk 15 min @ 6% · bike 25 min.',
      ex: [
        ['Forward sled push', 'Moderate — returns this week', '6 × 20m', '90s'],
        ['Backward sled drag', '', '8 × 20m', '60s'],
        ['Box step-ups', '', '4 × 10 each', '90s'],
        ['Tempo RDL', 'Light, 4s eccentric', '3 × 8', '2min'],
        ['Pull-ups', '', '3 × 8', '90s'],
        ['DB press', '', '3 × 10', '90s'],
        ['Bicep curl', '', '3 × 12', '45s'],
      ],
    },
    {
      id: 'p2_sun', label: 'Sun 16 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: 'Same structure as Week 1, 4 rounds at RPE 7. Swap one bike block for rower 500m; add 10 step-back burpees (no jump) per round.',
      ex: [
        ['Bike / rower 1km → 10 wall balls', 'RPE 7', '4 rounds', '—'],
        ['Ski erg 500m → backward sled drag 40m', 'RPE 7', '4 rounds', '—'],
        ['Treadmill walk 5 min → 20 farmer carry steps', 'RPE 7', '4 rounds', '—'],
        ['Step-back burpees (no jump)', 'Per round', '4 × 10', '—'],
      ],
      notes: ['Gate to Week 3: tempo RDL comfortable at light load, no next-morning response.'],
    },
  ],
};

// Week 3 — Strength + full range. Full-range hamstring work returns.
const PAUL_WK3 = {
  id: 'wk3',
  title: 'Week 3 — Strength & full range',
  dates: 'Mon 17 – Sun 23 Aug',
  purpose: 'Full-range hamstring work returns; build load. The gate to running sits at the end of this week.',
  meta: [
    { label: 'Isometrics', value: '85% effort' },
    { label: 'Theme', value: 'Full-range ham work' },
    { label: 'Runs', value: 'Not yet' },
    { label: 'Gate', value: '3 pain-free tests → run' },
  ],
  rules: {
    do: ['Tempo RDL building', 'Hamstring curl (full range)', 'Front squat', 'Forward sled heavier', 'Incline walk 6–8%'],
    dont: ['Running (until the 3-part gate)', 'Speed work / hills', 'Jumping'],
    note: 'Gate to running: pain-free resisted flexion + pain-free loaded hinge + pain-free full-range curl. All three.',
  },
  days: [
    {
      id: 'p3_mon', label: 'Mon 17 Aug', title: 'Lower + Push', type: 'session',
      summary: 'Cardio 40 min: treadmill walk 20 · rower 20 moderate.',
      ex: [
        ['Tempo RDL', 'Building load, 3s eccentric', '4 × 8', '2min'],
        ['Hamstring curl', 'Monkey foot on cable, light — full range returns', '3 × 12', '90s'],
        ['Backward sled drag', '', '8 × 25m', '60s'],
        ['Front squat or goblet', 'Moderate', '4 × 8', '2min'],
        ['Incline DB press', '', '4 × 8', '90s'],
        ['DB overhead press', '', '4 × 8', '90s'],
        ['Lateral raise', '', '3 × 15', '45s'],
      ],
      cues: { 'Hamstring curl': 'Full range but light. This is the first full-range flexion load — earn the range before the load.' },
    },
    {
      id: 'p3_tue', label: 'Tue 18 Aug', title: 'Threshold (machine)', type: 'session', rpe: 8,
      summary: 'Rower 4 × 1000m @ RPE 8, 2 min rest · bike 10 min easy.',
      ex: [
        ['Rower intervals', 'RPE 8', '4 × 1000m', '2min'],
        ['Wall balls', '', '5 × 20', '—'],
        ['Sandbag / DB carries', '', '4 × 50m', '—'],
        ['Core circuit', '', '3 rounds', '—'],
      ],
      notes: [PAUL_STOP_RULE],
    },
    {
      id: 'p3_wed', label: 'Wed 19 Aug', title: 'Pull', type: 'session',
      summary: 'Cardio 40 min: ski erg 20 min · treadmill walk 20 min.',
      ex: [
        ['Pull-ups', '', '4 × 8', '90s'],
        ['Weighted lat pulldown', '', '4 × 8', '90s'],
        ['DB row', '', '4 × 12', '60s'],
        ['Back extension', 'Full range', '3 × 12', '60s'],
        ['Face pulls', '', '3 × 15', '45s'],
        ['Bicep curl', '', '3 × 15', '45s'],
      ],
    },
    {
      id: 'p3_thu', label: 'Thu 20 Aug', title: 'VO2 max (machines)', type: 'session', rpe: 10,
      summary: 'Norwegian 4 × 4 @ RPE 9–10, alternating machines. Push genuinely hard.',
      ex: [
        ['Norwegian 4×4 (alternate machines)', 'RPE 9–10', '4 × 4min', '3min'],
      ],
    },
    {
      id: 'p3_fri', label: 'Fri 21 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching. Incline walk 15 min @ 6–8%.',
      items: [
        ['Isometrics + stretch', 'As the daily routine', '—'],
        ['Incline walk', '15 min @ 6–8%', '—'],
      ],
    },
    {
      id: 'p3_sat', label: 'Sat 22 Aug', title: 'Sled + Strength', type: 'session',
      summary: 'Cardio 40 min: incline walk 20 min @ 8% · bike 20 min.',
      ex: [
        ['Forward sled push', 'Heavier', '8 × 20m', '90s'],
        ['Backward sled drag', '', '8 × 25m', '60s'],
        ['Tempo RDL', 'Moderate load, 3s eccentric', '4 × 6', '2min'],
        ['Box step-ups', '', '4 × 12', '90s'],
        ['Calf raise', '', '4 × 15', '60s'],
        ['Upper accessory', 'Your choice', '3 × 12', '—'],
      ],
    },
    {
      id: 'p3_sun', label: 'Sun 23 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 8,
      summary: 'Full machine simulation, 5 rounds, RPE 7–8. Still no running.',
      ex: [
        ['Machine Hyrox circuit', 'RPE 7–8', '5 rounds', '—'],
      ],
      notes: ['GATE TO RUNNING: pain-free resisted flexion + pain-free loaded hinge + pain-free full-range curl. All three, or running waits.'],
    },
  ],
};

// Week 4 — Running returns. Runs 48h apart: Tuesday and Saturday only.
const PAUL_WK4 = {
  id: 'wk4',
  title: 'Week 4 — Running returns',
  dates: 'Mon 24 – Sun 30 Aug',
  purpose: 'Running reintroduced — Tuesday and Saturday only, 48h apart, Zone 2. Frequency before volume.',
  meta: [
    { label: 'Isometrics', value: '85% effort' },
    { label: 'Theme', value: 'Running returns' },
    { label: 'Run days', value: 'Tue + Sat only' },
    { label: 'Rule', value: '48h apart, Zone 2' },
  ],
  rules: {
    do: ['Running Tue + Sat (Zone 2)', 'Tempo RDL', 'Hamstring curl', 'Sled', 'Machine VO2'],
    dont: ['Runs on consecutive days', 'Running the VO2 session', 'Speed work / hills', 'Running inside the Sunday sim'],
    note: 'Runs 48h apart — Tuesday and Saturday only. Never Tues + Thurs.',
  },
  days: [
    {
      id: 'p4_mon', label: 'Mon 24 Aug', title: 'Lower + Push', type: 'session',
      summary: 'Cardio 40 min: treadmill walk 20 · bike 20.',
      ex: [
        ['Tempo RDL', 'Building, 3s eccentric', '4 × 6', '2min'],
        ['Hamstring curl', 'Monkey foot on cable', '3 × 12', '90s'],
        ['Backward sled drag', '', '8 × 25m', '60s'],
        ['Squat', 'Moderate', '4 × 6', '2min'],
        ['Full push session', 'Incline press / OHP / lateral raise', '3 × 10', '90s'],
      ],
    },
    {
      id: 'p4_tue', label: 'Tue 25 Aug', title: 'RUN 1 🏃', type: 'session',
      summary: 'Warm-up: treadmill 10 min easy (walk into jog) + dynamic prep. Cool-down: bike 10 min easy. Nothing else this session.',
      ex: [
        ['Run — 3 × 1km easy', 'Zone 2, conversational, 2 min walk between', '3 × 1km', '2min'],
      ],
      cues: { 'Run — 3 × 1km easy': 'Zone 2 — conversational, not threshold. Frequency before volume; this is the first run back.' },
      notes: ['Stop immediately if: diffuse shin ache, or any pull behind the knee. That run is over — the bone is still the slowest tissue in the queue.'],
    },
    {
      id: 'p4_wed', label: 'Wed 26 Aug', title: 'Pull (no leg work)', type: 'session',
      summary: 'Recovery from the run — no leg work. Cardio: rower 20 min · ski erg 20 min. Full pull session as Week 3.',
      ex: [
        ['Pull-ups', '', '4 × 8', '90s'],
        ['Weighted lat pulldown', '', '4 × 8', '90s'],
        ['DB row', '', '4 × 12', '60s'],
        ['Back extension', '', '3 × 12', '60s'],
        ['Face pulls', '', '3 × 15', '45s'],
      ],
    },
    {
      id: 'p4_thu', label: 'Thu 27 Aug', title: 'VO2 max (machines only)', type: 'session', rpe: 10,
      summary: '4 × 4 or 30/30, alternating bike / ski / rower. Machine-based — do NOT run it.',
      ex: [
        ['VO2 intervals (machines only)', 'RPE 9–10', '4 × 4min', '3min'],
      ],
      notes: ['This stays machine-based. Your two runs (Tue + Sat) are the only running this week.'],
    },
    {
      id: 'p4_fri', label: 'Fri 28 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching. Easy walk.',
      items: [
        ['Isometrics + stretch', 'As the daily routine', '—'],
        ['Walk', 'Easy', '—'],
      ],
    },
    {
      id: 'p4_sat', label: 'Sat 29 Aug', title: 'RUN 2 🏃 + Sled', type: 'session',
      summary: '48h after Run 1 — runs are Tuesday and Saturday only, never consecutive days.',
      ex: [
        ['Run — 3 × 1km easy', 'Zone 2, same as Tuesday', '3 × 1km', '2min'],
        ['Backward sled drag', '', '8 × 20m', '60s'],
        ['Tempo RDL', '', '3 × 8', '2min'],
        ['Light upper accessory', 'Your choice', '3 × 12', '—'],
      ],
    },
    {
      id: 'p4_sun', label: 'Sun 30 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: 'Machines + sled, RPE 7. Keep running OUT of the sim for now — your two runs are enough load.',
      ex: [
        ['Machine + sled Hyrox circuit', 'RPE 7', '5 rounds', '—'],
      ],
      notes: ['Week 5+: add one running variable per week — +1km total OR a third run, never both. Speed and hills come last.'],
    },
  ],
};

const PAUL_PLAN = {
  countdown: 'Return to Hyrox build · gate on next-morning soreness',
  gateHeading: 'Gate — next-morning response',
  daily: PAUL_DAILY,
  readiness: ['Next-AM soreness 1–10', 'Swelling', 'Hamstring', 'Sleep (h)', 'Bodyweight', 'Notes'],
  gate: [
    gate(GREEN_C, 'GREEN', 'No next-morning soreness or swelling · movement pain-free', 'Progress the phase as written — add load / range'),
    gate(AMBER_C, 'AMBER', 'Mild next-AM soreness that settles by midday · no swelling', 'Hold. Repeat that week, do not progress'),
    gate(RED_C, 'RED', 'Sorer next morning · joint swelling · sharp or sit-bone pain', 'Stop. Sit-bone pain → physio; joint swelling → surgeon’s team. Diffuse shin ache on a run → hold running volume 2 weeks'),
  ],
  blocks: [
    { id: 'wk1', tag: 'Week 1', title: 'Week 1 — Rebuild the base', dates: 'Fri 31 Jul – Sun 9 Aug', purpose: 'Ramp-in weekend, then rebuild the base — volume without hinge or impact.', week: PAUL_WK1 },
    { id: 'wk2', tag: 'Week 2', title: 'Week 2 — Load through range', dates: 'Mon 10 – Sun 16 Aug', purpose: 'Introduce the tempo RDL — the key rebuild exercise. Forward sled returns.', week: PAUL_WK2 },
    { id: 'wk3', tag: 'Week 3', title: 'Week 3 — Strength & full range', dates: 'Mon 17 – Sun 23 Aug', purpose: 'Full-range hamstring work returns; build load. Gate to running at the end.', week: PAUL_WK3 },
    { id: 'wk4', tag: 'Week 4', title: 'Week 4 — Running returns', dates: 'Mon 24 – Sun 30 Aug', purpose: 'Running reintroduced Tuesday & Saturday only, 48h apart, Zone 2.', week: PAUL_WK4 },
    { id: 'maint', tag: 'Week 5+', title: 'Week 5+ — Progression rules', dates: 'From Mon 31 Aug', purpose: 'Add one running variable per week (+1km OR a third run, never both). Keep tempo RDL + isometrics permanently, 2× weekly; add Nordic negatives and Jefferson curls once RDL is at full load. Speed and hills last.' },
  ],
};

export const PLANS = { lewis: LEWIS_PLAN, paul: PAUL_PLAN };
