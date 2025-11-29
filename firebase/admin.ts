import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK (idempotent)
function initFirebaseAdmin() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    // Check if we have the required environment variables
    if (projectId && clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    } else {
      // Handle the case where env vars are missing (e.g. during build)
      // Note: This will still crash if you try to USE auth/db, but it fixes the build error
      console.warn("⚠️ Firebase Admin credentials missing. Skipping initialization.");
    }
  }

  // Safety check: ensure app is initialized before exporting services
  // If no app exists (because of missing creds), this might throw later when used.
  const app = getApps()[0]; 
  
  if (!app) {
     // Optional: You could return mock objects here if you need builds to pass without creds
     // For now, we will return undefined or throw a clearer error if used
  }

  return {
    auth: app ? getAuth() : ({} as any), 
    db: app ? getFirestore() : ({} as any),
  };
}

export const { auth, db } = initFirebaseAdmin();