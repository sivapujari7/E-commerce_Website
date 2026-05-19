const API_URL = "https://e-commerce-backend-eubt.onrender.com";

let editingProductId = null;
let allProducts = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   HELPERS
========================= */

const $id = (id) => document.getElementById(id);

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const apiRequest = async (
  url,
  method = "GET",
  body = null
) => {

  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  return response.json();
};

function showToast(message) {

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);

}

/* =========================
   CART
========================= */

function updateCart() {

  const cartCount = $id("cart-count");
  const cartItems = $id("cart-items");
  const totalPrice = $id("total-price");

  if (!cartCount || !cartItems || !totalPrice) return;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.innerText = totalItems;

  let total = 0;

  cartItems.innerHTML = cart.map((item, index) => {

    total += item.price * item.quantity;

    return `
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
          onclick="removeItem(${index})">

          Remove

        </button>

      </div>
    `;

  }).join("");

  totalPrice.innerText = `Total: ₹${total}`;

}

function addToCart(product) {

  const existing = cart.find(
    item => item.name === product.name
  );

  if (existing) {

    existing.quantity++;

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

  const sidebar = $id("cart-sidebar");

  if (!sidebar) return;

  sidebar.classList.toggle("active");

}

/* =========================
   MODALS
========================= */

function openModal(id) {

  const modal = $id(id);

  if (modal) {
    modal.style.display = "flex";
  }

}

function closeModal(id) {

  const modal = $id(id);

  if (modal) {
    modal.style.display = "none";
  }

}

function openLogin() {
  openModal("login-popup");
}

function closeLogin() {
  closeModal("login-popup");
}

function openRegister() {

  closeLogin();

  openModal("register-popup");

}

function closeRegister() {
  closeModal("register-popup");
}

function openForgotPassword() {
  openModal("forgot-popup");
}

function closeForgotPassword() {
  closeModal("forgot-popup");
}

function openAdmin() {

  openModal("admin-popup");

  loadManageProducts();

}

function closeAdmin() {
  closeModal("admin-popup");
}

function closeCheckoutModal() {
  closeModal("checkout-modal");
}

function closePaymentModal() {
  closeModal("payment-modal");
}

/* =========================
   SEARCH
========================= */

function searchProducts() {

  const input = $id("search-input")
    .value
    .toLowerCase()
    .trim();
    
  const products = document.querySelectorAll(
    "#product-container .product-card"
  );

  products.forEach(product => {

    const name =
      product.dataset.name.toLowerCase();

    if (name.includes(input)) {

      product.style.display = "flex";

      product.style.flexDirection = "column";

    } else {

      product.style.display = "none";

    }

  });

}

/* =========================
   AUTH
========================= */

async function registerUser() {

  try {

    const data = await apiRequest(

      `${API_URL}/api/auth/register`,

      "POST",

      {
        name: $id("register-name").value,
        email: $id("register-email").value,
        password: $id("register-password").value
      }

    );

    showToast(data.message);

  } catch (error) {

    console.log(error);

  }

}

async function loginUser() {

  try {

    const email = $id("login-email").value;

    const data = await apiRequest(

      `${API_URL}/api/auth/login`,

      "POST",

      {
        email,
        password: $id("login-password").value
      }

    );

    showToast(data.message);

    if (data.token) {

      localStorage.setItem("token", data.token);

      localStorage.setItem("userEmail", email);

      closeLogin();

    }

  } catch (error) {

    console.log(error);

  }

}

function logoutUser() {

  localStorage.removeItem("token");

  showToast("Logged Out");

  location.reload();

}

function checkLogin() {

  const token = localStorage.getItem("token");

  const loginButton = $id("login-btn");

  if (!loginButton) return;

  if (token) {

    loginButton.innerText = "Logout";

    loginButton.onclick = logoutUser;

  }

}

/* =========================
   ADMIN
========================= */

function checkAdminAccess() {

  const token = localStorage.getItem("token");

  const userEmail =
    localStorage.getItem("userEmail");

  if (!token) {

    showToast("Please Login First");

    openLogin();

    return;

  }

  if (
    userEmail !==
    "poojari.shiva1234@gmail.com"
  ) {

    showToast("Access Denied");

    return;

  }

  const adminPassword =
    prompt("Enter Admin Password");

  if (adminPassword === "sivaadmin") {

    openAdmin();

  } else {

    showToast("Wrong Admin Password");

  }

}

/* =========================
   PRODUCTS
========================= */

async function loadProducts() {

  try {

    const products = await apiRequest(
      `${API_URL}/api/products`
    );

    allProducts = products;

    renderProducts(products);

  } catch (error) {

    console.log(error);

  }

}

function renderProducts(products) {

  const container = $id("product-container");

  const trendingContainer =
    $id("trending-container");

  if (container) {

    container.innerHTML = products.map(product => `
      <div
        class="product-card"
        data-name="${product.name}">

        <img
          src="${product.mainImage}"
          alt="${product.name}">

        <h3>${product.name}</h3>

        <p>${product.category}</p>

        <div class="stock">

          Stock:
          <span class="stock-count">
            ${product.stock}
          </span>

        </div>

        <button
          onclick="buyProductById('${product._id}')">

          Add To Cart

        </button>

        <button
          onclick="openProductPageById('${product._id}')">

          View Details

        </button>

      </div>
    `).join("");

  }

  if (trendingContainer) {

    trendingContainer.innerHTML = products
      .filter(product => product.isTrending)
      .map(product => `
        <div
          class="product-card">

          <img
            src="${product.mainImage}"
            alt="${product.name}">

          <h3>${product.name}</h3>

          <p>₹${product.price}</p>

          <button
            onclick="openProductPageById('${product._id}')">

            View Details

          </button>

        </div>
      `).join("");

  }

}

function buyProductById(id) {

  const product = allProducts.find(
    p => p._id === id
  );

  if (!product) return;

  addToCart(product);

}

function openProductPageById(id) {

  const product = allProducts.find(
    p => p._id === id
  );

  if (!product) return;

  localStorage.setItem(
    "selectedProduct",
    JSON.stringify(product)
  );

  localStorage.setItem(
    "openCart",
    "false"
  );

  window.location.href = "product.html";

}

/* =========================
   ADMIN PRODUCTS
========================= */

async function addNewProduct() {

  try {

    const productData = {

      name: $id("product-name").value,
      price: $id("product-price").value,
      stock: $id("product-stock").value,
      category: $id("product-category").value,
      description: $id("product-description").value,
      mainImage: $id("product-main-image").value,

      isTrending:
        $id("product-trending").checked,

      images: [

        $id("product-image1").value,
        $id("product-image2").value,
        $id("product-image3").value

      ].filter(Boolean)

    };

    const url = editingProductId

      ? `${API_URL}/api/products/update/${editingProductId}`

      : `${API_URL}/api/products/add`;

    const method =
      editingProductId ? "PUT" : "POST";

    const data = await apiRequest(
      url,
      method,
      productData
    );

    showToast(data.message);

    editingProductId = null;

    loadProducts();

    loadManageProducts();

    closeAdmin();

  } catch (error) {

    console.log(error);

  }

}

async function loadManageProducts() {

  try {

    const products = await apiRequest(
      `${API_URL}/api/products`
    );

    const manageContainer =
      $id("manage-products");

    if (!manageContainer) return;

    manageContainer.innerHTML = products.map(product => `
      <div
        class="manage-product"
        data-category="${product.category}">

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
    `).join("");

  } catch (error) {

    console.log(error);

  }

}

async function deleteProduct(id) {

  try {

    const data = await apiRequest(

      `${API_URL}/api/products/delete/${id}`,

      "DELETE"

    );

    showToast(data.message);

    loadManageProducts();

    loadProducts();

  } catch (error) {

    console.log(error);

  }

}

/* =========================
   CHECKOUT
========================= */

function openPayment() {

  if (!cart.length) {

    alert("No Product Added ☹️");

    return;

  }

  openModal("checkout-modal");

}

function openPaymentStep() {

  const fields = [

    "checkout-name",
    "checkout-phone",
    "checkout-address",
    "checkout-pincode"

  ];

  const isEmpty = fields.some(
    id => !$id(id).value.trim()
  );

  if (isEmpty) {

    alert("Please Fill All Details");

    return;

  }

  closeCheckoutModal();

  openModal("payment-modal");

}

function placeOrder(method) {

  alert(
    `Order Placed Successfully Using ${method} 😄🔥`
  );

  localStorage.removeItem("cart");

  location.reload();

}

/* =========================
   FORGOT PASSWORD
========================= */

async function sendOTP() {

  try {

    const data = await apiRequest(

      `${API_URL}/api/auth/forgot-password`,

      "POST",

      {
        email: $id("forgot-email").value
      }

    );

    showToast(data.message);

  } catch (error) {

    console.log(error);

  }

}

async function resetPassword() {

  try {

    const data = await apiRequest(

      `${API_URL}/api/auth/reset-password`,

      "POST",

      {
        email: $id("forgot-email").value,
        otp: $id("forgot-otp").value,
        newPassword:
          $id("new-password").value
      }

    );

    showToast(data.message);

  } catch (error) {

    console.log(error);

  }

}

/* =========================
   MENU
========================= */

function toggleMenu() {

  const menu = $id("mobile-menu");

  if (!menu) return;

  menu.classList.toggle("show-menu");

}

/* =========================
   HERO EFFECT
========================= */

const heroVideo = $id("hero-video");

if (heroVideo) {

  document.addEventListener(
    "mousemove",
    (e) => {

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

    }
  );

}

/* =========================
   INIT
========================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    updateCart();

    checkLogin();

    loadProducts();


    const openCart =
      localStorage.getItem("openCart");

    if (openCart === "true") {

      toggleCart();

      localStorage.removeItem("openCart");

    }

  }
);
function goToCategories() {

  window.location.href =
    "categories.html";

}