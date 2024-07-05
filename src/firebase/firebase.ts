// src/firebase.ts
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/firestore";

//* creo que esto no toca hacerlo porque el back lo levanta
const firebaseConfig = {
  apiKey: "AIzaSyB3y1gGkI-j5UNRO6N6-hZmj710eIjYmKM",
  authDomain: "expreso-rivadavia.firebaseapp.com",
  projectId: "expreso-rivadavia",
  storageBucket: "expreso-rivadavia.appspot.com",
  messagingSenderId: "249213666149",
  appId: "1:249213666149:web:cc5193f2fd7b68ba48d78c",
  measurementId: "G-6LPE6TVVJS",
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const authFireBase = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
