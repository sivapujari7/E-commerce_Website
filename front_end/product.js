const product = JSON.parse(

  localStorage.getItem(
    "selectedProduct"
  )

);

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