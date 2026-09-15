// Plan data. Hand-authored for now.
//
// Hierarchy: PLANS[athleteId] → blocks[] → weeks[] → days[] → workouts[] → exercises.
// A week with no `days` renders as "not written yet". A day is either a `session`
// (holds one or more `workouts`, each with an exercise table) or a `rest`/`travel`
// day (holds a `items` checklist). Plan-level daily / readiness / gate / countdown
// live on the plan. ATHLETES / AMBER / COURT_TYPES / RPE_WORDS stay global.

export const AMBER = '#f5a524';

export const ATHLETES = [
  { id: 'lewis', name: 'Lewis', sub: 'In-season · Gladiators Pro + Blues' },
  { id: 'paul', name: 'Paul', sub: 'Functional reboot · Hyrox from 19 Oct' },
  { id: 'coach', name: 'Coach view', sub: 'Read any plan, no logging' },
];

export const REAL_ATHLETES = ATHLETES.filter((a) => a.id !== 'coach');

export const COURT_TYPES = ['Practice', 'Game', 'Shootaround', 'Skills'];
export const RPE_WORDS = ['', 'Very easy', 'Easy', 'Light', 'Steady', 'Moderate', 'Solid', 'Hard', 'Very hard', 'Brutal', 'Everything'];

const GREEN_C = { fg: '#34d399', bg: 'rgba(52,211,153,.08)', bd: 'rgba(52,211,153,.28)' };
const AMBER_C = { fg: AMBER, bg: 'rgba(245,165,36,.08)', bd: 'rgba(245,165,36,.28)' };
const RED_C = { fg: '#ff5470', bg: 'rgba(255,84,112,.07)', bd: 'rgba(255,84,112,.26)' };
const gate = (c, level, criteria, action) => ({ level, ...c, criteria, action });

// ─────────────────────────────────────────────────────────────────────────────
// LEWIS — Preseason (Tue 28 Jul → Sun 6 Sep 2026). Competes at 3x3 Scotland
// Sun 16 Aug (not selected for the September finals — the block develops
// through and past the event, then hands over to in-season maintenance).
// ─────────────────────────────────────────────────────────────────────────────

const LEWIS_DAILY = {
  name: 'Back Insurance',
  mins: '8 min · every evening',
  steps: ['Glute bridge', 'Couch stretch (L first)', 'Supine hamstring (L first)', '90/90', 'Dead bugs', "Child's pose"],
};

const LEWIS_PREWEEK = {
  id: 'preweek',
  title: 'Decompression Pre-week',
  subtitle: 'Tue 28 Jul – Sun 2 Aug · not a training week',
  purpose: 'Shed fatigue, hold tendon quality, reset the clock. Not a training week.',
  meta: [
    { label: 'Days to 3x3 (16 Aug)', value: '19 → 14' },
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
      id: 'd1', label: 'Tue 28 Jul', title: 'Arrival', type: 'travel', out: 19,
      summary: 'No training. Lands 13:00. Jet lag is the only job today.',
      items: [
        ['Ankle pumps / calf circulation', '30 each foot, seated', 'On arrival'],
        ['Easy walk outdoors', '20–30 min, daylight, no phone', '15:00–17:00'],
        ['Nap', '20 min MAX, only before 15:00', '—'],
        ['Back Insurance', '8 min', '~20:30'],
        ['Bed', 'UK time, no later', '22:30'],
      ],
      notes: ['5-hour eastward shift = phase advance. Morning daylight pulls the clock forward; long naps and evening light push it back.'],
    },
    {
      id: 'd2', label: 'Wed 29 Jul', title: 'Restoration A', type: 'session', out: 18, dur: '~35 min', rpe: 5,
      summary: 'Morning: 10 min outdoors within 30 min of waking. Circadian anchor — every day this week.',
      workouts: [{
        id: 'd2_w', title: 'Session',
        ex: [
          ['Easy bike or brisk walk', 'Conversational, nose breathing', '1 × 20min', '—'],
          ['Spanish squat isometric', 'Bodyweight + band', '4 × 30s', '45s'],
          ['Tibialis raise', 'Bodyweight (monkey foot or wall)', '2 × 20', '45s'],
          ['Calf raise, 3s down', 'Bodyweight only', '2 × 12', '60s'],
          ['90/90 hip switches', 'Bodyweight', '2 × 8 each', '30s'],
          ['Dead bug, slow exhale', 'Bodyweight', '2 × 6 each', '45s'],
        ],
        cues: { 'Spanish squat isometric': 'Knees stacked over toes, shins vertical-ish. Hold the shake — this is the tendon dose.' },
      }],
      notes: ['Isometrics maintain tendon stiffness at near-zero systemic cost — the one quality we refuse to give back this week.'],
    },
    {
      id: 'd3', label: 'Thu 30 Jul', title: 'Full Rest', type: 'rest', out: 17,
      summary: 'Nothing. Walk if he wants to, morning light, Back Insurance in the evening.',
      items: [
        ['Morning light', '10 min outdoors within 30 min of waking', 'AM'],
        ['Optional easy walk', 'Only if he wants it', '—'],
        ['Back Insurance', '8 min', 'PM'],
      ],
      notes: ['No gym. No court. No "just a bit of shooting."'],
    },
    {
      id: 'd4', label: 'Fri 31 Jul', title: 'Restoration B', type: 'session', out: 16, dur: '~35 min', rpe: 6,
      summary: 'Blood flow, no CNS cost. He should be fresh the next morning — if he is sore, it was too much.',
      workouts: [{
        id: 'd4_w', title: 'Session',
        ex: [
          ['Spanish squat isometric', 'Bodyweight + band', '4 × 30s', '45s'],
          ['A1 Ring row, tall chest', 'Bodyweight, feet forward (easy angle)', '3 × 10', '30s'],
          ['A2 DB incline press', '12–14kg', '3 × 12', '60s'],
          ['B1 Cable face pull', 'Light', '3 × 15', '30s'],
          ['B2 DB curl', '8–10kg', '3 × 12', '45s'],
          ['Dead bug', 'Bodyweight', '2 × 8 each', '30s'],
          ['Side plank', 'Bodyweight', '2 × 25s each', '45s'],
        ],
      }],
      notes: ['Antagonistic pairing keeps it efficient and keeps the load light. Nothing here should feel like a set worth counting.'],
    },
    {
      id: 'd5', label: 'Sat 1 Aug', title: 'Restoration C', type: 'session', out: 15, dur: '~35 min',
      summary: 'Re-groove patterns at bodyweight. Left leg leads every unilateral movement.',
      workouts: [{
        id: 'd5_w', title: 'Session',
        ex: [
          ['Spanish squat isometric', 'Bodyweight + band', '3 × 30s', '45s'],
          ['ATG split squat', 'Bodyweight only', '2 × 8 each (L first)', '60s'],
          ['Standing knee drive above 90°', 'Band or cable, 5–7kg', '3 × 8 each', '45s'],
          ['Seated hip flexor lift (knee bent)', 'Bodyweight', '2 × 8 each', '45s'],
          ['Glute bridge march', 'Bodyweight', '2 × 10 each', '45s'],
          ['Single-leg RDL, slow', '8kg DB', '2 × 6 each (L first)', '60s'],
        ],
      }],
      optional: { title: 'Court work', limit: '15 min hard cap', body: 'Spot shooting, form only, stationary. Stop the second mechanics wobble — fatigued reps at this stage cost more than they give.' },
      notes: ['Hip flexor work belongs here, not in a heavy week — low load, fresh, full control.', 'No Nordics until Week 0. Hamstrings get length and control this week, not eccentric damage.'],
    },
    {
      id: 'd6', label: 'Sun 2 Aug', title: 'Full Rest + Readiness Gate', type: 'rest', out: 14,
      summary: 'Back Insurance. Log the readiness numbers. Nothing else.',
      items: [
        ['Morning light', '10 min outdoors', 'AM'],
        ['Readiness log', 'All fields, before food', 'AM'],
        ['Back Insurance', '8 min', 'PM'],
      ],
      notes: ['This week is also the test. If he is still flat by Sunday, we have found that out before loading him at 90% — which is the whole point.'],
    },
  ],
};

// Weeks 0–4, written from the preseason master plan: weekly structure (lower
// Mon / court Tue / upper Wed / tendon+sled Thu / full-body Fri / jumps Sat /
// rest Sun), block parameters per week, and the loading table. Skills coach
// runs Mon/Wed/Fri mornings — weights come AFTER skills, never before. Top set
// always stops at 2 reps in reserve; nobody chases a number.
const RIR_RULE = 'Hard rule: top set stops at 2 reps in reserve. If the prescribed weight feels RPE 9 on rep one, it comes down 5kg and the session continues.';
const AFTER_SKILLS = 'Skills coach in the morning — weights after skills, never before.';

