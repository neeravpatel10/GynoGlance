// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAm1qkvIpfv3zr_yvdjNlSXSWsuIpz9378",
  authDomain: "gynoglance.firebaseapp.com",
  projectId: "gynoglance",
  storageBucket: "gynoglance.appspot.com",
  messagingSenderId: "988214283499",
  appId: "1:988214283499:web:985fe84d43166ea49fc2ae",
  measurementId: "G-BHSC7LT729"
};

// Initialize Firebase
let app;

if (firebase.apps.length == 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = app.storage();

export { db, auth, storage };
