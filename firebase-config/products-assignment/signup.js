import { createUserWithEmailAndPassword, GoogleProvider, auth, signInWithPopup, githubProvider, fbProvider, set, ref, db, get, child } from "../firebaseConfig.js";


const userName = document.getElementById("username");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const userRole = document.getElementById("userRole");



const signupGoogleBtn = document.getElementById("googleSignup");
const githubSignup = document.getElementById("githubSignup");
const fbSignupBtn = document.getElementById("fbSignup");
const emailSignUpForm = document.getElementById("signup-form");




signupGoogleBtn.addEventListener("click", handleGoogleSignup);
githubSignup.addEventListener("click", handleGithubSignup);
fbSignupBtn.addEventListener("click", handleFbSignup);
emailSignUpForm.addEventListener("submit", handleEmailSignUp);


function handleEmailSignUp(e) {
  e.preventDefault();
  console.log(userName.value, userEmail.value, userPassword.value);
  createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;

      let userData = {
        username: userName.value
      }
      set(ref(db, `users/${user.uid}`), userData)
        .then(res => {
          userName.value ="";
          userEmail.value ="";
          userPassword.value ="";
          alert('data added successfully');
        })
        .catch(err => {
          console.error("error", err)
        })
      console.log("user :", user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage);
      // ..
    });
}



function handleGoogleSignup() {
  console.log("click");

  signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      const user = result.user;

      let userData = {
        username: userName.value
      }
      set(ref(db, `users/${user.uid}`), userData)
        .then(res => {

          get(child(ref(db), `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const userInfo = JSON.stringify(snapshot.val());
              sessionStorage.setItem("user", userInfo);
              window.location = `http://localhost:5500/firebase-config/products-assignment/pages/products.html`
              console.log("snap :", snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
          alert('data added successfully');
        })
        .catch(err => {
          console.error("error", err)
        })

      console.log("user ; ", user);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);

    });
}



function handleGithubSignup() {
  console.log("click");
  signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;

      let userData = {
        username: userName.value
      }
      set(ref(db, `users/${user.uid}`), userData)
        .then(res => {

          get(child(ref(db), `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const userInfo = JSON.stringify(snapshot.val());
              sessionStorage.setItem("user", userInfo);
              window.location = `http://localhost:5500/firebase-config/products-assignment/pages/products.html`
              console.log("snap :", snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
          alert('data added successfully');
        })
        .catch(err => {
          console.error("error", err)
        })


      console.log("result :", result.user);
    })
    .catch((error) => {
      alert(error)
      console.log("error :", error);
    })
}


function handleFbSignup() {
  signInWithPopup(auth, fbProvider)
    .then(result => {
      const user = result.user;

      let userData = {
        username: userName.value
      }
      set(ref(db, `users/${user.uid}`), userData)
        .then(res => {

          get(child(ref(db), `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const userInfo = JSON.stringify(snapshot.val());
              sessionStorage.setItem("user", userInfo);
              window.location = `http://localhost:5500/firebase-config/products-assignment/pages/products.html`
              console.log("snap :", snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
          alert('data added successfully');
        })
        .catch(err => {
          console.error("error", err)
        })



      console.log("result :", result);
      console.log("sign in success");
    })
    .catch((error) => {
      console.log("error :", error);
    })
}