const LEWIS_W0 = {
  id: 'week0', title: 'Week 0 — Reintegration', subtitle: 'Mon 3 – Sun 9 Aug · re-groove at 65–70%',
  purpose: 'Re-establish positions and bracing before load returns. Nothing heavy, nothing fast.',
  meta: [
    { label: 'Days to 3x3', value: '13 → 7' },
    { label: 'Intensity', value: '65–70% · 4–6 reps' },
    { label: 'Rest', value: '90–120s · controlled' },
    { label: 'Plyo contacts', value: '40–60 low amplitude' },
  ],
  rules: {
    do: ['Groove positions', 'Isometrics Mon + Fri', 'Light sled (20–30% BW)', 'Nordics — eccentric only', 'Form shooting (capped)'],
    dont: ['Heavy anything', 'Cutting at speed', 'Rep-outs', 'GHD (ever)', 'Shooting to fatigue'],
    note: 'Gate on Sun 9: patterns re-grooved, back clear. If not — repeat Week 0 at 70% and compress Weeks 1–2.',
  },
  days: [
    {
      id: 'w0_mon', label: 'Mon 3 Aug', title: 'Lower — re-groove', type: 'session', out: 13,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', 'Band + light load', '4 × 30s', '45s']] },
        { id: 'lift', title: 'Lower', ex: [
          ['Back squat', '60kg', '4 × 5', '2min'],
          ['Trap bar deadlift', '50kg/side', '3 × 5', '2min'],
          ['Heavy-slow calf raise', '3s up / 3s down, loaded', '4 × 6', '90s'],
          ['Dead bug', 'Bodyweight', '2 × 8 each', '45s'],
        ] },
      ],
      notes: [RIR_RULE],
    },
    {
      id: 'w0_tue', label: 'Tue 4 Aug', title: 'COD + shooting · iso + Oly technique', type: 'session', out: 12,
      summary: 'Court first, then a short gym block — low systemic cost, high pattern value.',
      workouts: [
        { id: 'court', title: 'Court', ex: [
          ['Linear accel mechanics', 'Wall drills, A-skips, 10m builds', '4 × 10m', '90s'],
          ['Low-amplitude COD', 'No cutting at speed', '3 rounds', '90s'],
          ['Form shooting', 'Capped, tied to skills-coach cues', '1 × 20min', '—'],
        ] },
        { id: 'gym', title: 'Gym — after court', ex: [
          ['Spanish squat isometric', 'Band + light load', '3 × 30s', '45s'],
          ['Hang power clean', 'Empty bar → 30kg — bar speed only, technique', '4 × 3', '90s'],
          ['ATG split squat', 'Bodyweight–light (L first)', '2 × 8 each', '60s'],
        ], cues: { 'Hang power clean': 'Positions before load — this greases Friday’s cleans at 42.5. If the bar slows, strip it back.' } },
      ],
      notes: ['No shooting to fatigue — grooving broken mechanics is worse than not shooting.'],
    },
    {
      id: 'w0_wed', label: 'Wed 5 Aug', title: 'Upper — antagonistic, RPE 7 cap', type: 'session', out: 11, rpe: 7,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper', ex: [
        ['A1 Weighted ring row', 'RPE 7 cap', '3 × 8', '45s'],
        ['A2 DB incline press', 'RPE 7 cap', '3 × 8', '90s'],
        ['B1 Chin-up', 'Bodyweight', '3 × 6', '45s'],
        ['B2 Half-kneeling DB press', '', '3 × 8', '90s'],
        ['Cable face pull', 'Light', '3 × 15', '45s'],
      ] }],
    },
    {
      id: 'w0_thu', label: 'Thu 6 Aug', title: 'ATG / tendon + sled', type: 'session', out: 10,
      workouts: [
        { id: 'tendon', title: 'Tendon + ATG', ex: [
          ['ATG split squat', 'Light load (L first)', '3 × 8 each', '90s'],
          ['Tibialis raise', '', '3 × 20', '45s'],
          ['Heavy-slow calf raise', '3s up / 3s down', '4 × 6', '90s'],
        ] },
        { id: 'sled', title: 'Sled + hip flexor', ex: [
          ['Sled march', 'Light, 20–30% BW', '6 × 20m', '90s'],
          ['Standing knee drive above 90°', 'Band or cable', '3 × 8 each', '45s'],
          ['Seated hip flexor lift', 'Bodyweight', '2 × 8 each', '45s'],
        ] },
      ],
    },
    {
      id: 'w0_fri', label: 'Fri 7 Aug', title: 'Full-body — technique', type: 'session', out: 9,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', 'Band + light load', '4 × 30s', '45s']] },
        { id: 'lift', title: 'Full-body', ex: [
          ['Front squat', '50kg', '4 × 5', '2min'],
          ['Power clean', '42.5kg — technique', '4 × 3', '2min'],
          ['Push press', '35kg', '3 × 5', '2min'],
          ['Nordic curl', 'ECCENTRIC ONLY — reintroduced this week', '3 × 4', '90s'],
        ] },
      ],
      notes: ['Bar speed governs the Olympic lifts — 92% of a clean is a technique breakdown, not a stimulus.'],
    },
    {
      id: 'w0_sat', label: 'Sat 8 Aug', title: 'Jumps + skills · iso + snatch positions', type: 'session', out: 8,
      workouts: [
        { id: 'plyo', title: 'Low-amplitude plyos', summary: '40–60 total contacts, quality only', ex: [
          ['Pogo hops', 'Stiff ankle, quiet landing', '3 × 10', '60s'],
          ['Line hops', '', '3 × 10', '60s'],
          ['Low box ankle stiffness', 'Step down, pop', '2 × 6', '90s'],
        ] },
        { id: 'gym', title: 'Gym — iso + snatch positions', ex: [
          ['Spanish squat isometric', 'Band + light load', '3 × 30s', '45s'],
          ['Overhead squat', 'Empty bar — positions only', '3 × 5', '90s'],
          ['Muscle snatch', 'Empty bar, slow and precise', '3 × 5', '90s'],
        ], cues: { 'Overhead squat': 'Building the overhead position early — the hang snatch arrives in Week 2 and this is where it gets cheap.' } },
      ],
      notes: ['Then skills with the coach. Contacts counted — stop at 60.'],
    },
    {
      id: 'w0_sun', label: 'Sun 9 Aug', title: 'Rest + gate', type: 'rest', out: 7,
      summary: 'Programmed rest. Gate: patterns re-grooved, back clear — else repeat Week 0 at 70% and compress Weeks 1–2.',
      items: [['Readiness log', 'All fields, AM before food', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
  ],
};

const LEWIS_W1 = {
  id: 'week1', title: 'Week 1 — Max Strength (front-loaded)', subtitle: 'Mon 10 – Sun 16 Aug · 3x3 Scotland Sun 16',
  purpose: 'Train through the 3x3, don’t taper for it: heavy Mon/Wed, unload Thu–Sat, compete Sunday. Nothing riding on it now — compete free, it’s a learning game; the development block continues after.',
  meta: [
    { label: 'Days to 3x3', value: '6 → 0' },
    { label: 'Intensity', value: '82–92% · 2–4 reps' },
    { label: 'Rest', value: '180–240s' },
    { label: 'Sun 16', value: '3x3 Scotland — COMPETE' },
  ],
  rules: {
    do: ['Heavy Mon + Wed', 'Volume cut ~40% Thu', 'RPE 6 cap Fri', 'CNS primer only Sat', 'Grind allowed on the last rep'],
    dont: ['Tapering the whole week', 'Cleans on Friday', 'Sled on Thursday', 'Anything fatiguing Saturday', 'Rep-outs'],
    note: 'Tapering properly would cost a max-strength week we cannot get back. Heavy early, sharp Sunday.',
  },
  days: [
    {
      id: 'w1_mon', label: 'Mon 10 Aug', title: 'Lower — HEAVY', type: 'session', out: 6,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', 'Progressing toward 5 × 45s', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Lower — heavy', ex: [
          ['Back squat', '80–85kg', '4 × 3', '3min'],
          ['Trap bar deadlift', '60–65kg/side', '3 × 3', '3min'],
          ['Heavy-slow calf raise', 'Load up from last week', '4 × 6', '90s'],
          ['Copenhagen plank', '', '3 × 20s each', '60s'],
        ] },
      ],
      notes: [RIR_RULE],
    },
    {
      id: 'w1_tue', label: 'Tue 11 Aug', title: 'COD at intent + shooting', type: 'session', out: 5,
      workouts: [{ id: 'court', title: 'Court', ex: [
        ['COD at intent', 'Full-speed cuts, long recoveries', '4 rounds', '2min'],
        ['Lateral first-step', '', '4 × 3 each', '90s'],
        ['Shooting off movement', 'Capped reps, coach cues', '1 × 20min', '—'],
      ] }],
    },
    {
      id: 'w1_wed', label: 'Wed 12 Aug', title: 'Upper — HEAVY', type: 'session', out: 4,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper — heavy pairs', ex: [
        ['A1 Weighted dip', '', '4 × 4', '60s'],
        ['A2 Weighted chin-up', '', '4 × 4', '3min'],
        ['B1 Barbell row', '', '3 × 4', '60s'],
        ['B2 DB bench press', '', '3 × 4', '3min'],
        ['Cable face pull', 'Light', '3 × 15', '45s'],
      ] }],
      notes: [RIR_RULE],
    },
    {
      id: 'w1_thu', label: 'Thu 13 Aug', title: 'Tendon — volume cut 40%', type: 'session', out: 3,
      summary: 'Unload begins. Sled dropped entirely this week.',
      workouts: [{ id: 'tendon', title: 'Tendon maintenance', ex: [
        ['ATG split squat', 'Light (L first)', '2 × 8 each', '90s'],
        ['Tibialis raise', '', '3 × 20', '45s'],
        ['Heavy-slow calf raise', 'Hold last week’s load', '3 × 6', '90s'],
        ['Standing knee drive above 90°', 'Band', '2 × 8 each', '45s'],
      ] }],
    },
    {
      id: 'w1_fri', label: 'Fri 14 Aug', title: 'Full-body — LIGHT, RPE 6 cap', type: 'session', out: 2, rpe: 6,
      summary: AFTER_SKILLS + ' No cleans today.',
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Light full-body', ex: [
          ['Front squat', '~60kg, bar speed crisp', '3 × 3', '2min'],
          ['Push press', '~40kg', '3 × 3', '2min'],
          ['Nordic curl', 'Eccentric only', '2 × 4', '90s'],
        ] },
      ],
    },
    {
      id: 'w1_sat', label: 'Sat 15 Aug', title: 'CNS primer — 20 min max', type: 'session', out: 1, dur: '20 min max',
      summary: 'A few jumps, a few accelerations, zero fatigue. Leave the gym feeling springy.',
      workouts: [{ id: 'primer', title: 'Primer', ex: [
        ['Hurdle hop', 'Low hurdle, crisp', '2 × 3', '2min'],
        ['10m acceleration', '', '2 × 10m', '2min'],
        ['Pogo hops', '', '2 × 5', '60s'],
      ] }],
    },
    {
      id: 'w1_sun', label: 'Sun 16 Aug', title: '3x3 Scotland — COMPETE', type: 'rest', out: 0,
      summary: 'Compete. 3x3 is a brutal eccentric load — short court, continuous play, high deceleration density. Tomorrow is a judgement call.',
      items: [
        ['Full warm-up protocol', 'Long, gradual — especially if outdoor concrete', 'Pre-game'],
        ['COMPETE', '', '—'],
        ['Cool-down + easy spin', '', 'Post'],
        ['Back Insurance', '8 min — non-negotiable tonight', 'PM'],
      ],
      notes: ['Log how he pulls up tomorrow morning — Monday is written two ways and the call gets made on the morning.'],
    },
  ],
};

