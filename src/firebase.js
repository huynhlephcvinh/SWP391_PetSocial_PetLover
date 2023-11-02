import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGANvba_7cJmArDlEpybBI-B7oahor6dk",
  authDomain: "auth-422ae.firebaseapp.com",
  projectId: "auth-422ae",
  storageBucket: "auth-422ae.appspot.com",
  messagingSenderId: "578597205710",
  appId: "1:578597205710:web:688b6ce45cf9e9ab1b029f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Login Successfully", result.user);
    })
    .catch((error) => {
<<<<<<< HEAD
      console.log("Login Fail", error);   
=======
      console.log("Login Fail", error);
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
    });
};
