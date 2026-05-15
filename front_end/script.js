let editingProductId = null;
const API_URL = "https://e-commerce-backend-eubt.onrender.com";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART

function addToCart(name, price){

  let existing = cart.find(item => item.name === name);

  if(existing){

    existing.quantity++;

  }
  else{

    cart.push({
      name:name,
      price:price,
      quantity:1
    });

  }

  saveCart();

  updateCart();

  showToast("Product Added To Cart");

}
// BUY PRODUCT WITH STOCK
function buyProduct(button,product){

  let stockElement = button.parentElement
    .querySelector(".stock-count");

  let stock = parseInt(
    stockElement.innerText
  );

  if(stock <= 0){

    showToast("Out Of Stock");

    return;

  }

  stock--;

  stockElement.innerText = stock;

  if(stock === 0){

    button.innerText = "Out Of Stock";

    button.disabled = true;

    button.classList.add("out-stock");

  }

  addToCart(product);

}

// UPDATE CART

function updateCart(){

  let cartCount = document.getElementById("cart-count");

  let cartItems = document.getElementById("cart-items");

  let totalPrice = document.getElementById("total-price");

  cartCount.innerText = cart.length;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item,index)=>{

    total += item.price * item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <h4>${item.name}</h4>

        <p>₹${item.price}</p>

        <div class="quantity-controls">

          <button onclick="decreaseQuantity(${index})">
            -
          </button>

          <span>${item.quantity}</span>

          <button onclick="increaseQuantity(${index})">
            +
          </button>

        </div>

        <button class="remove-btn"
          onclick="removeItem(${index})">

          Remove

        </button>

      </div>

    `;
  });

  totalPrice.innerText = `Total: ₹${total}`;

}

// INCREASE

function increaseQuantity(index){

  cart[index].quantity++;

  saveCart();

  updateCart();

}

// DECREASE

function decreaseQuantity(index){

  if(cart[index].quantity > 1){

    cart[index].quantity--;

  }
  else{

    cart.splice(index,1);

  }

  saveCart();

  updateCart();

}

// REMOVE ITEM

function removeItem(index){

  cart.splice(index,1);

  saveCart();

  updateCart();

}

// SAVE LOCAL STORAGE

function saveCart(){

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}

// CART SIDEBAR

function toggleCart(){

  let sidebar = document.getElementById("cart-sidebar");

  if(sidebar.style.right === "0px"){

    sidebar.style.right = "-400px";

  }
  else{

    sidebar.style.right = "0px";

  }

}

// LOGIN

function openLogin(){

  document.getElementById("login-popup").style.display = "flex";

}

function closeLogin(){

  document.getElementById("login-popup").style.display = "none";

}

// REGISTER

function openRegister(){

  closeLogin();

  document.getElementById("register-popup").style.display = "flex";

}

function closeRegister(){

  document.getElementById("register-popup").style.display = "none";

}

// SEARCH

function searchProducts(){

  let input = document
    .getElementById("search-input")
    .value
    .toLowerCase();

  let products = document.querySelectorAll(".product-card");

  products.forEach((product)=>{

    let name = product.dataset.name.toLowerCase();

    if(name.includes(input)){

      product.style.display = "block";

    }
    else{

      product.style.display = "none";

    }

  });

}

// PAYMENT

function openPayment(){
  console.log("NEW PAYMENT FUNCTION");

  let cart = JSON.parse(

    localStorage.getItem("cart")

  ) || [];

  if(cart.length === 0){

    alert("No Product Added ☹️");

    return;

  }

  document.getElementById(

    "checkout-modal"

  ).style.display = "flex";

}
// TOAST

function showToast(message){

  let toast = document.createElement("div");

  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#22d3ee";
  toast.style.color = "black";
  toast.style.padding = "15px 25px";
  toast.style.borderRadius = "10px";
  toast.style.zIndex = "999";

  document.body.appendChild(toast);

  setTimeout(()=>{

    toast.remove();

  },2000);

}

// INITIAL LOAD

updateCart();
// PRODUCT DETAILS

function openDetails(title, description, price, image){

  document.getElementById("details-popup")
    .style.display = "flex";

  document.getElementById("details-title")
    .innerText = title;

  document.getElementById("details-description")
    .innerText = description;

  document.getElementById("details-price")
    .innerText = price;

  document.getElementById("details-image")
    .src = image;

}

function closeDetails(){

  document.getElementById("details-popup")
    .style.display = "none";

}

// WISHLIST

function toggleWishlist(element){

  if(element.innerText === "❤️"){

    element.innerText = "💖";

    showToast("Added To Wishlist");

  }
  else{

    element.innerText = "❤️";

  }

}

// DARK MODE

function toggleTheme(){

  document.body.classList.toggle("light-mode");

}
async function registerUser() {

  const name = document.getElementById("register-name").value;

  const email = document.getElementById("register-email").value;

  const password = document.getElementById("register-password").value;

  try {

    const response = await fetch(`${API_URL}/api/auth/register`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        name,
        email,
        password

      })

    });

    const data = await response.json();

    alert(data.message);

  }
  catch(error){

    console.log(error);

  }

}
async function loginUser(){

  const email =
    document.getElementById("login-email").value;

  const password =
    document.getElementById("login-password").value;

  try{

    const response = await fetch(

      `${API_URL}/api/auth/login`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },

        body:JSON.stringify({

          email,
          password

        })

      }

    );

    const data = await response.json();

    alert(data.message);

    if(data.token){

      localStorage.setItem(

        "token",
        data.token

      );
      localStorage.setItem(
  "userEmail",
  email
);

      showToast("Login Successful");
closeLogin();
    }

  }
  catch(error){

    console.log(error);

  }

}
function checkLogin(){

  const token = localStorage.getItem("token");

  const loginButton =
    document.getElementById("login-btn");

  if(token){

    loginButton.innerText = "Logout";

    loginButton.onclick = logoutUser;

  }

}
function logoutUser(){

  localStorage.removeItem("token");

  showToast("Logged Out");

  location.reload();
  
}
function openAdmin(){

  document.getElementById("admin-popup")
    .style.display = "flex";
loadManageProducts();
}

function closeAdmin(){

  document.getElementById("admin-popup")
    .style.display = "none";

}
checkLogin();
function checkAdminAccess(){

  const token = localStorage.getItem("token");

  const userEmail =
    localStorage.getItem("userEmail");

  if(!token){

    showToast("Please Login First");

    openLogin();

    return;

  }

  if(userEmail !== "poojari.shiva1234@gmail.com"){

    showToast("Access Denied");

    return;

  }

  const adminPassword = prompt(
    "Enter Admin Password"
  );

  if(adminPassword === "sivaadmin"){

    openAdmin();

  }
  else{

    showToast("Wrong Admin Password");

  }

}

 

async function loadProducts(){

  try{

    const response = await fetch(

      `${API_URL}/api/products`

    );

    const products = await response.json();

    const container =
      document.getElementById(
        "product-container"
      );

      const trendingContainer =
  document.getElementById(
    "trending-container"
  );

    container.innerHTML = "";
    trendingContainer.innerHTML = "";

    products.forEach((product)=>{

      container.innerHTML += `

       <div class="product-card"
  data-name="${product.name}">

          <img src="${product.mainImage}" 
            alt="${product.name}">

          <h3>${product.name}</h3>

         <p>${product.category}</p>

          <div class="stock">
            Stock:
            <span class="stock-count">
              ${product.stock}
            </span>
          </div>

          <button onclick='buyProduct(
  this,
  ${JSON.stringify(product)}
)'>

  Add To Cart