const LEWIS_W2 = {
  id: 'week2', title: 'Week 2 — Max Strength', subtitle: 'Mon 17 – Sun 23 Aug · heaviest week of the year',
  purpose: 'The peak of the strength block. Long rest, low reps, high focus. Rebuilt mid-week: tournament Saturday + 3x3 Sunday earned Mon–Tue as recovery, so the heavy work packs into Thu–Sat off two full rest days.',
  meta: [
    { label: 'Gate', value: 'Cleared — rested Mon–Tue' },
    { label: 'Intensity', value: '82–92% · 2–4 reps' },
    { label: 'Rest', value: '180–240s' },
    { label: 'Plyo contacts', value: '110–130' },
  ],
  rules: {
    do: ['Heaviest lifting of the year', 'Sled accel heavy (15–20m)', 'Lateral bounds join Saturday', 'Long rests, full focus'],
    dont: ['Rep-outs', 'Back-to-back heavy squatting', 'GHD (ever)', 'Shooting to fatigue'],
    note: 'Rebuilt Wed 19 after the competition weekend: heavy lower moves to Thu, sled joins Fri, ATG joins Sat. We move the calendar, not the athlete.',
  },
  days: [
    {
      id: 'w2_mon', label: 'Mon 17 Aug', title: 'Rest — competition weekend banked', type: 'rest',
      summary: 'Tournament Saturday, 3x3 Sunday — two days of competition was the load. Full rest taken instead of the planned heavy session; nothing is lost, the week absorbs it.',
      items: [['Readiness log', '', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
    {
      id: 'w2_tue', label: 'Tue 18 Aug', title: 'Stretch + mobility', type: 'session',
      summary: 'Second recovery day after the double competition weekend. Long easy stretching, nothing loaded.',
      workouts: [{ id: 'mobility', title: 'Mobility', ex: [
        ['90/90 hip switches', '', '2 × 8 each', '30s'],
        ['Couch stretch', 'Long, easy', '2 × 60s each', '—'],
        ['Hamstring stretch', 'Long, easy', '2 × 60s each', '—'],
        ['Back Insurance (extended)', 'Full routine, slow', '1 × 12min', '—'],
      ] }],
    },
    {
      id: 'w2_wed', label: 'Wed 19 Aug', title: 'Upper — HEAVY', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper — heavy pairs', ex: [
        ['A1 Weighted dip', 'Heavier than last week', '4 × 3', '60s'],
        ['A2 Weighted chin-up', '', '4 × 3', '3min'],
        ['B1 Barbell row', '', '3 × 4', '60s'],
        ['B2 DB bench press', '', '3 × 4', '3min'],
        ['Cable face pull', '', '3 × 15', '45s'],
      ] }],
      notes: [RIR_RULE],
    },
    {
      id: 'w2_thu', label: 'Thu 20 Aug', title: 'Lower — HEAVY (moved from Monday)', type: 'session',
      summary: 'The year-heaviest lower session, run fresh off two rest days. Weights are the priority today — court stays light.',
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '5 × 45s', '45s']] },
        { id: 'lift', title: 'Lower — heavy', ex: [
          ['Back squat', '87.5–90kg', '3 × 2', '3min'],
          ['Trap bar deadlift', '67.5–70kg/side', '3 × 2', '3min'],
          ['Heavy-slow calf raise', '', '4 × 6', '90s'],
          ['Copenhagen plank', '', '3 × 20s each', '60s'],
        ] },
      ],
      notes: ['Any back symptom stops the session — stop, and tell me.', RIR_RULE],
    },
    {
      id: 'w2_fri', label: 'Fri 21 Aug', title: 'Full-body — peak cleans + sled', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Full-body', ex: [
          ['Power clean', '55–57.5kg — bar speed governs', '4 × 2', '3min'],
          ['Push press', '47.5–50kg', '3 × 3', '3min'],
          ['Nordic curl', 'Full reps now', '3 × 5', '90s'],
          ['Muscle snatch', 'Slow eccentric, light', '3 × 3', '2min'],
        ] },
        { id: 'sled', title: 'Sled accel — heavy', ex: [
          ['Heavy sled acceleration', '15–20m, full recovery', '6 × 15–20m', '3min'],
          ['Standing knee drive above 90°', 'Cable', '3 × 8 each', '45s'],
        ] },
      ],
      notes: ['Front squat comes out this week — the squat pattern went heavy on Thursday, and back-to-back heavy squatting is the one compression we refuse. Olympic lifts sit lower in the range on purpose — at his training age bar speed governs the adaptation, not load.'],
    },
    {
      id: 'w2_sat', label: 'Sat 22 Aug', title: 'Jumps + ATG + skills — 110–130 contacts', type: 'session',
      workouts: [
        { id: 'plyo', title: 'Plyos', summary: '110–130 total contacts', ex: [
          ['Hurdle hop', '', '4 × 5', '2min'],
          ['Lateral bound', 'Joins this week — stick the landing', '4 × 4 each', '2min'],
          ['Pogo hops', '', '3 × 10', '60s'],
        ] },
        { id: 'gym', title: 'ATG block', summary: 'Picks up Thursday\'s displaced tendon work at reduced volume.', ex: [
          ['ATG split squat', 'Loaded (L first)', '2 × 6 each', '2min'],
          ['Poliquin step-down', '', '2 × 8 each', '90s'],
          ['Tibialis raise', '', '2 × 20', '45s'],
        ] },
      ],
      notes: ['Then skills. Count the contacts.'],
    },
    {
      id: 'w2_sun', label: 'Sun 23 Aug', title: 'Rest', type: 'rest',
      summary: 'Programmed rest. The heaviest week of the year is banked — this is the base the power and speed weeks convert.',
      items: [['Readiness log', '', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
  ],
};

const LEWIS_W3 = {
  id: 'week3', title: 'Week 3 — Power Conversion', subtitle: 'Mon 24 – Sun 30 Aug · convert strength to rate',
  purpose: 'Load drops, intent goes to maximum. PAP contrasts throughout; plyometric volume peaks. Max intent every rep.',
  meta: [
    { label: 'Block', value: 'Development' },
    { label: 'Intensity', value: '70–80% · 3–5 reps' },
    { label: 'Bar speed', value: 'MAX intent every rep' },
    { label: 'Plyo contacts', value: '140–160 (peak)' },
  ],
  rules: {
    do: ['Contrast pairs (heavy → explosive)', 'Depth jumps + lateral bounds', 'Reactive cutting', 'Full recoveries'],
    dont: ['Grinding any rep', 'Adding load at the cost of speed', 'GHD (ever)'],
    note: 'Every rep moves fast or the set ends. This week converts the strength bank into rate.',
  },
  days: [
    {
      id: 'w3_mon', label: 'Mon 24 Aug', title: 'Lower — contrast', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'contrast', title: 'PAP contrast', ex: [
          ['Back squat', '70–75kg heavy double', '4 × 2', '30s → jumps'],
          ['Broad jump', '30s after the squat double', '4 × 3', '3min'],
          ['Trap bar speed pull', '55kg/side — max intent', '4 × 3', '2min'],
          ['Heavy-slow calf raise', '', '3 × 6', '90s'],
        ], cues: { 'Broad jump': 'The pairing is the point: heavy double primes, jumps express. Full rest between pairs.' } },
      ],
    },
    {
      id: 'w3_tue', label: 'Tue 25 Aug', title: 'Peak COD + reactive cutting', type: 'session',
      workouts: [{ id: 'court', title: 'Court — peak volume', ex: [
        ['Reactive cutting', 'React to signal, not pattern', '5 rounds', '2min'],
        ['COD at intent', '', '4 rounds', '2min'],
        ['Decision-layered shooting', 'Read → decide → shoot', '1 × 20min', '—'],
      ] }],
    },
    {
      id: 'w3_wed', label: 'Wed 26 Aug', title: 'Upper — contrast', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [{ id: 'contrast', title: 'Upper contrast', ex: [
        ['DB bench press', 'Heavy', '4 × 3', '30s → throw'],
        ['Med ball chest throw', 'Max intent', '4 × 4', '2min'],
        ['Weighted chin-up', '', '3 × 4', '2min'],
        ['Med ball deception complex', 'Fake → throw patterns', '3 rounds', '2min'],
        ['Cable face pull', '', '3 × 15', '45s'],
      ] }],
    },
    {
      id: 'w3_thu', label: 'Thu 27 Aug', title: 'ATG maintain + sled contrast', type: 'session',
      workouts: [
        { id: 'tendon', title: 'ATG maintain', ex: [
          ['ATG split squat', 'Hold load', '2 × 6 each', '90s'],
          ['Tibialis raise', '', '3 × 20', '45s'],
          ['Heavy-slow calf raise', '', '3 × 6', '90s'],
        ] },
        { id: 'sled', title: 'Sled contrast', ex: [
          ['Heavy sled push', '', '4 × 15m', '30s → sprint'],
          ['Free sprint', 'Straight after the push', '4 × 15m', '3min'],
        ] },
      ],
    },
    {
      id: 'w3_fri', label: 'Fri 28 Aug', title: 'Full-body — at speed', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Speed work', ex: [
        ['Power clean', '45–47.5kg — at speed', '5 × 2', '2min'],
        ['Hang snatch', '32.5–35kg', '4 × 2', '2min'],
        ['Jump squat', 'Light bar, max intent', '3 × 3', '2min'],
        ['Nordic curl', '', '3 × 5', '90s'],
      ] }],
    },
    {
      id: 'w3_sat', label: 'Sat 29 Aug', title: 'Jumps + skills — 140–160 contacts (peak)', type: 'session',
      workouts: [{ id: 'plyo', title: 'Plyo peak', summary: '140–160 total contacts — the peak of the ramp the isometrics protected', ex: [
        ['Depth jump', 'Low box, instant rebound', '4 × 4', '2min'],
        ['Lateral bound', '', '4 × 5 each', '2min'],
        ['Hurdle hop', '', '4 × 5', '2min'],
        ['Pogo hops', '', '3 × 10', '60s'],
      ] }],
      notes: ['Then skills. This is the biggest jump day of the cycle — quality gates every set.'],
    },
    {
      id: 'w3_sun', label: 'Sun 30 Aug', title: 'Rest + gate', type: 'rest',
      summary: 'Gate: entering Week 4 fresh, not flat. If flat — cut Week 4 volume and hold intensity.',
      items: [['Readiness log', '', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
  ],
};

const LEWIS_W4 = {
  id: 'week4', title: 'Week 4 — Speed', subtitle: 'Mon 31 Aug – Sun 6 Sep · velocity governs',
  purpose: 'The natural end of the chain: strength → power → speed. Loads drop to 55–65% and the bar has to fly — velocity governs every rep. Full training week; the block hands over to in-season maintenance after Sunday.',
  meta: [
    { label: 'Block', value: 'Development' },
    { label: 'Intensity', value: '55–65% · velocity governs' },
    { label: 'Plyo contacts', value: '60–80, quality only' },
    { label: 'Next', value: 'In-season maintenance' },
  ],
  rules: {
    do: ['Bar flies or the set ends', 'Isometrics continue — they cost nothing and protect everything', 'Short crisp court work', 'Back Insurance nightly'],
    dont: ['Chasing fatigue', 'Adding load at the cost of speed', 'Rep-outs', 'GHD (ever)'],
    note: 'Every rep at maximal intent against light load. If velocity drops, the set is over.',
  },
  days: [
    {
      id: 'w4_mon', label: 'Mon 31 Aug', title: 'Lower — speed-strength', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Speed-strength', ex: [
          ['Back squat', '55–62.5kg — bar flies or it ends', '4 × 3', '2min'],
          ['Trap bar speed pull', '45kg/side — max intent', '3 × 3', '2min'],
          ['Heavy-slow calf raise', '', '3 × 6', '90s'],
        ] },
      ],
    },
    {
      id: 'w4_tue', label: 'Tue 1 Sep', title: 'COD — short and sharp · gym', type: 'session',
      workouts: [
        { id: 'court', title: 'Court', ex: [
          ['Sharp COD', 'Few reps, full intent', '4 rounds', '2min'],
          ['Lateral first-step', '', '3 × 3 each', '90s'],
          ['Shooting off movement', 'Capped', '1 × 20min', '—'],
        ] },
        { id: 'gym', title: 'Gym — after court', ex: [
          ['Spanish squat isometric', '', '3 × 30s', '45s'],
          ['Hang power clean', '30–35kg — speed only', '3 × 2', '90s'],
          ['ATG split squat', 'Light (L first)', '2 × 8 each', '60s'],
        ] },
      ],
    },
    {
      id: 'w4_wed', label: 'Wed 2 Sep', title: 'Upper — speed', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper — moderate + throws', ex: [
        ['A1 Weighted dip', 'Moderate, crisp', '3 × 5', '60s'],
        ['A2 Weighted chin-up', 'Moderate', '3 × 5', '2min'],
        ['Med ball chest throw', 'Max intent', '3 × 5', '90s'],
        ['Cable face pull', '', '3 × 15', '45s'],
      ] }],
    },
    {
      id: 'w4_thu', label: 'Thu 3 Sep', title: 'Tendon + fast sled', type: 'session',
      workouts: [
        { id: 'tendon', title: 'Tendon', ex: [
          ['ATG split squat', 'Hold load (L first)', '2 × 8 each', '90s'],
          ['Tibialis raise', '', '3 × 20', '45s'],
          ['Heavy-slow calf raise', '', '3 × 6', '90s'],
        ] },
        { id: 'sled', title: 'Sled — light and fast', ex: [
          ['Sled sprint', 'Light load, max velocity', '5 × 15m', '2min'],
          ['Standing knee drive above 90°', 'Cable', '2 × 8 each', '45s'],
        ] },
      ],
    },
    {
      id: 'w4_fri', label: 'Fri 4 Sep', title: 'Full-body — at speed', type: 'session',
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Speed work', ex: [
          ['Power clean', '40kg — speed only', '4 × 2', '2min'],
          ['Hang snatch', '27.5–30kg', '3 × 2', '2min'],
          ['Push press', '32.5kg', '3 × 3', '2min'],
          ['Nordic curl', '', '2 × 5', '90s'],
        ] },
      ],
    },
    {
      id: 'w4_sat', label: 'Sat 5 Sep', title: 'Jumps + skills · snatch positions', type: 'session',
      workouts: [
        { id: 'plyo', title: 'Plyos — quality only', summary: '60–80 total contacts', ex: [
          ['Hurdle hop', 'Crisp, full recovery', '3 × 4', '2min'],
          ['Lateral bound', '', '3 × 3 each', '2min'],
          ['Pogo hops', '', '2 × 10', '60s'],
        ] },
        { id: 'gym', title: 'Gym — iso + snatch positions', ex: [
          ['Spanish squat isometric', '', '3 × 30s', '45s'],
          ['Overhead squat', 'Empty bar → 25kg', '3 × 5', '90s'],
          ['Muscle snatch', 'Light, slow and precise', '3 × 3', '90s'],
        ] },
      ],
      notes: ['Then skills. Quality gates every set — this is sharpening, not volume.'],
    },
    {
      id: 'w4_sun', label: 'Sun 6 Sep', title: 'Rest — block complete', type: 'rest',
      summary: 'The preseason block is done: decompression → reintegration → max strength → power → speed, competed at the 3x3 on the way through. From here: in-season maintenance — two short lifts a week around games. Hold what was built.',
      items: [['Readiness log', 'Close the block with a full entry', 'AM'], ['Back Insurance', '8 min — it stays, in-season too', 'PM']],
    },
  ],
};

// ── In-season (from Tue 15 Sep). Two-way player: Gladiators Pro + Blues.
// Three lifts a week in the 18:30–19:30 slot before Blues practice — this hour
// REPLACES the Blues S&C session (their staff should know). Hard stop 19:25:
// every session has a cut order, cut from the bottom. Loading is by rep
// anchors ("use your 6-rep weight for sets of 3"), so a tired week gets
// lighter automatically; Olympic lifts are governed by bar speed, never rep
// maxes. Weekly cycle A → B → C → D repeats; D doubles as the dump slot for
// congested fixtures.

const IS_STOP = 'Hard stop 19:25 — he walks onto court primed, not emptied.';
const IS_GAME_RULES = 'Fixtures: Sunday game → skip the Saturday block. Friday game → Thursday becomes prime + plyo + one light snatch. Friday AND Sunday games → automatic Week D. Three games in eight days → Week D wherever the cycle sits. Away travel → cut Thursday. If one session has to go, it is Thursday.';
const IS_BAR_SPEED = 'Fastest heavy — load up until the bar stops snapping, then back off one jump. A slow rep is too heavy, whatever last week said.';

const IS_ANCHORS = {
  A: { tag: 'Heavy', anchor: '6-rep weight', scheme: '4 × 3', fsScheme: '3 × 3', feel: 'Solid, never grinding' },
  B: { tag: 'Moderate', anchor: '8-rep weight', scheme: '4 × 4', fsScheme: '3 × 4', feel: 'Comfortably fast' },
  C: { tag: 'Peak', anchor: '5-rep weight', scheme: '4 × 2', fsScheme: '3 × 2', feel: 'Heavy, still crisp' },
  D: { tag: 'Deload', anchor: '12-rep weight', scheme: '3 × 4', fsScheme: '3 × 4', feel: 'Easy on purpose' },
};

const IS_PRIME_LOWER = { id: 'prime', title: 'A · Prime — doubles as practice warm-up', ex: [
  ['Spanish squat isometric', '', '3 × 30s', '45s'],
  ['90/90 hip switches', '', '1 × 8 each', '—'],
  ['Pogo hops', '', '2 × 10', '45s'],
] };

const IS_MON = (a) => [
  IS_PRIME_LOWER,
  { id: 'plyo', title: 'B · Plyometric — vertical · 16 contacts', summary: 'Fresh, before load. Step down off every box — never jump down.', ex: [
    ['Hurdle hop to stick', '', '3 × 3', '90s'],
    ['Box jump, step down', '', '3 × 2', '90s'],
  ] },
  { id: 'power', title: 'C · Power', ex: [
    ['Power clean', IS_BAR_SPEED, '4 × 2', '2min'],
  ] },
  { id: 'strength', title: 'D · Strength', summary: 'A1/A2 alternate — short rest between them, full rest after the pair.', ex: [
    ['Trap bar deadlift', a.anchor + ' — ' + a.feel.toLowerCase(), a.scheme, '150s'],
    ['Bulgarian split squat', '10-rep weight · L first', '3 × 6 each', '45s'],
    ['Heavy-slow calf raise', '10-rep weight · 3s down', '3 × 6', '90s'],
  ] },
  { id: 'armour', title: 'E · Armour', ex: [
    ['Dead bug', '', '3 × 8 each', '45s'],
    ['Pallof press', '', '2 × 10 each', '45s'],
  ] },
];

const IS_TUE = (a) => [
  { id: 'prime', title: 'A · Prime', ex: [
    ['Band pull-apart', '', '2 × 15', '30s'],
    ['Scap pull-up', '', '2 × 8', '30s'],
    ['Med ball chest pass to wall', '4kg', '2 × 6', '45s'],
  ] },
  { id: 'power', title: 'B · Power', ex: [
    ['Push press', a.anchor + ' — ' + a.feel.toLowerCase(), a.scheme, '2min'],
  ] },
  { id: 'strength', title: 'C · Strength — antagonistic pairs', summary: 'A1/A2 then B1/B2 — short rest inside the pair, full rest after it.', ex: [
    ['Weighted pull-up', '6-rep weight', '4 × 4', '60s'],
    ['Weighted dip', '6-rep weight', '4 × 4', '90s'],
    ['Single-arm DB row', '12-rep weight', '3 × 8 each', '45s'],
    ['DB incline press', '12-rep weight', '3 × 8', '90s'],
  ] },
  { id: 'hip', title: 'D · Hip flexor thread', ex: [
    ['Standing knee drive above 90°', 'Monkey foot · 10-rep weight', '3 × 6 each', '45s'],
    ['Hanging knee raise', 'Hold at the top', '3 × 10s each', '45s'],
  ] },
  { id: 'armour', title: 'E · Armour', ex: [
    ['Copenhagen plank', '', '2 × 20s each', '45s'],
    ['Suitcase carry', '', '2 × 20m each', '45s'],
  ] },
];

const IS_THU = (a) => [
  { id: 'prime', title: 'A · Prime', ex: [
    ['Spanish squat isometric', '', '3 × 30s', '45s'],
    ['A-skip', '', '2 × 15m', '45s'],
    ['Lateral line hops', '', '2 × 10 each', '45s'],
  ] },
  { id: 'plyo', title: 'B · Plyometric — first step & lateral · 24 contacts', summary: 'Every rep maximal. If distance or height drops, the block is over — regardless of sets remaining.', ex: [
    ['Lateral bound to stick', '', '3 × 3 each', '90s'],
    ['Broad jump, single effort', '', '3 × 2', '90s'],
    ['Split-stance start, 5m', '', '4 × 1 each', '60s'],
  ] },
  { id: 'oly', title: 'C · Olympic', ex: [
    ['Hang snatch', IS_BAR_SPEED, '4 × 2', '2min'],
    ['Muscle snatch', '3s eccentric — light, technique only', '2 × 3', '90s'],
  ] },
  { id: 'strength', title: 'D · Strength', ex: [
    ['Front squat', a.anchor + ' — ' + a.feel.toLowerCase(), a.fsScheme, '150s'],
    ['Step-up', 'Knee drive at top · 10-rep weight · L first', '3 × 6 each', '45s'],
    ['Tibialis raise', '15-rep weight', '3 × 15', '60s'],
  ] },
  { id: 'armour', title: 'E · Armour', ex: [
    ['Dead bug', '', '2 × 8 each', '45s'],
  ] },
];

const IS_SAT_BLOCK = { id: 'durability', title: 'Durability — 10 min, after pro practice', summary: 'Two sets of three Nordics IS the whole hamstring prescription — the most protective and most soreness-producing thing in the plan, so it lives at the furthest point from a practice. Skip entirely if there is a Sunday game.', ex: [
  ['Nordic curl, eccentric only', 'Assist as needed', '2 × 3', '2min'],
  ['Copenhagen plank', '', '2 × 25s each', '45s'],
  ['Single-leg RDL', '12-rep weight · L first', '2 × 8 each', '60s'],
] };

const isRest = (id, label, title, summary) => ({
  id, label, title, type: 'rest', summary,
  items: [['Back Insurance', '8 min · left side first', 'PM']],
});

function inseasonWeek(n, letter, labels) {
  const a = IS_ANCHORS[letter];
  const id = (d) => 'is' + n + '_' + d;
  return {
    id: 'is_w' + n,
    title: 'Week ' + letter + ' — ' + a.tag,
    subtitle: labels[0] + ' – ' + labels[6] + ' · ' + a.anchor + ' → ' + a.scheme,
    purpose: 'Use the ' + a.anchor + ' for every anchored lift: ' + a.feel.toLowerCase() + '. Tired week → the anchor weight is lighter, so the session is lighter — automatically. Three good sets beat six mediocre ones.',
    meta: [
      { label: 'Anchor', value: a.anchor + ' → ' + a.scheme },
      { label: 'Feel', value: a.feel },
      { label: 'Lifts', value: 'Mon · Tue · Thu 18:30' },
      { label: 'Hard stop', value: '19:25' },
    ],
    rules: {
      do: ['Intensity high, volume low', 'Two reps always in reserve', 'Olympic lifts governed by bar speed', 'Left leg leads every unilateral'],
      dont: ['Failure — ever', 'Grinding or slow-tempo reps', 'Jumping down off boxes', 'GHD (ever)'],
      note: IS_GAME_RULES,
    },
    days: [
      {
        id: id('mon'), label: labels[0], title: 'Lower Power & Vertical', type: 'session',
        summary: 'The best day of the week — no pro session beforehand. Blues practice 19:30.',
        workouts: IS_MON(a),
        notes: ['Cut order: E → A2 → A1. Trap bar and cleans never get cut.', IS_STOP],
      },
      {
        id: id('tue'), label: labels[1], title: 'Upper Strength', type: 'session',
        summary: 'Pro 16:00–18:00 already done, Blues at 19:30 — upper-dominant on purpose. The legs get nothing today.',
        workouts: IS_TUE(a),
        notes: ['Cut order: E → B1/B2.', 'Nordics live on Saturday now — loaded eccentric hamstring work five minutes before 90 minutes of sprinting is an injury waiting to happen, especially on the tighter left side.', IS_STOP],
      },
      isRest(id('wed'), labels[2], 'Pro (morning) — free afternoon', 'No lift. The only free afternoon of the week.'),
      {
        id: id('thu'), label: labels[3], title: 'Olympic, First Step & Lateral', type: 'session',
        summary: 'The athleticism session. Pro done, Blues at 19:30. Friday game → today is prime + plyo + one light set of hang snatch, nothing else.',
        workouts: IS_THU(a),
        notes: ['Cut order: E → A1/A2 → muscle snatch. Front squat is 3 sets deliberately — he plays immediately afterwards.', IS_STOP],
      },
      isRest(id('fri'), labels[4], 'Pro · Blues or game', 'No lift.'),
      {
        id: id('sat'), label: labels[5], title: 'Durability block — optional', type: 'session',
        summary: 'Optional but recommended. Only when there is no Sunday game.',
        workouts: [IS_SAT_BLOCK],
      },
      isRest(id('sun'), labels[6], 'Game or rest', 'Congested fixture week? That is what Week D is for — say so and the cycle moves.'),
    ],
  };
}

const IS_INTRO = {
  id: 'is_w0', title: 'Intro Week — Capture the anchors', subtitle: 'Tue 15 – Sun 20 Sep · find where he actually is',
  purpose: 'Learn the layout, capture the rep anchors that run the whole season. Work up in 3–4 sets per lift and stop the moment a rep slows or form shifts — no true maxes, no grinding singles. Log every number; retest every 6 weeks. The work proper starts Mon 21.',
  meta: [
    { label: 'Goal', value: 'Anchors captured' },
    { label: 'Lifts', value: 'Tue · Thu 18:30' },
    { label: 'Hard stop', value: '19:25' },
    { label: 'Next', value: 'Week A — Mon 21' },
  ],
  rules: {
    do: ['Work up in 3–4 sets, stop when a rep slows', 'Log the weight next to every anchor', 'Two reps in reserve, even here'],
    dont: ['True maxes', 'Grinding singles', 'Turning capture into a session'],
    note: 'This hour replaces the Blues S&C session — their staff should know he is running this in their slot, so nobody doubles him up.',
  },
  days: [
    {
      id: 'is0_tue', label: 'Tue 15 Sep', title: 'Intro — Upper capture', type: 'session',
      summary: 'First evening in the slot. Feel out the room, then capture the upper-body anchors: the heaviest weight he could manage X reps with if he had to.',
      workouts: [
        { id: 'prime', title: 'A · Prime', ex: [
          ['Band pull-apart', '', '2 × 15', '30s'],
          ['Scap pull-up', '', '2 × 8', '30s'],
          ['Med ball chest pass to wall', '4kg', '2 × 6', '45s'],
        ] },
        { id: 'capture', title: 'B · Capture — work up, stop when a rep slows', ex: [
          ['Push press', 'Find the 6- and 8-rep weights', '4 × 3–6', '2min'],
          ['Weighted pull-up', 'Find the 6-rep weight', '3 × 3–6', '90s'],
          ['Weighted dip', 'Find the 6-rep weight', '3 × 3–6', '90s'],
          ['DB incline press', 'Find the 12-rep weight', '2 × 8', '90s'],
          ['Single-arm DB row', 'Find the 12-rep weight', '2 × 8 each', '60s'],
        ] },
      ],
      notes: ['The number to log is the anchor, not a max — the weight he COULD do X reps with, found without doing them all.', IS_STOP],
    },
    isRest('is0_wed', 'Wed 16 Sep', 'Pro (morning) — free afternoon', 'No lift.'),
    {
      id: 'is0_thu', label: 'Thu 17 Sep', title: 'Intro — Lower & Olympic capture', type: 'session',
      summary: 'Capture the lower-body anchors and the Olympic “fastest heavy” weights.',
      workouts: [
        IS_PRIME_LOWER,
        { id: 'oly', title: 'B · Olympic — find the fastest heavy', ex: [
          ['Power clean', IS_BAR_SPEED, '4 × 2', '2min'],
          ['Hang snatch', IS_BAR_SPEED, '3 × 2', '2min'],
        ] },
        { id: 'capture', title: 'C · Capture — work up, stop when a rep slows', ex: [
          ['Trap bar deadlift', 'Find the 5-, 6- and 8-rep weights', '4 × 3–6', '150s'],
          ['Front squat', 'Find the 6-rep weight', '3 × 3–6', '150s'],
          ['Bulgarian split squat', 'Find the 10-rep weight · L first', '2 × 6 each', '60s'],
          ['Step-up', 'Find the 10-rep weight · L first', '2 × 6 each', '60s'],
        ] },
      ],
      notes: ['Note the trap bar empty weight while at it — so logged numbers still mean something in March.', IS_STOP],
    },
    isRest('is0_fri', 'Fri 18 Sep', 'Pro · Blues or game', 'No lift.'),
    {
      id: 'is0_sat', label: 'Sat 19 Sep', title: 'Durability block — optional', type: 'session',
      summary: 'Optional 10 min after pro practice. Skip if there is a Sunday game.',
      workouts: [IS_SAT_BLOCK],
    },
    isRest('is0_sun', 'Sun 20 Sep', 'Game or rest', 'Week A starts tomorrow.'),
  ],
};

const LEWIS_INSEASON_WEEKS = [
  IS_INTRO,
  inseasonWeek(1, 'A', ['Mon 21 Sep', 'Tue 22 Sep', 'Wed 23 Sep', 'Thu 24 Sep', 'Fri 25 Sep', 'Sat 26 Sep', 'Sun 27 Sep']),
  inseasonWeek(2, 'B', ['Mon 28 Sep', 'Tue 29 Sep', 'Wed 30 Sep', 'Thu 1 Oct', 'Fri 2 Oct', 'Sat 3 Oct', 'Sun 4 Oct']),
  inseasonWeek(3, 'C', ['Mon 5 Oct', 'Tue 6 Oct', 'Wed 7 Oct', 'Thu 8 Oct', 'Fri 9 Oct', 'Sat 10 Oct', 'Sun 11 Oct']),
  inseasonWeek(4, 'D', ['Mon 12 Oct', 'Tue 13 Oct', 'Wed 14 Oct', 'Thu 15 Oct', 'Fri 16 Oct', 'Sat 17 Oct', 'Sun 18 Oct']),
];

const LEWIS_PLAN = {
  countdown: 'In-season · Gladiators Pro + Blues · Mon/Tue/Thu 18:30, hard stop 19:25',
  gateHeading: 'Gate — 30 seconds at 18:30, answered honestly',
  daily: LEWIS_DAILY,
  readiness: ['Resting HR', 'Sleep (h)', 'Sleep 1–10', 'Soreness 1–10', 'Motivation 1–10', 'Bodyweight', 'Back', 'L hamstring'],
  gate: [
    gate(GREEN_C, 'GREEN', 'Slept 7h+ · no unusual soreness · keen', 'Full session'),
    gate(AMBER_C, 'AMBER', 'Poor sleep · legs heavy · flat', 'Drop one anchor (8-rep weight where it says 6) · cut all accessories · skip plyos. Amber is normal in-season — roughly one session in three. That is the plan working'),
    gate(RED_C, 'RED', 'Back talking · tendon pain · genuinely wrecked', 'Prime block only, then practice. Tell me'),
  ],
  blocks: [
    {
      id: 'preseason', tag: 'Preseason', title: 'Preseason — 3x3 build', dates: '28 Jul – 6 Sep',
      purpose: 'Decompression → reintegration → max strength → power → speed. Competes at 3x3 Scotland Sun 16 on the way through.',
      weeks: [
        LEWIS_PREWEEK,
        LEWIS_W0,
        LEWIS_W1,
        LEWIS_W2,
        LEWIS_W3,
        LEWIS_W4,
      ],
    },
    {
      id: 'inseason', tag: 'In-season', title: 'In-Season Strength & Power', dates: 'From Tue 15 Sep · Mon/Tue/Thu 18:30–19:30',
      purpose: 'Two-way player: Gladiators Pro + Blues — a games schedule with training squeezed into it, 15–18 court hours a week. This hour REPLACES the Blues S&C session. Intensity high, volume low, never to failure, minimal eccentrics, tiny plyos, hard stop 19:25 — he leaves primed, not emptied. Loading by rep anchors; cycle A → B → C → D repeats, with D the dump slot for congested fixtures.',
      weeks: LEWIS_INSEASON_WEEKS,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAUL — Return to Hyrox. Distal medial hamstring insertion (semimembranosus).
// Two blocks: Recovery Build (surgeon-cleared rehab) then Hyrox Training.
// Gating metric throughout: next-morning soreness / swelling — hamstring OR knee.
// No cross trainer (treadmill walk / ski erg / rower / bike). Hamstring curls and
// hip work use a monkey-foot cable attachment.
// ─────────────────────────────────────────────────────────────────────────────

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

const STOP_RULE = 'If something feels off mid-session, the session ends. Do not move to another machine to test it.';

// Cardio prescriptions become their own loggable workout; strength/intervals their own.
const REC_W1 = {
  id: 'r_w1', title: 'Week 1 — Rebuild the base', subtitle: 'Ramp-in + Week 1 · iso 70% · no hinge/impact',
  purpose: 'Volume without hinge or impact. Ramp-in weekend, then the week proper.',
  meta: [
    { label: 'Isometrics', value: '70% effort' },
    { label: 'Theme', value: 'Volume, no hinge/impact' },
    { label: 'Ramp-in', value: 'Fri–Sun 7–9 Aug' },
    { label: 'Gate to Wk2', value: 'Pain-free flexion' },
  ],
  rules: {
    do: ['Machine cardio', 'Backward sled', 'Goblet & split squats', 'Wall balls', "Farmer's carries", 'Full upper body'],
    dont: ['Running', 'Loaded hinging', 'Forward sled', 'Burpees', 'Nordics / GHD', 'Jumps / plyos'],
    note: 'Gate to Week 2: resisted flexion pain-free, and light stretch producing no next-morning soreness.',
  },
  days: [
    {
      id: 'r1_fri', label: 'Fri 7 Aug', title: 'Ramp-in — Stretching only', type: 'rest',
      summary: 'Ramp-in weekend begins. Isometrics @ 60%, mild stretch, walk. No training.',
      items: [
        ['AM isometrics', '5 × 40s @ 60% effort', 'AM'],
        ['PM stretch', '3 × 20s each side, mild', 'PM'],
        ['Walking', 'As desired', '—'],
      ],
    },
    {
      id: 'r1_sat', label: 'Sat 8 Aug', title: 'Basic reintroduction', type: 'session', dur: '~40 min',
      summary: 'Isometrics @ 60%. Easy machine reintroduction. Bike seat set for 25–35° knee bend at full extension.',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [
          ['Treadmill', 'Easy walk, upright', '1 × 12min', '—'],
          ['Static bike', 'Easy, 90rpm, seat 25–35° knee bend', '1 × 10min', '—'],
        ] },
        { id: 'strength', title: 'Reintroduction', ex: [
          ['Backward sled drag', 'Very light', '4 × 20m', '60s'],
          ['Pull-ups', 'Bodyweight', '3 × 6', '90s'],
          ['DB overhead press', 'Moderate', '3 × 8', '90s'],
          ['Face pulls', 'Light', '2 × 15', '45s'],
        ] },
      ],
      notes: [STOP_RULE],
    },
    {
      id: 'r1_sun', label: 'Sun 9 Aug', title: 'A bit more', type: 'session', dur: '~55 min',
      summary: 'Isometrics @ 65%. A little more volume — all machine and light strength.',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [
          ['Ski erg', 'Steady, tall, arms + lats', '1 × 12min', '—'],
          ['Treadmill', 'Steady walk', '1 × 15min', '—'],
        ] },
        { id: 'strength', title: 'Lower + Pull', ex: [
          ['Backward sled drag', 'Light', '6 × 20m', '60s'],
          ['Goblet squat', 'Light', '3 × 10', '90s'],
          ['Split squat', 'Bodyweight–light', '3 × 8 each', '90s'],
          ['Calf raise', '', '3 × 12', '60s'],
          ['DB row', 'Moderate', '3 × 10', '60s'],
          ['Lateral raise', 'Light', '3 × 15', '45s'],
        ] },
      ],
      notes: ["Gate to Week 1: no next-morning soreness Monday. If sore → repeat Saturday's session and delay 2 days."],
    },
    {
      id: 'r1_mon', label: 'Mon 10 Aug', title: 'Lower rehab + Push', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min steady', ex: [
          ['Treadmill walk', 'Steady', '1 × 20min', '—'],
          ['Bike', 'Easy 90rpm', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Lower + Push', ex: [
          ['Backward sled drag', 'Light', '8 × 20m', '60s'],
          ['Goblet squat', 'Moderate', '4 × 10', '90s'],
          ['Split squat', '', '3 × 8 each', '90s'],
          ['Calf raise', '', '3 × 15', '60s'],
          ['Incline DB press', '', '4 × 8', '90s'],
          ['DB overhead press', '', '3 × 10', '90s'],
          ['Lateral raise', '', '3 × 15', '45s'],
          ['Dips or close-grip press', '', '3 × 8', '90s'],
        ] },
      ],
    },
    {
      id: 'r1_tue', label: 'Tue 11 Aug', title: 'Threshold (machine only)', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [['Bike', 'Easy', '1 × 15min', '—']] },
        { id: 'threshold', title: 'Threshold', summary: 'Intervals first and complete, then the strength as straight sets with full rests — not a circuit. Core pair can superset.', ex: [
          ['Ski erg intervals', 'RPE 7', '5 × 4min', '90s'],
          ['Wall balls', 'Squat pattern is clear', '4 × 15', '—'],
          ["Farmer's carry", 'Heavy', '4 × 40m', '—'],
          ['Hanging knee raise', '', '3 × 12', '—'],
          ['Pallof press', '', '3 × 12 each', '—'],
        ] },
      ],
      notes: [STOP_RULE],
    },
    {
      id: 'r1_wed', label: 'Wed 12 Aug', title: 'Pull', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Rower', 'Arms + short slide only', '1 × 20min', '—'],
          ['Treadmill walk', 'Steady', '1 × 20min', '—'],
        ] },
        { id: 'pull', title: 'Pull', ex: [
          ['Pull-ups', '', '4 × 6', '90s'],
          ['Lat pulldown', '', '3 × 10', '90s'],
          ['DB row', '', '4 × 10', '60s'],
          ['Face pulls', '', '3 × 15', '45s'],
          ['Rear delt fly', '', '3 × 15', '45s'],
          ['Bicep curl', '', '3 × 12', '45s'],
        ] },
      ],
    },
    {
      id: 'r1_thu', label: 'Thu 13 Aug', title: 'VO2 max (machines only)', type: 'session', rpe: 9,
      workouts: [
        { id: 'warmup', title: 'Warm-up / cool-down', ex: [
          ['Treadmill walk', 'Warm-up', '1 × 10min', '—'],
          ['Bike', 'Cool-down', '1 × 10min', '—'],
        ] },
        { id: 'vo2', title: 'VO2 — Norwegian 4×4', ex: [['Norwegian 4×4 (bike / ski erg)', 'RPE 9', '4 × 4min', '3min']] },
      ],
      notes: ['The hardest session of the week. Machines only — no running.'],
    },
    {
      id: 'r1_fri2', label: 'Fri 14 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching only. Walk.',
      items: [['Isometrics + stretch', 'As the daily routine', '—'], ['Walk', 'Easy', '—']],
    },
    {
      id: 'r1_sat2', label: 'Sat 15 Aug', title: 'Sled + Strength', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Treadmill walk', 'Steady', '1 × 20min', '—'],
          ['Bike', 'Easy', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Sled + Strength', ex: [
          ['Backward sled drag', 'Moderate', '10 × 20m', '60s'],
          ['Box step-ups', "Step, don't jump", '3 × 10 each', '90s'],
          ['Leg extension or wall sit', '', '3 × 30s', '60s'],
          ['Calf raise', '', '4 × 12', '60s'],
          ['Pull-ups', '', '3 × 8', '90s'],
          ['DB press', '', '3 × 10', '90s'],
          ['Lateral raise', '', '3 × 15', '45s'],
        ] },
      ],
    },
    {
      id: 'r1_sun2', label: 'Sun 16 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: '90 min continuous, moderate, RPE 6–7. Bike-based and protected — no running, no burpees. Repeat × 4.',
      workouts: [{ id: 'sim', title: 'Circuit × 4', ex: [
        ['Bike 1km → 10 wall balls', 'RPE 6–7', '4 rounds', '—'],
        ['Ski erg 500m → backward sled drag 40m', 'RPE 6–7', '4 rounds', '—'],
        ['Treadmill walk 5 min → 20 farmer carry steps', 'RPE 6–7', '4 rounds', '—'],
      ] }],
      notes: ['Gate to Week 2: resisted flexion pain-free + light stretch producing no next-morning soreness.'],
    },
  ],
};

