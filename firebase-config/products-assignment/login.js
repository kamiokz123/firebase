import { auth, signInWithEmailAndPassword,get,child,db,ref } from "../firebaseConfig.js";


const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const loginForm = document.getElementById("login-form");


loginForm.addEventListener("submit", handleLoginForm);

function handleLoginForm(e){
  e.preventDefault();

  console.log("clicked");
signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("in :",user.uid);

    get(child(ref(db), `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userInfo = JSON.stringify(snapshot.val());
        sessionStorage.setItem("user",userInfo);
        window.location = `http://localhost:5500/firebase-config/products-assignment/pages/products.html`
         console.log("snap :",snapshot.val());
      } else {
          console.log("No data available");
      }
  }).catch((error) => {
      console.error(error);
  });

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("invalid credential")
    console.log("err",error.message);
  });

}