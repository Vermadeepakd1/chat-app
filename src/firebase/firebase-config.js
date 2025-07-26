// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBb_vYlUmv5VInzlZhvdM1aJTNTkUKuhOw",
    authDomain: "chatapp-abfa3.firebaseapp.com",
    projectId: "chatapp-abfa3",
    storageBucket: "chatapp-abfa3.firebasestorage.app",
    messagingSenderId: "274402639761",
    appId: "1:274402639761:web:ec590118e6d6f7ca1ae430",
    measurementId: "G-F3SZLG43YJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)