// ── Functional Reboot — ease-in Wed 16 – Fri 18 Sep, reboot proper from
// Sat 19 Sep. The Morning Block never happened, so this restarts honestly:
// three gentle days back into it, then four weeks built around MOVEMENT, not
// static lifts — rings, crawls, flows, carries, get-ups, deep ranges. Same
// exercise names every week so history stacks; progression comes from the
// week rules (reps → holds → load), not new lists. Hamstring caps and the
// tempo RDL medicine carry forward. Hyrox re-enters Mon 19 Oct, from the
// gentle end.

const RB_HAM_CAP = 'Hamstring work capped at RPE 7 — it never got the rebuild, so it has not yet earned more.';

const rbWarm = (machine, mins) => ({ id: 'warm', title: 'Warm-up', ex: [
  [machine + ' — easy', 'RPE 4–5, conversational', '1 × ' + mins + 'min', '—'],
] });

const RB_MOVE_A = [
  rbWarm('Bike', 10),
  { id: 'skill', title: 'Skill — holds first, fresh', summary: 'Practice, not work. Quality positions, never to failure.', ex: [
    ['Ring support hold', 'Rings turned out', '3 × 15s', '60s'],
    ['Bar hang', 'Relax into the shoulders', '3 × 20s', '60s'],
    ['Wall handstand hold', 'Belly to wall', '3 × 15s', '60s'],
  ] },
  { id: 'rings', title: 'Rings — push & pull', ex: [
    ['Ring push-up', '', '3 × 8', '60s'],
    ['Ring row', 'Feet forward to load', '3 × 10', '60s'],
    ['Ring dip', 'Band assist if needed', '3 × 5', '90s'],
    ['Chin-up', '', '3 × 5', '90s'],
  ] },
  { id: 'core', title: 'Core', ex: [
    ['Hollow hold', '', '3 × 20s', '45s'],
    ['Arch hold', '', '3 × 15s', '45s'],
  ] },
];

const RB_LOCO = [
  { id: 'cardio', title: 'Cardio — long easy', ex: [
    ['Bike — easy', 'Conversational', '1 × 20min', '—'],
    ['Row — easy', '', '1 × 20min', '—'],
  ] },
  { id: 'flow', title: 'Locomotion — quality over pace', summary: 'Ground work: smooth, quiet, controlled. Rest whenever form frays.', ex: [
    ['Bear crawl', 'Forward + backward', '4 × 15m', '45s'],
    ['Beast hold + shoulder tap', '', '3 × 20s', '45s'],
    ['Crab reach', '', '3 × 6 each', '45s'],
    ['Lateral monkey travel', '', '3 × 10m', '45s'],
    ['Deep squat hold + rotation', '', '3 × 45s', '45s'],
    ['Cossack rocks', 'Bodyweight, easy depth', '2 × 8 each', '45s'],
  ] },
];

const RB_LEGS = [
  rbWarm('Ski erg', 10),
  { id: 'legs', title: 'Functional legs — full range', ex: [
    ['Cossack squat', 'Bodyweight → light DB', '3 × 6 each', '60s'],
    ['ATG split squat', 'L first', '3 × 8 each', '90s'],
    ['Box step-up', 'Control the way down', '3 × 8 each', '60s'],
    ['Tempo RDL', 'Light, 4s eccentric — medicine, not training', '3 × 8', '90s'],
    ['Monkey-foot leg curl', 'RPE 7 cap', '3 × 10 each', '60s'],
    ['Single-leg calf raise', 'Full range off a step', '3 × 12 each', '45s'],
  ] },
];

const RB_CARRY = [
  rbWarm('Row', 10),
  { id: 'sled', title: 'Sled + carries — functional strong', ex: [
    ['Sled push', 'Moderate, smooth', '6 × 20m', '90s'],
    ['Backward sled drag', '', '4 × 20m', '90s'],
    ['Farmer carry', 'Heavy, tall posture', '4 × 30m', '90s'],
    ['Suitcase carry', '', '3 × 20m each', '60s'],
    ['Wall balls', 'Light, find the rhythm', '3 × 10', '60s'],
  ] },
  { id: 'core', title: 'Core', ex: [
    ['Pallof press', '', '3 × 10 each', '45s'],
    ['Dead bug', '', '2 × 8 each', '45s'],
  ] },
];

const RB_RECOVERY = [
  { id: 'cardio', title: 'Cardio — easy spin', ex: [
    ['Bike — easy', 'RPE 4, nothing more', '1 × 30min', '—'],
  ] },
  { id: 'mobility', title: 'Mobility (15 min)', ex: [
    ['Couch stretch', '', '1 × 60s each', '—'],
    ['Supine hamstring', 'Gentle', '1 × 45s each', '—'],
    ['90/90 hip switches', '', '1 × 10 each', '—'],
    ['Pigeon', '', '1 × 60s each', '—'],
    ['Deep squat hold', '', '3 × 20s', '—'],
    ['Cat-cow', '', '1 × 10', '—'],
  ] },
];

const RB_FLOW_B = [
  rbWarm('Bike', 10),
  { id: 'getup', title: 'Get-ups + hanging', ex: [
    ['Turkish get-up', 'Light DB — slow and perfect', '3 × 3 each', '90s'],
    ['Hanging knee raise', 'Controlled, no swing', '3 × 8', '60s'],
  ] },
  { id: 'flow', title: 'Ground flow — 3 smooth rounds', summary: 'Move through as a circuit, transitions count as much as the exercises.', ex: [
    ['Bear crawl', '', '3 × 10m', '—'],
    ["World's greatest stretch", 'Flow through', '3 × 4 each', '—'],
    ['Push-up to down dog', '', '3 × 6', '—'],
    ['Deep squat to stand', '', '3 × 6', '60s'],
  ] },
];

const rbRest = (id, label) => ({
  id, label, title: 'Rest', type: 'rest',
  summary: 'Nothing today. Back Insurance in the evening.',
  items: [['Back Insurance', '8 min', 'PM']],
});

const rbDay = (id, label, title, workouts, opts = {}) => ({
  id, label, title, type: 'session', workouts,
  ...(opts.summary ? { summary: opts.summary } : {}),
  ...(opts.notes ? { notes: opts.notes } : {}),
});

