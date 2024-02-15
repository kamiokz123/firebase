import { child,get,ref, Sref, getStorage, uploadBytesResumable, getDownloadURL, db,push,set,remove } from "../firebaseConfig.js";


window.onload = () => {
  let userInfo = JSON.parse(sessionStorage.getItem("user"));
  if (!userInfo) {
      window.location = "http://localhost:5500/firebase-config/products-assignment/";
  } else {
      if (userInfo.role !== "admin") {
        window.location = "http://localhost:5500/firebase-config/products-assignment/pages/products.html";
      }else{
        getAllProducts(displayProducts);
      }
  }
};

let Files = [];
let fileReader = [];
let filesLinksArray = [];
let products = [];


const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const productDesc = document.getElementById("productDesc");

const imgHolder = document.getElementById("imgHolder");
const selectImgBtn = document.getElementById("selectImg");
const uploadBtn = document.getElementById("uploadImg");

const productTable = document.getElementById("product-table");
const progress = document.getElementById("progress");




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
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progress.innerText = `uploading data is ${uploadProgress}% done`
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
              alert('data added successfully');
              getAllProducts(displayProducts);
              progress.innerText="";
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



function getAllProducts() {
 products=[];
 productTable.innerHTML="";
  get(child(ref(db), `products/`)).then((snapshot) => {
      if (snapshot.exists()) {
          // console.log(snapshot.val());
          snapshot.forEach(p => {
              products.push(p.val());
          });
          console.log("pro: ", products);
          displayProducts();

      } else {
          console.log("No data available");
          productTable.innerText = "No data available";
      }
  }).catch((error) => {
      console.error(error);
  });
}



function displayProducts() {
  productTable.innerHTML="";
  products.forEach((pr) => {
  productTable.innerHTML+=`
<tr class="border-b border-gray-300">
<td class="py-2 px-4">${pr.name}</td>
<td class="py-2 px-4">${pr.description}</td>
<td class="py-2 px-4">${pr.price}$</td>
<td class="py-2 px-4">
    <button class="hover:bg-blue-400 bg-blue-500 text-white px-4 py-2 rounded product-edit"  id=${pr.key}>Edit</button>
</td>
<td class="py-2 px-4">
    <button class="hover:bg-red-400 bg-red-500 text-white px-4 py-2 rounded product-delete"  id=${pr.key}>delete</button>
</td>
</tr>
`

 });
 addEventsToBtns()
 products=[];
};



function addEventsToBtns(){
  let editBtns = document.querySelectorAll(".product-edit");
  let deleteBtns = document.querySelectorAll(".product-delete");
  editBtns.forEach((btn)=>{
    btn.addEventListener("click",handleProductEdit);
  })
  deleteBtns.forEach((btn)=>{
    btn.addEventListener("click",handleProductDelete);
  })
}

function handleProductEdit(event){
  console.log(event.target.value);
}





function handleProductDelete(event){

  remove(child(ref(db), `products/${event.target.id}`))
  .then(() => {
    // alert("data is deleted");
    getAllProducts(displayProducts)
}).catch((error) => {
    console.error(error);
});
}



