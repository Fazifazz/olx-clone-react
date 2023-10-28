import { initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBpydl6bdgiu1_fsrUDyXXJ-oo5nZEFI9k",
  authDomain: "olx-clone-34419.firebaseapp.com",
  projectId: "olx-clone-34419",
  storageBucket: "olx-clone-34419.appspot.com",
  messagingSenderId: "1003635889583",
  appId: "1:1003635889583:web:da4ccb277faad7f8298b5a",
  measurementId: "G-C0ZD5RV5DC",
};

export const Firebase =  initializeApp(firebaseConfig);
export const db = getFirestore(Firebase)
export const auth = getAuth(Firebase)
export const storage=getStorage(Firebase)