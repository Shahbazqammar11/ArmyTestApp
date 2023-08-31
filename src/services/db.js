import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4e2C2Cw8QzvhRKCcgJXORETch-ZzsZV8",
  authDomain: "test-bc24a.firebaseapp.com",
  projectId: "test-bc24a",
  storageBucket: "test-bc24a.appspot.com",
  messagingSenderId: "6068540584",
  appId: "1:6068540584:web:41c2fda22152d855be9e9d",
  measurementId: "G-Z1Z9V63E9D"
};
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)


export { firestore, storage};
