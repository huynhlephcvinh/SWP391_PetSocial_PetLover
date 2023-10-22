import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyArpP_lh5ful4NXAtVyyfLKQORBIywQAzY",
    authDomain: "social-chat-1ddaa.firebaseapp.com",
    projectId: "social-chat-1ddaa",
    storageBucket: "social-chat-1ddaa.appspot.com",
    messagingSenderId: "393512046363",
    appId: "1:393512046363:web:70868d70bca39b69e14dbe",
    measurementId: "G-RPD1C4RLV3"
  });

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

