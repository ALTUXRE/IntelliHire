import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANyxBXD1tbHThsqJ_yqOHfKTZIDfIxiYc",
  authDomain: "intellimock-2a05d.firebaseapp.com",
  projectId: "intellimock-2a05d",
  storageBucket: "intellimock-2a05d.firebasestorage.app",
  messagingSenderId: "459122460329",
  appId: "1:459122460329:web:45812987e5b24dc0e88bb8",
  measurementId: "G-9W681BKDRW"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);