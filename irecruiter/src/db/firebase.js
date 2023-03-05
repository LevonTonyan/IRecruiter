// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import env from "react-dotenv";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "irecruiter-e3065.firebaseapp.com",
  projectId: "irecruiter-e3065",
  storageBucket: "irecruiter-e3065.appspot.com",
  messagingSenderId: "282227799845",
  appId: "1:282227799845:web:4aa343e0d1e50098070ccc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage()

