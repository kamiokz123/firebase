import {
    auth,
    sendPasswordResetEmail
} from '../firebaseConfig.js'

const resetEmail = document.getElementById("reset-email");
const resetForm = document.getElementById("reset-form");

const handleResetPassword = (e)=>{
   e.preventDefault();
   console.log("cl");

   var emailaddress = resetEmail.value;
   if (emailaddress.length === 0){
       alert('enter the email address')
       return
   }
   sendPasswordResetEmail(auth , emailaddress)
       .then(() => {
           alert(`Password reset link on your email ${emailaddress}  send successfully`)
       })
       .catch((error) => {
           console.error("error", error);
       })
}

resetForm.addEventListener("submit",handleResetPassword);
