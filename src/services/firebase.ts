import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBx_UrPbu56OKfMrrLmBm_OftMKCMtqzbE",
  authDomain: "leave-app-9290a.firebaseapp.com",
  projectId: "leave-app-9290a",
  storageBucket: "leave-app-9290a.appspot.com",
  messagingSenderId: "541182156531",
  appId: "1:541182156531:web:bec21fdfe66f14ac99e186",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
