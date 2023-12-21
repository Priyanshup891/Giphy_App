import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKtEwzVqMAapULcGZAcHWp-zMuKCuLUnA",
  authDomain: "giphyapp-52cad.firebaseapp.com",
  projectId: "giphyapp-52cad",
  storageBucket: "giphyapp-52cad.appspot.com",
  messagingSenderId: "718591582340",
  appId: "1:718591582340:web:af206041e3e9d931baa2d1",
  measurementId: "G-HF1L022LSC",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();



export { app, db, auth };
