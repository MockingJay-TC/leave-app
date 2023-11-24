import { initializeApp } from "firebase/app";

const config = import.meta.env;

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.SENDER_ID,
  appId: config.APP_ID,
};

export const app = initializeApp(firebaseConfig);
