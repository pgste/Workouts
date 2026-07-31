// Publish the repo's plans to Firestore, so phones pick up plan changes
// without an app redeploy. Git stays the single source of truth: edit
// src/data/plan.js → merge to main → the publish-plans workflow runs this.
//
// Auth, in order of precedence:
//   FIRESTORE_EMULATOR_HOST  — local testing against the emulator, no creds
//   FIREBASE_SERVICE_ACCOUNT — the service-account JSON (GitHub Actions secret)
//   neither                  — skip with a notice (exit 0), so plan.js merges
//                              don't fail CI before Firebase is set up.

import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { PLANS } from '../src/data/plan.js';

const emulator = process.env.FIRESTORE_EMULATOR_HOST;
const saJson = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!emulator && !saJson) {
  console.log('FIREBASE_SERVICE_ACCOUNT not set — skipping plan publish.');
  process.exit(0);
}

if (emulator) {
  initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'demo-court-strength' });
} else {
  const sa = JSON.parse(saJson);
  initializeApp({ credential: cert(sa), projectId: sa.project_id });
}

const db = getFirestore();
const version = Math.floor(Date.now() / 1000);

for (const [athleteId, plan] of Object.entries(PLANS)) {
  // Stored as a JSON string: exercise tuples are nested arrays, which
  // Firestore cannot hold as native fields.
  await db.doc(`plans/${athleteId}`).set({
    json: JSON.stringify(plan),
    version,
    updatedAt: Date.now(),
  });
  console.log(`published plans/${athleteId} (v${version}, ${plan.blocks.length} blocks)`);
}

console.log('done.');
process.exit(0); // admin SDK can hold the event loop open — exit explicitly so CI never hangs
