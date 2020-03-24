let cart = [];

let products = document.querySelectorAll(".products > div > h1");
let htmlCart = document.querySelector(".cart > ul");
sessionStorage.setItem("totalCost", 0);

for (let i = 0; i < products.length; i++) {
  products[i].parentElement.addEventListener("click", () => {
    addToCart(products[i]);
  });
}

function addToCart(element) {
  if (checkForItem(element)) {
    editItem(element);
  } else {
    cart.push({item: element.innerHTML, price: 10, quantity: 1});
    renderAllItems();
  }
}

function checkForItem(element) {
  console.log(cart.length)
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item == element.innerHTML) 
      {
        return true;
      } 
    }
  } else {
    return false;
  }
}

function renderAllItems() {
  htmlCart.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    let cartItem = document.createElement("li");
    cartItem.innerHTML = cart[i].item + "  price: " + (cart[i].price * cart[i].quantity) + "  quantity: " + cart[i].quantity;
    htmlCart.appendChild(cartItem);
  }
}

function editItem(element) {

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].item == element.innerHTML) 
    {
      cart[i].quantity += 1;
      renderAllItems();
    } 
  }

  
}
