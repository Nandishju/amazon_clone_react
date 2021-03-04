import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjRYyXXIWlM8SLpUVh2mr8UTI_ekWMHOw",
  authDomain: "clone-5a217.firebaseapp.com",
  projectId: "clone-5a217",
  storageBucket: "clone-5a217.appspot.com",
  messagingSenderId: "671744529806",
  appId: "1:671744529806:web:4f0eaf3f8d86bcf64540df",
  measurementId: "G-LEQ1QYQGN1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};