function rebootWeek(n, labels, sub, progression) {
  const id = (d) => 'rb' + n + '_' + d;
  return {
    id: 'rb_w' + n, title: 'Week ' + n + ' — ' + sub, subtitle: labels[0] + ' – ' + labels[6] + ' · ' + progression,
    purpose: 'Same six sessions, same names — the progression is ' + progression.toLowerCase() + '. Movement quality is the load.',
    meta: [
      { label: 'Progression', value: progression },
      { label: 'Hams', value: 'RPE 7 cap' },
      { label: 'Rhythm', value: '6 days + Fri off' },
      { label: 'Next', value: n === 4 ? 'Hyrox — Mon 19 Oct' : 'Week ' + (n + 1) },
    ],
    rules: {
      do: ['Quality of movement over load', 'Full ranges — deep squat, ATG, hang', 'Skill holds fresh, never to failure', 'Stop a flow when it gets ragged'],
      dont: ['Grinding reps', 'Running — Hyrox brings it back', 'Pushing hamstrings past RPE 7', 'Turning flows into cardio'],
      note: 'Gate unchanged: any next-morning hamstring or knee soreness = hold, repeat, do not progress.',
    },
    days: [
      rbDay(id('mon'), labels[0], 'Functional legs', RB_LEGS, { notes: [RB_HAM_CAP] }),
      rbDay(id('tue'), labels[1], 'Sled, carries + core', RB_CARRY),
      rbDay(id('wed'), labels[2], 'Recovery — easy spin + mobility', RB_RECOVERY),
      rbDay(id('thu'), labels[3], 'Movement B — get-ups & flows', RB_FLOW_B),
      rbRest(id('fri'), labels[4]),
      rbDay(id('sat'), labels[5], 'Movement A — rings & holds', RB_MOVE_A),
      rbDay(id('sun'), labels[6], 'Locomotion + long easy cardio', RB_LOCO),
    ],
  };
}

const RB_W0 = {
  id: 'rb_w0', title: 'Ease-in — three gentle days', subtitle: 'Wed 16 – Fri 18 Sep · RPE 5–6, stop fresh',
  purpose: 'Nothing has happened for a month, so nothing heavy happens this week. Three short mornings to get the body moving again; the reboot proper starts Saturday.',
  meta: [
    { label: 'Effort', value: 'RPE 5–6, stop fresh' },
    { label: 'Goal', value: 'Show up three times' },
    { label: 'Reboot', value: 'Sat 19 Sep' },
    { label: 'Hams', value: 'RPE 7 cap' },
  ],
  rules: {
    do: ['Short and easy', 'Leave wanting more', 'Back Insurance every evening'],
    dont: ['Making up for lost weeks', 'Anything that needs a rest timer', 'Soreness'],
    note: 'The only job this week is to make Saturday feel easy to start.',
  },
  days: [
    rbDay('rb0_wed', 'Wed 16 Sep', 'Ease-in 1 — spin + mobility', [
      { id: 'cardio', title: 'Cardio — easy', ex: [['Bike — easy', 'RPE 4–5, conversational', '1 × 30min', '—']] },
      RB_RECOVERY[1],
    ]),
    rbDay('rb0_thu', 'Thu 17 Sep', 'Ease-in 2 — machines + ground basics', [
      { id: 'cardio', title: 'Cardio — easy', ex: [
        ['Row — easy', 'RPE 5', '1 × 20min', '—'],
        ['Ski erg — easy', '', '1 × 10min', '—'],
      ] },
      { id: 'ground', title: 'Ground basics — re-learn the floor', ex: [
        ['Deep squat hold', 'Hold something if needed', '3 × 30s', '45s'],
        ['Bear crawl', 'Slow', '3 × 10m', '45s'],
        ['Bar hang', '', '3 × 20s', '60s'],
        ['Cat-cow', '', '2 × 10', '—'],
        ['90/90 hip switches', '', '2 × 8 each', '—'],
      ] },
    ]),
    rbDay('rb0_fri', 'Fri 18 Sep', 'Ease-in 3 — light circuit', [
      { id: 'cardio', title: 'Cardio — easy', ex: [['Bike — easy', 'RPE 5', '1 × 20min', '—']] },
      { id: 'circuit', title: 'Light circuit — everything easy', ex: [
        ['Ring row', '', '2 × 8', '60s'],
        ['Incline push-up', 'Hands on box', '2 × 10', '60s'],
        ['ATG split squat', 'Bodyweight, L first', '2 × 6 each', '60s'],
        ['Glute bridge', '', '2 × 10', '45s'],
        ['Dead bug', '', '2 × 8 each', '45s'],
      ] },
    ], { summary: 'Everything at RPE 5–6. Tomorrow the block starts properly.' }),
  ],
};

const RB_W1 = (() => {
  const w = rebootWeek(1, ['Mon 21 Sep', 'Tue 22 Sep', 'Wed 23 Sep', 'Thu 24 Sep', 'Fri 25 Sep', 'Sat 26 Sep', 'Sun 27 Sep'], 'Learn the shapes', 'RPE 6 — everything in the tank');
  w.subtitle = 'Sat 19 – Sun 27 Sep · reboot weekend + week 1';
  w.days = [
    rbDay('rb1_sat0', 'Sat 19 Sep', 'REBOOT — Movement A: rings & holds', RB_MOVE_A, { summary: 'Day one of the block proper. First time on the rings in a while — band assist freely, log what is real.' }),
    rbDay('rb1_sun0', 'Sun 20 Sep', 'Locomotion + long easy cardio', RB_LOCO),
    ...w.days,
  ];
  return w;
})();

const PAUL_REBOOT_WEEKS = [
  RB_W0,
  RB_W1,
  rebootWeek(2, ['Mon 28 Sep', 'Tue 29 Sep', 'Wed 30 Sep', 'Thu 1 Oct', 'Fri 2 Oct', 'Sat 3 Oct', 'Sun 4 Oct'], 'Add a little', 'One more rep, 5s more on holds'),
  rebootWeek(3, ['Mon 5 Oct', 'Tue 6 Oct', 'Wed 7 Oct', 'Thu 8 Oct', 'Fri 9 Oct', 'Sat 10 Oct', 'Sun 11 Oct'], 'Add load', 'DBs on cossacks/step-ups, lower ring angles'),
  rebootWeek(4, ['Mon 12 Oct', 'Tue 13 Oct', 'Wed 14 Oct', 'Thu 15 Oct', 'Fri 16 Oct', 'Sat 17 Oct', 'Sun 18 Oct'], 'Consolidate', 'Own week 3 — arrive at Hyrox fresh'),
];

// ── Hyrox Training (Integrated Program v2). Shared weekly template; only the
// Tuesday run intervals and Sunday half-Hyrox progress week to week.
const HY_ZONES = 'Zones: Easy/Z2 RPE 3–5 · Threshold RPE 7–8 · VO2 RPE 9–10 (Thursday only) · Hyrox RPE 5–7.';

const HY_MON = [
  { id: 'cardio', title: 'Cardio (first)', summary: '40 min before the lift', ex: [
    ['Ski erg', '1 min hard / 2 min easy pyramid', '1 × 20min', '—'],
    ['Row', 'Steady, RPE 5', '1 × 20min', '—'],
  ] },
  { id: 'handstand', title: 'Handstand skill (10–15 min)', ex: [
    ['Wall walks', '', '3 × 3', '60s'],
    ['Wall handstand hold', 'Chest to wall', '3 × max', '60s'],
    ['Pike push-ups', '', '3 × 5–8', '60s'],
  ] },
  { id: 'strength', title: 'Strength', ex: [
    ['Standing OHP', 'Main lift', '4 × 5', '2min'],
    ['Incline DB press', '', '4 × 8', '90s'],
  ] },
  { id: 'pump', title: 'Pump — supersets, 2 sets each, near failure', ex: [
    ['DB lateral raise', '', '2 × 12–15', '30s'],
    ['Cable lateral raise', '', '2 × 15', '30s'],
    ['Weighted dip', '', '2 × 8', '60s'],
    ['Cable chest fly', '', '2 × 12', '30s'],
    ['Tricep pushdown', '', '2 × 12', '30s'],
    ['Overhead cable ext', '', '2 × 12', '30s'],
    ['Face pulls', 'Shoulder balance — every upper day', '2 × 15', '30s'],
  ] },
  { id: 'core', title: 'Core', ex: [
    ['Hollow hold', '', '3 × max', '45s'],
    ['Pallof press', '', '3 × 10 each', '30s'],
  ] },
];

const HY_WED = [
  { id: 'cardio', title: 'Cardio (first)', summary: '40 min before the lift', ex: [
    ['Row', '1 min hard / 2 min easy', '1 × 20min', '—'],
    ['Ski erg', 'Steady', '1 × 20min', '—'],
  ] },
  { id: 'muscleup', title: 'Muscle-up skill (10–15 min)', ex: [
    ['False-grip ring row', '', '3 × 6', '60s'],
    ['Ring pull-up to chest', 'Pull high — sternum to rings', '3 × 5', '90s'],
    ['Ring dip', '', '3 × 5', '90s'],
    ['Transition drill', '', '3 × 3', '90s'],
  ] },
  { id: 'strength', title: 'Strength', ex: [
    ['Weighted pull-up', 'Main lift', '4 × 5', '2min'],
    ['Barbell / Pendlay row', 'Back thickness', '4 × 6', '2min'],
  ] },
  { id: 'pump', title: 'Pump — supersets, 2 sets each, near failure', ex: [
    ['Lat pulldown', '', '2 × 10', '30s'],
    ['Single-arm DB row', '', '2 × 10 each', '30s'],
    ['Face pulls', '', '2 × 15', '30s'],
    ['Reverse fly (cable)', '', '2 × 15', '30s'],
    ['Barbell curl', '', '2 × 10', '30s'],
    ['Hammer curl', '', '2 × 12', '30s'],
  ] },
  { id: 'core', title: 'Core', ex: [
    ['Ab wheel rollout', '', '3 × 8', '45s'],
    ['Hanging leg raise', '', '3 × 8', '45s'],
  ] },
];

const HY_THU = [
  { id: 'warmup', title: 'Warm-up (12–15 min, gradual)', ex: [
    ['Backward sled drag', 'Moderate', '3 × 20m', '60s'],
    ['Bike', 'Last 2 min build to RPE 7', '1 × 8min', '—'],
    ['Machine build-ups', '30 sec each', '3 × 30s', '30s'],
  ] },
  { id: 'vo2', title: 'VO2 main set — alternate A / B each week', summary: 'A: Norwegian 4×4 (row→ski→bike→row). B: 30/30 shuttles (ski→bike→row, ×10 = 1 block, 3 blocks).', ex: [
    ['Norwegian 4×4 (rotate machines)', 'RPE 9 — 90%+ max HR', '4 × 4min', '3min'],
    ['OR 30/30 shuttles (rotate machines)', 'RPE 10', '3 × 10', '3min'],
  ] },
  { id: 'finisher', title: 'Hyrox finisher — moderate, NOT another VO2 push', summary: '2 rounds, RPE 6–7', ex: [
    ['Sled push 20m → farmers 40m → wall balls 12 → sled drag 20m', 'RPE 6–7', '2 rounds', '—'],
  ] },
];

