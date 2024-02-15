import { ref, db, get, query, orderByChild, equalTo } from "http://127.0.0.1:5500/firebase/firebase-config/firebaseConfig.js";


const userCnic = document.getElementById("user-cnic");
const cardForm = document.getElementById("card-form");
const cardHolder = document.getElementById("card-divs-holder");



cardForm.addEventListener("submit", handleCardDownload)

function handleCardDownload(e) {
   e.preventDefault();

   const cnic = userCnic.value;

   const applicantsRef = ref(db, "saylani-applicants");
   const que = query(applicantsRef, orderByChild("cnic"), equalTo(cnic));

   get(que)
      .then((snapshot) => {
         console.log("snap :", snapshot.val());
         if (snapshot.val() !== null) {
            var info = Object.values(snapshot.val())[0]
            renderCard(info)
         }else{
            cardHolder.innerText="No data found for this nic"
         }

      })
      .catch((error) => {
         console.error("Error", error)
      })

   console.log("hi");
}



function renderCard(data) {
   const html = `
   <div class="flex flex-col">
   <div id="student-card" class="flex flex-col w-[280px] h-[340px] border justify-center align-center text-center p-3 rounded-lg">
         <h2 class="font-bold m-2">Student Id card</h2>
         <img class="m-3  h-[150px]" src=${data.profile_image} alt="profile" >
         <p class="m-1"><span class="font-bold">name :</span> ${data.name}</p>
         <p class="m-1"><span class="font-bold">nic  :</span> ${data.cnic}</p>
         <p class="m-1"> <span class="font-bold">course :</span> ${data.course}</p>
   </div>
   <button type="button" id="student-card-btn" class="text-white border bg-blue-500 p-2">Download Card</button>
   </div>
   `;
   cardHolder.innerHTML=html;
   document.getElementById("student-card-btn").addEventListener("click",handleDownloadPdf);

}


async function handleDownloadPdf (){

   window.jsPDF = window.jspdf.jsPDF;

var doc = new jsPDF();
	
// Source HTMLElement or a string containing HTML.
var elementHTML = document.querySelector("#student-card");

await doc.html(elementHTML, {
    callback: function(doc) {
        // Save the PDF
        doc.save('sample-document.pdf');
    },
    x: 15,
    y: 15,
    width: 170, //target width in the PDF document
    windowWidth: 650 //window width in CSS pixels
});



   // const cardDiv = document.getElementById("student-card");
   // console.log(cardDiv);
   // window.html2pdf().from(cardDiv).save("card.pdf");

   
}