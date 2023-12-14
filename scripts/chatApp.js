import { db, set, ref, push, onChildAdded } from "../firebase-config/firebaseConfig.js"


const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const msgDiv = document.getElementById("chat-screen");



sendBtn.addEventListener("click", () => {

  if (msgInput.value.length < 1) {
    alert("please type msg");
    return;
  }

let dt = new Date();
let msgTime = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
let msgDate = dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear();

 const data = {
    message: msgInput.value,
    name: localStorage.getItem("user"),
    time:msgTime,
    date:msgDate
  }

  const msgRef = ref(db, 'messages/');
  const unique = push(msgRef).key;

  set(ref(db, 'messages/' + unique), data
  )
    .then(() => {
      console.log("added");
      msgInput.value = "";
    })
    .catch((err) => {
      console.log("error : ", err);
    })

});


onChildAdded(ref(db, 'messages/'), (snapshot) => {
  var { message, name ,time, date } = snapshot.val() // message , name
  var currentUser = localStorage.getItem('user') // raja || ijaz || any
  var html;

  if (currentUser === name) {
    html = `
        <p class='right'>${message} <br/> <span>By : ${name}</span> <br/> <span>${time} ${date}<span/></p>
        `
  } else {
    html = `
        <p class='left'>${message} <br/> <span>By : ${name}</span><br/> <span>${time} ${date}<span/></p>
        `
  }
  msgDiv.innerHTML += html;
});