</button>
<button onclick='openProductPage(
  ${JSON.stringify(product)}
)'>
  View Details
</button>
        </div>

      `;
if(product.isTrending){

  trendingContainer.innerHTML += `

    <div class="product-card"
  data-name="${product.name}">

      <img
        src="${product.mainImage}"
        alt="${product.name}">

      <h3>${product.name}</h3>

      <p>₹${product.price}</p>

      <button onclick='openProductPage(
        ${JSON.stringify(product)}
      )'>
        View Details
      </button>

    </div>

  `;

}
    });

  }
  catch(error){

    console.log(error);

  }

}
loadProducts();
async function addNewProduct(){

  const name =
    document.getElementById(
      "product-name"
    ).value;

  const price =
    document.getElementById(
      "product-price"
    ).value;

  const stock =
    document.getElementById(
      "product-stock"
    ).value;

  const category =
    document.getElementById(
      "product-category"
    ).value;

const isTrending =
  document.getElementById(
    "product-trending"
  ).checked;

  const description =
    document.getElementById(
      "product-description"
    ).value;

  const mainImage =
    document.getElementById(
      "product-main-image"
    ).value;

  const image1 =
    document.getElementById(
      "product-image1"
    ).value;

  const image2 =
    document.getElementById(
      "product-image2"
    ).value;

  const image3 =
    document.getElementById(
      "product-image3"
    ).value;

  try{

    let response;

if(editingProductId){

  response = await fetch(

    `https://e-commerce-backend-eubt.onrender.com/api/products/update/${editingProductId}`,

    {

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        name,
        price,
        stock,
        category,
        isTrending,
        description,
        mainImage,

        images:[
          image1,
          image2,
          image3
        ].filter(image => image !== "")

      })

    }

  );

}
else{

  response = await fetch(

    "https://e-commerce-backend-eubt.onrender.com/api/products/add",

    {

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        name,
        price,
        stock,
        category,
        isTrending,
        description,
        mainImage,

        images:[
          image1,
          image2,
          image3
        ].filter(image => image !== "")

      })

    }

  );

}

    const data = await response.json();

    showToast(data.message);
    editingProductId = null;

