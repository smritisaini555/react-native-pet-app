// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-native-78621.firebaseapp.com",
  projectId: "react-native-78621",
  storageBucket: "react-native-78621.appspot.com",
  messagingSenderId: "559825318169",
  appId: "1:559825318169:web:3a94be4eea43889b829588",
  measurementId: "G-3CL4T33TSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//if we creat new database we need to give the name of the database id
// export const db=getFirestore(app, "petadopt")
// const analytics = getAnalytics(app);