let cart = [];

console.log(allProducts);
console.log(newProducts);

let productButtons = document.querySelectorAll(".products > ul > li > button");
let productPrices = document.querySelectorAll(".price");
let products = document.querySelectorAll(".name");
console.log(products);

let htmlCart = document.querySelector(".cart > ul");

for (let i = 0; i < products.length; i++) {
  productButtons[i].addEventListener("click", () => {
    addToCart(products[i], productPrices[i]);
  });
}

function addToCart(element, price) {
  if (checkForItem(element)) {
    editItem(element);
  } else {
    cart.push({ item: element.innerHTML, price: price.innerHTML, quantity: 1 });
    renderAllItems();
  }
}

function checkForItem(element) {
  console.log(cart.length);
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].item == element.innerHTML) {
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
    cartItem.innerHTML = cart[i].item;

    let cartItemPriceQuantity = document.createElement("div");
    let cartItemPrice = document.createElement("span");
    if (cart[i].price == "Blod Svett och Tårar") {
      cartItemPrice.innerHTML = "Blod Svett och Tårar";
    } else {
      cartItemPrice.innerHTML = cart[i].price * cart[i].quantity + " kr";
    }

    cartItemPriceQuantity.appendChild(cartItemPrice);

    let cartItemQuantity = document.createElement("span");
    cartItemQuantity.innerHTML = cart[i].quantity + " st";
    cartItemPriceQuantity.appendChild(cartItemQuantity);

    cartItem.appendChild(cartItemPriceQuantity);

    htmlCart.appendChild(cartItem);

    let clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear Cart";
    clearButton.addEventListener("click", () => {
      cart.splice(i, 1);
      renderAllItems();
    });

    cartItem.appendChild(clearButton);
  }
}

function editItem(element) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].item == element.innerHTML) {
      cart[i].quantity += 1;
      renderAllItems();
    }
  }
}
