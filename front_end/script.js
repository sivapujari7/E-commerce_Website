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

function buyProduct(button,name,price){

  let stockElement = button.parentElement
    .querySelector(".stock-count");

  let stock = parseInt(stockElement.innerText);

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

  addToCart(name,price);

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

  document.getElementById("payment-popup").style.display = "flex";

}

function closePayment(){

  document.getElementById("payment-popup").style.display = "none";

}

function payNow(method){

  alert("Payment Successful Using " + method);

  cart = [];

  saveCart();

  updateCart();

  closePayment();

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

   const userEmail =
  localStorage.getItem("userEmail");

loginButton.innerText =
  userEmail.split("@")[0];

    loginButton.onclick = logoutUser;

  }

}
function logoutUser(){

  localStorage.removeItem("token");

  showToast("Logged Out");

  location.reload();
  localStorage.removeItem("userEmail");
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
checkLogin();
function checkAdminAccess(){

  const token = localStorage.getItem("token");

  if(token){

    openAdmin();

  }
  else{

    showToast("Please Login First");

    openLogin();

  }

}
async function addNewProduct(){

  const name =
    document.getElementById("product-name").value;

  const price =
    document.getElementById("product-price").value;

  const stock =
    document.getElementById("product-stock").value;

  const image =
    document.getElementById("product-image").value;

  try{

    const response = await fetch(

      `${API_URL}/api/products/add`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json"

        },

        body:JSON.stringify({

          name,
          price,
          stock,
          image

        })

      }

    );

    const data = await response.json();

    showToast(data.message);

  }
  catch(error){

    console.log(error);

  }

}