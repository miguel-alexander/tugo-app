import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7w4o9j-eltx6tpRz4fHhsQzlP_-7uoOg",
  authDomain: "tugo-3ec9a.firebaseapp.com",
  projectId: "tugo-3ec9a",
  storageBucket: "tugo-3ec9a.appspot.com",
  messagingSenderId: "585539251003",
  appId: "1:585539251003:web:094eb8e061bbf5f0fca51e",
  measurementId: "G-M05JX9Q2DV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
