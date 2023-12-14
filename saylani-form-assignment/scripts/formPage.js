import { ref, Sref, getStorage, uploadBytesResumable, getDownloadURL, db, push, set } from "http://127.0.0.1:5500/firebase-config/firebaseConfig.js";

let imageFile;

const userCity = document.getElementById("city-input");
const userName = document.getElementById("user-full-name");
const userEmail = document.getElementById("user-email");
const userCnic = document.getElementById("user-cnic");
const userDob = document.getElementById("user-dob");


const userCourse = document.getElementById("user-course");
const fatherName = document.getElementById("father-name");
const userPhone = document.getElementById("user-phone");
const fatherCnic = document.getElementById("father-cnic");
const userGender = document.getElementById("gender-input");


const userAddress = document.getElementById("address-input");
const userQual = document.getElementById("qualification-input");
const userLaptopStatus = document.getElementById("laptop-input");

const userForm = document.getElementById("user-form");
const imgBtn = document.getElementById("img-btn");
const imgHolder = document.getElementById("user-img-holder");
const progressDetail = document.getElementById("progress-detail");



userForm.addEventListener("submit", handleForm);
imgBtn.addEventListener("click", handleImgBtn);



function handleForm(e) {

  e.preventDefault();
  console.log(e.target);
  const storage = getStorage();
  const imageAddress = `profile-images/img#${imageFile.name}`;
  const storageRef = Sref(storage, imageAddress);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);


  uploadTask.on('state_changed',
    (snapshot) => {

      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      progressDetail.innerText = `upload is ${progress}% done`
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log("err : ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);

        const productRef = ref(db, `saylani-applicants`);
        const newProductRef = push(productRef);

        const user = {
          key: newProductRef.key,
          name: userName.value,
          city: userCity.value,
          email: userEmail.value,
          phone: userPhone.value,
          cnic: userCnic.value,
          dob: userDob.value,
          course: userCourse.value,
          father_name: fatherName.value,
          father_cnic: fatherCnic.value,
          profile_image: downloadURL,
          gender: userGender.value,
          address: userAddress.value,
          qualification: userQual.value,
          user_laptop_status: userLaptopStatus.value
        }


        set(ref(db, `saylani-applicants/${newProductRef.key}`), user)
          .then(res => {
            alert('data added successfully');

            imgHolder.innerHTML="";
            progressDetail.innerText="";
            userName.value = "";
            userCity.value="";
            userEmail.value="";
            userPhone.value="";
            userCnic.value="";
            userDob.value="";
            userCourse.value="";
            fatherName.value="";
            fatherCnic.value="";
            userGender.value="";
            userAddress.value="";
            userQual.value="";
            userLaptopStatus.value="";

          })
          .catch(err => {
            console.error("error", err)
            alert("data not added some problem is facing");
          })
      });
    }
  );
}



function handleImgBtn() {

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.click();

  fileInput.onchange = () => {
    console.log("laptop :", userGender);
    imageFile = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      imgHolder.innerHTML = `<img src=${reader.result} class="profile-img" />`;
    }
    reader.readAsDataURL(fileInput.files[0])
  }
}
