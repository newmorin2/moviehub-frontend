import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAcIkiijzqCgRru7yYiGs1cjgaJq6eKoHE",
  authDomain: "moviehub-f5f1b.firebaseapp.com",
  projectId: "moviehub-f5f1b",
  storageBucket: "moviehub-f5f1b.firebasestorage.app",
  messagingSenderId: "863393330286",
  appId: "1:863393330286:web:2650d807cd619df6b2227f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };