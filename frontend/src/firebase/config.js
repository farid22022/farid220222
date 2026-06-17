import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDSsnBEz5ycp1__G4YcT3T2L3czqkTQOC4",
  authDomain: "faridcseku.firebaseapp.com",
  projectId: "faridcseku",
  storageBucket: "faridcseku.firebasestorage.app",
  messagingSenderId: "394136883209",
  appId: "1:394136883209:web:3a1cbe4f8b5d24145568d8",
  measurementId: "G-4BC0D7EV6N"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const analyticsPromise =
  typeof window === "undefined"
    ? Promise.resolve(null)
    : isSupported()
        .then((supported) => (supported ? getAnalytics(app) : null))
        .catch(() => null);

export default app;
