let cart = [];
let products = document.querySelectorAll(".products > div > h1");
let htmlCart = document.querySelector(".cart");

for (let i = 0; i < products.length; i++) {
  products[i].parentElement.addEventListener("click", () => {
    addToCart(products[i]);
  });
}

function addToCart(element) {
  cart.push(element.innerHTML);
  let content = "";
  for (let i = 0; i < cart.length; i++) {
    content += cart[i];
  }

  htmlCart.innerHTML = content;
}
