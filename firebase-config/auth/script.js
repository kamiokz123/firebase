import {GoogleProvider ,auth , signInWithPopup , githubProvider , fbProvider} from "../firebaseConfig.js";

const signupGoogleBtn = document.getElementById("googleSignup");
const githubSignup = document.getElementById("githubSignup");
const fbSignupBtn = document.getElementById("fbSignup");



signupGoogleBtn.addEventListener("click",handleGoogleSignup);
githubSignup.addEventListener("click",handleGithubSignup);
fbSignupBtn.addEventListener("click",handleFbSignup);


function handleGoogleSignup() {
    console.log("click");

    signInWithPopup(auth, GoogleProvider)
  .then((result) => {
    const user = result.user;
    console.log("user ; " ,user);
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
}

function handleGithubSignup() {
    console.log("click");

    signInWithPopup(auth,githubProvider)
    .then(result=>{
        console.log("result :" ,result);
        window.location.pathname = "/"

    })
    .catch((error)=>{
        console.log("error :", error);
    })
}


function handleFbSignup () {
  signInWithPopup(auth,fbProvider)
    .then(result=>{
        console.log("result :" ,result);
        console.log("sign in success");
        // window.location.pathname = "/"

    })
    .catch((error)=>{
        console.log("error :", error);
    })
}

