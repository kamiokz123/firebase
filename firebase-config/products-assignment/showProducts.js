import { get, child, db, ref } from "../firebaseConfig.js"

const products = [];
const productsHolder = document.getElementById("product-holder");
const addProductBtn = document.getElementById("addProductBtn");
const signoutBtn = document.getElementById("signoutBtn");
console.log(productsHolder);


window.onload = () => {
    let userInfo = JSON.parse(sessionStorage.getItem("user"));
    if (!userInfo) {
        window.location = "http://localhost:5500/firebase-config/products-assignment/"
    } else {
        getAllProducts(displayProducts);
        if (userInfo.role !== "admin") {
            addProductBtn.style.display = "none";
        }
    }
};


signoutBtn.addEventListener("click", handleSignout)

function handleSignout(){
   sessionStorage.removeItem("user");
   window.location= "http://localhost:5500/firebase-config/products-assignment/";
}

function getAllProducts(func) {
    productsHolder.innerText = "loading.....";
    get(child(ref(db), `products/`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            snapshot.forEach(p => {
                products.push(p.val());

                func();

            });
        } else {
            console.log("No data available");
            productsHolder.innerText = "no products available"
        }
    }).catch((error) => {
        console.error(error);
    });
}


function displayProducts() {
    productsHolder.innerHTML = "";

    products.forEach((pr) => {
        productsHolder.innerHTML += `
     <div class="w-[250px] min-h-[350px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
     <a href="#">
    <img class="rounded-t-lg h-[200px] w-[250px]" src=${pr.images[0]} alt="product-image" />
    </a>
     <div class="p-5">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${pr.name}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${pr.description}</p>
    <a href="#" id=${pr.key} class="product-detail-btn inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        view product
    </a>
   </div>
   </div>
 `

    })

    addEventsToProductsBtns();
}



function addEventsToProductsBtns() {
    let productsBtns = [...document.getElementsByClassName("product-detail-btn")];
    productsBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => navigateToDetail(event))
    });
    console.log(productsBtns);
}

function navigateToDetail(event) {
    var { id } = event.target
    console.log(id);
    window.location = `http://localhost:5500/firebase-config/products-assignment/pages/productDetail.html?id=${id}`
}


