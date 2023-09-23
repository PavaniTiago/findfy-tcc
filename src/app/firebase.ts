// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARWEcI_UUwV8UEKi955JGjEdKqTOSTmeo",
  authDomain: "findfy-db40c.firebaseapp.com",
  projectId: "findfy-db40c",
  storageBucket: "findfy-db40c.appspot.com",
  messagingSenderId: "241812916017",
  appId: "1:241812916017:web:f5b75a3f54c9c0385bd210",
  measurementId: "G-PN1S33SET6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();