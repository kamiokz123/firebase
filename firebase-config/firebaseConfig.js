import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, set, ref , get, child, update, remove ,push,onChildAdded , query , orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getStorage, ref as Sref ,uploadBytesResumable, getDownloadURL ,uploadBytes    } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
import {GoogleAuthProvider , getAuth, signInWithPopup, GithubAuthProvider , FacebookAuthProvider ,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"


const firebaseConfig = {
  apiKey: "AIzaSyDcmLsjhQ_RoKgXv6RjPMLgipD84LuoHOI",
  authDomain: "fir-learning-2334f.firebaseapp.com",
  projectId: "fir-learning-2334f",
  storageBucket: "fir-learning-2334f.appspot.com",
  messagingSenderId: "915030524012",
  appId: "1:915030524012:web:8945c1aab6ef61a8d91849"
};


const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase(app);
const auth = getAuth();
const GoogleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const fbProvider = new FacebookAuthProvider();

console.log("auth : ",auth);


export {
    db,
    set,
    ref,
    get,
    child,
    update,
    remove,
    getDatabase,
    push,
    onChildAdded,
    getStorage,
    Sref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
    GoogleProvider,
    auth,
    signInWithPopup,
    GoogleAuthProvider,
    githubProvider,
    fbProvider,
    query,
    orderByChild,
    equalTo,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
}