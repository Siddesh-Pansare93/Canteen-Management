// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsXZ5nH57eDSSyAOo2E-KmmhBAPzZKqis",
  authDomain: "authapp28mar24.firebaseapp.com",
  projectId: "authapp28mar24",
  storageBucket: "authapp28mar24.appspot.com",
  messagingSenderId: "177057015759",
  appId: "1:177057015759:web:25b1d26d441e129dda14ba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

