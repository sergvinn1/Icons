// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpjPKXanLXKmpuiczRo-P1Xy7ec4EyUFo",
  authDomain: "icons-7d9ed.firebaseapp.com",
  projectId: "icons-7d9ed",
  storageBucket: "icons-7d9ed.appspot.com",
  messagingSenderId: "502291619206",
  appId: "1:502291619206:web:fe41842d6a0adfd3782007",
  measurementId: "G-Y3HYYDQML4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


