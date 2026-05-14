const API_URL =
  "https://e-commerce-backend-eubt.onrender.com";

const selectedCategory =
  localStorage.getItem(
    "selectedCategory"
  );

document.getElementById(
  "category-title"
).innerText =
  selectedCategory;

async function loadCategoryProducts(){

  try{

    const response = await fetch(

      `${API_URL}/api/products`

    );

    const products =
      await response.json();

    const container =
      document.getElementById(
        "product-container"
      );

    container.innerHTML = "";

    const filteredProducts =
      products.filter((product)=>{

        return product.category
          .toLowerCase() ===
          selectedCategory
          .toLowerCase();

      });

    filteredProducts.forEach((product)=>{

      container.innerHTML += `

        <div class="product-card">

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

    });

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

loadCategoryProducts();