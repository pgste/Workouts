// Firebase bootstrap. The web config is baked in at build time from
// VITE_FIREBASE_* (public by design — firestore.rules is the security
// boundary). When the env is absent the app runs local-only and none of the
// Firebase code is even fetched: the SDK is loaded with dynamic imports, so
// Vite splits it into chunks that an unconfigured build never requests.

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseConfigured = !!(cfg.apiKey && cfg.projectId && cfg.appId);

let handles = null;

/** Resolves { app, auth, db, fns } once, or null when not configured. */
export async function initFirebase() {
  if (!firebaseConfigured) return null;
  if (handles) return handles;
  const [{ initializeApp }, authMod, fsMod] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore'),
  ]);
  const app = initializeApp(cfg);
  const auth = authMod.getAuth(app);
  // Offline cache shared across tabs — Firestore queues writes while offline
  // and replays them when the connection returns.
  const db = fsMod.initializeFirestore(app, {
    localCache: fsMod.persistentLocalCache({ tabManager: fsMod.persistentMultipleTabManager() }),
  });
  handles = { app, auth, db, authMod, fsMod };
  // Local development / tests against `firebase emulators:start`. The flag is
  // baked at build time and never set in production builds.
  if (import.meta.env.VITE_FIREBASE_EMULATOR) {
    authMod.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    fsMod.connectFirestoreEmulator(db, '127.0.0.1', 8080);
    window.__fb = handles;
  }
  return handles;
}
