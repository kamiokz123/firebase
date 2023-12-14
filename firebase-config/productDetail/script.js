import { ref, Sref, getStorage, uploadBytesResumable, getDownloadURL, db,push,set } from "../firebaseConfig.js";

let Files = [];
let fileReader = [];
let filesLinksArray = [];

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const productDesc = document.getElementById("productDesc");

const imgHolder = document.getElementById("imgHolder");
const selectImgBtn = document.getElementById("selectImg");
const uploadBtn = document.getElementById("uploadImg");




// select image btn functions

const addTofileArray = (fileArr) => {
  console.log("arr");
  for (let i = 0; i < fileArr.length; i++) {
    Files[i] = fileArr[i];
  }
}

const addToReaderArray = () => {
  console.log("files : ");
  for (let i = 0; i < Files.length; i++) {
    fileReader[i] = new FileReader();

    fileReader[i].onload = () => {
      const imgTag = document.createElement("img");
      imgTag.src = fileReader[i].result;
      imgHolder.appendChild(imgTag);

    }

    fileReader[i].readAsDataURL(Files[i]);
  }
}

const handleSelectImages = () => {

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.multiple = "multiple";
  fileInput.click();

  fileInput.onchange = () => {
    addTofileArray(fileInput.files);
    addToReaderArray();
  }
}

selectImgBtn.addEventListener("click", handleSelectImages)




// upload image and data functions


const isALLInputsFilled = () => {
  if (productName.value < 1 || productPrice.value < 1 || productStock.value < 1 || productDesc.value < 1) {
    return false;
  }
  return true;
}


const isAllImagesUploaded = () => {
  return Files.length === filesLinksArray.length;
}

const handleUploadData = (image, num) => {
  console.log("yes");

  const metaData = {
    contentType: image.type
  }

  const storage = getStorage();
  const imgAddress = `images/#${num}-${image.name}`;
  const storageRef = Sref(storage, imgAddress)

  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      alert('Upload is ' + progress + '% done');
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
      console.log("error : ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("done");
        filesLinksArray.push(downloadURL);

        if (isAllImagesUploaded()) {
          const productRef = ref(db, `products`);
          const newProductRef = push(productRef);
  
          const product = {
            key: newProductRef.key,
            name: productName.value,
            price: productPrice.value,
            stock: productStock.value,
            description: productDesc.value,
            images: filesLinksArray
          }
  
          set(ref(db, `products/${newProductRef.key}`), product)
            .then(res => {
              alert('data added successfully')
              productName.value="";
              productDesc.value="";
              productPrice.value="";
              productStock.value="";
              imgHolder.innerHTML = "";
              Files=[];
              fileReader=[];
              filesLinksArray=[];
            })
            .catch(err => {
              console.error("error", err)
            })
        }
      });
    }
  );


}


uploadBtn.addEventListener("click", () => {
  if (isALLInputsFilled()) {
    for (let i = 0; i < Files.length; i++) {
      handleUploadData(Files[i], i)
    }
  }
  else {
    alert("please fill all data")
  }
})





