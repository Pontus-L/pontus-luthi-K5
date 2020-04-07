let allProducts;

fetch('../data/products.json')
  .then(response => response.json())
  .then(data => {
  if(localStorage.getItem("products")) {
    allProducts = JSON.parse(localStorage.getItem("products"));
  } else {
    localStorage.setItem("products", JSON.stringify(data));
    allProducts = localStorage.getItem("products");
  }

  let productDiv = document.querySelector(".products");
  let newProducts = document.createElement("ul");

  for (let i = 0; i < allProducts.length; i++) {
    let newProduct = document.createElement("li");
    let newProductPrice = document.createElement("span");
    let newProductName = document.createElement("span");
    let newProductButton = document.createElement("button");
    let newProductPriceName = document.createElement("div");

    newProductName.classList.add("name");
    newProductPrice.classList.add("price");

    newProductButton.innerHTML = "Buy";
    newProductName.innerHTML = allProducts[i].name;

    if (allProducts[i].price == "Blod Svett och Tårar") {
      newProductPrice.innerHTML = allProducts[i].price;
    } else {
      newProductPrice.innerHTML = allProducts[i].price;
    }

    newProductPriceName.appendChild(newProductName);
    newProductPriceName.appendChild(newProductPrice);

    newProduct.appendChild(newProductPriceName);
    newProduct.appendChild(newProductButton);
    newProducts.appendChild(newProduct);
    console.log(allProducts[i].price);
  }

  productDiv.appendChild(newProducts);  

  let cart = [];

  let productButtons = document.querySelectorAll(".products > ul > li > button");
  let productPrices = document.querySelectorAll(".price");
  let products = document.querySelectorAll(".name");

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
      console.log(cart);
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
        console.log("click");
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

});