const HY_FRI = [
  { id: 'cardio', title: 'Cardio (45 min)', ex: [
    ['Boxing — heavy bag', 'Punch Lab', '1 × 30min', '—'],
    ['Ski or row', 'Easy', '1 × 15min', '—'],
  ] },
  { id: 'skills', title: 'Skill work (light, 10–15 min)', ex: [
    ['Front lever', 'Tuck hold → adv tuck → straddle', '3 × 20s', '60s'],
    ['Human flag', 'Vertical clutch flag → straddle', '3 × 10s each', '60s'],
  ] },
  { id: 'hips', title: 'Hip / glute — monkey foot (light)', summary: 'Running stability + knee support', ex: [
    ['Monkey-foot hip extension', 'Standing cable kickback — glute', '3 × 12 each', '45s'],
    ['Monkey-foot hip abduction', 'Standing cable — glute med', '3 × 12 each', '45s'],
  ] },
  { id: 'mobility', title: 'Mobility (15 min)', ex: [
    ['Couch stretch', '', '1 × 60s each', '—'],
    ['Supine hamstring', '', '1 × 45s each', '—'],
    ['90/90 hip switches', '', '1 × 10 each', '—'],
    ['Ankle dorsiflexion', '15 pulses each', '1 × 15 each', '—'],
    ["World's greatest stretch", '', '1 × 6 each', '—'],
    ['Pigeon', '', '1 × 60s each', '—'],
    ['Cat-cow', '', '1 × 10', '—'],
    ['Deep squat hold', '', '3 × 20s', '—'],
  ] },
];

const HY_SAT = [
  { id: 'cardio', title: 'Cardio (first) — machines only', summary: '40 min, keep legs fresh for snatch', ex: [
    ['Bike', 'Easy', '1 × 20min', '—'],
    ['Ski erg', 'Steady', '1 × 20min', '—'],
  ] },
  { id: 'oly', title: 'Oly — snatch focus (fresh legs)', ex: [
    ['Power snatch', 'Catch above parallel', '5 × 2', '2min'],
    ['Snatch pull', '', '3 × 3', '2min'],
    ['Overhead squat or snatch balance', 'Only if OH position is solid', '3 × 5', '2min'],
  ] },
  { id: 'strength', title: 'Strength — squat day', ex: [
    ['Front squat', 'Knee-friendlier torso angle', '4 × 6', '2min'],
    ['RDL', '', '3 × 8', '2min'],
    ['Walking lunge', 'Only if knee stays quiet', '3 × 10 each', '90s'],
    ['GHD leg curl', '', '3 × 8', '90s'],
    ['Calf raise', '', '3 × 15', '60s'],
  ] },
];

const HY_TUE_LIFT = [
  { id: 'oly', title: 'Oly — light (legs pre-fatigued from the run)', ex: [
    ['Power clean', 'Technical, moderate load only', '4 × 2', '2min'],
    ['Push jerk', '', '3 × 3', '2min'],
  ] },
  { id: 'strength', title: 'Strength & hypertrophy', ex: [
    ['Trap-bar or Romanian DL', 'Hinge-first — knee friendly', '4 × 6', '2min'],
    ['Rear-foot-elevated split squat', 'Running strength builder', '3 × 8 each', '90s'],
    ['Nordic curl', '', '3 × 5', '90s'],
    ['Back extension', '', '3 × 12', '60s'],
    ['Monkey-foot hip flexion', 'Standing on cable — hip drive for running', '3 × 12 each', '45s'],
    ['Calf raise', '', '3 × 15', '60s'],
  ] },
];

function hyroxWeek(n, o) {
  const id = (d) => 'hx' + n + '_' + d;
  return {
    id: 'hx_w' + n,
    title: 'Week ' + n + ' — ' + o.tag,
    subtitle: o.subtitle,
    meta: [
      { label: 'Tue run', value: o.tueLabel },
      { label: 'Sun', value: o.sunLabel },
      { label: 'VO2', value: 'Thu machines' },
      { label: 'Runs', value: 'Tue + Sun' },
    ],
    rules: {
      do: ['Cardio before every lift', 'Morning swelling check', 'One new stressor at a time', 'Daily rehab + sled'],
      dont: ['Progress if morning swelling', 'Running on Thursday', 'Two new stressors at once'],
      note: 'Cardio ALWAYS before the lift. Any morning swelling = don’t progress that week, repeat it.',
    },
    days: [
      {
        id: id('mon'), label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', workouts: HY_MON,
        notes: ['Warm-up: shoulder dislocates ×10 · wall angels ×10.', 'Sled ×6 light activation to finish.'],
      },
      {
        id: id('tue'), label: 'Tue', title: 'Run + Lower + Oly light', type: 'session',
        summary: 'Cardio first: run intervals, then bike 20 easy to flush the legs before lifting.',
        workouts: [o.tueRun, ...HY_TUE_LIFT],
        notes: ['Warm-up: full rehab + sled ×6 progressive + empty-bar prep.', 'Legs pre-fatigued from the run — keep Oly technique-focused. Save load PRs for Saturday.'],
      },
      {
        id: id('wed'), label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', workouts: HY_WED,
        notes: ['Warm-up: band pull-aparts ×20 · scap pull-ups ×10.', 'Sled ×6 light activation.'],
      },
      {
        id: id('thu'), label: 'Thu', title: 'VO2 Max — machine intervals', type: 'session', rpe: 10,
        summary: 'Your dedicated VO2 session — it should feel horrible. 90%+ max HR for cumulative minutes.',
        workouts: HY_THU,
        notes: [HY_ZONES, 'If you can talk during the work intervals you are not there. Alternate Format A (Norwegian 4×4) and Format B (30/30) week to week. No running on Thursday.'],
      },
      {
        id: id('fri'), label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', workouts: HY_FRI,
        notes: ['Sled ×6 very light.'],
      },
      {
        id: id('sat'), label: 'Sat', title: 'Lower + Oly (snatch focus)', type: 'session',
        summary: 'Cardio first: bike 20 + ski 20 — machines only to keep the legs fresh for snatch. This is your squat day.',
        workouts: HY_SAT,
        notes: ['Warm-up: rehab + sled ×6 + snatch complex empty bar ×3.'],
      },
      {
        id: id('sun'), label: 'Sun', title: 'Half-Hyrox Simulation', type: 'session', rpe: 6,
        summary: o.sunSummary,
        workouts: [o.sunWorkout],
        notes: ['Your favourite — untouched pattern. Start swapping bike legs for real runs per the progression.'],
      },
    ],
  };
}

// Entry restored to the gentle end (3×800m first): the base the re-levelled
// version assumed was never banked. The Reboot hands over on Mon 19 Oct.
const HYROX_WEEKS = [
  hyroxWeek(1, {
    tag: 'Build', subtitle: 'Tue 3×800m · bike subs Sunday runs', tueLabel: '3 × 800m RPE 7', sunLabel: 'Bike subs runs',
    tueRun: { id: 'run', title: 'Run intervals — threshold', summary: 'RPE 7 — short sentences only. First real running since the injury: ~15–20 min including walks.', ex: [
      ['Run — 3 × 800m', 'RPE 7, 90 sec walk between', '3 × 800m', '90s'],
      ['Bike', 'Easy — flush the legs before lifting', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. Bike subs all runs. 4 rounds; stations rotate: ski 500m · sled push 25m · row 500m · farmers 50m · wall balls 20 · sled drag 25m · lunges 20m.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (bike subs runs)', ex: [['Bike 1km → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
  hyroxWeek(2, {
    tag: 'Build', subtitle: 'Tue 3×1km · bike subs Sunday runs', tueLabel: '3 × 1km RPE 7', sunLabel: 'Bike subs runs',
    tueRun: { id: 'run', title: 'Run intervals — threshold', summary: 'RPE 7 — short sentences only.', ex: [
      ['Run — 3 × 1km', 'RPE 7, 90 sec walk between', '3 × 1km', '90s'],
      ['Bike', 'Easy — flush the legs', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. Bike subs all runs. 4 rounds, stations rotating.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (bike subs runs)', ex: [['Bike 1km → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
  hyroxWeek(3, {
    tag: 'Progress', subtitle: 'Tue 4×1km · real runs enter Sunday', tueLabel: '4 × 1km RPE 7–8', sunLabel: '500m real runs',
    tueRun: { id: 'run', title: 'Run intervals — threshold', summary: 'RPE 7–8, sustainable.', ex: [
      ['Run — 4 × 1km', 'RPE 7–8, 90 sec walk between', '4 × 1km', '90s'],
      ['Bike', 'Easy — flush the legs', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. Add 500m REAL runs between 2 of the stations; bike the rest. 4 rounds.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (500m real runs ×2)', ex: [['1km bike/run → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
  hyroxWeek(4, {
    tag: 'Progress', subtitle: 'Tue 2×2km continuous · 1km real runs Sunday', tueLabel: '2 × 2km RPE 7', sunLabel: '1km real runs',
    tueRun: { id: 'run', title: 'Run — continuous threshold', summary: 'RPE 7, continuous.', ex: [
      ['Run — 2 × 2km continuous', 'RPE 7', '2 × 2km', '3min'],
      ['Bike', 'Easy — flush the legs', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. 1km REAL runs between 4 stations; build toward full 8×1km over coming weeks.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (1km real runs)', ex: [['1km run → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
];

const PAUL_PLAN = {
  countdown: 'Functional reboot from Sat 19 Sep → Hyrox from Mon 19 Oct · gate on next-morning soreness',
  gateHeading: 'Gate — next-morning response (hamstring or knee)',
  daily: PAUL_DAILY,
  readiness: ['Next-AM soreness 1–10', 'Hamstring', 'Knee', 'Swelling', 'Sleep (h)', 'Bodyweight', 'Notes'],
  gate: [
    gate(GREEN_C, 'GREEN', 'No next-morning soreness or swelling — hamstring AND knee · movement pain-free', 'Progress as written — add load / range'),
    gate(AMBER_C, 'AMBER', 'Mild next-AM soreness that settles by midday · no swelling', 'Hold. Repeat that week, do not progress'),
    gate(RED_C, 'RED', 'Sorer next morning · joint swelling · sharp or sit-bone pain · diffuse shin ache that won’t settle', 'Stop. Sit-bone / shin / swelling → physio or surgeon’s team. Otherwise repeat the week'),
  ],
  blocks: [
    {
      id: 'recovery', tag: 'Recovery', title: 'Recovery Build', dates: 'Fri 7 – Sun 16 Aug',
      purpose: 'Surgeon-cleared hamstring rehab — volume and load rebuilt. Handed over early to the Morning Block on 19 Aug; the tempo RDL and hamstring caps carry forward inside it.',
      weeks: [REC_W1],
    },
    {
      id: 'reboot', tag: 'Reboot', title: 'Functional Reboot', dates: 'Wed 16 Sep – Sun 18 Oct',
      purpose: 'Restart from zero, honestly: three gentle ease-in days, then the reboot proper from Sat 19 Sep. Built around movement rather than static lifts — rings, crawls, flows, carries, get-ups, deep ranges. Six sessions a week with the same names every week; progression is reps → holds → load. Functional and strong, then Hyrox.',
      weeks: PAUL_REBOOT_WEEKS,
    },
    {
      id: 'hyrox', tag: 'Training', title: 'Hyrox Training', dates: 'Mon 19 Oct – Sun 15 Nov',
      purpose: 'Integrated Program v2 — Hyrox conditioning + skills + Oly + shape. Runs Tue + Sun, VO2 on Thursday machines, cardio always before the lift. Enters from the gentle end (3×800m) — the Reboot builds the base, the runs rebuild here.',
      weeks: HYROX_WEEKS,
    },
  ],
};

export const PLANS = { lewis: LEWIS_PLAN, paul: PAUL_PLAN };
