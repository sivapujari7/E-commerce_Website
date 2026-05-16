// ===============================
// GLOBAL VARIABLES
// ===============================

const API_URL = "https://e-commerce-backend-eubt.onrender.com";

let editingProductId = null;
let allProducts = [];

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// DOM ELEMENTS
// ===============================

const cartSidebar = document.getElementById("cart-sidebar");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

const heroVideo = document.getElementById("hero-video");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// ===============================
// LOCAL STORAGE HELPERS
// ===============================

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getToken() {
  return localStorage.getItem("token");
}

function getUserEmail() {
  return localStorage.getItem("userEmail");
}

// ===============================
// TOAST
// ===============================

function showToast(message) {
  const toast = document.createElement("div");

  toast.textContent = message;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#22d3ee",
    color: "#000",
    padding: "15px 25px",
    borderRadius: "10px",
    zIndex: "9999"
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// ===============================
// CART FUNCTIONS
// ===============================

function addToCart(product) {
  const existingItem = cart.find(
    item => item.name === product.name
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      mainImage: product.mainImage,
      quantity: 1
    });
  }

  saveCart();
  updateCart();

  showToast("Product Added To Cart");
}

function buyProduct(button, product) {
  addToCart(product);
}

function updateCart() {
  cartCount.textContent = cart.length;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
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

        <button
          class="remove-btn"
          onclick="removeItem(${index})"
        >
          Remove
        </button>

      </div>
    `;
  });

  totalPrice.textContent = `Total: ₹${total}`;
}

function increaseQuantity(index) {
  cart[index].quantity++;

  saveCart();
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);

  saveCart();
  updateCart();
}

function toggleCart() {
  cartSidebar.classList.toggle("active");
}

// ===============================
// AUTH FUNCTIONS
// ===============================

function openLogin() {
  document.getElementById("login-popup").style.display = "flex";
}

function closeLogin() {
  document.getElementById("login-popup").style.display = "none";
}

function openRegister() {
  closeLogin();

  document.getElementById("register-popup").style.display = "flex";
}

function closeRegister() {
  document.getElementById("register-popup").style.display = "none";
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

  } catch (error) {
    console.error(error);
  }
}

async function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    alert(data.message);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);

      showToast("Login Successful");

      closeLogin();
    }

  } catch (error) {
    console.error(error);
  }
}

function logoutUser() {
  localStorage.removeItem("token");

  showToast("Logged Out");

  location.reload();
}

function checkLogin() {
  const loginButton = document.getElementById("login-btn");

  if (getToken()) {
    loginButton.textContent = "Logout";
    loginButton.onclick = logoutUser;
  }
}

// ===============================
// SEARCH
// ===============================

function searchProducts() {
  const input = document
    .getElementById("search-input")
    .value
    .toLowerCase();

  const products =
    document.querySelectorAll(".product-card");

  products.forEach(product => {
    const title = product.querySelector("h3");

    if (!title) return;

    const productName =
      title.textContent.toLowerCase();

    product.style.display =
      productName.includes(input)
        ? "block"
        : "none";
  });
}

// ===============================
// PRODUCT FUNCTIONS
// ===============================

async function loadProducts() {
  try {
    const response =
      await fetch(`${API_URL}/api/products`);

    const products =
      await response.json();

    allProducts = products;

    const container =
      document.getElementById("product-container");

    const trendingContainer =
      document.getElementById("trending-container");

    let productsHTML = "";
    let trendingHTML = "";

    products.forEach(product => {

      productsHTML += `
        <div
          class="product-card"
          data-name="${product.name}"
        >

          <img
            src="${product.mainImage}"
            alt="${product.name}"
          >

          <h3>${product.name}</h3>

          <p>${product.category}</p>

          <div class="stock">
            Stock:
            <span class="stock-count">
              ${product.stock}
            </span>
          </div>

          <button
            onclick="buyProductById('${product._id}', this)"
          >
            Add To Cart
          </button>

          <button
            onclick="openProductPageById('${product._id}')"
          >
            View Details
          </button>

        </div>
      `;

      if (product.isTrending) {
        trendingHTML += `
          <div class="product-card">

            <img
              src="${product.mainImage}"
              alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button
              onclick="openProductPageById('${product._id}')"
            >
              View Details
            </button>

          </div>
        `;
      }
    });

    container.innerHTML = productsHTML;
    trendingContainer.innerHTML = trendingHTML;

  } catch (error) {
    console.error(error);
  }
}

function buyProductById(id, button) {
  const product =
    allProducts.find(p => p._id === id);

  if (!product) return;

  buyProduct(button, product);
}

function openProductPageById(id) {
  const product =
    allProducts.find(p => p._id === id);

  if (!product) return;

  localStorage.setItem(
    "selectedProduct",
    JSON.stringify(product)
  );

  localStorage.setItem("openCart", "false");

  window.location.href = "product.html";
}

// ===============================
// THEME
// ===============================

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

// ===============================
// MENU
// ===============================

function toggleMenu() {
  navLinks.classList.toggle("show-menu");
}

// ===============================
// HERO EFFECT
// ===============================

document.addEventListener("mousemove", (e) => {

  if (!heroVideo) return;

  const x =
    (window.innerWidth / 2 - e.pageX) / 40;

  const y =
    (window.innerHeight / 2 - e.pageY) / 40;

  heroVideo.style.transform = `
    translate(-50%, -50%)
    scale(1.1)
    rotateY(${x}deg)
    rotateX(${-y}deg)
  `;
});

// ===============================
// INITIAL LOAD
// ===============================

window.addEventListener("DOMContentLoaded", () => {
  updateCart();
  checkLogin();
  loadProducts();
});

window.addEventListener("load", () => {

  const openCart =
    localStorage.getItem("openCart");

  if (openCart === "true") {
    toggleCart();

    localStorage.removeItem("openCart");
  }
});

menuToggle?.addEventListener("click", toggleMenu);