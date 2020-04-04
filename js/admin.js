let loginRequest = new XMLHttpRequest();
loginRequest.open("GET", "../data/logins.json", false);
loginRequest.send(null);
let logins = JSON.parse(loginRequest.responseText);

let allProducts = null;
if (localStorage.getItem("myList")) {
  allProducts = JSON.parse(localStorage.getItem("myList"));
} else {
  try {
    let requestProducts = new XMLHttpRequest();
    requestProducts.open("GET", "../data/products.json", false);
    requestProducts.send(null);
    allProducts = JSON.parse(requestProducts.responseText);
    localStorage.setItem("myList", JSON.stringify(allProducts));
    allProducts = JSON.parse(localStorage.getItem("myList"));
  } catch (error) {
    console.log(error);
    let requestProducts = new XMLHttpRequest();
    requestProducts.open("GET", "../data/products.json", false);
    requestProducts.send(null);
    allProducts = JSON.parse(requestProducts.responseText);
  }
}

let loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let usernameInput = document.querySelector(
    ".loginForm > fieldset > #input-username"
  ).value;
  let passwordInput = document.querySelector(
    ".loginForm > fieldset > #input-password"
  ).value;

  if (checkPassword(passwordInput) && checkUsername(usernameInput)) {
    changeForm();
  } else {
    console.log("feeel");
  }
});

let removeForm;

function changeForm() {
  console.log("nice");
  document.querySelector("body").removeChild(document.querySelector("form"));

  let form = document.createElement("form");
  document.querySelector("body").appendChild(form);
  form.classList.add("productForm");

  let productFieldset = document.createElement("fieldset");
  let nameInput = document.createElement("input");
  let priceInput = document.createElement("input");
  let nameLabel = document.createElement("label");
  let priceLabel = document.createElement("label");
  let button = document.createElement("button");

  productFieldset.appendChild(nameLabel);
  productFieldset.appendChild(nameInput);
  productFieldset.appendChild(priceLabel);
  productFieldset.appendChild(priceInput);
  productFieldset.appendChild(button);

  nameInput.id = "input-name";
  nameInput.type = "text";
  nameInput.name = "inputName";
  nameInput.placeholder = "Name";

  priceInput.id = "input-price";
  priceInput.type = "text";
  priceInput.name = "inputPrice";
  priceInput.placeholder = "Price";

  nameLabel.innerHTML = "Enter name: ";
  priceLabel.innerHTML = "Enter price";
  nameLabel.for = "input-name";
  priceLabel.for = "input-price";

  button.type = "submit";
  button.innerHTML = "Submit";

  form.appendChild(productFieldset);

  let productForm = document.querySelector(".productForm");

  productForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let productName = document.querySelector("form > fieldset > #input-name")
      .value;
    let productPrice = document.querySelector("form > fieldset > #input-price")
      .value;

    allProducts.push({ name: productName, price: parseInt(productPrice) });
    localStorage.setItem("myList", JSON.stringify(allProducts));
    allProducts = JSON.parse(localStorage.getItem("myList"));
    console.log(allProducts);
    createRemoveDiv();
  });
  createRemoveDiv();
}

function createRemoveDiv() {
  if (document.querySelector(".removeDiv")) {
    document
      .querySelector("body")
      .removeChild(document.querySelector(".removeDiv"));
  }
  let removeDiv = document.createElement("div");
  removeDiv.className = "removeDiv";
  document.querySelector("body").appendChild(removeDiv);

  let newProducts = document.createElement("ul");

  for (let i = 0; i < allProducts.length; i++) {
    let newProduct = document.createElement("li");
    let newProductPrice = document.createElement("span");
    let newProductName = document.createElement("span");
    let newProductButton = document.createElement("button");
    let newProductPriceName = document.createElement("div");

    newProductButton.addEventListener("click", () => {
      allProducts.splice(i, 1);
      localStorage.setItem("myList", JSON.stringify(allProducts));
      allProducts = JSON.parse(localStorage.getItem("myList"));
      createRemoveDiv();
    });

    newProductName.classList.add("name");
    newProductPrice.classList.add("price");

    newProductButton.innerHTML = "Remove";
    newProductName.innerHTML = allProducts[i].name;
    newProductPrice.innerHTML = allProducts[i].price;

    newProductPriceName.appendChild(newProductName);
    newProductPriceName.appendChild(newProductPrice);

    newProduct.appendChild(newProductPriceName);
    newProduct.appendChild(newProductButton);
    newProducts.appendChild(newProduct);
  }

  removeDiv.appendChild(newProducts);
}

function checkPassword(input) {
  for (let i = 0; i < logins.length; i++) {
    console.log(logins.length + "password");
    if (input == logins[i].password) {
      return true;
    }
  }
  return false;
}

function checkUsername(input) {
  for (let i = 0; i < logins.length; i++) {
    console.log(logins[i].username + "username");
    if (input == logins[i].username) {
      return true;
    }
  }
  return false;
}
