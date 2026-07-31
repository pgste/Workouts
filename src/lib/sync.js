// Firestore sync. Firestore's persistent cache does the heavy lifting
// (offline queueing, replay, realtime); this layer just decides WHAT to move:
// which local records to push (diff against a shadow of the last-synced
// state) and which remote docs to apply (per-record last-write-wins on
// updatedAt). The decision helpers are pure and exported for tests.

export const athleteOf = (key) => String(key).split(':')[0];
export const restOf = (key) => String(key).slice(String(key).indexOf(':') + 1);

/** Map entries (key → record) that differ from the shadow and belong to an
 *  athlete we may write. */
export function changedOwn(shadow, map, canWrite) {
  const out = [];
  for (const key of Object.keys(map || {})) {
    if (!canWrite(athleteOf(key))) continue;
    const json = JSON.stringify(map[key]);
    if (shadow.get(key) !== json) out.push([key, map[key], json]);
  }
  return out;
}

/** Court entries not yet pushed (by id) that we may write. */
export function newCourtEntries(shadow, entries, canWrite) {
  return (entries || []).filter((e) => e && e.id && canWrite(e.athlete) && !shadow.has('court:' + e.id));
}

/** Should a remote record replace the local one? Strictly-newer wins; ties
 *  and stale remotes are ignored (prevents echo loops). Records that never
 *  got a stamp count as age 0, so any stamped remote beats them. */
export function remoteWins(local, remote) {
  const lt = (local && (local.updatedAt || local._ts)) || 0;
  const rt = (remote && (remote.updatedAt || remote._ts)) || 0;
  return !local || rt > lt;
}

/** Court entries present remotely but not locally (by id). */
export function missingCourt(localEntries, remoteEntries) {
  const have = new Set((localEntries || []).map((e) => e && e.id).filter(Boolean));
  return (remoteEntries || []).filter((e) => e && e.id && !have.has(e.id));
}

/**
 * Wire up live sync for a signed-in, mapped user.
 *  fb        — resolved initFirebase() handles
 *  profile   — { athleteId, role } from profiles/{uid}
 *  athletes  — every athlete id that exists (for coach fan-in)
 *  getLocal  — () => { log, court, readiness } (current state)
 *  onPatch   — (patch) => void; only strictly-newer remote data, ready to merge
 *  onPlans   — (docsById) => void; plan documents as they change
 * Returns { push(progress), stop() }.
 */
export function createSyncEngine({ fb, profile, athletes, getLocal, onPatch, onPlans }) {
  const { db, fsMod } = fb;
  const { collection, doc, onSnapshot, setDoc } = fsMod;
  const shadow = new Map();
  const unsubs = [];
  const canWrite = (aid) => aid === profile.athleteId;
  const readable = profile.role === 'coach' ? athletes : [profile.athleteId];

  const pushDoc = (path, body) =>
    setDoc(doc(db, ...path), body).catch(() => { /* offline queue or rules; Firestore retries queued writes itself */ });

  function push(progress) {
    for (const [key, rec, json] of changedOwn(shadow, progress.log, canWrite)) {
      shadow.set(key, json);
      pushDoc(['athletes', athleteOf(key), 'dayRecords', restOf(key)], { data: rec, updatedAt: rec.updatedAt || 0 });
    }
    for (const [key, row, json] of changedOwn(shadow, progress.readiness, canWrite)) {
      shadow.set(key, json);
      pushDoc(['athletes', athleteOf(key), 'readiness', restOf(key)], { data: row, updatedAt: row._ts || 0 });
    }
    for (const e of newCourtEntries(shadow, progress.court, canWrite)) {
      shadow.set('court:' + e.id, '1');
      pushDoc(['athletes', e.athlete, 'courtEntries', e.id], e);
    }
  }

  function listen(aid) {
    unsubs.push(onSnapshot(collection(db, 'athletes', aid, 'dayRecords'), (snap) => {
      const local = getLocal();
      const patchLog = {};
      snap.forEach((d) => {
        const key = aid + ':' + d.id;
        const rec = d.data().data;
        const json = JSON.stringify(rec);
        if (shadow.get(key) === json) return;
        if (remoteWins(local.log[key], rec)) { patchLog[key] = rec; shadow.set(key, json); }
      });
      if (Object.keys(patchLog).length) onPatch({ log: patchLog });
    }, () => {}));

    unsubs.push(onSnapshot(collection(db, 'athletes', aid, 'readiness'), (snap) => {
      const local = getLocal();
      const patchR = {};
      snap.forEach((d) => {
        const key = aid + ':' + d.id;
        const row = d.data().data;
        const json = JSON.stringify(row);
        if (shadow.get(key) === json) return;
        if (remoteWins(local.readiness[key], row)) { patchR[key] = row; shadow.set(key, json); }
      });
      if (Object.keys(patchR).length) onPatch({ readiness: patchR });
    }, () => {}));

    unsubs.push(onSnapshot(collection(db, 'athletes', aid, 'courtEntries'), (snap) => {
      const remote = [];
      snap.forEach((d) => remote.push(d.data()));
      const fresh = missingCourt(getLocal().court, remote);
      fresh.forEach((e) => shadow.set('court:' + e.id, '1'));
      if (fresh.length) onPatch({ court: fresh });
    }, () => {}));
  }

  readable.forEach(listen);

  unsubs.push(onSnapshot(collection(db, 'plans'), (snap) => {
    const docs = {};
    snap.forEach((d) => { docs[d.id] = d.data(); });
    if (Object.keys(docs).length) onPlans(docs);
  }, () => {}));

  // Seed the outbox: anything local and unsynced pushes on the first call.
  push(getLocal());

  return {
    push,
    stop() { unsubs.forEach((u) => u()); unsubs.length = 0; },
  };
}

/** profiles/{uid} → { athleteId, role } or null (signed in but unmapped). */
export async function fetchProfile(fb, uid) {
  const { db, fsMod } = fb;
  try {
    const snap = await fsMod.getDoc(fsMod.doc(db, 'profiles', uid));
    return snap.exists() ? snap.data() : null;
  } catch {
    return null;
  }
}
