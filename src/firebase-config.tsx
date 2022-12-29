import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQQ22gY3-hPyTfPq_Yoo-yY4GnBsoD41o",
  authDomain: "training-app-1db4d.firebaseapp.com",
  projectId: "training-app-1db4d",
  storageBucket: "training-app-1db4d.appspot.com",
  messagingSenderId: "1092881773823",
  appId: "1:1092881773823:web:ebc3273923ce43f28208ca",
  measurementId: "G-Q0JX47N4V2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