document.getElementById(
  "admin-action-btn"
).innerText = "Add Product";

    closeAdmin();

    loadProducts();
  

  }
  catch(error){

    console.log(error);

  }

}
function openProductPage(product){

  localStorage.setItem(

    "selectedProduct",

    JSON.stringify(product)

  );

  window.location.href =
    "product.html";

}
function goToCategories(){

  window.location.href =
    "categories.html";

}
const heroVideo =
  document.getElementById(
    "hero-video"
  );

document.addEventListener(

  "mousemove",

  (e)=>{

    const x =
      (window.innerWidth / 2 - e.pageX)
      / 40;

    const y =
      (window.innerHeight / 2 - e.pageY)
      / 40;

    heroVideo.style.transform =

      `translate(-50%, -50%)
       scale(1.1)
       rotateY(${x}deg)
       rotateX(${-y}deg)`;

  }

);


/* CLOSE CHECKOUT */

function closeCheckoutModal(){

  document.getElementById(
    "checkout-modal"
  ).style.display = "none";

}

/* OPEN PAYMENT */

function openPaymentStep(){

  const name =
    document.getElementById(
      "checkout-name"
    ).value;

  const phone =
    document.getElementById(
      "checkout-phone"
    ).value;

  const address =
    document.getElementById(
      "checkout-address"
    ).value;

  const pincode =
    document.getElementById(
      "checkout-pincode"
    ).value;

  if(
    !name ||
    !phone ||
    !address ||
    !pincode
  ){

    alert(
      "Please Fill All Details"
    );

    return;

  }

  closeCheckoutModal();

  document.getElementById(
    "payment-modal"
  ).style.display = "flex";

}

/* CLOSE PAYMENT */

function closePaymentModal(){

  document.getElementById(
    "payment-modal"
  ).style.display = "none";

}

/* PLACE ORDER */

function placeOrder(method){

  alert(

    `Order Placed Successfully Using ${method} 😄🔥`

  );

  localStorage.removeItem(
    "cart"
  );

  location.reload();

}
/* AUTO OPEN CART */

window.addEventListener(

  "load",

  ()=>{

    const openCart =
      localStorage.getItem(
        "openCart"
      );

    if(openCart === "true"){

      toggleCart();

      localStorage.removeItem(
        "openCart"
      );

    }

  }

);
/* LOAD MANAGE PRODUCTS */

async function loadManageProducts(){

  try{

    const response = await fetch(

      "https://e-commerce-backend-eubt.onrender.com/api/products"

    );

    const products =
  await response.json();

const manageContainer =
  document.getElementById(
    "manage-products"
  );

manageContainer.innerHTML = "";

products.forEach((product)=>{

  manageContainer.innerHTML += `

<div class="manage-product">

  <img
    src="${product.mainImage}"
    class="manage-product-image">

  <h4>${product.name}</h4>

  <p>₹${product.price}</p>

  <p>Stock: ${product.stock}</p>

  <div class="manage-buttons">

    <button
      onclick="editProduct('${product._id}')">

      Edit

    </button>

    <button
      onclick="deleteProduct('${product._id}')">

      Delete

    </button>

  </div>

</div>

`;

});
  }
  catch(error){

    console.log(error);

  }

}
async function editProduct(id){

  try{

    const response = await fetch(

      "https://e-commerce-backend-eubt.onrender.com/api/products"

    );

    const products =
      await response.json();

    const product =
      products.find(
        p => p._id === id
      );

    editingProductId = id;

    document.getElementById(
      "product-name"
    ).value = product.name;

    document.getElementById(
      "product-price"
    ).value = product.price;

    document.getElementById(
      "product-stock"
    ).value = product.stock;

    document.getElementById(
      "product-category"
    ).value = product.category;

    document.getElementById(
      "product-description"
    ).value = product.description;

    document.getElementById(
      "product-main-image"
    ).value = product.mainImage;

    document.getElementById(
      "admin-action-btn"
    ).innerText =
      "Update Product";

  }
  catch(error){

    console.log(error);

  }

}
async function deleteProduct(id){

  console.log(id);

  try{

    const response = await fetch(

      `https://e-commerce-backend-eubt.onrender.com/api/products/delete/${id}`,

      {

        method:"DELETE"

      }

    );

    const data =
      await response.json();

    alert(data.message);

    loadProducts();

    loadManageProducts();

  }
  catch(error){

    console.log(error);

  }

}