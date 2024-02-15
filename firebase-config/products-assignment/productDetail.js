import { get, child, db, ref } from "../firebaseConfig.js"


let searchQuery = (window.location.search).toString();
let splitQuery = searchQuery.split("=");
let prId = splitQuery[1];
const prDetailDiv = document.getElementById("prDetailDiv");

prDetailDiv.innerText = "Loading....."
console.log(prDetailDiv);


console.log(db);

const showDetail = () => {
    get(child(ref(db), `products/${prId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const pr = snapshot.val();
            console.log(pr);

            prDetailDiv.innerHTML = `
    <div class=" flex flex-col"
        <div class=" w-[200px] h-[300px] ">
             <img src=${pr.images[0]} id="prDetailImg" alt="Product Image" class="w-[300px] h-[300px] rounded-lg shadow-md" >
        <div/>
        <!-- Product Information -->
        <div class="bg-white p-6 rounded-lg shadow-md w-[300px]">
            <!-- Product Title -->
            <h2 class="text-2xl font-semibold mb-4" id="prName">${pr.name}</h2>

            <!-- Stock Availability -->
            <p class="text-green-500 mb-2" id="stockDetail">Stock : ${pr.stock}</p>

            <!-- Price -->
            <p class="text-xl font-bold text-gray-800 mb-4" id="prPrice">Price :${pr.price}</p>

            <!-- Product Description -->
            <p class="text-gray-600" id="prDescription">Description : ${pr.description}</p>
        </div>
    </div>
    `
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

showDetail()