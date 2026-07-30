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
// PAUL — Integrated Return Plan v4. Hamstring rehab (distal medial insertion,
// semimembranosus) merged with the ongoing VO2 / Hyrox program. Phase 1 (Weeks
// 1–4) the hamstring leads; Phase 2 (Week 5+) is the merged program. Gating
// metric throughout: next-morning soreness / swelling — hamstring OR knee.
// Skeleton to be fleshed out — session titles, cardio and named lifts are in;
// finer prescriptions get filled in per day.
// ─────────────────────────────────────────────────────────────────────────────

// Paul has no cross trainer — treadmill (walking) / ski erg / rower / bike only.
// Hamstring curls and hip work use a monkey-foot cable attachment.

const PAUL_DAILY = {
  name: 'Daily spine',
  mins: 'AM iso + knee · PM stretch · daily sled',
  steps: [
    'AM — hamstring iso 5 × 40s @ 30–45° (70% → near-max by wk3)',
    'AM — knee rehab (heel slides, quad sets, SL raises + balance, calf)',
    'PM — light hamstring stretch 3 × 20–30s, mild',
    'Daily — backward sled drag (quad-dominant, hamstring-quiet)',
  ],
};

// The rule that got broken last time — repeated as a note on key sessions.
const PAUL_STOP_RULE = 'If something feels off mid-session, the session ends. Do not move to another machine to test it.';

