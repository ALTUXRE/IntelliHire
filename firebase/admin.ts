import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK (idempotent)
function initFirebaseAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  const db = getFirestore();

  // ✅ Only set Firestore settings once (to avoid reinitialization errors)
  try {
    // @ts-ignore - skip if already set by a previous call
    if (!db._settingsFrozen) {
      db.settings({ ignoreUndefinedProperties: true });
    }
  } catch (error) {
    // Ignore "already initialized" warnings
    if (
      !String(error).includes("Firestore has already been initialized") &&
      !String(error).includes("settings() has already been called")
    ) {
      console.warn("⚠️ Firestore settings warning:", error);
    }
  }

  return {
    auth: getAuth(),
    db,
  };
}

export const { auth, db } = initFirebaseAdmin();
