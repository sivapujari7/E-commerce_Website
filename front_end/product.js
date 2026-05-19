const product = JSON.parse(

  localStorage.getItem(
    "selectedProduct"
  )

);

if(!product){

  window.location.href =
    "index.html";

}

document.getElementById(
  "product-title"
).innerText = product.name;

document.getElementById(
  "product-price"
).innerText = `₹${product.price}`;

document.getElementById(
  "product-category"
).innerText =
  product.category;

document.getElementById(
  "product-description"
).innerText =
  product.description;

const mainImage =
  document.getElementById(
    "main-product-image"
  );

mainImage.src =
  product.mainImage ||
  product.images[0];

const slider =
  document.getElementById(
    "image-slider"
  );

product.images.forEach((image)=>{

  slider.innerHTML += `

    <img src="${image}"
      class="slider-image"
      onclick="
        changeImage('${image}')
      ">

  `;

});

function changeImage(image){

  mainImage.src = image;

}
document.getElementById(
  "add-cart-btn"
).addEventListener(

  "click",

  ()=>{

    let cart = JSON.parse(
      localStorage.getItem("cart")
    ) || [];

    let existing =
      cart.find(item =>
        item.name === product.name
      );

    if(existing){

      existing.quantity++;

    }
    else{

      cart.push({

        name:product.name,

        price:product.price,

        quantity:1,

        image:product.mainImage

      });

    }

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );

    alert("Product Added To Cart 😄🔥");

  }

);