// PHASE 1, Week 1 — Rebuild the base. Volume without hinge or impact.
const PAUL_WK1 = {
  id: 'wk1',
  title: 'Week 1 — Rebuild the base',
  dates: 'Phase 1 · hamstring leads',
  purpose: 'Volume without hinge or impact. Cardio on hamstring-safe machines, lower work bodyweight-to-light. Upper body and skills unrestricted.',
  meta: [
    { label: 'Phase', value: '1 · hamstring leads' },
    { label: 'Isometrics', value: '70% effort' },
    { label: 'Theme', value: 'Volume, no hinge/impact' },
    { label: 'Gate to Wk2', value: 'Pain-free flexion' },
  ],
  rules: {
    do: ['Backward sled 8×20m', 'Treadmill walk 20–25', 'Ski / row (arms + short slide)', 'Goblet & split squats (BW–light)', 'Full upper body', 'Walking'],
    dont: ['Running', 'Loaded hinging', 'Leg press', 'Full-slide rowing at intensity', 'Nordics / GHD', 'Plyometrics', 'Floor Oly lifts'],
    note: 'Gate to Week 2: resisted hamstring flexion pain-free AND light stretch tolerated with no next-morning soreness.',
  },
  days: [
    { id: 'w1_mon', label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', summary: 'Unrestricted upper push, handstand work, pump. Cardio: treadmill walk 20 + ski (arms / short slide) 20.' },
    {
      id: 'w1_tue', label: 'Tue', title: 'Lower — LIGHT', type: 'session', summary: 'Bodyweight-to-light lower. Cardio: treadmill walk 20–25.',
      ex: [
        ['Goblet squat', 'Bodyweight–light', '3 × 10', '90s'],
        ['Split squat', 'Bodyweight–light', '3 × 8 each', '90s'],
        ['Backward sled drag', 'Light', '8 × 20m', '60s'],
      ],
    },
    { id: 'w1_wed', label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', summary: 'Unrestricted upper pull, muscle-up, pump. Cardio: ski (arms) 20 + row (short slide, controlled) 20.' },
    {
      id: 'w1_thu', label: 'Thu', title: 'VO2 — machine-modified', type: 'session', rpe: 9,
      summary: 'Bike 4×4 (knee at 25–35° bend) + ski short-slide. No explosive rowing catch, no running.',
      ex: [['Bike 4×4 (+ ski short-slide)', 'RPE 9', '4 × 4min', '3min']],
      notes: [PAUL_STOP_RULE],
    },
    { id: 'w1_fri', label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', summary: 'Boxing (bag, unrestricted) 30 + mobility + skills (lever / flag — upper only).' },
    {
      id: 'w1_sat', label: 'Sat', title: 'Lower — LIGHT repeat', type: 'session', summary: 'Repeat of Tuesday. Cardio: treadmill walk 20–25.',
      ex: [
        ['Goblet squat', 'Bodyweight–light', '3 × 10', '90s'],
        ['Split squat', 'Bodyweight–light', '3 × 8 each', '90s'],
        ['Backward sled drag', 'Light', '8 × 20m', '60s'],
      ],
    },
    {
      id: 'w1_sun', label: 'Sun', title: 'Half-Hyrox — MODIFIED', type: 'session', rpe: 7,
      summary: 'Bike subs all runs; stations = ski / sled / short-slide row / carry only. Steady.',
      notes: ['Gate to Week 2: resisted flexion pain-free + light stretch with no next-morning soreness.'],
    },
  ],
};

// PHASE 1, Week 2 — Introduce load through range. The tempo RDL enters.
const PAUL_WK2 = {
  id: 'wk2',
  title: 'Week 2 — Load through range',
  dates: 'Phase 2 · hamstring leads',
  purpose: 'Introduce the tempo RDL (4s eccentric) — the most important exercise in the plan. Treat it as medicine, not training; don’t chase load.',
  meta: [
    { label: 'Phase', value: '1 · hamstring leads' },
    { label: 'Isometrics', value: '80% effort' },
    { label: 'Key lift', value: 'Tempo RDL (4s ecc)' },
    { label: 'Gate to Wk3', value: 'RDL comfortable light' },
  ],
  rules: {
    do: ['Tempo RDL (4s ecc)', 'Forward sled push (moderate)', 'Full-slide rowing (moderate)', 'Incline walk 5–6%', 'Upper unrestricted'],
    dont: ['Running', 'Rowing at intensity', 'Nordics / GHD', 'Plyometrics', 'Floor Oly lifts'],
    note: 'Gate to Week 3: tempo RDL comfortable at light load, no next-morning response.',
  },
  days: [
    { id: 'w2_mon', label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', summary: 'Cardio: treadmill walk 20 + ski 20.' },
    {
      id: 'w2_tue', label: 'Tue', title: 'Lower — tempo RDL', type: 'session', summary: 'Cardio: bike 20.',
      ex: [
        ['Tempo RDL', 'Very light (empty bar / 20kg), 4s eccentric', '3 × 8', '2min'],
        ['Goblet squat', '', '4 × 12', '90s'],
        ['Split squat', '', '3 × 10 each', '90s'],
        ['Backward sled drag', '', '8 × 20m', '60s'],
      ],
      cues: { 'Tempo RDL': 'The main event. 4-second lower, feel the hamstring lengthen under control. Medicine, not training — range and control, not load.' },
    },
    { id: 'w2_wed', label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', summary: 'Cardio: row (full-slide, moderate) 20 + ski 20.' },
    {
      id: 'w2_thu', label: 'Thu', title: 'VO2', type: 'session', rpe: 9,
      summary: 'Bike 4×4 + ski + row (full-slide moderate, still not explosive). Isometrics → 80%.',
      ex: [['Bike 4×4 (+ ski + moderate row)', 'RPE 9', '4 × 4min', '3min']],
    },
    { id: 'w2_fri', label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', summary: 'Bag 30 + mobility + skills.' },
    {
      id: 'w2_sat', label: 'Sat', title: 'Lower + forward sled', type: 'session', summary: 'Incline walk 5–6%, 10–15 min.',
      ex: [
        ['Tempo RDL', 'Light, 4s eccentric', '3 × 8', '2min'],
        ['Forward sled push', 'Moderate — returns this week', '6 × 20m', '90s'],
      ],
    },
    {
      id: 'w2_sun', label: 'Sun', title: 'Half-Hyrox', type: 'session', rpe: 7,
      summary: 'Bike subs runs; full-slide row now allowed in stations. Steady.',
      notes: ['Gate to Week 3: tempo RDL comfortable at light load, no next-morning response.'],
    },
  ],
};

// PHASE 1, Week 3 — Strength & speed of contraction. Full-range ham work returns.
const PAUL_WK3 = {
  id: 'wk3',
  title: 'Week 3 — Strength & speed',
  dates: 'Phase 3 · hamstring leads',
  purpose: 'Full-range hamstring work returns; build RDL load and speed of contraction. Rowing intensity and bike come back. The gate to running sits at week end.',
  meta: [
    { label: 'Phase', value: '1 · hamstring leads' },
    { label: 'Isometrics', value: 'near-max' },
    { label: 'Theme', value: 'Full-range ham work' },
    { label: 'Gate', value: '3 pain-free tests → run' },
  ],
  rules: {
    do: ['RDL building (3–4s ecc)', 'Hamstring curls (light, full range)', 'Rowing intensity returns', 'Bike unrestricted', 'Wall balls', 'Box step-ups (not jumps)'],
    dont: ['Running (until the 3-part gate)', 'Box jumps', 'Speed work / hills', 'Burpee broad jumps'],
    note: 'Gate to running: pain-free resisted flexion + loaded hinge + full-range curl. All three, no next-morning soreness.',
  },
  days: [
    { id: 'w3_mon', label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', summary: 'Cardio: ski 20 + row 20.' },
    {
      id: 'w3_tue', label: 'Tue', title: 'Lower — RDL + curls', type: 'session', summary: 'Cardio: bike 20.',
      ex: [
        ['Tempo RDL', 'Build load, keep 3–4s eccentric', '4 × 8', '2min'],
        ['Hamstring curl', 'Monkey foot on cable, light — full range returns', '3 × 12', '90s'],
        ['Split squat', '', '3 × 10 each', '90s'],
        ['Backward sled drag', '', '8 × 25m', '60s'],
      ],
    },
    { id: 'w3_wed', label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', summary: 'Cardio: row 20 + ski 20.' },
    {
      id: 'w3_thu', label: 'Thu', title: 'VO2 — full return', type: 'session', rpe: 10,
      summary: 'Row intensity intervals now allowed + bike + ski. 4×4 or 30/30. Isometrics near-max.',
      ex: [['VO2 4×4 / 30-30 (row / bike / ski)', 'RPE 9–10', '4 × 4min', '3min']],
    },
    { id: 'w3_fri', label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', summary: 'Bag 30 + mobility + skills.' },
    {
      id: 'w3_sat', label: 'Sat', title: 'Lower — RDL + wall balls', type: 'session', summary: 'Cardio: bike.',
      ex: [
        ['Tempo RDL', 'Building', '4 × 6', '2min'],
        ['Hamstring curl', 'Monkey foot on cable', '3 × 12', '90s'],
        ['Wall balls', '', '4 × 15', '—'],
        ['Box step-ups', 'Step, not jump', '3 × 10 each', '90s'],
        ['Front squat', 'Light', '3 × 8', '2min'],
      ],
    },
    {
      id: 'w3_sun', label: 'Sun', title: 'Half-Hyrox', type: 'session', rpe: 8,
      summary: 'Bike still subs runs; stations now full (ski / sled / row / carry / wall balls).',
      notes: ['GATE TO RUNNING: pain-free resisted flexion + loaded hinge + full-range curl. All three, no next-morning soreness.'],
    },
  ],
};

// PHASE 1→2 merge, Week 4+ — Running returns carefully. Runs Tue + Sat only.
const PAUL_WK4 = {
  id: 'wk4',
  title: 'Week 4+ — Running returns',
  dates: 'Phase 1 → 2 merge',
  purpose: 'Where v3 and the main program merge. Frequency before volume; let the slowest tissue lead. Runs Tuesday + Saturday only (48h apart), machine VO2 stays on Thursday.',
  meta: [
    { label: 'Phase', value: '1 → 2 merge' },
    { label: 'Run days', value: 'Tue + Sat only' },
    { label: 'Rule', value: '48h apart, Zone 2' },
    { label: 'VO2', value: 'Machines (Thu)' },
  ],
  rules: {
    do: ['Running Tue + Sat (3×1km Zone 2)', 'Machine VO2 Thu', 'RDL + curls kept in', 'Full Hyrox stations'],
    dont: ['Runs on consecutive days', 'Running the VO2 session', 'Speed work / hills (last)', 'Burpee broad jumps (last)'],
    note: 'Add distance only after a week with zero next-morning soreness (hamstring, knee OR shin). Diffuse shin ache = that run is over.',
  },
  days: [
    { id: 'w4_mon', label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', summary: 'Cardio: ski 20 + row 20.' },
    {
      id: 'w4_tue', label: 'Tue', title: 'RUN 1 🏃 + Lower', type: 'session', summary: 'Warm-up: treadmill 10 min easy (walk into jog) + dynamic prep.',
      ex: [
        ['Run — 3 × 1km easy', 'Zone 2, conversational, 2 min walk between', '3 × 1km', '2min'],
        ['Tempo RDL (kept in)', '', '3 × 8', '2min'],
      ],
      cues: { 'Run — 3 × 1km easy': 'Zone 2 — conversational, not threshold. Frequency before volume; this is the first run back.' },
      notes: ['Stop immediately on diffuse shin ache or any pull behind the knee — that run is over. The tibia is the slowest tissue and gives little warning.'],
    },
    { id: 'w4_wed', label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', summary: 'Recovery from the run — no leg work. Cardio: row 20 + ski 20.' },
    {
      id: 'w4_thu', label: 'Thu', title: 'VO2 — machines only', type: 'session', rpe: 10,
      summary: 'Bike / ski / row, 4×4 or 30/30. Do NOT run it — machine VO2 protects the hamstring and the tibia.',
      ex: [['VO2 (machines only)', 'RPE 9–10', '4 × 4min', '3min']],
    },
    { id: 'w4_fri', label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', summary: 'Bag 30 + mobility + skills.' },
    {
      id: 'w4_sat', label: 'Sat', title: 'RUN 2 🏃 + Lower', type: 'session', summary: '48h after Run 1 — never consecutive days.',
      ex: [
        ['Run — 3 × 1km easy', 'Zone 2, same as Tuesday', '3 × 1km', '2min'],
        ['Nordic negatives (once cleared)', 'Slow eccentric', '3 × 5', '—'],
      ],
    },
    {
      id: 'w4_sun', label: 'Sun', title: 'Half-Hyrox', type: 'session', rpe: 7,
      summary: 'Hyrox rebuild order (locked): sled → row → ski → wall balls → burpee broad jumps → running intervals. The last two come back last.',
      notes: ['Speed work and hills come last — high-speed running is the single highest hamstring-insertion demand.'],
    },
  ],
};

// PHASE 2, Week 5+ — Merged program. v3 maintenance baked into the VO2/Hyrox week.
const PAUL_MERGED = {
  id: 'maint',
  title: 'Week 5+ — Merged program',
  dates: 'Phase 2 · ongoing',
  purpose: 'Once running is back and the hamstring is quiet: the full integrated week. Runs Tue + Sat (48h apart), machine VO2 Thursday. Hamstring insurance is permanent, not rehab.',
  meta: [
    { label: 'Phase', value: '2 · merged' },
    { label: 'Runs', value: 'Tue + Sat' },
    { label: 'VO2', value: 'Thu (machines)' },
    { label: 'Hard days', value: 'Tue / Thu / Sun' },
  ],
  rules: {
    do: ['Runs Tue + Sat (48h apart)', 'Machine VO2 Thu', 'Oly light (Tue / Sat)', 'Permanent iso + tempo RDL + Nordics + Jefferson curls'],
    dont: ['Runs Tues + Thurs', 'Dropping the hamstring insurance', 'Skipping a gate when you feel good'],
    note: 'Permanent insurance, 2×/week min: iso (Wed + Sun AM), tempo RDL (Tue), Nordic negatives (Sat), Jefferson curls (Fri, once healed).',
  },
  days: [
    { id: 'm_mon', label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', summary: 'Cardio: ski 20 + row 20.' },
    {
      id: 'm_tue', label: 'Tue', title: 'Run threshold + Lower + Oly light', type: 'session', summary: 'Cardio: run + bike 20. RDL tempo kept in.',
      ex: [
        ['Run — threshold', 'Zone 3–4', '1 × 20–30min', '—'],
        ['Tempo RDL (kept in)', '', '3 × 8', '2min'],
        ['Oly — light', 'From hang', '3 × 3', '2min'],
      ],
    },
    { id: 'm_wed', label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', summary: 'Cardio: row 20 + ski 20. Isometrics AM.' },
    {
      id: 'm_thu', label: 'Thu', title: 'VO2 max — machines', type: 'session', rpe: 10,
      summary: 'Bike / ski / row, 4×4 or 30/30.',
      ex: [['VO2 (machines)', 'RPE 9–10', '4 × 4min', '3min']],
    },
    { id: 'm_fri', label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', summary: 'Bag 30 + ski 15. Jefferson curls (once fully healed).' },
    {
      id: 'm_sat', label: 'Sat', title: 'Run + Lower + Oly (snatch)', type: 'session', summary: 'Cardio: run + machine top-up. Nordic negatives kept in.',
      ex: [
        ['Run', 'Zone 2–3', '1 × session', '—'],
        ['Snatch', 'Light, from hang', '3 × 2', '2min'],
        ['Nordic negatives (kept in)', 'Slow eccentric', '3 × 5', '—'],
      ],
    },
    {
      id: 'm_sun', label: 'Sun', title: 'Half-Hyrox simulation', type: 'session', rpe: 8,
      summary: 'Full session. Isometrics AM.',
      notes: [
        'Permanent hamstring insurance (never drop): isometrics, tempo RDL, Nordic negatives, Jefferson curls — tendons stay resilient through ongoing load, not through having recovered once.',
        'Escalate to surgeon / physio (not self-managed): sharp or sit-bone pain, joint swelling, no progress across 2 weeks of loading, or diffuse shin ache that won’t settle.',
        'The lesson: muscle and fitness adapt in weeks; tendon and bone take months. Let the slowest tissue set the pace — the morning-after check is how you stay on the right side of it.',
      ],
    },
  ],
};

const PAUL_PLAN = {
  countdown: 'Integrated return — hamstring leads, then merged · gate: next-morning soreness',
  gateHeading: 'Gate — next-morning response (hamstring or knee)',
  daily: PAUL_DAILY,
  readiness: ['Next-AM soreness 1–10', 'Hamstring', 'Knee', 'Swelling', 'Sleep (h)', 'Bodyweight', 'Notes'],
  gate: [
    gate(GREEN_C, 'GREEN', 'No next-morning soreness or swelling — hamstring AND knee · movement pain-free', 'Progress the phase as written — add load / range'),
    gate(AMBER_C, 'AMBER', 'Mild next-AM soreness that settles by midday · no swelling', 'Hold. Repeat that week, do not progress'),
    gate(RED_C, 'RED', 'Sorer next morning · joint swelling · sharp or sit-bone pain · diffuse shin ache that won’t settle', 'Stop. Sit-bone / shin / swelling → physio or surgeon’s team. Otherwise repeat the week'),
  ],
  blocks: [
    { id: 'wk1', tag: 'Week 1', title: 'Week 1 — Rebuild the base', dates: 'Phase 1', purpose: 'Volume without hinge or impact. Hamstring-safe machines; lower bodyweight-to-light; upper unrestricted.', week: PAUL_WK1 },
    { id: 'wk2', tag: 'Week 2', title: 'Week 2 — Load through range', dates: 'Phase 1', purpose: 'The tempo RDL enters (4s eccentric) — the key rebuild lift. Forward sled and full-slide rowing return.', week: PAUL_WK2 },
    { id: 'wk3', tag: 'Week 3', title: 'Week 3 — Strength & speed', dates: 'Phase 1', purpose: 'Full-range hamstring work returns; rowing intensity and bike come back. Gate to running at week end.', week: PAUL_WK3 },
    { id: 'wk4', tag: 'Week 4+', title: 'Week 4+ — Running returns', dates: 'Phase 1 → 2', purpose: 'v3 and the main program merge. Running returns Tue + Sat (48h apart, Zone 2); machine VO2 stays Thursday.', week: PAUL_WK4 },
    { id: 'maint', tag: 'Week 5+', title: 'Week 5+ — Merged program', dates: 'Phase 2 · ongoing', purpose: 'The full integrated week with permanent hamstring insurance baked in.', week: PAUL_MERGED },
  ],
};

export const PLANS = { lewis: LEWIS_PLAN, paul: PAUL_PLAN };
